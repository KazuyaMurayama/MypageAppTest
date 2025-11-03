# CI/CD パイプライン構成

## 概要

このプロジェクトでは、GitHub Actionsを使用した自動化されたCI/CDパイプラインを構築しています。

## ワークフロー一覧

### 1. CI（継続的インテグレーション）

**ファイル**: `.github/workflows/ci.yml`

**トリガー**:
- `main` または `develop` ブランチへのpush
- `main` または `develop` ブランチへのPull Request

**ジョブ**:

#### frontend-test
- TypeScript型チェック
- ESLint実行
- フロントエンドビルド
- Playwright E2Eテスト実行
- テストレポートのアップロード

#### backend-test
- TypeScript型チェック
- バックエンドビルド
- バックエンドテスト実行

#### security-scan
- npm audit実行（フロントエンド・バックエンド）
- 脆弱性検出（high以上）

#### dependency-check
- 依存パッケージの更新確認

### 2. Firebase Hosting デプロイ

**ファイル**: `.github/workflows/firebase-hosting.yml`

**トリガー**:
- `main` ブランチへのpush（本番デプロイ）
- Pull Request作成（プレビュー環境デプロイ）

**動作**:
- フロントエンドビルド
- Firebase Hostingへデプロイ
  - PR: プレビューURL生成
  - main: 本番環境デプロイ

### 3. CodeQL（セキュリティ分析）

**ファイル**: `.github/workflows/codeql.yml`

**トリガー**:
- `main` または `develop` ブランチへのpush
- Pull Request作成
- 毎週月曜日 0時（UTC）にスケジュール実行

**動作**:
- コードの静的解析
- セキュリティ脆弱性の検出
- Security Alertsへレポート

### 4. Dependabot

**ファイル**: `.github/dependabot.yml`

**スケジュール**: 毎週月曜日

**監視対象**:
- フロントエンド npm パッケージ (`/frontend`)
- バックエンド npm パッケージ (`/backend`)
- GitHub Actions (`/`)

**動作**:
- 依存パッケージの更新を自動検出
- Pull Requestの自動作成
- レビュアー指定: @KazuyaMurayama

## 必要なGitHub Secrets

以下のSecretsをGitHub Repositoryに設定してください:

### Firebase関連
```
FIREBASE_SERVICE_ACCOUNT_KAZUYA_PROJECT_E42F1
```
Firebase Console → Project Settings → Service Accounts から取得

### Firebase設定値（ビルド時に使用）
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```
`.env.development` の値を使用

## Secrets設定手順

1. GitHubリポジトリ → Settings → Secrets and variables → Actions
2. "New repository secret" をクリック
3. Name と Value を入力して追加

## ワークフロー実行結果の確認

### GitHub Actions タブ
1. リポジトリページ → Actions タブ
2. 各ワークフローの実行履歴を確認
3. 失敗時はログを確認して対処

### Playwright レポート
E2Eテスト実行後、Artifactsから `playwright-report` をダウンロード可能

### CodeQL Security Alerts
リポジトリページ → Security → Code scanning alerts

## ブランチ戦略

推奨されるGit Flow:

```
main (本番環境)
  ↑
develop (開発環境)
  ↑
feature/* (機能開発)
```

### ワークフロー
1. `feature/*` ブランチで開発
2. `develop` へPR作成
   - CIワークフロー実行
   - Firebase Hosting プレビュー環境デプロイ
   - レビュー後マージ
3. `develop` から `main` へPR作成
   - CIワークフロー実行
   - レビュー後マージ
4. `main` へマージ
   - Firebase Hosting本番環境へ自動デプロイ

## トラブルシューティング

### CI実行失敗: "Secrets not found"

**原因**: GitHub Secretsが設定されていない

**解決方法**:
1. 上記「必要なGitHub Secrets」セクションを参照
2. すべてのSecretsを設定

### E2Eテスト失敗

**原因**: Playwright browser未インストール

**解決方法**:
GitHub Actionsでは自動インストールされるため、ローカル実行時のみ必要:
```bash
cd frontend
npx playwright install chromium
```

### npm audit エラー

**原因**: 脆弱性のある依存パッケージ

**解決方法**:
```bash
# 自動修正を試行
npm audit fix

# 強制アップデート（breaking changesに注意）
npm audit fix --force

# 手動で package.json を更新
```

### Dependabot PR が自動作成されない

**原因**: dependabot.yml の設定ミス

**確認項目**:
- ファイルパス: `.github/dependabot.yml`
- YAML構文エラーがないか
- レビュアー名が正しいか

## パフォーマンス最適化

### キャッシュ活用
- `actions/setup-node@v4` で npm キャッシュ自動化
- 依存パッケージのインストール時間短縮

### 並列実行
- 複数ジョブを並列実行（frontend-test, backend-test等）
- 実行時間の短縮

### 条件付き実行
- `continue-on-error: true` で一部失敗を許容
- 重要なチェック（型チェック、ビルド）は必須

## ベストプラクティス

1. **Pull Request必須化**
   - `main` ブランチへの直接pushを禁止
   - Branch protection rules設定推奨

2. **レビュープロセス**
   - CIパス後のみマージ許可
   - 最低1名のApprove必須

3. **セキュリティ**
   - Secretsは必ず暗号化して保存
   - `.env` ファイルはgitignore

4. **モニタリング**
   - CodeQL Alertsを定期確認
   - Dependabot PRを迅速にレビュー

## 今後の拡張

- [ ] バックエンド unit test追加
- [ ] Lighthouse CI（パフォーマンス測定）
- [ ] Slack通知統合
- [ ] ステージング環境追加
- [ ] Docker イメージビルド & push
