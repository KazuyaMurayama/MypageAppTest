# Issue #37: notificationsコレクション設計

## 背景 / 目的
通知機能のためのコレクションを作成する。ユーザーへの通知を管理し、未読/既読の状態を追跡する。

- **依存**: #2
- **ラベル**: `backend`, `database`, `phase-5`

## スコープ / 作業項目

### Firestoreスキーマ
- [ ] Firestore に notifications コレクション作成
- [ ] フィールド: user_id, type, title, message, is_read, read_at, created_at
- [ ] インデックス（user_id + is_read）作成
- [ ] Security Rules 設定（自分の通知のみ閲覧可能）
- [ ] 通知タイプ ENUM（new_job, status_change, new_message, system）

## ゴール / 完了条件（Acceptance Criteria）

- [ ] Firestore に notifications コレクションが作成されている
- [ ] フィールド: user_id, type, title, message, is_read, read_at, created_at が定義されている
- [ ] インデックス（user_id + is_read）が作成されている
- [ ] Security Rules が設定され、自分の通知のみ閲覧可能
- [ ] 通知タイプ ENUM（new_job, status_change, new_message, system）が定義されている

## テスト観点

### 検証方法
（実装時に詳細化）

## 要確認事項

（必要に応じて追加）

## 参考資料

- [実装計画](../docs/08_implementation_plan.md)
- [要件定義書](../docs/01_requirements.md)
- [アーキテクチャ設計書](../docs/02_architecture.md)
