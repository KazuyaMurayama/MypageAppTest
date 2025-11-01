# Issue #25: filesコレクション設計とセキュリティルール

## 背景 / 目的
Firestoreにfilesコレクションを作成し、Firebase Storageと連携する。ファイル管理の基盤を構築し、セキュリティルールを設定する。

- **依存**: #2
- **ラベル**: `backend`, `database`, `storage`, `phase-3`

## スコープ / 作業項目

### Firestoreスキーマ
- [ ] Firestore に files コレクション作成
- [ ] フィールド: user_id, file_name, file_path, file_type, file_size, uploaded_at
- [ ] Firebase Storage バケット作成（applicants/, jobs/）
- [ ] Storage Security Rules 設定（認証済みユーザーのみアップロード可能）
- [ ] ファイルサイズ制限（300MB）設定
- [ ] ファイル形式制限（PDF, Word, Excel）設定

## ゴール / 完了条件（Acceptance Criteria）

- [ ] Firestore に files コレクションが作成されている
- [ ] フィールド: user_id, file_name, file_path, file_type, file_size, uploaded_at が定義されている
- [ ] Firebase Storage バケット（applicants/, jobs/）が作成されている
- [ ] Storage Security Rules が設定され、認証済みユーザーのみアップロード可能
- [ ] ファイルサイズ制限（300MB）が設定されている
- [ ] ファイル形式制限（PDF, Word, Excel）が設定されている

## テスト観点

### 検証方法
（実装時に詳細化）

## 要確認事項

（必要に応じて追加）

## 参考資料

- [実装計画](../docs/08_implementation_plan.md)
- [要件定義書](../docs/01_requirements.md)
- [アーキテクチャ設計書](../docs/02_architecture.md)
