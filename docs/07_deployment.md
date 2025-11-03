# デプロイメントガイド

## Firebase Hosting デプロイ手順

### 前提条件

1. Firebase CLIインストール済み
   ```bash
   npm install -g firebase-tools
   ```

2. Firebaseプロジェクト設定済み
   - プロジェクトID: `kazuya-project-e42f1`

### ローカルからのデプロイ

#### 1. Firebase にログイン

```bash
firebase login
```

#### 2. フロントエンドビルド

```bash
cd frontend
npm run build
```

ビルド成果物は `frontend/dist` に出力されます。

#### 3. Firebase Hosting へデプロイ

```bash
# プロジェクトルートで実行
firebase deploy --only hosting
```

### GitHub Actions による自動デプロイ

`.github/workflows/firebase-hosting.yml` により、以下の動作が自動化されています:

#### PR作成時
- プレビュー環境へ自動デプロイ
- PRコメントにプレビューURLが投稿される

#### main ブランチへのマージ時
- 本番環境（live）へ自動デプロイ
- URL: `https://kazuya-project-e42f1.web.app`

### 必要なGitHub Secrets

GitHub Actions で自動デプロイを行うには、以下のSecretsを設定してください:

1. **Firebase認証情報**
   - `FIREBASE_SERVICE_ACCOUNT_KAZUYA_PROJECT_E42F1`
   - 取得方法: Firebase Console → Project Settings → Service Accounts → Generate New Private Key

2. **Firebase設定値**（フロントエンドビルド時に使用）
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

   これらの値は `.env.development` から取得できます。

### デプロイ設定ファイル

#### `firebase.json`

```json
{
  "hosting": {
    "public": "frontend/dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

- **public**: デプロイするディレクトリ
- **rewrites**: SPAルーティング対応（すべてのパスを `index.html` にリダイレクト）
- **ignore**: デプロイから除外するファイル

#### `.firebaserc`

```json
{
  "projects": {
    "default": "kazuya-project-e42f1"
  }
}
```

Firebaseプロジェクトの識別子を定義。

### デプロイ後の確認

1. **デプロイ成功確認**
   ```bash
   firebase hosting:channel:list
   ```

2. **ブラウザで動作確認**
   - 本番URL: `https://kazuya-project-e42f1.web.app`
   - ログインページが表示されることを確認
   - テストアカウントでログイン可能か確認

### トラブルシューティング

#### デプロイエラー: "Error: HTTP Error: 403"

権限不足エラー。以下を確認:
- Firebase CLIで正しいアカウントにログインしているか
- Firebase Hosting APIが有効化されているか

```bash
firebase login:list
firebase projects:list
```

#### ビルドエラー: "Environment variables not found"

環境変数が設定されていません。
- ローカル: `.env.development` を確認
- GitHub Actions: Secretsを確認

#### SPAルーティングが動作しない

`firebase.json` の `rewrites` 設定を確認してください。すべてのパスが `/index.html` にリダイレクトされる必要があります。

### ロールバック

過去のデプロイバージョンに戻す:

```bash
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live
```

例:
```bash
# 前回のデプロイにロールバック
firebase hosting:releases:list
firebase hosting:rollback
```

### カスタムドメイン設定

Firebase Console から設定可能:
1. Hosting → Add custom domain
2. DNS設定を更新（AレコードまたはCNAMEレコード追加）
3. SSL証明書の自動プロビジョニング（数分〜数時間）

### パフォーマンス最適化

- **キャッシュ設定**: `firebase.json` の `headers` でキャッシュ制御
- **CDN**: Firebase Hostingは自動的にCDN配信
- **圧縮**: gzip/Brotli自動圧縮有効

## バックエンドのデプロイ

バックエンド（Express API）は別途デプロイが必要です:

### 開発環境
- Firebase Cloud Functions (推奨)
- Cloud Run
- Heroku

### 本番環境（オンプレミス）
- Docker Compose
- PM2
- systemd service

詳細は `docs/06_environment.md` を参照。
