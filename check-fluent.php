<?php
require_once "/var/www/keys-starter.com/wp-load.php";
$s = get_option("fluentmail-settings", []);
echo "Keys: " . implode(", ", array_keys($s)) . "\n";
if (isset($s["connections"])) {
    foreach ($s["connections"] as $i => $c) {
        echo "Connection $i:\n";
        foreach ($c as $k => $v) {
            $val = is_string($v) ? substr($v, 0, 30) . "..." : print_r($v, true);
            echo "  $k: $val\n";
        }
    }
}
if (isset($s["misc"])) {
    echo "Misc:\n";
    foreach ($s["misc"] as $k => $v) {
        echo "  $k: " . (is_string($v) ? $v : json_encode($v)) . "\n";
    }
}
