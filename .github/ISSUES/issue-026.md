# Issue #26: ファイルアップロードAPI実装

## 背景 / 目的
ファイルアップロード用のAPIエンドポイントを実装する。multipart/form-dataを扱い、Firebase Storageへのアップロードとメタデータ保存を行う。

- **依存**: #25
- **ラベル**: `backend`, `api`, `file`, `phase-3`

## スコープ / 作業項目

### アップロードAPI
- [ ] POST /api/v1/files/upload エンドポイント実装
- [ ] multipart/form-data 形式のファイル受信
- [ ] Firebase Storage へのアップロード
- [ ] Firestore に ファイルメタデータ保存
- [ ] ファイル形式・サイズのバリデーション
- [ ] ウイルススキャン（ClamAV）統合（将来機能のプレースホルダー）
- [ ] エラーハンドリング（413, 400）

## ゴール / 完了条件（Acceptance Criteria）

- [ ] POST /api/v1/files/upload エンドポイントが実装されている
- [ ] multipart/form-data 形式のファイルが受信できる
- [ ] Firebase Storage へのアップロードが成功する
- [ ] Firestore に ファイルメタデータが保存される
- [ ] ファイル形式・サイズのバリデーションが動作する
- [ ] ウイルススキャン統合のプレースホルダーが用意されている
- [ ] エラーハンドリング（413, 400）が適切に実装されている

## テスト観点

### 検証方法
（実装時に詳細化）

## 要確認事項

（必要に応じて追加）

## 参考資料

- [実装計画](../docs/08_implementation_plan.md)
- [要件定義書](../docs/01_requirements.md)
- [アーキテクチャ設計書](../docs/02_architecture.md)
