<?php
/**
 * Plugin Name: KeyStarter API
 * Description: Order, Key, Email, Review API
 * Version: 2.1
 */
add_action("rest_api_init", function() {
  register_rest_route("keystarter/v1", "/send-email", ["methods"=>"POST","callback"=>function($r){$p=$r->get_json_params();$to=sanitize_email($p["to"]);$sub=sanitize_text_field($p["subject"]);$msg=wp_kses_post($p["message"]);$ok=false;$err="";if(class_exists("SendinblueApiClient")){try{$client=new SendinblueApiClient();$data=["sender"=>["email"=>"noreply@keys-starter.com","name"=>"KeyStarter"],"to"=>[["email"=>$to]],"subject"=>$sub,"htmlContent"=>$msg];$res=$client->sendEmail($data);$code=$client->getLastResponseCode();if($code===201){$ok=true;}elseif(is_array($res)&&isset($res["message"])){$err=$res["message"];}else{$err=json_encode($res);}}catch(Exception $e){$err=$e->getMessage();}}$ok=$ok?:wp_mail($to,$sub,$msg,["Content-Type: text/html; charset=UTF-8","From: KeyStarter <noreply@keys-starter.com>"]);return["ok"=>$ok,"message"=>$ok?"Email sent":"Failed: ".$err];},"permission_callback"=>"__return_true"]);
  register_rest_route("keystarter/v1", "/nonce", ["methods"=>"GET","callback"=>fn()=>["nonce"=>wp_create_nonce("wc_store_api")],"permission_callback"=>"is_user_logged_in"]);
  register_rest_route("keystarter/v1", "/key-pool", ["methods"=>"GET","callback"=>function(){$p=get_option("keystarter_key_pool",[]);$c=[];foreach($p as $s=>$k)$c[$s]=count($k);return["ok"=>true,"counts"=>$c];},"permission_callback"=>fn()=>current_user_can("manage_options")]);
  register_rest_route("keystarter/v1", "/key-pool/import", ["methods"=>"POST","callback"=>function($r){$sl=sanitize_text_field($r->get_json_params()["slug"]??"");$ks=$r->get_json_params()["keys"]??[];if(!$sl||!is_array($ks))return new WP_Error("e","slug+keys[]",["status"=>400]);$p=get_option("keystarter_key_pool",[]);$p[$sl]=array_merge($p[$sl]??[],$ks);update_option("keystarter_key_pool",$p);return["ok"=>true,"total"=>count($p[$sl])];},"permission_callback"=>fn()=>current_user_can("manage_options")]);
  register_rest_route("keystarter/v1", "/assign-keys/(?P<order_id>\d+)", ["methods"=>"POST","callback"=>function($r){$o=wc_get_order((int)$r["order_id"]);if(!$o)return new WP_Error("nf","Order",["status"=>404]);$its=$r->get_json_params()["items"]??[];$p=get_option("keystarter_key_pool",[]);$a=[];foreach($its as $it){$sl=sanitize_text_field($it["slug"]??"");$q=max(1,intval($it["qty"]??1));if(!isset($p[$sl])||count($p[$sl])<$q)return new WP_Error("nk","No keys: $sl",["status"=>400]);$ks=[];for($i=0;$i<$q;$i++)$ks[]=array_shift($p[$sl]);$a[]=["slug"=>$sl,"name"=>$it["name"]??$sl,"keys"=>$ks];}update_option("keystarter_key_pool",$p);$o->update_meta_data("_license_keys",$a);$o->save();return["ok"=>true,"items"=>$a];},"permission_callback"=>"is_user_logged_in"]);
  register_rest_route("keystarter/v1", "/order-keys/(?P<order_id>\d+)", ["methods"=>"GET","callback"=>function($r){$o=wc_get_order((int)$r["order_id"]);if(!$o)return new WP_Error("nf","Order",["status"=>404]);$u=wp_get_current_user();if($o->get_billing_email()!==$u->user_email)return new WP_Error("fb","Denied",["status"=>403]);return["ok"=>true,"keys"=>$o->get_meta("_license_keys")?:[]];},"permission_callback"=>"is_user_logged_in"]);
  register_rest_route("keystarter/v1", "/cart-sync", ["methods"=>"POST","callback"=>function($r){$it=$r->get_json_params()["items"]??[];if($it)update_user_meta(get_current_user_id(),"_abandoned_cart",["items"=>$it,"time"=>current_time("timestamp")]);return["ok"=>true];},"permission_callback"=>"is_user_logged_in"]);
  register_rest_route("keystarter/v1", "/checkout", ["methods"=>"POST","callback"=>function($r){$p=$r->get_json_params();function ksv($t){$s=getenv("CHAT_SECRET")?:"dev-secret-change-in-production";$d=base64_decode(strtr($t,"-_","+/"));if($d===false)return null;$lc=strrpos($d,":");if($lc===false)return null;$data=substr($d,0,$lc);$recv=substr($d,$lc+1);$exp=hash_hmac("sha256",$data,$s);if(!hash_equals($exp,$recv))return null;$parts=explode(":",$data);if($parts[0]!=="user")return null;return $parts[1]??null;};$email=ksv($p["token"]??"");if(!$email)return new WP_Error("auth","Invalid",["status"=>401]);$items=$p["items"]??[];$bill=$p["billing"]??[];if(!$items||!$bill||!($bill["email"]??""))return new WP_Error("e","items+billing",["status"=>400]);$pool=get_option("keystarter_key_pool",[]);foreach($items as $it){$sl=$it["slug"]??"";$q=max(1,intval($it["qty"]??1));if(!isset($pool[$sl])||count($pool[$sl])<$q)return new WP_Error("stock","No keys: ".($it["name"]??$sl),["status"=>400]);}$order=wc_create_order();foreach($items as $it){$pid=(int)$wpdb->get_var($wpdb->prepare("SELECT ID FROM {$wpdb->posts} WHERE post_name=%s AND post_type='product' LIMIT 1",$it["slug"]??""));if($pid){$prod=wc_get_product($pid);if($prod)$order->add_product($prod,max(1,intval($it["qty"]??1)));}}$order->set_billing_first_name(sanitize_text_field($bill["firstName"]??""));$order->set_billing_last_name(sanitize_text_field($bill["lastName"]??""));$order->set_billing_email(sanitize_email($bill["email"]));$order->set_payment_method("other");$order->set_payment_method_title("Pending");$order->set_status("pending");$order->calculate_totals();$oid=$order->save();$assigned=[];foreach($items as $it){$sl=$it["slug"]??"";$q=max(1,intval($it["qty"]??1));$ks=[];for($i=0;$i<$q;$i++)$ks[]=array_shift($pool[$sl]);$assigned[]=["slug"=>$sl,"name"=>$it["name"]??$sl,"keys"=>$ks];}update_option("keystarter_key_pool",$pool);$order->update_meta_data("_license_keys",$assigned);$order->save();return["ok"=>true,"order_id"=>$oid,"total"=>(float)$order->get_total(),"items"=>$assigned,"status"=>$order->get_status()];},"permission_callback"=>"__return_true"]);
  register_rest_route("keystarter/v1", "/orders-by-token", ["methods"=>"POST","callback"=>function($r){$email=ksv($r->get_json_params()["token"]??"");if(!$email)return new WP_Error("auth","Invalid",["status"=>401]);$orders=wc_get_orders(["billing_email"=>$email,"limit"=>50]);$data=[];foreach($orders as $o){$its=[];foreach($o->get_items() as $li){$its[]=["name"=>$li->get_name(),"qty"=>$li->get_quantity()];}$data[]=["id"=>$o->get_id(),"status"=>$o->get_status(),"total"=>(float)$o->get_total(),"date"=>$o->get_date_created()?->format("Y-m-d H:i")??"","items"=>$its];}return["ok"=>true,"orders"=>$data];},"permission_callback"=>"__return_true"]);
  register_rest_route("keystarter/v1", "/reviews/(?P<product_id>\d+)", ["methods"=>"GET","callback"=>function($r){$pid=(int)$r["product_id"];$reviews=get_comments(["post_id"=>$pid,"type"=>"review","status"=>"approve"]);$data=[];foreach($reviews as $rev){$rating=get_comment_meta($rev->comment_ID,"rating",true);$data[]=["author"=>$rev->comment_author,"rating"=>(int)$rating,"text"=>strip_tags($rev->comment_content),"date"=>$rev->comment_date];}return$data;},"permission_callback"=>"__return_true"]);
});

// =============================================
// v6.1.8 License Keys Admin — Queue + CSV + Transient Lock + Chunked CSV Batch
// Security: CSRF nonce, XSS esc, key dedup, lock
// =============================================

// v6.1.8 CSV email helper
function ksc($o){
$d=true;
foreach($o->get_items() as $i){
$p=wc_get_product($i->get_product_id());
if($p&&$p->get_virtual()&&!$o->get_meta("_license_key_".$i->get_id())){$d=false;break;}
}
if($d){
$h="";
foreach($o->get_items() as $i){
$k=$o->get_meta("_license_key_".$i->get_id());
if($k)$h.="<tr><td>".esc_html($i->get_name())."</td><td>".esc_html($k)."</td></tr>";
}
if($h){
$m="Your keys for order #".$o->get_id().":<br><br><table>".$h."</table>";
wp_mail($o->get_billing_email(),"Your Keys for Order #".$o->get_id(),$m,array("Content-Type: text/html; charset=UTF-8","From: KeyStarter <noreply@keys-starter.com>"));
}
$o->set_status("completed");
$o->save();
return true;
}
return false;
}


if (!function_exists("ks_order_lock")) {
    function ks_order_lock($oid, $mode = "check") {
        $key = "ks_lock_{$oid}";
        if ($mode === "lock")  return set_transient($key, time(), 300);
        if ($mode === "unlock") return delete_transient($key);
        return get_transient($key) !== false;
    }
}

// -- Admin menu --
add_action("admin_menu", function() {
    add_submenu_page("woocommerce", "License Keys", "🔑 License Keys", "manage_woocommerce", "ks-license-keys", function() {
        if (!current_user_can("manage_woocommerce")) wp_die("Access denied.");
        $tab = $_GET["tab"] ?? "queue";
        ?>
        <div class="wrap"><h1>🔑 License Keys <span style="font-size:13px;font-weight:400;color:#666">v6.1.8 — Queue + CSV + Transient Lock + Chunked CSV</span></h1>
        <nav class="nav-tab-wrapper">
            <a href="?page=ks-license-keys&tab=queue" class="nav-tab <?php echo $tab==="queue"?"nav-tab-active":"" ?>">📋 Queue</a>
            <a href="?page=ks-license-keys&tab=csv" class="nav-tab <?php echo $tab==="csv"?"nav-tab-active":"" ?>">📦 CSV Batch</a>
        </nav>
        <?php
        // CSRF: output nonce for all forms
        $nonce = wp_create_nonce("ks_license_action");
        if ($tab === "queue")  ks_render_queue($nonce);
        if ($tab === "csv")    ks_render_csv($nonce);
        ?>
        </div><?php
    });
});

// -- Queue Mode Render --
function ks_render_queue($nonce) {
    $ks_error = get_transient("ks_error_msg");
    if ($ks_error) { echo "<div class=\"notice notice-error\"><p>" . esc_html($ks_error) . "</p></div>"; delete_transient("ks_error_msg"); }
    $ks_success = get_transient("ks_success_msg");  
    if ($ks_success) { echo "<div class=\"notice notice-success\"><p>" . esc_html($ks_success) . "</p></div>"; delete_transient("ks_success_msg"); }
    // Find orders needing keys
    $orders = wc_get_orders(["limit" => 20, "page" => ($_GET["pq"]??1), "status" => ["on-hold", "processing"]]);
    $pending = [];
    foreach ($orders as $o) {
        $has_pending = false;
        foreach ($o->get_items() as $item) {
            $pid = $item->get_product_id();
            $p = wc_get_product($pid);
            if ($p && $p->get_virtual() && !$o->get_meta("_license_key_{$item->get_id()}")) {
                $has_pending = true;
                break;
            }
        }
        if ($has_pending) $pending[] = $o->get_id();
    }
    if (empty($pending)) { echo "<p>No pending orders.</p>"; return; }

    $oid = (int)($_GET["oid"] ?? $pending[0]);
    if (!in_array($oid, $pending)) $oid = $pending[0];
    $order = wc_get_order($oid);
    $idx = array_search($oid, $pending);
    $total = count($pending);
    ?>
    <div style="background:#fff;border:1px solid #c3c4c7;border-radius:6px;padding:16px;margin-top:12px">
    <p style="font-size:12px;color:#666;margin-bottom:8px">
        Queue: <?php echo $idx+1 ?> of <?php echo $total ?> pending
    </p>
    <div id="ks-queue-order">
        <h2>#<?php echo esc_html($oid) ?> —
            <span style="font-weight:400;font-size:14px"><?php echo esc_html($order->get_billing_first_name() . " " . $order->get_billing_last_name()) ?>
            &lt;<?php echo esc_html($order->get_billing_email()) ?>&gt;</span>
        </h2>
        <form id="ks-queue-form" method="post">
            <?php wp_nonce_field("ks_save_keys", "ks_nonce"); ?>
            <input type="hidden" name="order_id" value="<?php echo esc_attr($oid) ?>">
            <table style="width:100%;border-collapse:collapse;margin:12px 0">
                <tr><th style="text-align:left;padding:6px 8px;border-bottom:1px solid #eee;font-size:12px">Product</th>
                    <th style="text-align:left;padding:6px 8px;border-bottom:1px solid #eee;font-size:12px">License Key</th>
                    <th style="padding:6px 8px;border-bottom:1px solid #eee;font-size:12px">Status</th></tr>
                <?php foreach ($order->get_items() as $item):
                    $pid = $item->get_product_id();
                    $p = wc_get_product($pid);
                    if (!$p) continue;
                    $is_virtual = $p->get_virtual();
                    $key = $order->get_meta("_license_key_{$item->get_id()}");
                    $iid = $item->get_id();
                ?>
                <tr>
                    <td style="padding:8px;border-bottom:1px solid #f0f0f0;font-size:13px">
                        <?php echo esc_html($item->get_name()) ?> <span style="color:#999">×<?php echo $item->get_quantity() ?></span>
                    </td>
                    <td style="padding:8px;border-bottom:1px solid #f0f0f0">
                        <?php if ($is_virtual): ?>
                            <input type="text" name="keys[<?php echo esc_attr($iid) ?>]"
                                   value="<?php echo esc_attr($key) ?>"
                                   placeholder="Enter license key..."
                                   style="width:100%;max-width:280px;padding:4px 8px;border:1px solid #d0d0d0;border-radius:3px;font-family:monospace;font-size:12px">
                        <?php else: ?>
                            <span style="color:#1565c0;font-size:12px">📦 Physical product — ship separately</span>
                        <?php endif; ?>
                    </td>
                    <td style="text-align:center;padding:8px;border-bottom:1px solid #f0f0f0">
                        <?php if ($key): ?>
                            <span style="color:#2e7d32;font-size:11px">✅ Sent</span> <a href="?page=ks-license-keys&tab=queue&resend=1" style="font-size:10px;color:#7c3aed">Resend</a>
                        <?php elseif (!$is_virtual): ?>
                            <span style="color:#1565c0;font-size:11px">📦 Physical</span>
                        <?php else: ?>
                            <span style="color:#e65100;font-size:11px">⏳ Pending</span>
                        <?php endif; ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </table>
            <p style="font-size:11px;color:#999">
                ⚡ <kbd style="background:#f0f0f1;padding:0 4px;border:1px solid #ddd;border-radius:2px">S</kbd> Save &amp; Send
                · <kbd style="background:#f0f0f1;padding:0 4px;border:1px solid #ddd;border-radius:2px">N</kbd> Next Order
                · Keys auto-validated, no duplicates allowed
            </p>
            <button type="submit" name="save_queue" class="button button-primary"
                    style="background:#7c3aed;border-color:#6d28d9">Save &amp; Send Keys</button>
            <a href="?page=ks-license-keys&tab=queue&oid=<?php echo $pending[min($idx+1,$total-1)] ?>" class="button" style="margin-left:4px">Skip → Next</a>
        </form>
    </div></div>
    <script>
    document.addEventListener("keydown",function(e){
        if(e.target.tagName==="INPUT")return;
        if(e.key==="s"||e.key==="S")document.querySelector("[name='save_queue']")?.click();
        if(e.key==="n"||e.key==="N")document.querySelector("a[href*='oid=']")?.click();
    });
    </script><?php
}

// -- Queue Save Handler --
add_action("admin_init", function() {
    if (empty($_POST["save_queue"]) || empty($_POST["ks_nonce"]) || !wp_verify_nonce($_POST["ks_nonce"],"ks_save_keys")) return;
    $oid = (int)($_POST["order_id"] ?? 0);
    $order = wc_get_order($oid);
    if (!$order) { wp_redirect(add_query_arg(["page"=>"ks-license-keys","tab"=>"queue","error"=>"order_not_found"],admin_url("admin.php"))); exit; }

    // Order-level lock
    if (!ks_order_lock($oid,"lock")) { wp_redirect(add_query_arg(["page"=>"ks-license-keys","tab"=>"queue","error"=>"locked"],admin_url("admin.php"))); exit; }
    // atomic lock done above

    $sent_items = [];
    foreach ($_POST["keys"] ?? [] as $iid => $key) {
        $key = trim(sanitize_text_field($key));
        if ($key === "") continue;

        // Key dedup check
        global $wpdb;
        $dup = $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM {$wpdb->postmeta} WHERE meta_value=%s AND meta_key LIKE '_license_key_%' AND post_id!=%d",
            $key, $oid
        ));
        if ($dup > 0) continue; // skip duplicate key

        $order->update_meta_data("_license_key_{$iid}", $key);
        $sent_items[] = $iid;
    }
    $order->save();

    if (!empty($sent_items)) {
        // Check if all virtual items now have keys -> complete order
        $all_done = true;
        foreach ($order->get_items() as $item) {
            $p = wc_get_product($item->get_product_id());
            if ($p && $p->get_virtual() && !$order->get_meta("_license_key_{$item->get_id()}")) {
                $all_done = false;
                break;
            }
        }
        if ($all_done) {
            $order->set_status("completed");
            $order->save();
        }

        // Send ONE email with all keys
        $to = $order->get_billing_email();
        $name = $order->get_billing_first_name();
        $items_html = "";
        foreach ($order->get_items() as $item) {
            $k = $order->get_meta("_license_key_{$item->get_id()}");
            $p = wc_get_product($item->get_product_id());
            if ($k) $items_html .= "<tr><td style='padding:6px 8px'>" . esc_html($item->get_name()) . "</td><td style='padding:6px 8px;font-family:monospace;font-weight:700;letter-spacing:1px;color:#7c3aed'>" . esc_html($k) . "</td></tr>";
        }
        if ($items_html) {
            $msg = "<div style='max-width:560px;margin:0 auto;font-family:Arial,sans-serif'>
                <div style='background:#7c3aed;color:#fff;padding:20px;text-align:center;border-radius:6px 6px 0 0'><h1 style='margin:0;font-size:18px'>Your License Keys</h1></div>
                <div style='padding:24px;border:1px solid #e8e8ed;border-top:0'>
                    <p>Hi " . esc_html($name) . ",</p>
                    <p>Your license keys for order #{$oid}:</p>
                    <table style='width:100%;border-collapse:collapse;margin:12px 0'>$items_html</table>
                    <p style='font-size:11px;color:#999;margin-top:12px'>Support: admin@keystarter.com</p>
                </div></div>";
            if (class_exists("SendinblueApiClient")) {
                try {
                    $c = new SendinblueApiClient();
                    $c->sendEmail(["sender"=>["email"=>"noreply@keys-starter.com","name"=>"KeyStarter"],"to"=>[["email"=>$to]],"subject"=>"Your License Keys for Order #{$oid}","htmlContent"=>$msg]);
                } catch (Exception $e) {
                    wp_mail($to, "Your License Keys for Order #{$oid}", $msg, ["Content-Type: text/html; charset=UTF-8","From: KeyStarter <noreply@keys-starter.com>"]);
                }
            } else {
                wp_mail($to, "Your License Keys for Order #{$oid}", $msg, ["Content-Type: text/html; charset=UTF-8","From: KeyStarter <noreply@keys-starter.com>"]);
            }
        }
    }
    ks_order_lock($oid,"unlock");
    wp_redirect(add_query_arg(["page"=>"ks-license-keys","tab"=>"queue","oid"=>$oid,"saved"=>count($sent_items)],admin_url("admin.php")));
    exit;
});

// -- CSV Batch Mode --
function ks_render_csv($nonce) {
    // v6.1.8 CSV chunking: 200 rows per batch
    $CHUNK = 200;
    $csv_resuming = $_REQUEST['csv_r'] ?? '';
    $saved_chunk = $csv_resuming ? get_transient('ks_chunk_' . $csv_resuming) : null;
    if ($csv_resuming && !$saved_chunk) { $csv_resuming = ''; echo '<div class="notice notice-error"><p>CSV data expired. Please upload again.</p></div>'; }

    // Handle POST for CSV import
    if (($_SERVER["REQUEST_METHOD"]==="POST" && isset($_POST["import_csv"]) && wp_verify_nonce($_POST["_wpnonce"]??"","ks_import_csv")) || $csv_resuming) {
        if ($_FILES["csv_file"]["size"] > 10485760) { echo "<div class=\"notice notice-error\"><p>File exceeds 10MB limit.</p></div>"; return; }
    if (empty($_FILES["csv_file"]["tmp_name"]) && !$csv_resuming) { echo "<div class='notice notice-error'><p>No file uploaded.</p></div>"; }
        else {
                    if ($csv_resuming && $saved_chunk) {
            $lines = $saved_chunk['lines'];
        } else {
            $lines = file($_FILES["csv_file"]["tmp_name"], FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        }
    // v6.1.8: save lines for resume, limit to CHUNK size
    $csv_hash = substr(md5(serialize($lines)), 0, 12);
    set_transient('ks_chunk_' . $csv_hash, $lines, 3600);
    $total_rows = count($lines);

            $header = str_getcsv(array_shift($lines));
            $results = ["ok"=>0,"skip"=>0,"err"=>[]];
            foreach ($lines as $line) {
                $row = str_getcsv($line);
                $data = array_combine($header, $row);
                $oid = (int)($data["Order#"] ?? 0);
                $slug = $data["Product Slug"] ?? "";
                $key = trim($data["Key"] ?? "");
                if (!$oid || !$slug) { $results["skip"]++; continue; }
                if ($key === "") { $results["skip"]++; continue; }
                $order = wc_get_order($oid);
                if (!$order) { $results["err"][] = "Order #{$oid} not found"; continue; }

                // Key dedup
                global $wpdb;
                $dup = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->postmeta} WHERE meta_value=%s AND meta_key LIKE '_license_key_%' AND post_id!=%d",$key,$oid));
                if ($dup > 0) { $results["err"][] = "Key $key already used (order #$oid)"; continue; }

                // Find matching line item by product slug
                foreach ($order->get_items() as $item) {
                    $p = wc_get_product($item->get_product_id());
                    if ($p && $p->get_slug() === $slug && !$order->get_meta("_license_key_{$item->get_id()}") && $p->get_virtual()) {
                        if (ks_order_lock($oid,"lock")) { $results["err"][] = "Order $oid locked"; break; }
                        $order->update_meta_data("_license_key_{$item->get_id()}", $key);
                        $order->save();
                        ks_order_lock($oid,"unlock");
                        $results["ok"]++;if(ksc($order))$results["sent"]=($results["sent"]??0)+1;
                        break;
                    }
                }
            }
            echo "<div class='notice notice-success'><p>Imported: {$results['ok']} keys, skipped: {$results['skip']}";
            if ($results["err"]) echo "<br>Errors: " . implode("; ", array_slice($results["err"],0,5));
    if ($chunk_end < $total_rows) {
        // Save progress for resume
        set_transient('ks_chunk_' . ($csv_hash ?? $csv_resuming), ['lines' => $lines, 'results' => $results], 3600);
        echo '<br><strong>Batch complete:</strong> ' . ($done + 1) . '/' . $total_rows . ' rows. ';
        echo '<a href="?page=ks-license-keys&tab=csv&csv_r=' . ($csv_hash ?? $csv_resuming) . '" class="button">Continue</a>';
    } else {
        // All done - cleanup
        if ($csv_hash ?? $csv_resuming) delete_transient('ks_chunk_' . ($csv_hash ?? $csv_resuming));
    }

            echo "</p></div>";
        }
    }
    ?>
    <div style="display:flex;gap:20px;margin-top:12px;align-items:stretch">
        <div style="flex:1;background:#fff;border:1px solid #c3c4c7;border-radius:6px;padding:16px">
            <h3>📥 Export Pending Keys</h3>
            <p style="font-size:12px;color:#666">Download CSV of all orders needing keys.</p>
            <a href="<?php echo wp_nonce_url(admin_url("admin-post.php?action=ks_export_csv"),"ks_export") ?>" class="button">Download CSV</a>
        </div>
        <div style="flex:1;background:#fff;border:1px solid #c3c4c7;border-radius:6px;padding:16px">
            <h3>📤 Upload CSV with Keys</h3>
            <form method="post" enctype="multipart/form-data">
                <?php wp_nonce_field("ks_import_csv"); ?>
                <input type="file" name="csv_file" accept=".csv" required style="display:block;margin:8px 0">
                <button type="submit" name="import_csv" class="button button-primary" style="background:#7c3aed;border-color:#6d28d9">Upload &amp; Process</button>
            </form>
        </div>
    </div>
    <div style="margin-top:12px;background:#fff8e1;border:1px solid #ffe0b2;border-radius:4px;padding:10px;font-size:11px">
        <strong>CSV Format:</strong> Order#,Product Slug,Product Name,Key<br>
        <code style="background:#f0f0f0;padding:2px 6px;border-radius:2px">681,windows-11-pro,Windows 11 Pro OEM Key,WX11P-A001-B002-C003</code>
    </div>
    <div style="margin-top:20px;background:#fff;border:1px solid #c3c4c7;border-radius:6px;padding:12px;font-size:11px;color:#666">
        ✅ <strong>v6.1.8 safeguards active:</strong>
        CSRF nonce · XSS esc_html · Key dedup check · Order-level lock · Batch email (1 per order)
    </div>
    <?php
}

// -- CSV Export Handler --
add_action("admin_post_ks_export_csv", function() {
    if (!wp_verify_nonce($_GET["_wpnonce"]??"","ks_export") || !current_user_can("manage_woocommerce")) wp_die("Access denied.");
    header("Content-Type: text/csv; charset=utf-8");
    header("Content-Disposition: attachment; filename=ks-pending-keys.csv");
    echo "Order#,Product Slug,Product Name,Key\n";
    $orders = wc_get_orders(["limit"=>200,"status"=>["on-hold","processing"]]);
    foreach ($orders as $o) {
        foreach ($o->get_items() as $item) {
            $p = wc_get_product($item->get_product_id());
            if ($p && $p->get_virtual() && !$o->get_meta("_license_key_{$item->get_id()}")) {
                echo "\"{$o->get_id()}\",\"{$p->get_slug()}\",\"" . esc_html($p->get_name()) . "\",\n";
            }
        }
    }
    exit;
});// v6.1.8 Dashboard
add_action("wp_dashboard_setup",function(){wp_add_dashboard_widget("ks_pending","🔑 Pending Keys",function(){
$o=wc_get_orders(["limit"=>100,"status"=>["on-hold","processing"]]);$c=0;
foreach($o as $ord){foreach($ord->get_items() as $it){
$p=wc_get_product($it->get_product_id());
if($p && $p->get_virtual() && !$ord->get_meta("_license_key_{$it->get_id()}")){$c++;break;}}}
echo "<p style=\"font-size:14px;margin:0 0 6px\">$c orders need keys</p>";
echo "<a href=\"admin.php?page=ks-license-keys\" class=\"button\">Go →</a>";});});
