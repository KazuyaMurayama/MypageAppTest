# Issue #1: 開発環境セットアップとFirebase初期化

## 背景 / 目的
プロジェクトの開発を開始するため、フロントエンド・バックエンドの開発環境を構築し、Firebaseとの接続を確認する必要がある。Walking Skeleton実装の第一歩として、技術スタックの動作検証とチーム開発体制の確立を行う。

- **依存**: なし
- **ラベル**: `infra`, `setup`, `phase-0`

## スコープ / 作業項目

### フロントエンド環境構築
- [ ] `frontend/` ディレクトリに React + TypeScript + Vite プロジェクトを作成
- [ ] Bootstrap 5.x をインストール・設定
- [ ] Axios をインストール・設定
- [ ] ESLint・Prettier の設定

### バックエンド環境構築
- [ ] `backend/` ディレクトリに Node.js + Express プロジェクトを作成
- [ ] TypeScript 設定（tsconfig.json）
- [ ] Firebase Admin SDK をインストール
- [ ] dotenv、cors、express-validator などの必須パッケージインストール

### Firebase設定
- [ ] `.env.development` ファイルの設定確認
- [ ] Firebase プロジェクトとの接続テスト
- [ ] Firebase Authentication 有効化
- [ ] Firestore Database 作成
- [ ] Firebase Storage 有効化

### ドキュメント
- [ ] README.md にセットアップ手順を記載
- [ ] 環境変数のサンプルファイル（.env.example）作成

## ゴール / 完了条件（Acceptance Criteria）

- [ ] Node.js 20.x、npm がインストール済みで動作確認できる
- [ ] `frontend/` に React + TypeScript + Vite プロジェクトが作成され、`npm run dev` で起動できる
- [ ] `backend/` に Node.js + Express プロジェクトが作成され、`npm run dev` で起動できる
- [ ] `.env.development` ファイルに Firebase 設定が正しく入力され、環境変数が読み込める
- [ ] Firebase Authentication、Firestore、Storage への接続テストが成功する
- [ ] フロントエンド http://localhost:5173 、バックエンド http://localhost:3000 で起動できる
- [ ] README.md にセットアップ手順が記載され、新メンバーが手順通りに環境構築できる

## テスト観点

### 環境構築テスト
- Node.js バージョン確認: `node -v` → v20.x
- npm バージョン確認: `npm -v`
- フロントエンド起動確認: `cd frontend && npm run dev`
- バックエンド起動確認: `cd backend && npm run dev`

### Firebase接続テスト
- Firebase Admin SDK 初期化スクリプト実行
- Firestore への読み書きテスト
- Firebase Storage へのアップロードテスト
- 検証方法: `backend/scripts/test-firebase-connection.js` スクリプト作成・実行

### ドキュメント確認
- README.md の手順通りに別の環境で構築テスト
- .env.example ファイルが漏れなく必要な変数を含んでいるか確認

## 要確認事項

- [ ] Bootstrap テンプレートは有料版を使用するか、無料版で進めるか？
- [ ] バックエンドで TypeScript を使用するか、JavaScript で進めるか？（推奨: TypeScript）
- [ ] ESLint・Prettier の設定はチーム標準があるか、新規に設定するか？
- [ ] Git ブランチ戦略（main/develop/feature）はどうするか？

## 参考資料

- [要件定義書](../docs/01_requirements.md)
- [アーキテクチャ設計書](../docs/02_architecture.md)
- [Firebase初期設定ガイド](../docs/07_firebase_setup_guide.md)
- [環境別設定ガイド](../docs/06_environment.md)
