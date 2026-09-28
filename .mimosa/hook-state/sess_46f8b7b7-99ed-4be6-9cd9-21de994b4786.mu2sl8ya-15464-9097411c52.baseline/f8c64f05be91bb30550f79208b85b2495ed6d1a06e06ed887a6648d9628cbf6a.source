<?php
require "/var/www/keys-starter.com/wp-load.php";

// Reset test user password
$user = get_user_by("email", "testuser@keystarter.com");
if ($user) {
    wp_set_password("Test123!!!", $user->ID);
    echo "Password reset for: " . $user->user_email . "\n";
    
    // Verify auth works
    $auth = wp_authenticate("testuser@keystarter.com", "Test123!!!");
    if (is_wp_error($auth)) {
        echo "Auth FAILED: " . $auth->get_error_message() . "\n";
    } else {
        echo "Auth OK! User ID: " . $auth->ID . "\n";
        echo "Orders for this user:\n";
        $orders = wc_get_orders(["customer" => "testuser@keystarter.com", "limit" => 5]);
        foreach ($orders as $o) {
            echo "  #" . $o->get_id() . " | " . $o->get_status() . " | key_email: " . ($o->get_meta("_key_email_status") ?: "-") . "\n";
        }
    }
} else {
    echo "User NOT FOUND. Creating...\n";
    $uid = wp_create_user("testuser", "Test123!!!", "testuser@keystarter.com");
    if (!is_wp_error($uid)) {
        (new WP_User($uid))->set_role("customer");
        echo "User created: testuser@keystarter.com\n";
    } else {
        echo "Create FAILED: " . $uid->get_error_message() . "\n";
    }
}
