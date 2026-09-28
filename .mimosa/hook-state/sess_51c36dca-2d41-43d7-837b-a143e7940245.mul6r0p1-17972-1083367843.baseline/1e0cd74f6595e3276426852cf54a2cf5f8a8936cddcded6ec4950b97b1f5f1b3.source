<?php
require_once "/var/www/keys-starter.com/wp-load.php";

// Credentials are read from environment variables (never hardcode secrets in git).
$api_username = getenv("PAYPAL_API_USERNAME");
$api_password = getenv("PAYPAL_API_PASSWORD");
if (!$api_username || !$api_password) {
    fwrite(STDERR, "Missing env: PAYPAL_API_USERNAME / PAYPAL_API_PASSWORD\n");
    exit(1);
}

$settings = array(
    "enabled" => "yes",
    "title" => "PayPal",
    "email" => "admin@keys-starter.com",
    "testmode" => "yes",
    "paymentaction" => "sale",
    "api_username" => $api_username,
    "api_password" => $api_password,
    "api_signature" => "",
    "invoice_prefix" => "WC-",
    "send_shipping" => "yes",
);

update_option("woocommerce_paypal_settings", $settings);
echo "PayPal settings updated: enabled=" . ($settings["enabled"]) . ", testmode=" . ($settings["testmode"]) . "\n";
