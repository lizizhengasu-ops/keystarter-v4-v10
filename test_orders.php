<?php
require "/var/www/keys-starter.com/wp-load.php";
$orders = wc_get_orders(["limit" => 10]);
echo "Orders found: " . count($orders) . "\n";
foreach ($orders as $o) {
    echo "#" . $o->get_id() . " | " . $o->get_status() . " | " . $o->get_billing_email() . " | key_email: " . ($o->get_meta("_key_email_status") ?: "-") . "\n";
}
echo "--- Users ---\n";
$users = get_users(["number" => 5]);
foreach ($users as $u) {
    echo $u->user_email . " | " . implode(",", $u->roles) . "\n";
}
