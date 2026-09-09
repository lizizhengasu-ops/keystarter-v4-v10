<?php
/**
 * Plugin Name: KeyStarter Test Data Hygiene
 * Description: Auto-mark test sessions and orders so dashboards and analytics can exclude them.
 */

if (!defined('ABSPATH')) {
    exit;
}

function ks_tdh_test_ips() {
    $defaults = array('140.235.143.73', '116.52.206.60', '116.52.206.77');
    $saved = get_option('ks_test_ips', '');
    if (is_string($saved) && trim($saved) !== '') {
        $list = array_values(array_filter(array_map('trim', explode(',', $saved))));
        if ($list) {
            return $list;
        }
    }
    return $defaults;
}

function ks_tdh_test_email_patterns() {
    return array(
        '%@test.example.com',
        '%@example.test',
        '%@personal.example.com',
        'prod.acdc.test@example.com',
    );
}

function ks_tdh_client_ip() {
    if (isset($_SERVER['HTTP_CF_CONNECTING_IP']) && $_SERVER['HTTP_CF_CONNECTING_IP'] !== '') {
        return (string) $_SERVER['HTTP_CF_CONNECTING_IP'];
    }
    return isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : '';
}

function ks_tdh_ip_is_test() {
    $ip = ks_tdh_client_ip();
    return $ip !== '' && in_array($ip, ks_tdh_test_ips(), true);
}

function ks_tdh_test_ends_with($haystack, $needle) {
    return $needle !== '' && substr($haystack, -strlen($needle)) === $needle;
}

function ks_tdh_order_is_test($order) {
    if (!$order instanceof WC_Order) {
        return false;
    }
    if ($order->get_meta('_ks_is_test') === 'yes') {
        return true;
    }
    if (isset($_COOKIE['ks_test']) && $_COOKIE['ks_test'] === '1') {
        return true;
    }
    if (isset($_REQUEST['ks_test']) && $_REQUEST['ks_test'] === '1') {
        return true;
    }
    if (ks_tdh_ip_is_test()) {
        return true;
    }
    $email = strtolower((string) $order->get_billing_email());
    foreach (ks_tdh_test_email_patterns() as $pattern) {
        $pattern = strtolower($pattern);
        if ($pattern === '') {
            continue;
        }
        if ($pattern[0] === '%') {
            if (ks_tdh_test_ends_with($email, substr($pattern, 1))) {
                return true;
            }
        } elseif ($email === $pattern) {
            return true;
        }
    }
    $name = strtolower($order->get_billing_first_name() . ' ' . $order->get_billing_last_name());
    foreach (array('test', 't206', 'e2e') as $keyword) {
        if (strpos($name, $keyword) !== false) {
            return true;
        }
    }
    $payment = strtolower((string) $order->get_payment_method_title());
    if (strpos($payment, 'sandbox') !== false || strpos($payment, 'test') !== false) {
        return true;
    }
    return (bool) apply_filters('ks_test_order_detected', false, $order);
}

function ks_tdh_mark_order_as_test($order) {
    if ($order instanceof WC_Order && ks_tdh_order_is_test($order)) {
        $order->update_meta_data('_ks_is_test', 'yes');
    }
}

add_action('init', function () {
    if (ks_tdh_ip_is_test() && !headers_sent()) {
        setcookie(
            'ks_test',
            '1',
            array(
                'expires' => time() + 30 * DAY_IN_SECONDS,
                'path' => '/',
                'secure' => is_ssl(),
                'httponly' => false,
                'samesite' => 'Lax',
            )
        );
    }
}, 1);

add_action('woocommerce_checkout_create_order', 'ks_tdh_mark_order_as_test', 10, 1);
add_action('woocommerce_store_api_checkout_update_order_meta', 'ks_tdh_mark_order_as_test', 10, 1);

add_filter('woocommerce_analytics_is_test_order', function ($is_test, $order) {
    if ($is_test) {
        return true;
    }
    return $order instanceof WC_Order && $order->get_meta('_ks_is_test') === 'yes';
}, 10, 2);
