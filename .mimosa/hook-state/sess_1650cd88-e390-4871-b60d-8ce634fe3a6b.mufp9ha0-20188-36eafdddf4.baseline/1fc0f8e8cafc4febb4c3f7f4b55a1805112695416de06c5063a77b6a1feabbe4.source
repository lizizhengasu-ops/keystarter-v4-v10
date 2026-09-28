<?php
/**
 * Plugin Name: KeyStarter Reviews API v1
 * Description: REST endpoints for product reviews: GET list (approved) and POST submit (moderation queue). Unique prefix ks_rvw_ / namespace keystarter/v1/product-reviews.
 * Version: 1.0.0
 *
 * Verified-badge rule: order number must match a paid order containing the
 * reviewed product. Without it the review is accepted but unverified.
 * Payment flow: 100% untouched.
 */

if (!defined('ABSPATH')) exit;

class KS_Rewviews_Api {

    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('keystarter/v1', '/product-reviews/(?P<product_id>\d+)', [
            [
                'methods' => 'GET',
                'callback' => [$this, 'list_reviews'],
                'permission_callback' => '__return_true',
                'args' => ['product_id' => ['validate_callback' => function($v) { return ctype_digit((string)$v); }]],
            ],
            [
                'methods' => 'POST',
                'callback' => [$this, 'submit_review'],
                'permission_callback' => '__return_true',
            ],
        ]);
    }

    private function product_exists($pid) {
        return get_post_meta($pid, '_price') !== [] || get_post($pid) !== null;
    }

    public function list_reviews($req) {
        $pid = (int) $req['product_id'];
        $comments = get_comments([
            'post_id' => $pid,
            'status' => 'approve',
            'type' => 'review',
            'number' => 50,
        ]);
        $out = [];
        foreach ($comments as $c) {
            $out[] = [
                'id' => (int) $c->comment_ID,
                'author' => $c->comment_author,
                'text' => $c->comment_content,
                'rating' => (int) get_comment_meta($c->comment_ID, 'rating', true),
                'verified' => (bool) get_comment_meta($c->comment_ID, 'ks_verified', true),
                'date' => $c->comment_date,
            ];
        }
        return rest_ensure_response($out);
    }

    public function submit_review($req) {
        $pid = (int) $req['product_id'];
        if (!$pid || get_post_type($pid) !== 'product') {
            return new WP_Error('ks_rvw_product', 'Unknown product', ['status' => 404]);
        }
        $rating = max(1, min(5, (int) ($req->get_param('rating') ?: 0)));
        $name = sanitize_text_field((string) $req->get_param('name'));
        $text = sanitize_textarea_field((string) $req->get_param('text'));
        $order_no = sanitize_text_field((string) $req->get_param('order_number'));
        if ($name === '' || $text === '' || $rating < 1) {
            return new WP_Error('ks_rvw_fields', 'name, rating and text are required', ['status' => 400]);
        }
        if (mb_strlen($text) < 10) {
            return new WP_Error('ks_rvw_short', 'Review is too short', ['status' => 400]);
        }
        // Light flood control: 1 review per IP per 10 minutes.
        $ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
        $lock = 'ks_rvw_ip_' . md5($ip);
        if (get_transient($lock)) {
            return new WP_Error('ks_rvw_wait', 'Please wait before submitting again', ['status' => 429]);
        }
        set_transient($lock, 1, 10 * MINUTE_IN_SECONDS);

        $email = '';
        $verified = 0;
        $order_no_clean = preg_replace('/[^0-9]/', '', $order_no);
        if ($order_no_clean !== '') {
            $order = wc_get_order((int) $order_no_clean);
            if ($order && in_array($order->get_status(), ['completed', 'processing'], true)
                && $order->get_billing_email() !== '') {
                $email = $order->get_billing_email();
                foreach ($order->get_items() as $item) {
                    if ((int) $item->get_product_id() === $pid) { $verified = 1; break; }
                }
            }
        }

        $cid = wp_insert_comment([
            'comment_post_ID' => $pid,
            'comment_author' => $name,
            'comment_author_email' => $email,
            'comment_content' => $text,
            'comment_type' => 'review',
            'comment_approved' => 0, // moderation queue
        ]);
        if (!$cid) {
            return new WP_Error('ks_rvw_fail', 'Could not save review', ['status' => 500]);
        }
        update_comment_meta($cid, 'rating', $rating);
        if ($verified) update_comment_meta($cid, 'ks_verified', 1);
        return rest_ensure_response(['ok' => true, 'moderation' => true]);
    }
}

new KS_Rewviews_Api();
