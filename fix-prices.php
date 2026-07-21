<?php
require_once "/var/www/keys-starter.com/wp-load.php";
$posts = get_posts(["name" => "win-11-iot-2024-high-end", "post_type" => "product", "post_status" => "any"]);
if (!empty($posts)) {
  $p = wc_get_product($posts[0]->ID);
  $p->set_regular_price("160");
  $p->set_price("160");
  $p->save();
  echo "Fixed: win-11-iot-2024-high-end = $160
";
}
$posts = get_posts(["name" => "win-11-iot-2024-value", "post_type" => "product", "post_status" => "any"]);
if (!empty($posts)) {
  $p = wc_get_product($posts[0]->ID);
  $p->set_regular_price("85");
  $p->set_price("85");
  $p->save();
  echo "Fixed: win-11-iot-2024-value = $85
";
}
$posts = get_posts(["name" => "win-10-iot-2021-high-end", "post_type" => "product", "post_status" => "any"]);
if (!empty($posts)) {
  $p = wc_get_product($posts[0]->ID);
  $p->set_regular_price("160");
  $p->set_price("160");
  $p->save();
  echo "Fixed: win-10-iot-2021-high-end = $160
";
}
$posts = get_posts(["name" => "win-10-iot-2021-value", "post_type" => "product", "post_status" => "any"]);
if (!empty($posts)) {
  $p = wc_get_product($posts[0]->ID);
  $p->set_regular_price("85");
  $p->set_price("85");
  $p->save();
  echo "Fixed: win-10-iot-2021-value = $85
";
}
$posts = get_posts(["name" => "win-11-iot-ml-high-end", "post_type" => "product", "post_status" => "any"]);
if (!empty($posts)) {
  $p = wc_get_product($posts[0]->ID);
  $p->set_regular_price("160");
  $p->set_price("160");
  $p->save();
  echo "Fixed: win-11-iot-ml-high-end = $160
";
}
$posts = get_posts(["name" => "win-11-iot-ml-value", "post_type" => "product", "post_status" => "any"]);
if (!empty($posts)) {
  $p = wc_get_product($posts[0]->ID);
  $p->set_regular_price("85");
  $p->set_price("85");
  $p->save();
  echo "Fixed: win-11-iot-ml-value = $85
";
}
$posts = get_posts(["name" => "win-11-iot-ml-entry", "post_type" => "product", "post_status" => "any"]);
if (!empty($posts)) {
  $p = wc_get_product($posts[0]->ID);
  $p->set_regular_price("45");
  $p->set_price("45");
  $p->save();
  echo "Fixed: win-11-iot-ml-entry = $45
";
}
$posts = get_posts(["name" => "win-10-iot-2019-high-end", "post_type" => "product", "post_status" => "any"]);
if (!empty($posts)) {
  $p = wc_get_product($posts[0]->ID);
  $p->set_regular_price("160");
  $p->set_price("160");
  $p->save();
  echo "Fixed: win-10-iot-2019-high-end = $160
";
}
$posts = get_posts(["name" => "win-10-iot-2019-value", "post_type" => "product", "post_status" => "any"]);
if (!empty($posts)) {
  $p = wc_get_product($posts[0]->ID);
  $p->set_regular_price("85");
  $p->set_price("85");
  $p->save();
  echo "Fixed: win-10-iot-2019-value = $85
";
}
$posts = get_posts(["name" => "win-svr-iot-2025", "post_type" => "product", "post_status" => "any"]);
if (!empty($posts)) {
  $p = wc_get_product($posts[0]->ID);
  $p->set_regular_price("944");
  $p->set_price("944");
  $p->save();
  echo "Fixed: win-svr-iot-2025 = $944
";
}
$posts = get_posts(["name" => "win-svr-iot-2022", "post_type" => "product", "post_status" => "any"]);
if (!empty($posts)) {
  $p = wc_get_product($posts[0]->ID);
  $p->set_regular_price("850");
  $p->set_price("850");
  $p->save();
  echo "Fixed: win-svr-iot-2022 = $850
";
}
$posts = get_posts(["name" => "win-svr-iot-2019", "post_type" => "product", "post_status" => "any"]);
if (!empty($posts)) {
  $p = wc_get_product($posts[0]->ID);
  $p->set_regular_price("789");
  $p->set_price("789");
  $p->save();
  echo "Fixed: win-svr-iot-2019 = $789
";
}
$posts = get_posts(["name" => "sql-svr-2019-runtime", "post_type" => "product", "post_status" => "any"]);
if (!empty($posts)) {
  $p = wc_get_product($posts[0]->ID);
  $p->set_regular_price("189");
  $p->set_price("189");
  $p->save();
  echo "Fixed: sql-svr-2019-runtime = $189
";
}
$posts = get_posts(["name" => "sql-svr-2022-runtime", "post_type" => "product", "post_status" => "any"]);
if (!empty($posts)) {
  $p = wc_get_product($posts[0]->ID);
  $p->set_regular_price("229");
  $p->set_price("229");
  $p->save();
  echo "Fixed: sql-svr-2022-runtime = $229
";
}
echo "ALL 14 FIXED
";