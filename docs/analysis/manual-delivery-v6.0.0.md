全量方案指导文件 v6.0.0 - 手动 Key 交付 + 混合产品物流方案
=======================================================

三重结构分析
============

第一层：数据层分析
------------------

### 1. 当前产品数据状态

| 产品类型 | 示例 | Virtual | 实际交付方式 | 需要改 |
|---------|------|:-------:|-------------|:------:|
| OEM Key (邮箱发) | windows-11-pro, office-2019 | YES | 邮件发送 ✅ | 不修改 |
| IoT Entry (贴纸) | win-11-iot-2024-entry | YES | 贴纸+快递 | 改 Virtual=NO |
| IoT High/Value (贴纸) | win-11-iot-2024-high-end | YES | 贴纸+快递 | 改 Virtual=NO |
| Server/SQL (贴纸) | win-svr-iot-2025, sql-svr | YES | 贴纸+快递 | 改 Virtual=NO |
| IoT MultiLang (贴纸) | win-11-iot-ml-* | YES | 贴纸+快递 | 改 Virtual=NO |

### 2. Key 交付流程 (改后)

```
客户付款成功 (PayPal)
  → 订单状态: on-hold / processing
  → 管理员在 WP Admin -> WooCommerce -> Orders 看到新订单
  → 管理员点开订单
  -> 在 "License Key" 框里输入 Key
  -> 点 "Complete & Send Key"
  -> 订单状态改为 "completed"
  -> Brevo 发送邮件给客户，包含订单信息和 Key
```

对比现在的 Key 池方案：
- 改前: Key 预录入池 → 付款后自动分配 → 发邮件
- 改后: 付款后 → 管理员手动填 Key → 填完发邮件 ✅ (合作伙伴要求)

### 3. 混合产品处理

单个订单可以同时包含：
- 虚拟产品 (OEM Key, 邮件发送)
- 实体产品 (IoT 贴纸, 快递发送)

WooCommerce 原生支持：
- 虚拟产品 → 不要求填地址
- 实体产品 → 要求填地址 + 运费
- 同一个购物车 → 自动混合处理


第二层：展示层分析
------------------

### 1. 新增: 管理员订单 Key 输入框

位置: WP Admin → WooCommerce → 编辑订单 → 右侧 "License Key" Metabox

```
┌─────────────────────┐
│ License Key         │
│                     │
│ [________________]  │  ← 文本输入框
│                     │
│ [Complete & Send]   │  ← 按钮: 保存 Key + 完成订单 + 发送邮件
│                     │
│ Status: Pending     │  ← 当前状态提示
└─────────────────────┘
```

### 2. 客户收到的邮件

标题: "Your License Key for Order #678"
内容:
- 订单号
- 商品名
- License Key (管理员填的那个)
- 下载/激活指引


第三层：基础设施层分析
----------------------

### 1. 代码位置

所有改动集中在已有的 `keystarter-email-api.php` 插件中，
不需要新建插件或修改其他文件。

### 2. 代码预写

===== 添加到 keystarter-email-api.php (在文件末尾) =====

// === [新增] 管理员订单 Key 输入框 ===
add_action("add_meta_boxes", function() {
    add_meta_box(
        "ks_license_key",
        "License Key",
        function($post) {
            $order = wc_get_order($post->ID);
            if (!$order) return;
            $key = $order->get_meta("_license_key");
            $status = $order->get_status();
            wp_nonce_field("ks_save_key", "ks_key_nonce");
            echo "<p style='margin-bottom:8px;color:#666;font-size:12px'>Enter the license key for this order:</p>";
            echo "<input type='text' name='ks_license_key' value='" . esc_attr($key) . "' 
                   style='width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;margin-bottom:8px' 
                   placeholder='XXXXX-XXXXX-XXXXX-XXXXX'>";
            echo "<p style='font-size:11px;color:#999'>Current status: <strong>$status</strong></p>";
            echo "<label style='font-size:12px'>";
            echo "<input type='checkbox' name='ks_complete_order' value='1' checked> ";
            echo "Mark order as completed and send email with key";
            echo "</label>";
        },
        "shop_order",
        "side",
        "default"
    );
});

// === [新增] 保存 Key 并发送邮件 ===
add_action("save_post_shop_order", function($post_id) {
    if (!isset($_POST["ks_key_nonce"]) || !wp_verify_nonce($_POST["ks_key_nonce"], "ks_save_key")) return;
    if (defined("DOING_AUTOSAVE") && DOING_AUTOSAVE) return;

    $order = wc_get_order($post_id);
    if (!$order) return;

    // Save the license key
    if (isset($_POST["ks_license_key"])) {
        $key = sanitize_text_field($_POST["ks_license_key"]);
        $order->update_meta_data("_license_key", $key);
        $order->save();
    }

    // If "complete order" is checked and key is provided
    if (!empty($_POST["ks_complete_order"]) && !empty($_POST["ks_license_key"])) {
        $key = sanitize_text_field($_POST["ks_license_key"]);
        $order->set_status("completed");
        $order->save();

        // Send email with key
        $to = $order->get_billing_email();
        $items = "";
        foreach ($order->get_items() as $item) {
            $items .= "<li>" . $item->get_name() . " x" . $item->get_quantity() . "</li>";
        }
        $subject = "Your License Key for Order #" . $order->get_id();
        $message = "<h2>Thank you for your order!</h2>
            <p>Your license key for order #" . $order->get_id() . " is ready:</p>
            <div style='background:#f5f5f7;padding:16px;border-radius:8px;text-align:center;font-size:18px;
                 font-weight:bold;letter-spacing:2px;margin:16px 0'>" . $key . "</div>
            <p><strong>Order items:</strong></p>
            <ul>" . $items . "</ul>
            <p style='color:#666;font-size:12px;margin-top:16px'>
                Follow the activation instructions included with your product.
                For support: admin@keystarter.com</p>";

        // Use the existing email API or wp_mail
        if (class_exists("SendinblueApiClient")) {
            try {
                $client = new SendinblueApiClient();
                $data = [
                    "sender" => ["email" => "noreply@keys-starter.com", "name" => "KeyStarter"],
                    "to" => [["email" => $to]],
                    "subject" => $subject,
                    "htmlContent" => $message
                ];
                $client->sendEmail($data);
            } catch (Exception $e) {
                wp_mail($to, $subject, $message, [
                    "Content-Type: text/html; charset=UTF-8",
                    "From: KeyStarter <noreply@keys-starter.com>"
                ]);
            }
        } else {
            wp_mail($to, $subject, $message, [
                "Content-Type: text/html; charset=UTF-8",
                "From: KeyStarter <noreply@keys-starter.com>"
            ]);
        }
    }
}, 10, 1);


### 3. 潜在问题分析

| 问题 | 影响 | 缓解措施 |
|------|------|---------|
| 管理员点了 Complete 但没填 Key | 订单完成但没有 Key 邮件 | 按钮文案提示 + 前端校验 |
| 邮件发失败 | 客户没收到 Key | 后台日志记录失败，管理员可重发 |
| 多次点击 Complete | 重复发送 | 检查 Key 是否已发送过 |
| 产品 Virtual 状态更改 | 旧订单地址格式变 | 只改产品属性，不影响已有订单 |

### 4. 执行步骤

Step 1: 更新 keystarter-email-api.php
  - 追加 metabox + save handler 代码

Step 2: 修改产品 Virtual 设置
  - IoT Server/SQL 产品: Virtual = NO
  - OEM 产品: Virtual = YES (不变)

Step 3: 配置 WooCommerce 运费
  - 添加运费方式（如 Flat Rate）
  - 设置免费发货（贴纸快递费另算）

Step 4: 清空假 Key 池
  - delete_option("keystarter_key_pool")

Step 5: 测试
  - 下测试订单 -> 管理员填 Key -> 完成 -> 收邮件
