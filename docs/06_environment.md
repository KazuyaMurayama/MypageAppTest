# 環境別設定ガイド

## 概要

このプロジェクトは以下の2つの環境をサポートします:

- **開発・テスト環境**: Firebase（クラウド）
- **本番環境**: オンプレミス（自社サーバー）

## 環境構成

### 開発・テスト環境（Firebase）

#### 使用サービス
- **Firebase Authentication**: ユーザー認証
- **Cloud Firestore**: データベース
- **Firebase Storage**: ファイルストレージ
- **Firebase Hosting**: フロントエンドホスティング（オプション）

#### プロジェクト情報
- **プロジェクトID**: `kazuya-project-e42f1`
- **コンソールURL**: https://console.firebase.google.com/project/kazuya-project-e42f1

#### メリット
- 迅速な開発・テスト
- インフラ管理不要
- 実装の検証が容易
- 初期費用なし（従量課金）

#### デメリット
- 本番環境とアーキテクチャが異なる
- Firebase特有の実装が必要
- 本番移行時のコード修正が必要

---

### 本番環境（オンプレミス）

#### 使用サービス
- **PostgreSQL/MySQL**: データベース
- **ローカルストレージ**: ファイルストレージ（10GB）
- **Nginx/Apache**: Webサーバー
- **Node.js/Python**: アプリケーションサーバー
- **セッションベース認証**: Cookie認証

#### サーバー構成
- **OS**: Ubuntu Server 22.04 LTS または CentOS Stream 9
- **CPU**: 4コア以上
- **メモリ**: 16GB以上（32GB推奨）
- **ストレージ**: SSD 100GB以上

#### メリット
- 完全な制御
- セキュリティ要件を満たす
- ランニングコスト低（電気代のみ）
- 個人情報を外部に送信しない

#### デメリット
- インフラ構築・管理が必要
- 初期費用が高い
- 障害対応は自社で実施

---

## Firebase設定手順

### 1. Firebase Admin SDK認証情報の配置

**重要**: 認証情報は絶対にGitにコミットしないでください。

```bash
# プロジェクトルートにconfigディレクトリを作成
mkdir -p config

# Firebase Admin SDKの秘密鍵を配置
cp /path/to/kazuya-project-e42f1-firebase-adminsdk-*.json config/firebase-admin-key.json

# .gitignoreに追加（既に設定済み）
echo "config/*.json" >> .gitignore
```

### 2. 環境変数の設定

開発環境用の`.env.development`ファイルを作成:

```bash
# .env.development
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=kazuya-project-e42f1.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=kazuya-project-e42f1
VITE_FIREBASE_STORAGE_BUCKET=kazuya-project-e42f1.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# バックエンド用
FIREBASE_ADMIN_KEY_PATH=./config/firebase-admin-key.json
```

### 3. Firebase SDKのインストール

#### フロントエンド
```bash
cd frontend
npm install firebase
```

#### バックエンド（Node.js）
```bash
cd backend
npm install firebase-admin
```

### 4. Firebase初期化コード

#### フロントエンド（React）

```typescript
// frontend/src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

#### バックエンド（Node.js）

```javascript
// backend/src/config/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../../config/firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'kazuya-project-e42f1.appspot.com'
});

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

module.exports = { admin, db, auth, storage };
```

---

## オンプレミス設定手順

### 1. データベースセットアップ

#### PostgreSQL
```bash
# PostgreSQLインストール
sudo apt update
sudo apt install postgresql postgresql-contrib

# データベース作成
sudo -u postgres psql
CREATE DATABASE recruitment_db;
CREATE USER recruitment_user WITH PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE recruitment_db TO recruitment_user;
```

#### MySQL
```bash
# MySQLインストール
sudo apt update
sudo apt install mysql-server

# データベース作成
sudo mysql
CREATE DATABASE recruitment_db;
CREATE USER 'recruitment_user'@'localhost' IDENTIFIED BY 'your-password';
GRANT ALL PRIVILEGES ON recruitment_db.* TO 'recruitment_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. 環境変数の設定

本番環境用の`.env.production`ファイルを作成:

```bash
# .env.production
NODE_ENV=production

# データベース
DB_HOST=localhost
DB_PORT=5432
DB_NAME=recruitment_db
DB_USER=recruitment_user
DB_PASSWORD=your-password

# ファイルストレージ
UPLOAD_DIR=/var/uploads
MAX_FILE_SIZE=314572800  # 300MB

# セキュリティ
SESSION_SECRET=your-session-secret
JWT_SECRET=your-jwt-secret
BCRYPT_ROUNDS=12

# サーバー
PORT=3000
HOST=0.0.0.0
```

### 3. アプリケーションの起動

```bash
# データベースマイグレーション
npm run migrate:production

# アプリケーション起動
npm run start:production
```

---

## 環境切り替え方法

### 開発時（Firebase）
```bash
# フロントエンド
cd frontend
npm run dev

# バックエンド
cd backend
npm run dev
```

### 本番時（オンプレミス）
```bash
# フロントエンド
cd frontend
npm run build
npm run preview

# バックエンド
cd backend
NODE_ENV=production npm start
```

---

## データ移行

開発環境（Firebase）から本番環境（オンプレミス）へのデータ移行手順:

### 1. Firestoreからデータエクスポート

```bash
# Firebase CLIでエクスポート
firebase firestore:export ./firestore-export

# Node.jsスクリプトでエクスポート
node scripts/export-firestore-data.js
```

### 2. PostgreSQL/MySQLへインポート

```bash
# SQLスクリプトでインポート
node scripts/import-to-postgres.js
```

---

## トラブルシューティング

### Firebase接続エラー

**症状**: `Firebase: Error (auth/api-key-not-valid)`

**解決策**:
1. `.env.development`の`VITE_FIREBASE_API_KEY`を確認
2. Firebaseコンソールで正しいAPIキーを取得
3. `.env`ファイルを再読み込み（アプリ再起動）

### オンプレミス接続エラー

**症状**: `ECONNREFUSED: Connection refused`

**解決策**:
1. データベースが起動しているか確認: `sudo systemctl status postgresql`
2. ポート番号が正しいか確認
3. ファイアウォール設定を確認

---

## セキュリティ注意事項

### 絶対にGitにコミットしてはいけないファイル

- `config/firebase-admin-key.json`
- `.env`
- `.env.development`
- `.env.production`
- `firebase-debug.log`

### 認証情報の管理

- **開発環境**: 環境変数またはローカルファイル
- **本番環境**: 環境変数のみ（ファイルは使用しない）
- **CI/CD**: GitHub SecretsまたはAWS Secrets Manager

---

## 費用比較

| 項目 | 開発環境（Firebase） | 本番環境（オンプレミス） |
|------|---------------------|------------------------|
| 初期費用 | 0円 | 308万〜535万円 |
| 月額費用 | 0〜数千円 | 0円（電気代のみ） |
| 管理コスト | 低 | 高 |
| スケーラビリティ | 高 | 低 |
| セキュリティ | 中 | 高 |

---

## 推奨事項

1. **開発初期**: Firebaseで迅速にプロトタイプを作成
2. **機能実装**: Firebaseで全機能を実装・テスト
3. **移行準備**: 本番環境構築と並行してコード修正
4. **本番移行**: データ移行とアプリケーション切り替え
5. **運用開始**: オンプレミス環境で本番稼働

この段階的なアプローチにより、開発スピードとセキュリティ要件の両立が可能です。
