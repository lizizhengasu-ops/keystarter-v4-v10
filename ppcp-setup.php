<?php
require_once "/var/www/keys-starter.com/wp-load.php";

// Enable PayPal Payments (PPCP) gateway
$settings = array(
    "enabled" => "yes",
    "title" => "PayPal",
    "description" => "Pay via PayPal; you can pay with your credit card if you don't have a PayPal account.",
    "testmode" => "yes",
    "sandbox_client_id" => "ARTOz_3Y7RDMVDUgoy4DHky4D5Gb5ocnFCBpUnrtj3HxKu1JRpxCv4kiDW_hFG1U_vU90xZM3FYVP1YP",
    "sandbox_client_secret" => "ECgKJatQykqH8Kc7PVJEqdOh1FE3mUZN4dICRM77hmXI9Boiwu4xS4wBAfm7D6tVrLJb83GfJueXJXEA",
    "client_id" => "",
    "client_secret" => "",
    "invoice_prefix" => "WC-",
);

$result = update_option("woocommerce_ppcp-gateway_settings", $settings);
echo "PPCP settings updated: " . ($result ? "OK" : "FAIL") . "\n";
echo "enabled: " . $settings["enabled"] . ", testmode: " . $settings["testmode"] . "\n";

// Also make sure the basic PayPal is enabled as fallback
$basic = get_option("woocommerce_paypal_settings", array());
$basic["enabled"] = "yes";
$basic["_should_load"] = "yes";
update_option("woocommerce_paypal_settings", $basic);
echo "Basic PayPal enabled: yes\n";

// Flush WooCommerce payment gateways cache
if (function_exists("WC")) {
    WC()->payment_gateways()->init();
    echo "Payment gateways re-initialized\n";
}
