<?php
// /cart-sync.php - Sync items to WooCommerce cart (JSON API, no redirect)
require_once dirname(__FILE__) . '/wp-load.php';
header("Content-Type: application/json; charset=utf-8");

$input = json_decode(file_get_contents("php://input"), true);
$items = $input["items"] ?? [];

if (!function_exists("WC")) {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "WC not available"]);
    exit;
}

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
];

foreach ($items as $item) {
    $slug = is_array($item) ? ($item["slug"] ?? "") : ($item->slug ?? "");
    $qty = max(1, min(99, intval(is_array($item) ? ($item["qty"] ?? 1) : ($item->qty ?? 1))));
    $pid = $slug_map[$slug] ?? 0;
    if ($pid > 0) WC()->cart->add_to_cart($pid, $qty);
}

echo json_encode(["ok" => true, "count" => WC()->cart->get_cart_contents_count()]);
