# Account Page Solution — v6.1.30 Final

## Triple Structure Analysis

### 1. Data Layer
- Login: POST to /wp-login.php (WordPress native auth)
  - Fields: log (email), pwd (password), rememberme, redirect_to, testcookie
  - On success: redirect to /account
  - On failure: show WordPress error page
- Register: POST to /wp-login.php?action=register
  - Fields: user_login (auto-filled from email), user_email, redirect_to
  - Password emailed by WordPress
- Auth Check: GET /wp-json/keystarter/v1/nonce with credentials same-origin
- Orders: GET /wp-json/keystarter/v1/customer-orders (auth required)
  - Returns: order ID, date, status, total, items (name, qty, virtual), key_email_status
- Key Status: _key_email_status meta on WooCommerce orders
  - Values: pending, sent, failed (set by ksc() in plugin)

### 2. Component Layer (Account.tsx)
- States: loggedIn (null/true/false), orders[], loadingOrders, orderError
- Effects: nonce check on mount, order fetch when logged in
- Views: loading, logged-in (orders), not-logged-in (forms)
- Login form: form method=POST action=/wp-login.php
- Register form: form method=POST action=/wp-login.php?action=register
  - registerSubmit handler copies email to user_login before submit

### 3. Presentation Layer
- Purple brand color (#7c3aed)
- Smooth tab switch between login/register
- Forgot password link
- Key status: Sent green, Failed red, Pending yellow, Physical icon
- Order loading/error states
- Empty state: No orders found

## Version History
| Version | Changes |
|---------|---------|
| v6.1.26 | Login form: real form POST to /wp-login.php + redirect_to |
| v6.1.27 | Added Lost your password link, register UX |
| v6.1.28 | Removed static inputs from register form |
| v6.1.29 | Register form: form POST to WordPress |
| v6.1.30 | Final audit + documentation |

## Industry Pattern Research
WordPress SPA Login Industry Standard:
The POST-to-wp-login approach (not AJAX) is the recommended WordPress pattern.
- Native: Uses WordPress built-in authentication and session cookies
- Secure: No custom auth tokens, no JWT, no exposed API keys
- Simple: Single form tag, no JavaScript state management needed
- Compatible: Works with all WordPress plugins (Wordfence, Two-Factor)
- Used by: WooCommerce, BuddyPress, LearnDash, and most WP SPA themes

## User Flow
/account -> nonce check -> not logged in -> show forms
  Login tab: fill email + password -> POST /wp-login.php
    WP validates -> success: redirect /account (cookie set)
    WP validates -> fail: show WP error on login page
  Register tab: fill email -> POST /wp-login.php?action=register
    WP creates account, emails password
    redirect /wp-login.php?checkemail=registered
  Forgot password: link to /wp-login.php?action=lostpassword
