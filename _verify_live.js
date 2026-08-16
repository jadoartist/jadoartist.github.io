// jadoartist.github.io の本番反映を検証する
// 使い方: node _verify_live.js
// ローカルの index.html が参照する全画像が本番に存在し、かつローカルと同一サイズかを確認する。
// GitHub Pages は反映に数分かかることがあるので、FAILED なら少し待って再実行すること。
const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE = 'https://jadoartist.github.io/';
const DIR = __dirname;

const head = url => new Promise(res => {
  https.get(url, r => {
    let len = 0;
    r.on('data', c => len += c.length);
    r.on('end', () => res({ status: r.statusCode, size: len }));
  }).on('error', () => res({ status: 0, size: 0 }));
});

(async () => {
  const html = fs.readFileSync(path.join(DIR, 'index.html'), 'utf8');
  const imgs = [...new Set([...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]))];

  console.log('=== 本番反映の検証 ===');
  console.log(`  対象: ${BASE}`);
  console.log('');

  let ng = 0;

  // ① index.html 自体が最新か（ヒーローと新カードの有無で判定）
  const live = await new Promise(res => {
    https.get(BASE, r => { let b = ''; r.on('data', c => b += c); r.on('end', () => res(b)); })
      .on('error', () => res(''));
  });
  const checks = [
    ['羽音カード',        /data-mv="mv07"/],
    ['全曲ミックスカード', /data-mv="mix"/],
    ['配信中セクション',   /id="listen"/],
    ['配信中のリード文',   /主要ストリーミングで「邪道Jado」を聴く。/],
    ['ヒーロー→配信中',   /href="#listen"/],
  ];
  console.log('  [index.html]');
  for (const [name, re] of checks) {
    const ok = re.test(live);
    if (!ok) ng++;
    console.log(`    ${ok ? '✓' : '✗'} ${name}`);
  }

  // ② 画像が存在し、ローカルと同一サイズか
  console.log('');
  console.log('  [画像]');
  for (const src of imgs) {
    const localPath = path.join(DIR, src);
    const localSize = fs.existsSync(localPath) ? fs.statSync(localPath).size : -1;
    const r = await head(BASE + src);
    const same = r.status === 200 && r.size === localSize;
    if (!same) ng++;
    const note = r.status !== 200 ? `HTTP ${r.status}（未アップロード）`
      : r.size !== localSize ? `本番 ${r.size} / ローカル ${localSize}（差し替え前）`
      : `${r.size} bytes 一致`;
    console.log(`    ${same ? '✓' : '✗'} ${src.padEnd(14)} ${note}`);
  }

  console.log('');
  console.log(ng === 0 ? '✓ PASSED: 本番はローカルと一致しています'
    : `✗ FAILED: ${ng} 件。上記をアップロードしてください（GitHub Pages の反映に数分かかる場合あり）`);
  process.exit(ng ? 1 : 0);
})();
