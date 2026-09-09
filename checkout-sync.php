<?php
// /checkout-sync.php - Sync SPA cart to WooCommerce, then redirect to checkout
// v5.15 - Multisite-safe: product resolved by slug in the CURRENT blog
// (wpdb->posts follows the switched blog); hardcoded id map = legacy fallback.
require_once dirname(__FILE__) . '/wp-load.php';

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

$items_json = isset($_GET["items"]) ? stripslashes($_GET["items"]) : "[]";
$items = json_decode($items_json, true);

if ($items && is_array($items) && function_exists("WC")) {
    WC()->cart->empty_cart();

    $slug_map = [
        "windows-11-pro" => 629, "windows-10-pro" => 630,
        "windows-11-home" => 631, "windows-10-home" => 632,
        "office-2019-pro-plus" => 633, "office-2021-pro-plus" => 634,
        "win-11-iot-2024-entry" => 637, "win-10-iot-2021-entry" => 643,
        "win-10-iot-2019-entry" => 646, "windows-11-pro-official" => 652,
        "windows-10-pro-official" => 653, "windows-11-home-official" => 654,
        "windows-10-home-official" => 655, "win-11-iot-2024-high-end" => 656,
        "win-11-iot-2024-value" => 657, "win-10-iot-2021-high-end" => 658,
        "win-10-iot-2021-value" => 659, "win-11-iot-ml-high-end" => 660,
        "win-11-iot-ml-value" => 661, "win-11-iot-ml-entry" => 662,
        "win-10-iot-2019-high-end" => 663, "win-10-iot-2019-value" => 664,
        "win-svr-iot-2025" => 665, "win-svr-iot-2022" => 666,
        "win-svr-iot-2019" => 667, "sql-svr-2019-runtime" => 668,
        "sql-svr-2022-runtime" => 669,
        "testms" => 1013,
    ];

    global $wpdb;
    foreach ($items as $item) {
        $slug = isset($item["slug"]) ? $item["slug"] : "";
        $qty = isset($item["qty"]) ? max(1, min(99, intval($item["qty"]))) : 1;
        $pid = (int) $wpdb->get_var($wpdb->prepare(
            "SELECT ID FROM {$wpdb->posts} WHERE post_name = %s AND post_type = 'product' AND post_status = 'publish' LIMIT 1",
            $slug
        ));
        if ($pid <= 0) {
            $pid = isset($slug_map[$slug]) ? (int) $slug_map[$slug] : 0;
        }
        if ($pid > 0) WC()->cart->add_to_cart($pid, $qty);
    }

    // CRITICAL: Set the WC session cookie so the browser sends it to /checkout/
    if (WC()->session) {
        WC()->session->set_customer_session_cookie(true);
        wc_setcookie("woocommerce_items_in_cart", "1");
        wc_setcookie("woocommerce_cart_hash", WC()->cart->get_cart_hash());
    }
}

header("Location: /checkout/");
exit;
