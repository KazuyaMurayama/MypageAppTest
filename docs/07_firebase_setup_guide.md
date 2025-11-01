# Firebase 初期設定ガイド（初心者向け）

このガイドでは、Firebaseの設定を**ゼロから**ステップバイステップで説明します。

---

## 📝 目次

1. [環境変数ファイルの作成](#1-環境変数ファイルの作成)
2. [Firebaseコンソールへのアクセス](#2-firebaseコンソールへのアクセス)
3. [Firebase設定情報の取得](#3-firebase設定情報の取得)
4. [環境変数ファイルへの入力](#4-環境変数ファイルへの入力)
5. [設定の確認](#5-設定の確認)
6. [トラブルシューティング](#6-トラブルシューティング)

---

## 1. 環境変数ファイルの作成

### ステップ 1-1: ターミナルを開く

**Windows:**
1. スタートメニューを開く
2. 「Git Bash」と検索して起動
   - または「コマンドプロンプト」「PowerShell」でもOK

**Mac:**
1. Spotlight検索（Command + Space）
2. 「ターミナル」と入力して起動

### ステップ 1-2: プロジェクトディレクトリに移動

ターミナルに以下を入力して **Enter** を押します:

```bash
cd Desktop/mypage-app
```

**確認方法:**
```bash
pwd
```
と入力すると、現在のディレクトリが表示されます。
`/c/Users/user/Desktop/mypage-app` のようなパスが表示されればOKです。

### ステップ 1-3: テンプレートファイルをコピー

以下のコマンドを入力して **Enter** を押します:

**Git Bash / Mac / Linux:**
```bash
cp .env.development.example .env.development
```

**Windows コマンドプロンプト:**
```cmd
copy .env.development.example .env.development
```

**確認方法:**
```bash
ls -la | grep .env
```
と入力すると、`.env.development` ファイルが作成されたことを確認できます。

---

## 2. Firebaseコンソールへのアクセス

### ステップ 2-1: Firebaseコンソールを開く

ブラウザで以下のURLを開きます:

```
https://console.firebase.google.com/project/kazuya-project-e42f1/overview
```

### ステップ 2-2: Googleアカウントでログイン

- Firebaseプロジェクトにアクセス権限のあるGoogleアカウントでログインします
- ログイン後、プロジェクト「**kazuya-project-e42f1**」のダッシュボードが表示されます

**もし「アクセス権がありません」と表示された場合:**
- プロジェクトオーナーに招待してもらう必要があります
- プロジェクトオーナーは「設定 → ユーザーと権限」からメンバーを追加できます

---

## 3. Firebase設定情報の取得

### ステップ 3-1: プロジェクト設定を開く

1. 左側のメニューの **歯車アイコン⚙️**（設定）をクリック
2. **「プロジェクトの設定」** を選択

![Firebase設定メニュー](https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png)

### ステップ 3-2: Webアプリを追加（初回のみ）

**既にWebアプリが登録されている場合は、このステップをスキップしてください。**

1. 「プロジェクトの設定」ページの下部にスクロール
2. 「マイアプリ」セクションを探す
3. **</> (Webアイコン)** をクリック
4. アプリのニックネームを入力:
   ```
   Mypage App Development
   ```
5. 「Firebase Hosting を設定」は **チェックしない**（後で設定可能）
6. **「アプリを登録」** をクリック

### ステップ 3-3: 設定情報をコピー

1. 「プロジェクトの設定」→「全般」タブを開く
2. 下にスクロールして **「マイアプリ」** セクションを見つける
3. 登録したWebアプリの名前をクリック
4. **「SDK の設定と構成」** セクションに以下のようなコードが表示されます:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "kazuya-project-e42f1.firebaseapp.com",
  projectId: "kazuya-project-e42f1",
  storageBucket: "kazuya-project-e42f1.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxxxxxxx"
};
```

### ステップ 3-4: 必要な情報をメモする

以下の6つの値を **メモ帳やテキストエディタにコピー** してください:

| 項目 | 説明 | 例 |
|------|------|-----|
| **apiKey** | Firebase API キー | `AIzaSyXXXXXXXXXXXXXXX` |
| **authDomain** | 認証ドメイン | `kazuya-project-e42f1.firebaseapp.com` |
| **projectId** | プロジェクトID | `kazuya-project-e42f1` |
| **storageBucket** | ストレージバケット | `kazuya-project-e42f1.appspot.com` |
| **messagingSenderId** | メッセージング送信者ID | `123456789012` |
| **appId** | アプリID | `1:123456789012:web:xxxxx` |

---

## 4. 環境変数ファイルへの入力

### ステップ 4-1: .env.developmentファイルを開く

**方法1: VSCodeで開く（推奨）**
```bash
code .env.development
```

**方法2: メモ帳で開く（Windows）**
1. エクスプローラーで `Desktop/mypage-app` フォルダを開く
2. `.env.development` ファイルを右クリック
3. 「プログラムから開く」→「メモ帳」を選択

**方法3: テキストエディットで開く（Mac）**
```bash
open -a TextEdit .env.development
```

### ステップ 4-2: ファイルの内容を確認

以下のような内容が表示されます:

```bash
# 開発環境用の環境変数テンプレート
# このファイルをコピーして .env.development を作成してください

# Firebase Configuration (フロントエンド用)
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=kazuya-project-e42f1.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=kazuya-project-e42f1
VITE_FIREBASE_STORAGE_BUCKET=kazuya-project-e42f1.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id-here
VITE_FIREBASE_APP_ID=your-app-id-here

# Backend Configuration
NODE_ENV=development
PORT=3000
FIREBASE_ADMIN_KEY_PATH=./config/firebase-admin-key.json

# CORS Settings
CORS_ORIGIN=http://localhost:5173
```

### ステップ 4-3: 値を置き換える

Firebaseコンソールからコピーした値を使って、以下の部分を書き換えます:

**変更前:**
```bash
VITE_FIREBASE_API_KEY=your-api-key-here
```

**変更後（例）:**
```bash
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### ステップ 4-4: 全ての値を入力

以下の6行を書き換えてください:

```bash
# 1. API Key
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# 2. Auth Domain（既に正しい値が入っているのでそのまま）
VITE_FIREBASE_AUTH_DOMAIN=kazuya-project-e42f1.firebaseapp.com

# 3. Project ID（既に正しい値が入っているのでそのまま）
VITE_FIREBASE_PROJECT_ID=kazuya-project-e42f1

# 4. Storage Bucket（既に正しい値が入っているのでそのまま）
VITE_FIREBASE_STORAGE_BUCKET=kazuya-project-e42f1.appspot.com

# 5. Messaging Sender ID
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012

# 6. App ID
VITE_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxxxxxxx
```

### ステップ 4-5: ファイルを保存

**VSCode:**
- `Ctrl + S` (Windows) または `Command + S` (Mac)

**メモ帳:**
- 「ファイル」→「上書き保存」

**重要:** ファイルを保存したら **必ずエディタを閉じてください**。

---

## 5. 設定の確認

### ステップ 5-1: ファイルの内容を確認

ターミナルで以下を実行:

```bash
cat .env.development
```

以下のように、実際の値が入力されていることを確認してください:

```bash
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=kazuya-project-e42f1.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=kazuya-project-e42f1
VITE_FIREBASE_STORAGE_BUCKET=kazuya-project-e42f1.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxxxxxxx
NODE_ENV=development
PORT=3000
FIREBASE_ADMIN_KEY_PATH=./config/firebase-admin-key.json
CORS_ORIGIN=http://localhost:5173
```

### ステップ 5-2: Firebase Admin SDK キーの確認

```bash
ls -la config/firebase-admin-key.json
```

以下のような出力があればOK:
```
-rw-r--r-- 1 user 197121 2400 10月 30 16:00 config/firebase-admin-key.json
```

**もしファイルが存在しない場合:**
```bash
cp ../kazuya-project-e42f1-firebase-adminsdk-fbsvc-1b04edb6ec.json config/firebase-admin-key.json
```

---

## 6. トラブルシューティング

### ❌ 問題: `.env.development` ファイルが見えない

**原因:**
- Windowsの「隠しファイル」設定でドット(.)で始まるファイルが非表示になっている

**解決策:**

**Windows エクスプローラー:**
1. エクスプローラーを開く
2. 「表示」タブをクリック
3. 「隠しファイル」にチェックを入れる

**VSCode:**
- VSCodeのエクスプローラーでは自動的に表示されます

---

### ❌ 問題: Firebaseコンソールで「アクセス権がありません」と表示される

**原因:**
- プロジェクトへのアクセス権限がない

**解決策:**
1. プロジェクトオーナーに連絡
2. 以下の手順でメンバー招待してもらう:
   - Firebaseコンソール → 設定⚙️ → ユーザーと権限
   - 「メンバーを追加」をクリック
   - あなたのGoogleアカウント（メールアドレス）を入力
   - 役割: 「編集者」を選択
   - 「メンバーを招待」をクリック

---

### ❌ 問題: `cp` コマンドが動作しない（Windows）

**原因:**
- コマンドプロンプトでは `cp` ではなく `copy` コマンドを使う

**解決策:**
```cmd
copy .env.development.example .env.development
```

または **Git Bash** を使用してください。

---

### ❌ 問題: ファイルを編集したのに変更が反映されない

**原因:**
- ファイルを保存していない
- 別のファイルを編集している

**解決策:**
1. ファイルを保存したか確認（`Ctrl + S` / `Command + S`）
2. 正しいファイル（`.env.development`）を編集しているか確認
3. ターミナルで内容を確認: `cat .env.development`

---

### ❌ 問題: API Keyが見つからない

**原因:**
- Webアプリがまだ登録されていない

**解決策:**
1. Firebaseコンソール → 設定⚙️ → プロジェクトの設定
2. 下にスクロールして「マイアプリ」セクションを探す
3. 「アプリがありません」と表示されている場合:
   - **</> (Webアイコン)** をクリック
   - アプリ名を入力（例: `Mypage App Development`）
   - 「アプリを登録」をクリック

---

## ✅ チェックリスト

設定が完了したら、以下をチェックしてください:

- [ ] `.env.development` ファイルが作成されている
- [ ] `VITE_FIREBASE_API_KEY` に実際のAPIキーが入力されている
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID` に実際の値が入力されている
- [ ] `VITE_FIREBASE_APP_ID` に実際の値が入力されている
- [ ] `config/firebase-admin-key.json` ファイルが存在する
- [ ] `.env.development` ファイルの内容を確認済み（`cat .env.development`）

すべてチェックできたら、設定完了です！🎉

---

## 📚 次のステップ

設定が完了したら、次は開発環境のセットアップに進みましょう:

1. [フロントエンド開発環境のセットアップ](./08_frontend_setup_guide.md)（次のガイドで作成予定）
2. [バックエンド開発環境のセットアップ](./09_backend_setup_guide.md)（次のガイドで作成予定）

---

## 🆘 それでも解決しない場合

- プロジェクトのSlackチャンネルで質問する
- チームメンバーに画面共有で相談する
- このドキュメントの改善提案を送る

**質問する際は以下を共有してください:**
1. エラーメッセージのスクリーンショット
2. 実行したコマンド
3. 期待した結果と実際の結果

---

**作成日**: 2025年10月30日
**更新日**: 2025年10月30日
**バージョン**: 1.0
