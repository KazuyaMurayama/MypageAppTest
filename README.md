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

## セットアップ

### 前提条件

- Node.js 20.x以上
- Python 3.11以上（バックエンドにPythonを選択した場合）
- PostgreSQL 15.x または MySQL 8.0+
- Git

### フロントエンド開発環境

```bash
cd frontend
npm install
npm run dev
```

### バックエンド開発環境

#### Node.js版
```bash
cd backend
npm install
npm run dev
```

#### Python版
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

## ドキュメント

詳細な設計書は[docs](./docs/)ディレクトリを参照してください。

- [要件定義書](./docs/01_requirements.md)
- [アーキテクチャ設計書](./docs/02_architecture.md)
- [データベース設計書](./docs/03_database.md)
- [API設計書](./docs/04_api.md)
- [サイトマップ](./docs/05_sitemap.md)

## ライセンス

Private（社内利用のみ）

## 作成者

開発チーム
