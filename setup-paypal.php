<?php
require_once "/var/www/keys-starter.com/wp-load.php";

$settings = array(
    "enabled" => "yes",
    "title" => "PayPal",
    "email" => "admin@keys-starter.com",
    "testmode" => "yes",
    "paymentaction" => "sale",
    "api_username" => "ARTOz_3Y7RDMVDUgoy4DHky4D5Gb5ocnFCBpUnrtj3HxKu1JRpxCv4kiDW_hFG1U_vU90xZM3FYVP1YP",
    "api_password" => "ECgKJatQykqH8Kc7PVJEqdOh1FE3mUZN4dICRM77hmXI9Boiwu4xS4wBAfm7D6tVrLJb83GfJueXJXEA",
    "api_signature" => "",
    "invoice_prefix" => "WC-",
    "send_shipping" => "yes",
);

update_option("woocommerce_paypal_settings", $settings);
echo "PayPal settings updated: enabled=" . ($settings["enabled"]) . ", testmode=" . ($settings["testmode"]) . "\n";
