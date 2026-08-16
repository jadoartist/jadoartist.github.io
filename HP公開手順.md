# 邪道Jado HP 公開手順ガイド

> `index.html` を**インターネット上で誰でも見られるURLに公開**するための完全ガイド。
> ブランド独立性・SEO安全性・脱単一依存の観点で、**GitHub Pages を第一推奨**。
>
> 改訂 v2: 2026-05-11 — Cloudflare依存リスクの懸念を踏まえ全面再構成

---

## 🎯 最終推奨：**GitHub Pages**

### なぜGitHub Pagesか

| 観点 | GitHub Pages の優位性 |
|---|---|
| **独立性** | Cloudflareへの依存ゼロ、GitHubの独自インフラのみ |
| **SEO安全性** | Googleが GitHub Pages を高く評価する文脈あり、オープン文化の信頼 |
| **共有IPリスク** | Cloudflareより低い、悪意あるサイトが極端に少ない |
| **無料度** | 完全無料・カスタムドメイン無料・HTTPS自動 |
| **ブランド主権** | GitHubアカウントは ikkosanさんが完全所有、いつでもエクスポート可能 |
| **将来移行** | 同じHTMLを後で独自VPSに引っ越せる（ロックインなし） |
| **学習コスト** | 初回10分、2回目以降は数分 |

---

## 🚫 撤回：Cloudflare Pages（非推奨）

私の前回提案を撤回します。理由は ikkosanさんのご指摘通り：

| 懸念 | 評価 |
|---|---|
| 共有IPがブラックリスト混入の可能性 | ⚠️ 事実 |
| 適切な最適化済HTMLには過剰 | ⚠️ 事実（邪道JadoのHPは19KB、CDN不要） |
| SEOへの悪影響リスク | ⚠️ 理論上事実 |
| Cloudflare障害時に全停止 | ⚠️ 完全事実（年1-2回の大規模障害発生） |

→ 単一インフラ依存はブランドの主権に関わる。**邪道Jadoは独立性を優先する**。

---

## 🚀 第1推奨：GitHub Pages（公開手順）

### Step 1: GitHubアカウント作成（5分）
1. https://github.com/join にアクセス
2. メールとパスワード、ユーザー名「**JadoArtist**」など邪道Jado名で登録
3. メール認証完了

### Step 2: リポジトリ作成（2分）
1. ログイン後、右上「**+**」→ 「**New repository**」
2. **Repository name** を以下のように設定：
   ```
   JadoArtist.github.io
   ```
   ※ **ユーザー名と完全一致+「.github.io」**にすることが必須
3. 「**Public**」を選択（無料プラン要件）
4. 「Add a README file」にチェック
5. 「**Create repository**」をクリック

### Step 3: HTMLをアップロード（2分）
1. リポジトリページ → 「**Add file**」→ 「**Upload files**」
2. `index.html` をドラッグ&ドロップ
3. 一番下に commit メッセージ（例: "Initial site"）
4. 「**Commit changes**」をクリック

### Step 4: Pages を有効化（1分）
1. リポジトリの「**Settings**」タブ
2. 左メニュー → 「**Pages**」
3. **Source**: 「Deploy from a branch」
4. **Branch**: `main` / `/(root)` を選択 → 「Save」

### Step 5: 公開完了（30秒〜数分）
- 公開URL：**`https://jadoartist.github.io`** が自動生成
- HTTPS自動、CDN自動
- 反映までに数分かかる場合あり

---

## 🌐 独自ドメイン設定（任意・推奨）

### Step A: ドメイン取得（10分）
- お名前.com / Cloudflare Domains / ムームードメイン などで `jadoartist.com` を取得
- 費用：年1,000〜2,000円程度（`.com` の場合）
- ※ ドメイン取得サービスとして Cloudflare を使うのは問題なし（ホスティングと別の話）

### Step B: GitHubリポジトリ側設定（2分）
1. リポジトリ Settings → Pages
2. 「**Custom domain**」に `jadoartist.com` を入力 → Save
3. 「**Enforce HTTPS**」にチェック（数時間後に有効化）

### Step C: DNS設定（5分）
ドメイン取得サービス側で、以下のDNSレコードを追加：

**ApexドメインのAレコード**（4つすべて追加）：
```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

**wwwサブドメインのCNAME**：
```
CNAME    www    JadoArtist.github.io
```

→ DNSが浸透すると（数時間〜24時間）、`https://jadoartist.com` で表示。

---

## ⚡ 第2選択：Vercel（GitHub Pages が合わない場合）

GitHub Pages が何らかの理由で使えない場合の代替。Cloudflare 非依存、信頼性高い。

### 特徴
- **Cloudflare 完全非依存**（独自CDN: AWS / Fastly混合）
- 無料枠 100GB/月の転送量
- 独自ドメイン無料
- HTTPS自動

### 手順
1. https://vercel.com/signup でGitHubアカウントを連携
2. 「**Add New** → **Project**」
3. 上記の `JadoArtist.github.io` リポジトリをインポート
4. 「Deploy」 → 公開URL自動発行：`https://jadoartist.vercel.app`

---

## 🇯🇵 第3選択：国内VPS（フォロワー1万超え後の移行先）

ブランド規模が大きくなった時の本格運用先。

### おすすめサービス
| サービス | 月額 | 専用IP | 特徴 |
|---|---|---|---|
| Xserver Static | 770円 | あり | 国内最速、静的サイト専用 |
| さくらのレンタル | 425円 | 共有 or 専用 | 老舗、安定性高 |
| ConoHa WING | 740円 | 共有 | 国内最速級 |

### メリット
- ✅ **専用IP**：共有IPリスク完全排除
- ✅ **国内DC**：日本のユーザー体感速度最速
- ✅ **完全主権**：いつでも他社に移行可能
- ✅ **SEO最強**：日本のサーバーから発信される利点

### 移行タイミング目安
- フォロワー1万人超え or 月間PV 5万超え
- それ以前はGitHub Pages で十分

---

## 🎨 公開後の必須カスタマイズ（5分）

### 1. SNS実URL を置換
`index.html` の中で `@JadoArtist` を実際のアカウントIDに：

```html
href="https://www.youtube.com/@JadoArtist?sub_confirmation=1"   ← 404になる旧仮ハンドル
                                ↓
href="https://www.youtube.com/channel/UCFeadEbuIFBQjHSpDGc02gg?sub_confirmation=1"
```

> ⚠️ 登録URLは **channel ID 形式（ASCII）で固定**。`@邪道Jado` の日本語ハンドル生URLは
> 説明欄の自動リンクが途中で切れるため公開物では使用禁止（CLAUDE.md 第8節）。
> 正規URLは `00_ブランド資料/邪道Jado_公式リンク定義.json` を単一ソースとすること。

TikTok / Instagram / X も同様。

### 2. MV実URL を置換
HTML末尾の `MV_URLS` を実URLに：

```javascript
const MV_URLS = {
  mv01: 'https://www.youtube.com/watch?v=XXX',  // 逆さまの世界
  mv02: 'https://www.youtube.com/watch?v=XXX',  // 赤い涙
  mv03: 'https://www.youtube.com/watch?v=XXX',  // 石庭 Karesansui
  mv04: 'https://www.youtube.com/watch?v=XXX'   // 名前の重さ（6/6公開後）
};
```

### 3. メールアドレス置換
```html
<a class="contact-button" href="mailto:contact@jadoartist.com">contact@jadoartist.com</a>
```

### 4. 更新方法
- GitHub: リポジトリ画面で `index.html` をクリック → 鉛筆アイコン編集 → Commit changes
- 数分で反映

---

## 🔗 SNS Bio との連携

各プラットフォームのBio リンクを**HPに統一**：

```
Instagram Bio:
邪道 Jado｜AI音楽アーティスト
🎵 月1本MV公開中
▶ jadoartist.com  ← ここに統一

TikTok Bio:
邪道 Jado｜和×サイバー×ラップ
▶ jadoartist.com

X Bio:
邪道 Jado｜AI音楽アーティスト
▶ jadoartist.com
```

→ どのSNSから来た人も最終的にHPに集約 → MV視聴+SNS全制覇への動線。**Linktreeより遥かにブランド体験が深い**。

---

## 📊 HP公開のメリット（Linktreeとの比較）

| 項目 | Linktree | 邪道JadoのHP |
|---|---|---|
| ブランド世界観 | ❌ 画一テンプレ | ✅ **墨黒×朱赤の邪道宇宙** |
| MVショーケース | ❌ ただのリンク列 | ✅ **シネマティックなギャラリー** |
| 物語性 | ❌ なし | ✅ **WHO/WHAT/WHY セクション** |
| SEO | ❌ Linktree依存 | ✅ **独自ドメインでGoogle検索流入** |
| カスタマイズ | ❌ 限定的 | ✅ **完全自由** |
| 月額料金 | 一部有料 | **完全無料**（ドメイン代のみ） |
| ファンの体験 | リンク踏むだけ | **世界観に浸る** |
| 独立性 | Linktree 依存 | ✅ **GitHub Pages（独立性高い）** |

---

## 📋 各選択肢の比較表（正直版）

| | GitHub Pages | Vercel | 国内VPS | ~~Cloudflare~~ |
|---|---|---|---|---|
| 独立性 | ✅ 高い | ✅ 高い | 🟢 完全独立 | 🔴 単一依存 |
| 共有IPリスク | 🟡 一部あり | 🟡 一部あり | ✅ なし(専用IP) | 🔴 高い |
| SEO安全性 | ✅ 高い | ✅ 高い | ✅ 最高 | 🟡 議論あり |
| 学習コスト | 🟢 簡単 | 🟢 簡単 | 🔴 中〜難 | 🟢 簡単 |
| 月額費用 | 無料 | 無料 | 500-1,000円 | 無料 |
| 障害頻度 | 年1回未満 | 年1回未満 | 国内最高水準 | **年1-2回大規模障害** |
| 推奨タイミング | ✅ **今すぐ** | 代替案 | フォロワー1万超え後 | ❌ **非推奨** |

---

## 🛠 今後の拡張アイデア（v2以降）

- **MV04公開カウントダウンタイマー**（6/6 19:00まで）
- **ニュースレター登録フォーム**（メールリスト構築）
- **Bandcamp / Spotify / Apple Music 連携**（収益化導線）
- **ブログセクション**（制作秘話・歌詞解説）
- **ファンアートギャラリー**（邪道民の創作物）
- **国内VPSへの移行**（フォロワー1万超え後）

---

## 📚 関連ドキュメント

- `index.html` — HP本体
- `邪道Jadoのブランドコンセプト.md` v1.1 — デザイン基準
- `邪道Jado_3プラットフォーム_プロフィール設定ガイド.md` — SNS Bio に HP URL を統一

---

## 改訂履歴

| Version | Date | 主要変更 |
|---|---|---|
| v1 | 2026-05-11 | 初版、Cloudflare Pages を推奨していた |
| **v2** | **2026-05-11** | **Cloudflare依存リスクを認識、GitHub Pages を第一推奨に全面改訂。Cloudflare非推奨を明記** |

---

> Linktreeを卒業し、**邪道Jadoの世界観そのものを玄関**にする。
> **GitHub Pagesでブランド独立性を保ちつつ**、ここから邪道民が始まる。
