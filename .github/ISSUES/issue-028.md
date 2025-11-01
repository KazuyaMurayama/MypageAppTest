# Issue #28: ファイルダウンロード機能実装

## 背景 / 目的
ファイルをダウンロードできる機能を実装する。認証・権限チェックを行い、安全なダウンロードを提供する。

- **依存**: #27
- **ラベル**: `backend`, `frontend`, `file`, `phase-3`

## スコープ / 作業項目

### ダウンロードAPI
- [ ] GET /api/v1/files/:id/download エンドポイント実装
- [ ] Firebase Storage から署名付きURLを取得
- [ ] 認証・権限チェック（自分のファイルまたはエージェント）
- [ ] Content-Disposition ヘッダー設定

### ダウンロードUI
- [ ] ダウンロードボタンクリックでファイルダウンロード
- [ ] ダウンロード失敗時にエラーメッセージ表示

## ゴール / 完了条件（Acceptance Criteria）

- [ ] GET /api/v1/files/:id/download エンドポイントが実装されている
- [ ] Firebase Storage から署名付きURLが取得できる
- [ ] 認証・権限チェック（自分のファイルまたはエージェント）が動作する
- [ ] Content-Disposition ヘッダーが設定されている
- [ ] ダウンロードボタンクリックでファイルがダウンロードされる
- [ ] ダウンロード失敗時にエラーメッセージが表示される

## テスト観点

### 検証方法
（実装時に詳細化）

## 要確認事項

（必要に応じて追加）

## 参考資料

- [実装計画](../docs/08_implementation_plan.md)
- [要件定義書](../docs/01_requirements.md)
- [アーキテクチャ設計書](../docs/02_architecture.md)
