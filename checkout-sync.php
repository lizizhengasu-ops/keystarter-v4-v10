<?php
// /checkout-sync.php - Sync SPA cart to WooCommerce, then redirect to checkout
require_once "/var/www/keys-starter.com/wp-load.php";

// Read cart items from query string
$items_json = isset($_GET["items"]) ? stripslashes($_GET["items"]) : "[]";
$items = json_decode($items_json, true);

if (!$items || !is_array($items)) {
    header("Location: /checkout/");
    exit;
}

// Clear existing WC cart
if (function_exists("WC")) {
    WC()->cart->empty_cart();
    
    // Slug to WC product ID mapping
    $slug_map = [
        "windows-11-pro" => 629, "windows-10-pro" => 630,
        "windows-11-home" => 631, "windows-10-home" => 632,
        "office-2019-pro-plus" => 633, "office-2021-pro-plus" => 634,
        "win-11-iot-2024-entry" => 637, "win-10-iot-2021-entry" => 643,
        "win-10-iot-2019-entry" => 646,
        "windows-11-pro-official" => 652, "windows-10-pro-official" => 653,
        "windows-11-home-official" => 654, "windows-10-home-official" => 655,
    ];
    
    foreach ($items as $item) {
        $pid = isset($slug_map[$item["slug"]]) ? $slug_map[$item["slug"]] : 0;
        $qty = isset($item["qty"]) ? max(1, min(99, intval($item["qty"]))) : 1;
        if ($pid > 0) {
            WC()->cart->add_to_cart($pid, $qty);
        }
    }
}

// Redirect to WP checkout
header("Location: /checkout/");
exit;
