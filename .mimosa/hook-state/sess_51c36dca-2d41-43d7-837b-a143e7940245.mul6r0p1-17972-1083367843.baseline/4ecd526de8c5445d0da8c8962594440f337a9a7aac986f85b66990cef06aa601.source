<?php
require_once "/var/www/keys-starter.com/wp-load.php";

// Credentials are read from environment variables (never hardcode secrets in git).
$sandbox_client_id     = getenv("PPCP_SANDBOX_CLIENT_ID");
$sandbox_client_secret = getenv("PPCP_SANDBOX_CLIENT_SECRET");
if (!$sandbox_client_id || !$sandbox_client_secret) {
    fwrite(STDERR, "Missing env: PPCP_SANDBOX_CLIENT_ID / PPCP_SANDBOX_CLIENT_SECRET\n");
    exit(1);
}

// Enable PayPal Payments (PPCP) gateway
$settings = array(
    "enabled" => "yes",
    "title" => "PayPal",
    "description" => "Pay via PayPal; you can pay with your credit card if you don't have a PayPal account.",
    "testmode" => "yes",
    "sandbox_client_id" => $sandbox_client_id,
    "sandbox_client_secret" => $sandbox_client_secret,
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
