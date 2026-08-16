// jadoartist.github.io の img/ を各MVの確定サムネから再生成する
// 使い方: node _build_images.js
// サイトは 640x360 を使う。YouTube側のサムネを差し替えたら必ずこれも走らせて表示を揃える。
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const P = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'img');
const W = 640, H = 360;

const MAP = [
  { out: 'mv01.jpg', src: `${P}/MV01_逆さまの世界/02_サムネイル/邪道Jado_MV01_逆さま_新サムネ.jpg`, note: '逆さまの世界（v2対象外・既に基準を満たす）' },
  { out: 'mv02.jpg', src: `${P}/MV02_メタル・ジャパン・パンデミック/02_サムネイル/邪道Jado_MV02_赤い涙_サムネv2_2026-08_1280x720.jpg`, note: '赤い涙' },
  { out: 'mv03.jpg', src: `${P}/MV03_石庭_Karesansui/02_サムネイル/邪道Jado_MV03_石庭_サムネv2_2026-08_1280x720.jpg`, note: '石庭 Karesansui' },
  { out: 'mv04.jpg', src: `${P}/MV04_名前の重さ/02_サムネイル/邪道Jado_MV04_名前の重さ_サムネv2_2026-08_1280x720.jpg`, note: '名前の重さ' },
  { out: 'mv05.jpg', src: `${P}/MV05_不在判決/02_サムネイル/邪道Jado_MV05_不在判決_サムネv2_2026-08_1280x720.jpg`, note: '不在判決' },
  { out: 'mv06.jpg', src: `${P}/MV06_炎上/01_サムネ/邪道Jado_MV06_炎上_サムネv2_2026-08_1280x720.jpg`, note: '炎上' },
  { out: 'mv07.jpg', src: `${P}/MV07_羽音/01_サムネ/サムネ16x9_案B_王冠の蚊_v2_2026-08_1280x720.jpg`, note: '羽音（A/Bテスト中。サイトは案B 王冠の蚊を採用）' },
  { out: 'mix.jpg',  src: `${P}/00_長尺ミックス/邪道Jado_能面の宴_サムネ_1280x720.jpg`, note: '能面の宴 全曲ミックス' },
];

let ng = 0;
console.log('=== HP img 再生成 (640x360) ===');
for (const m of MAP) {
  if (!fs.existsSync(m.src)) { console.log(`  ✗ 元画像なし: ${m.out}  ${m.src}`); ng++; continue; }
  execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error',
    '-i', m.src, '-vf', `scale=${W}:${H}`, '-q:v', '4', path.join(OUT, m.out)]);
  const kb = Math.round(fs.statSync(path.join(OUT, m.out)).size / 1024);
  console.log(`  ✓ ${m.out.padEnd(9)} ${String(kb).padStart(3)}KB  ${m.note}`);
}
console.log(ng === 0 ? '✓ PASSED' : `✗ FAILED: ${ng}件`);
process.exit(ng ? 1 : 0);
