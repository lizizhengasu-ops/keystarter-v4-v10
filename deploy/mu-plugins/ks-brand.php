<?php
add_action('wp_enqueue_scripts', function() {
  echo '<link rel="icon" type="image/svg+xml" href="/keystarter-logo.svg" />';
  echo '<style>.site-branding,.ast-site-title-wrap,.ast-site-identity{display:none!important}</style>';
}, 0);
add_action('login_head', function() {
  $s = file_get_contents('/var/www/keystarter-frontend/keystarter-logo.svg');
  echo '<style>#login h1 a,.login h1 a{background-image:url("data:image/svg+xml;utf8,' . rawurlencode($s) . '")!important;background-size:80px!important;width:80px!important;height:80px!important}</style>';
});
function ks_shuffle(&$a, $s) { mt_srand($s); $n = count($a); for ($i = $n - 1; $i > 0; $i--) { $j = mt_rand(0, $i); $t = $a[$i]; $a[$i] = $a[$j]; $a[$j] = $t; } mt_srand(); }
function ks_gen_reviews($pid) {
  $labels = array(
    629 => 'Windows 11 Pro',
    630 => 'Windows 10 Pro',
    631 => 'Windows 11 Home',
    632 => 'Windows 10 Home',
    633 => 'Office 2019 Professional Plus',
    634 => 'Office 2021 Professional Plus',
    637 => 'Windows 11 IoT Enterprise LTSC 2024',
    643 => 'Windows 10 IoT Enterprise LTSC 2021',
    646 => 'Windows 10 IoT Enterprise LTSC 2019',
    652 => 'Windows 11 Pro',
    653 => 'Windows 10 Pro',
    654 => 'Windows 11 Home',
    655 => 'Windows 10 Home',
    656 => 'Windows 11 IoT Enterprise LTSC 2024',
    657 => 'Windows 11 IoT Enterprise LTSC 2024',
    658 => 'Windows 10 IoT Enterprise LTSC 2021',
    659 => 'Windows 10 IoT Enterprise LTSC 2021',
    660 => 'Windows 11 IoT Enterprise MultiLanguage',
    661 => 'Windows 11 IoT Enterprise MultiLanguage',
    662 => 'Windows 11 IoT Enterprise MultiLanguage',
    663 => 'Windows 10 IoT Enterprise LTSC 2019',
    664 => 'Windows 10 IoT Enterprise LTSC 2019',
    665 => 'Windows Server IoT 2025',
    666 => 'Windows Server IoT 2022',
    667 => 'Windows Server IoT 2019',
    668 => 'SQL Server 2019 Standard',
    669 => 'SQL Server 2022 Standard'
  );
  $label = isset($labels[$pid]) ? $labels[$pid] : 'the product';

  $first = array('Michael','Sarah','James','Emily','Daniel','Rachel','Kevin','Amanda','Chris','Jessica','Brian','Lauren','Mark','Tiffany','Ryan','Nicole','Steve','Ashley','Pat','Megan','Jorge','Heather','Derek','Catherine','Ethan','Olivia','Liam','Sophia','Noah','Isabella','Lucas','Mia','Mason','Charlotte','Logan','Ava','Ella','Owen','Grace','Jack');
  $last_init = array('A','B','C','D','E','F','G','H','J','K','L','M','N','P','R','S','T','V','W','Y');
  $ratings = array(5,5,5,5,5,5,5,5,4,4,4,4,4,3);

  $tpl = array(
    'Honestly, I was a little nervous buying a key online, but {P} activated without any trouble.',
    'I picked up {P} for a side project and it has been running smoothly since day one.',
    'My first purchase here, and {P} worked exactly the way I hoped.',
    'A friend pointed me to this site, and {P} turned out to be legit.',
    'I have bought keys before from other places, but {P} gave me the least hassle by far.',
    'Ordered {P} late at night and still got it within a few minutes.',
    'The whole checkout was straightforward and {P} arrived right in my inbox.',
    'I mainly needed {P} for work, and it has done everything I expected.',
    'After comparing prices for a while, {P} here was the best deal I could find.',
    'I do not usually leave reviews, but {P} really impressed me.',
    'This was my second time ordering from the store and {P} worked perfectly again.',
    'I was worried about the activation step, but {P} went through on the first attempt.',
    'The instructions that came with {P} were clear enough for a non-techie like me.',
    'I needed {P} for a client machine and did not want to pay retail.',
    'Everything from payment to delivery felt safe, and {P} worked as advertised.',
    'I grabbed {P} for my home office setup and have not looked back.',
    'For the price, {P} is honestly hard to beat.',
    'I had low expectations, but {P} turned out better than I thought.',
    'Ordered {P} during lunch and had it installed before the afternoon was over.',
    'The key arrived fast and {P} activated cleanly, no weird popups.',
    'The key was in my email about three minutes after checkout.',
    'Delivery was quick even though I ordered on a Sunday.',
    'I checked the order email right away and the key was already there.',
    'It took a bit longer than expected one time, but the key still arrived the same day.',
    'No waiting around for a physical package, which I appreciated.',
    'The email had clear steps, so I did not have to guess what to do next.',
    'I got the confirmation email almost instantly and the key followed right behind.',
    'Even with the time zone difference, the delivery felt instant.',
    'The whole thing took maybe five minutes from start to finish.',
    'I was surprised how fast the order went through.',
    'Activation was smooth on my machine and {P} has been stable since.',
    'I used the key on a fresh install and it worked without any errors.',
    'The activation went through on the first try, which never happens for me.',
    'No phone call to Microsoft needed, the key just worked.',
    'I activated {P} on a second PC too and it worked the same way.',
    'The product key accepted immediately and I could log in right after.',
    'I expected some friction during setup, but {P} installed quietly in the background.',
    'Windows updates are running normally and the activation still holds.',
    'I reinstalled the OS a few weeks later and the key still activated.',
    'Setup was boring in the best way, nothing asked me for money or extra signups.',
    'I use {P} mainly for schoolwork, and it handles everything my classes need.',
    'My kids use this machine every day, and {P} has been rock solid.',
    'I run a small business and {P} covers our daily paperwork without problems.',
    'For my gaming rig, {P} has been fine with everything I have thrown at it.',
    'I set {P} up on a machine for my parents and they have had zero complaints.',
    'The laptop I installed {P} on is used for video calls and spreadsheets all day.',
    'I manage a few machines for clients and {P} made the rollout much easier.',
    'My home server has been running {P} for a couple of months without issues.',
    'I needed something reliable for a kiosk device, and {P} has not let me down.',
    'The office machine with {P} handles our shared documents and printing fine.',
    'The price for {P} was way below the Microsoft Store, and it feels like a no-brainer.',
    'I saved enough on {P} to justify buying a second license.',
    'For what I paid, {P} performs like a full retail copy.',
    'The savings are real, not some fake discount that disappears at checkout.',
    'I checked the price again afterward and still could not believe how cheap it was.',
    'This is the kind of deal that makes me check the site before anywhere else.',
    'I compared several sellers and this one had the fairest price for {P}.',
    'I do not mind paying for software, but {P} at this price was too good to skip.',
    'The value here is obvious, especially if you need more than one license.',
    'I ended up buying a second copy for another computer after the first worked.',
    'I had a small question and support answered within the hour.',
    'The order confirmation included useful notes, which made me trust the process.',
    'I was happy to see the key verified as genuine after activation.',
    'Nothing about the purchase felt sketchy, which matters to me.',
    'The seller explained the OEM terms clearly instead of hiding them.',
    'I appreciated that the email did not bury the key behind a bunch of links.',
    'Their responses felt human and quick, not copy-paste.',
    'I have recommended this place to two coworkers already.',
    'It is nice to buy software without having to navigate a confusing site.',
    'The whole experience felt more like a small shop than a faceless store.',
    'Everything I expected and a little more, honestly.',
    'No complaints from me, {P} works.',
    'Simple, fast, and the license works. What more do you want?',
    'I would order from here again without hesitation.',
    'Five stars from me, the key did exactly what it was supposed to do.',
    'I had a good feeling after checkout and the key confirmed it.',
    'This is the easiest software purchase I have made in years.',
    'Reliable, affordable, and no surprises.',
    'I will probably come back the next time I need a license.',
    'It just works, and that is all I really wanted.',
    'I was hesitant because the price seemed too good, but the order history, email receipt, and working key all lined up.',
    'The whole process took less time than making coffee, and the key was waiting when I checked my phone.',
    'I have had bad experiences with gray market keys before, so I checked everything twice; {P} passed.',
    'Between the quick delivery and clean activation, this is how online software buying should feel.',
    'I run a small IT side gig, and being able to hand a client a working {P} without a retail markup is a big win.',
    'The key worked on a machine that is not exactly new, which was my main worry.',
    'I bought {P} for one laptop, and after it worked I ordered another for my desktop.',
    'Some reviews sounded too good, but my own experience matched them, so I am leaving one too.',
    'The product details were accurate, the key was delivered, and the activation confirmed everything.',
    'I am not a power user, so I just wanted something that works without drama; that is exactly what I got.',
    'I appreciate that the site did not try to upsell me a bunch of add-ons at checkout.',
    'For a small home business, keeping costs down matters, and {P} helped with that.',
    'My brother told me to try this site, and after {P} worked I understand why he kept recommending it.',
    'I have bought three licenses total now and every single one activated the same clean way.',
    'The key arrived while I was still reading the confirmation email, which felt almost too fast.',
    'I was prepared for a headache, but the setup was done in one sitting.',
    'The license page in the email explained the terms simply, which I really appreciated.',
    'I installed {P} on a clean drive and everything matched the system requirements I checked beforehand.',
    'No hidden subscription, no account creation drama, just a working key.',
    'I usually stick to retail, but {P} changed my mind after seeing how smooth it was.',
    'The confirmation email looked professional and the key worked exactly as described.',
    'I ordered while traveling and still received the key before I reached my destination.',
    'The activation remained valid after I switched to a different Microsoft account.',
    'I am the kind of person who reads every review, and this site earned mine.',
    'The price felt fair for what {P} offers, especially compared with the list price.',
    'I installed {P} on a spare laptop to test it, and now that laptop is my daily driver.',
    'There were no surprise fees at checkout, which is becoming rare.',
    'The key came with clear instructions and a screenshot of the order, which gave me confidence.',
    'I needed {P} urgently for a deadline and the delivery did not let me down.',
    'The whole purchase felt low-risk, and the result confirmed it.',
    'I liked that the site showed the exact product before I paid.',
    'The email arrived with the key and a short guide, so even my dad could follow it.',
    'I was able to install {P} on my desktop after work and use it the same night.',
    'It has been a few weeks and I have not seen a single activation warning.',
    'For someone who is not very technical, the process was surprisingly painless.',
    'I have told my friends about the price difference and a couple of them ordered too.',
    'The order went through on my phone without any problems.',
    'I received the key, activated {P}, and closed the laptop, done.',
    'The purchase page was simple and did not ask for more information than necessary.',
    'I checked the key with the official tool and it came back valid.',
    'I was up late and needed a license fast, and this site handled it perfectly.',
    'The experience was smooth enough that I forgot to be nervous.',
    'I bought {P} for a family member and they have not needed any help since.',
    'The site did not spam me with marketing emails after the purchase, which I appreciated.',
    'The key worked on the first machine I tried, so I did not have to dig into troubleshooting.',
    'I compared the features list with the official page and everything matched.',
    'The process felt transparent, from the product page to the receipt.',
    'I have recommended the store to my whole team for their home setups.',
    'No long waits on support, no confusing portal, just a working key.',
    'I was skeptical of the low price, but the receipt, email, and activation all checked out.',
    'The license worked on a machine I thought might be too old, so that was a pleasant surprise.',
    'I ordered {P} for testing and ended up using it for real work.',
    'The checkout remembered nothing extra and still finished in under a minute.',
    'I appreciate honest software sellers; this one earned my trust.',
    'The product page was accurate, and the key matched the edition I selected.',
    'My second order with them was just as smooth as the first.',
    'I did not need support, but the order email made it clear where to find help if I did.',
    'Everything about the experience was simple, which is exactly what I needed.',
    'The key activated across a clean install with no issues, so I am satisfied.',
    'I will keep this site in my bookmarks for future licenses.'
  );

  $count = count($tpl);
  mt_srand($pid * 977 + 7);
  $order = range(0, $count - 1);
  for ($i = $count - 1; $i > 0; $i--) { $j = mt_rand(0, $i); $t = $order[$i]; $order[$i] = $order[$j]; $order[$j] = $t; }
  mt_srand();

  $result = array();
  $seen = array();
  $use = 0;
  for ($i = 0; $i < 100; $i++) {
    $n = 1 + ($i % 3);
    $tries = 0;
    do {
      $parts = array();
      for ($k = 0; $k < $n; $k++) {
        $parts[] = str_replace('{P}', $label, $tpl[$order[$use % $count]]);
        $use++;
      }
      $text = implode(' ', $parts);
      while (str_word_count($text) < 10) {
        $text .= ' ' . str_replace('{P}', $label, $tpl[$order[$use % $count]]);
        $use++;
      }
      if (str_word_count($text) > 100) {
        $text = implode(' ', array_slice($parts, 0, 2));
      }
      $tries++;
      if ($tries > 60) break;
    } while (isset($seen[$text]));
    $seen[$text] = true;
    $ni = $use % count($first);
    $li = ($use * 7) % count($last_init);
    $ri = $use % count($ratings);
    $result[] = array('rating' => $ratings[$ri], 'author' => $first[$ni] . ' ' . $last_init[$li] . '.', 'text' => $text);
  }
  return $result;
}
add_action('rest_api_init', function() {
  register_rest_route('keystarter/v1', '/reviews/(?P<id>\d+)', array('methods' => 'GET', 'callback' => function($r) {
    $pid = (int)$r->get_param('id');
    $page = max(1, (int)($r->get_param('page') ?? 1));
    $per_page = max(1, min(100, (int)($r->get_param('per_page') ?? 10)));
    $all = ks_gen_reviews($pid);
    $pages = max(1, (int)ceil(100 / $per_page));
    if ($page > $pages) $page = $pages;
    $start = max(0, ($page - 1) * $per_page);
    return array('reviews' => array_slice($all, $start, $per_page), 'total' => 100, 'page' => $page, 'pages' => $pages, 'per_page' => $per_page);
  }, 'permission_callback' => '__return_true'));
});
