# Manual Key Delivery + Mixed Product Shipping v6.0.1
## 全量详细执行方案

---

# 第一部分：三重结构分析

## 第一层：数据层分析

### 1.1 当前数据结构

#### 产品表 (wp_posts + wp_postmeta)

| 列 | 当前值 | 说明 |
|----|--------|------|
| post_type | 'product' | WooCommerce 产品 |
| _virtual | 'yes' (全部27个产品) | 全部为虚拟产品，不需要物流 |
| _downloadable | 'no' (全部27个产品) | 无下载文件 |

#### Key 池 (wp_options, 'keystarter_key_pool')

序列化数组: { slug => [key1, key2, ...] }
当前内容：9 个假 Key（M365-PERS-AAAA-BBBB-CCCC 等）

#### 现有插件 (keystarter-email-api.php)

文件路径: /var/www/keys-starter.com/wp-content/plugins/keystarter-email-api/keystarter-email-api.php
当前功能:
- POST /keystarter/v1/send-email - 发邮件 (Brevo API)
- POST /keystarter/v1/assign-keys/{id} - 从池分配 Key
- POST /keystarter/v1/checkout - 自定义结算
- 其他: nonce, key-pool, reviews, cart-sync

### 1.2 目标数据流

#### Key 交付流程 (新增)

`
客户在网站下单 -> PayPal 付款 -> Webhook 确认
  -> 订单状态: on-hold / processing
  -> 管理员登录 WP Admin
  -> WooCommerce -> Orders -> 点开订单
  -> 右侧 "License Key" Metabox
  -> 管理员输入 Key
  -> 勾选 "Complete Order & Send Email"
  -> 点击 Update
  -> save_post_shop_order 钩子触发
  -> (1) 保存 Key 到 order meta (_license_key)
  -> (2) 订单状态改为 completed
  -> (3) 调用 Brevo API 发送邮件
  -> 客户收到邮件，包含 License Key
`

#### 产品物流 (修改)

`
OEM 产品 (Windows, Office):
  Virtual = YES -> 客户不填地址, 不计算运费

IoT / Server / SQL 产品:
  Virtual = NO -> 客户需填地址, 计算运费
  -> 管理员收到订单后安排贴纸快递
`

### 1.3 混合订单处理

`
购物车同时包含:
  Windows 11 Pro (Virtual=YES, 不填地址)
  Win Svr IoT 2025 (Virtual=NO, 需填地址)

结算页:
  -> 显示地址填写框 (因为包含实体产品)
  -> 自动计算运费 (按实体产品)
  -> 只有实体产品进入物流流程
`

---

## 第二层：展示层分析

### 2.1 管理员 Metabox 界面

位置: WP Admin -> WooCommerce -> 编辑订单 -> 页面右侧

\\\
+-- 订单编辑页面 (shop_order) -------------------+
|                                                  |
|  左侧: 订单商品详情                  右侧 Metabox |
|  客户信息                                +------+ |
|  订单 Notes                            |License Key| |
|                                        |          | |
|                                        | [输入框] | |
|                                        |          | |
|                                        | [Complete & Send] |
|                                        +------+ |
+--------------------------------------------------+
\\\

### 2.2 客户邮件模板

主题: "Your License Key for Order #678"
格式: HTML
内容:
- 品牌 Header
- 订单号
- 产品列表
- License Key (突出显示)
- 激活说明
- 联系信息

---

## 第三层：基础设施层分析

### 3.1 代码位置

所有改动集中在 1 个文件:
  /var/www/keys-starter.com/wp-content/plugins/keystarter-email-api/keystarter-email-api.php

不修改:
- 前端 (React SPA) - 无变化
- checkout-sync.php - 不变
- cart-sync.php - 不变
- Nginx 配置 - 不变
- CSP 头部 - 不变

### 3.2 技术选型

| 工具 | 用途 | 理由 |
|------|------|------|
| add_meta_box() | 添加 Key 输入框 | WooCommerce 标准方式 |
| save_post_shop_order | 保存 Key | 订单保存时触发 |
| SendinblueApiClient | 发送 Key 邮件 | 已有 + Brevo 已配好 |
| wc_get_product() | 修改 Virtual 标志 | WooCommerce 原生 API |

---

# 第二部分：预写代码

## 代码段 1: keystarter-email-api.php 追加内容

### 嵌入位置

追加到文件末尾, 在最后一个 add_action 之后。
保持独立的 add_action 调用, 不修改现有代码。

### 代码 (50 行)

\\\php
// =============================================
// v6.0.0 - Admin License Key Metabox + Email
// =============================================
// 在订单编辑页右侧添加 License Key 输入框
add_action("add_meta_boxes", function () {
    add_meta_box(
        "ks_license_key",
        "License Key",
        function () {
             = wc_get_order(->ID);
            if (!) {
                echo "<p>Order not found.</p>";
                return;
            }
                = ->get_meta("_license_key");
             = ->get_status();
            wp_nonce_field("ks_save_key", "ks_key_nonce");
            ?>
            <p style="margin:0 0 8px;color:#666;font-size:12px">
                Enter the license key for this order:
            </p>
            <input type="text" name="ks_license_key"
                   value="<?php echo esc_attr(); ?>"
                   style="width:100%;padding:8px;border:1px solid #d0d0d0;
                          border-radius:4px;margin:0 0 8px;box-sizing:border-box"
                   placeholder="XXXXX-XXXXX-XXXXX-XXXXX">
            <p style="margin:0 0 8px;font-size:11px;color:#999">
                Current status: <strong><?php echo esc_html(); ?></strong>
            </p>
            <label style="font-size:12px;display:flex;align-items:center;gap:4px">
                <input type="checkbox" name="ks_complete" value="1" checked>
                Complete order &amp; send email with key
            </label>
            <?php
        },
        "shop_order",
        "side",
        "default"
    );
});

// 保存 Key + 完成订单 + 发邮件
add_action("save_post_shop_order", function () {
    // 权限验证
    if (!isset(["ks_key_nonce"])
        || !wp_verify_nonce(["ks_key_nonce"], "ks_save_key")
    ) {
        return;
    }
    if (defined("DOING_AUTOSAVE") && DOING_AUTOSAVE) {
        return;
    }

     = wc_get_order();
    if (!) {
        return;
    }

    // 1. 保存 Key
     = isset(["ks_license_key"])
        ? sanitize_text_field(["ks_license_key"])
        : "";
    ->update_meta_data("_license_key", );
    ->save();

    // 2. 如果勾选了完成订单
    if (!empty(["ks_complete"]) &&  !== "") {
        ->set_status("completed");
        ->save();

        // 3. 发送 Key 邮件
            = ->get_billing_email();
          = ->get_billing_first_name();
         = "";
        foreach (->get_items() as ) {
             .= "<li>"
                   . esc_html(->get_name())
                   . " x" . intval(->get_quantity())
                   . "</li>";
        }

         = "Your License Key for Order #" . ->get_id();
         = "<div style='max-width:560px;margin:0 auto;
                     font-family:Arial,sans-serif'>
            <div style='background:#7c3aed;color:#fff;padding:24px;text-align:center;
                         border-radius:8px 8px 0 0'>
                <h1 style='margin:0;font-size:20px'>License Key Delivered</h1>
            </div>
            <div style='background:#fff;padding:32px;border:1px solid #e8e8ed;
                         border-top:0'>
                <p>Hi " . esc_html() . ",</p>
                <p>Your license key for order #" . ->get_id() . " is ready:</p>
                <div style='background:#f5f5f7;padding:16px;border-radius:8px;
                             text-align:center;font-size:18px;font-weight:bold;
                             letter-spacing:2px;margin:16px 0;
                             font-family:monospace'>
                    " . esc_html() . "
                </div>
                <p><strong>Order items:</strong></p>
                <ul>" .  . "</ul>
                <p style='color:#666;font-size:12px;margin-top:16px'>
                    Follow the activation instructions included with your product.
                    For support: admin@keystarter.com
                </p>
            </div>
        </div>";

        // 通过 Brevo API 发送
        if (class_exists("SendinblueApiClient")) {
            try {
                 = new SendinblueApiClient();
                   = [
                    "sender" => [
                        "email" => "noreply@keys-starter.com",
                        "name"  => "KeyStarter",
                    ],
                    "to" => [["email" => ]],
                    "subject"     => ,
                    "htmlContent" => ,
                ];
                ->sendEmail();
            } catch (Exception ) {
                // Brevo 失败 -> fallback 到 wp_mail
                wp_mail(, , , [
                    "Content-Type: text/html; charset=UTF-8",
                    "From: KeyStarter <noreply@keys-starter.com>",
                ]);
            }
        } else {
            wp_mail(, , , [
                "Content-Type: text/html; charset=UTF-8",
                "From: KeyStarter <noreply@keys-starter.com>",
            ]);
        }
    }
}, 10, 1);
\\\

---

## 代码段 2: 修改产品 Virtual 标志

### 修改范围

14 个 IoT / Server / SQL 产品改为 Virtual = NO
13 个 Windows / Office 产品保持 Virtual = YES (不变)

### 执行方式

通过 PHP 脚本用 wc_get_product() + set_virtual() 批量修改

\\\php
// 需要改为 Virtual=NO 的产品 slug
 = [
    "win-11-iot-2024-high-end",
    "win-11-iot-2024-value",
    "win-10-iot-2021-high-end",
    "win-10-iot-2021-value",
    "win-11-iot-ml-high-end",
    "win-11-iot-ml-value",
    "win-11-iot-ml-entry",
    "win-10-iot-2019-high-end",
    "win-10-iot-2019-value",
    "win-svr-iot-2025",
    "win-svr-iot-2022",
    "win-svr-iot-2019",
    "sql-svr-2019-runtime",
    "sql-svr-2022-runtime",
];

foreach ( as ) {
     = url_to_postid() or ->get_var(...);
     = wc_get_product();
    ->set_virtual(false);
    ->save();
}
\\\

---

# 第三部分：潜在问题分析

| 问题 | 概率 | 影响 | 缓解措施 |
|------|:----:|:----:|----------|
| Metabox 在旧订单上显示 | 高 | 无影响 | 旧订单没 Key 就不显示 |
| 管理员忘了填 Key 就完成 | 中 | 订单完成但没 Key 邮件 | 前端 JS 提示, 后端 check |
| 重复点击 Complete | 低 | 重复发邮件 | 加 anti-duplicate check |
| Brevo API 调用失败 | 低 | 邮件发不出 | fallback 到 wp_mail() |
| 产品 Virtual 改后影响旧订单 | 无 | 无影响 | Virtual 是产品属性, 订单快照独立 |
| 混合订单运费计算 | 低 | 可能算错 | WooCommerce 原生支持, 需测试 |

---

# 第四部分：Preflight 检查清单

| 检查项 | 状态 |
|--------|:----:|
| 文件权限: keystarter-email-api.php 可写 | ❌ 待检查 |
| SendinblueApiClient 类存在 | ✅ 存在 |
| Brevo API Key 有效 | ✅ xkeysib-bf65... |
| WooCommerce 5 种邮件已启用 | ✅ 都已开 |
| 产品 slug 与 WC ID 映射完整 | ✅ 27 个全部对齐 |
| keystarter-email-api.php 有 .bak 备份 | ✅ 已有 |
| checkout-sync.php slug_map 完整 | ✅ 27 个 |

---

# 第五部分：执行步骤

## Step 1: 备份 keystarter-email-api.php

命令: cp 文件到 .bak.v6.0.0

## Step 2: 追加代码到 keystarter-email-api.php

用 PHP 文件方式追加 (避免 SSH 引号问题)

## Step 3: 修改 14 个产品 Virtual = NO

用 PHP 脚本批量修改

## Step 4: 清空假 Key 池 (可选)

delete_option("keystarter_key_pool")

## Step 5: 配置 WooCommerce 运费 (可选)

WooCommerce -> 设置 -> 配送 -> Flat Rate

## Step 6: 测试

1. 后台打开订单 #678
2. 填入 Key "TEST-KEY-12345"
3. 勾选 Complete
4. 点击 Update
5. 检查订单状态 -> completed
6. 检查 QQ 邮箱 -> 收到 Key 邮件
