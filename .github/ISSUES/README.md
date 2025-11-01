# GitHub Issues テンプレート集

このディレクトリには、人材エージェントマイページシステム開発用のGitHub Issueテンプレートが格納されています。

## Issue 一覧

### Phase 0: Walking Skeleton (垂直スライス実装)
- [x] [Issue #1](./issue-001.md) - 開発環境セットアップとFirebase初期化
- [x] [Issue #2](./issue-002.md) - Firestoreデータベーススキーマ初期設定
- [x] [Issue #3](./issue-003.md) - 認証API実装（ログイン・ログアウト）
- [x] [Issue #4](./issue-004.md) - ログイン画面UI実装
- [ ] [Issue #5](./issue-005.md) - React初期化とルーティング設定
- [ ] [Issue #6](./issue-006.md) - フロントエンド・バックエンドAPI接続確認
- [ ] [Issue #7](./issue-007.md) - Firebase Hostingへのデプロイ（開発環境）
- [x] [Issue #8](./issue-008.md) - E2Eテスト環境構築（Walking Skeleton検証）

### Phase 1: 応募者マイページMVP
- [ ] [Issue #9](./issue-009.md) - 応募者情報取得・更新API実装
- [ ] [Issue #10](./issue-010.md) - プロフィール閲覧画面UI実装
- [ ] [Issue #11](./issue-011.md) - プロフィール編集機能UI実装
- [ ] [Issue #12](./issue-012.md) - 入力バリデーション実装（フロント・バックエンド）
- [ ] [Issue #13](./issue-013.md) - パスワード変更機能実装
- [ ] [Issue #14](./issue-014.md) - セキュリティ設定画面実装
- [ ] [Issue #15](./issue-015.md) - レスポンシブデザイン対応（応募者画面）
- [ ] [Issue #16](./issue-016.md) - 応募者機能E2Eテスト

### Phase 2: エージェント管理画面MVP
- [ ] [Issue #17](./issue-017.md) - エージェント権限管理実装
- [ ] [Issue #18](./issue-018.md) - 応募者一覧取得API実装
- [ ] [Issue #19](./issue-019.md) - 応募者一覧画面UI実装
- [ ] [Issue #20](./issue-020.md) - 応募者詳細画面UI実装
- [ ] [Issue #21](./issue-021.md) - エージェント用応募者情報編集機能実装
- [ ] [Issue #22](./issue-022.md) - フィルタ・ソート機能強化
- [ ] [Issue #23](./issue-023.md) - ページネーション実装
- [ ] [Issue #24](./issue-024.md) - エージェント機能E2Eテスト

### Phase 3: ファイル管理機能
- [ ] [Issue #25](./issue-025.md) - files コレクション設計とセキュリティルール
- [ ] [Issue #26](./issue-026.md) - ファイルアップロードAPI実装
- [ ] [Issue #27](./issue-027.md) - ファイルアップロード画面UI実装
- [ ] [Issue #28](./issue-028.md) - ファイルダウンロード機能実装
- [ ] [Issue #29](./issue-029.md) - ウイルススキャン統合（オプション）
- [ ] [Issue #30](./issue-030.md) - ファイル管理E2Eテスト

### Phase 4: 検索・マッチング機能
- [ ] [Issue #31](./issue-031.md) - job_applicants コレクション設計
- [ ] [Issue #32](./issue-032.md) - 求人情報管理API実装
- [ ] [Issue #33](./issue-033.md) - 全文検索API実装
- [ ] [Issue #34](./issue-034.md) - 検索画面UI実装
- [ ] [Issue #35](./issue-035.md) - 求人応募機能実装
- [ ] [Issue #36](./issue-036.md) - マッチング機能E2Eテスト

### Phase 5: 通知・ステータス管理
- [ ] [Issue #37](./issue-037.md) - notifications コレクション設計
- [ ] [Issue #38](./issue-038.md) - 通知API実装
- [ ] [Issue #39](./issue-039.md) - 通知UI実装
- [ ] [Issue #40](./issue-040.md) - リアルタイム通知（Firebase Cloud Messaging）
- [ ] [Issue #41](./issue-041.md) - ステータス変更機能実装
- [ ] [Issue #42](./issue-042.md) - ワークフローE2Eテスト

### Phase 6: セキュリティ強化・本番化準備
- [ ] [Issue #43](./issue-043.md) - セキュリティ監査と脆弱性スキャン
- [ ] [Issue #44](./issue-044.md) - パフォーマンステスト
- [ ] [Issue #45](./issue-045.md) - オンプレミス環境構築ガイド作成
- [ ] [Issue #46](./issue-046.md) - データ移行スクリプト作成
- [ ] [Issue #47](./issue-047.md) - 本番デプロイ手順書作成
- [ ] [Issue #48](./issue-048.md) - 運用監視設定

## Issue作成方法

### GitHubリポジトリでIssue作成
```bash
# 各 issue-XXX.md ファイルの内容をコピーして、GitHubリポジトリで新規Issue作成
```

### GitHub CLI を使った一括Issue作成（推奨）
```bash
# GitHub CLI インストール後
gh auth login

# Issue作成スクリプト実行
node scripts/create-github-issues.js
```

## Issue テンプレート構成

各Issueファイルは以下の構成になっています:

1. **背景 / 目的**: Issue実装の理由と目標
2. **依存**: 他のIssueとの依存関係
3. **ラベル**: GitHub Issueラベル
4. **スコープ / 作業項目**: 実装する機能の詳細
5. **ゴール / 完了条件（AC）**: 受け入れ基準（チェックリスト形式）
6. **テスト観点**: テスト方法と検証手順
7. **要確認事項**: 未決定事項や疑問点
8. **参考資料**: 関連ドキュメントへのリンク

## ラベル定義

- `phase-0` 〜 `phase-6`: 各フェーズ
- `backend`: バックエンド実装
- `frontend`: フロントエンド実装
- `database`: データベース関連
- `auth`: 認証・認可
- `test`: テスト関連
- `infra`: インフラ・デプロイ
- `security`: セキュリティ関連
- `documentation`: ドキュメント作成

## 進捗管理

GitHubプロジェクトボードまたはIssuesページで進捗を管理してください。

---

**作成日**: 2025年11月1日
**更新日**: 2025年11月1日
