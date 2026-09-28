const fs = require('fs');
const f = fs.readdirSync('dist/assets').find(f => f.startsWith('index-') && f.endsWith('.js'));
const s = fs.readFileSync('dist/assets/' + f, 'utf8');
const i = s.indexOf('link[rel="canonical"]');
console.log(s.slice(i, i + 2600));
