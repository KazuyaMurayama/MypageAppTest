# 人材エージェントマイページシステム

## プロジェクト概要

人材エージェント業務における応募者情報の管理効率を向上させ、応募者とエージェント間の情報共有をスムーズにするWebシステムです。

### 主な機能

- **応募者マイページ**: 個人情報管理、求人閲覧、書類アップロード
- **エージェント管理画面**: 応募者管理、全文検索、求人管理、ステータス管理
- **ファイル管理**: 履歴書・職務経歴書・求人資料のアップロード・ダウンロード
- **通知機能**: システム内通知
- **商談メモ**: エージェント専用の商談記録

### システム要件

- **対応ユーザー数**: 最大99名の応募者 + エージェント10名程度
- **ストレージ容量**: 10GB
- **環境**: オンプレミス（完全スタンドアローン）
- **セキュリティ**: SSL/TLS 1.3、bcryptパスワードハッシュ化

## 技術スタック

### フロントエンド
- React 18.3.x
- TypeScript 5.x
- Bootstrap 5.x
- Vite 5.x
- Axios 1.x

### バックエンド（選択肢）
- **Option 1**: Node.js 20.x + Express 4.x
- **Option 2**: Python 3.11+ + Django/Flask

### データベース
- **RDBMS**: PostgreSQL 15.x または MySQL 8.0+
- **全文検索**: Elasticsearch 8.x または PostgreSQL FTS

### Webサーバー
- Nginx 1.24.x または Apache 2.4.x

### OS
- Ubuntu Server 22.04 LTS または CentOS Stream 9

## プロジェクト構造

```
mypage-app/
├── docs/                    # ドキュメント
│   ├── 01_requirements.md   # 要件定義書
│   ├── 02_architecture.md   # アーキテクチャ設計書
│   ├── 03_database.md       # データベース設計書
│   ├── 04_api.md           # API設計書
│   ├── 05_sitemap.md       # サイトマップ
│   └── CLAUDE.md           # Claude用プロンプト
├── backend/                 # バックエンドコード
├── frontend/                # フロントエンドコード
├── .gitignore
└── README.md
```

## 開発計画

### マイルストーン

| フェーズ | 期間 | 完了予定日 |
|---------|------|-----------|
| 要件定義完了 | 1週間 | 2025年10月24日 |
| 設計完了 | 2週間 | 2025年11月7日 |
| 開発完了 | 6-8週間 | 2026年1月2日 |
| インフラ構築完了 | 2週間 | 2026年1月16日 |
| テスト完了 | 3-4週間 | 2026年2月13日 |
| 受入・導入完了 | 1-2週間 | 2026年2月27日 |
| 本番稼働 | - | 2026年3月1日 |

## 環境構成

このプロジェクトは以下の2つの環境をサポートします:

- **開発・テスト環境**: Firebase（クラウド）
- **本番環境**: オンプレミス（自社サーバー）

詳細は [環境別設定ガイド](./docs/06_environment.md) を参照してください。

## セットアップ

### 前提条件

- Node.js 20.x以上
- Python 3.11以上（バックエンドにPythonを選択した場合）
- PostgreSQL 15.x または MySQL 8.0+（本番環境のみ）
- Git
- Firebase アカウント（開発環境のみ）

### 開発環境セットアップ（Firebase）

#### 1. リポジトリのクローン

```bash
git clone https://github.com/KazuyaMurayama/MypageAppTest.git
cd MypageAppTest
```

#### 2. 環境変数の設定

```bash
# .env.development.example をコピー
cp .env.development.example .env.development

# Firebaseコンソールから取得したAPIキーなどを設定
# https://console.firebase.google.com/project/kazuya-project-e42f1/settings/general
```

.env.developmentファイルに以下の情報を設定:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
NODE_ENV=development
PORT=3000
FIREBASE_ADMIN_KEY_PATH=./config/firebase-admin-key.json
CORS_ORIGIN=http://localhost:5173
```

#### 3. Firebase Admin SDK秘密鍵の配置

```bash
# config/firebase-admin-key.json を配置
# ※このファイルは機密情報のため、Gitにはコミットされません
```

Firebase コンソールから秘密鍵をダウンロード:
1. https://console.firebase.google.com/project/kazuya-project-e42f1/settings/serviceaccounts/adminsdk
2. 「新しい秘密鍵の生成」をクリック
3. ダウンロードしたJSONファイルを `config/firebase-admin-key.json` として保存

#### 4. フロントエンド開発環境

```bash
cd frontend
npm install
npm run dev
```

フロントエンドは http://localhost:5173 で起動します。

#### 5. バックエンド開発環境

**Node.js版（推奨）**
```bash
cd backend
npm install
npm run dev
```

バックエンドは http://localhost:3000 で起動します。

#### 6. 動作確認

1. フロントエンド (http://localhost:5173) にアクセス
2. Firebase接続ステータスが全て「✓ 接続済み」になることを確認
3. バックエンドのヘルスチェックエンドポイント (http://localhost:3000/health) を確認

```bash
# ヘルスチェック
curl http://localhost:3000/health
```

期待される応答:
```json
{
  "status": "ok",
  "timestamp": "2025-11-01T...",
  "firebase": "connected"
}
```

### 本番環境セットアップ（オンプレミス）

詳細は [環境別設定ガイド](./docs/06_environment.md) を参照してください。

## ドキュメント

詳細な設計書は[docs](./docs/)ディレクトリを参照してください。

- [要件定義書](./docs/01_requirements.md)
- [アーキテクチャ設計書](./docs/02_architecture.md)
- [データベース設計書](./docs/03_database.md)
- [API設計書](./docs/04_api.md)
- [サイトマップ](./docs/05_sitemap.md)
- [環境別設定ガイド](./docs/06_environment.md)

## ライセンス

Private（社内利用のみ）

## 作成者

開発チーム
