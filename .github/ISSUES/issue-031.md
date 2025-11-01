# Issue #31: job_applicantsコレクション設計

## 背景 / 目的
求人と応募者の紐付けを管理するコレクションを作成する。求人応募のワークフロー管理の基盤を構築する。

- **依存**: #2
- **ラベル**: `backend`, `database`, `phase-4`

## スコープ / 作業項目

### Firestoreスキーマ
- [ ] Firestore に job_applicants コレクション作成
- [ ] フィールド: job_id, applicant_id, applied_at, status, notes
- [ ] 複合インデックス（job_id + applicant_id）作成
- [ ] Security Rules 設定（エージェントのみ作成可能）
- [ ] ステータス ENUM（applied, screening, interview, offer, accepted, rejected）

## ゴール / 完了条件（Acceptance Criteria）

- [ ] Firestore に job_applicants コレクションが作成されている
- [ ] フィールド: job_id, applicant_id, applied_at, status, notes が定義されている
- [ ] 複合インデックス（job_id + applicant_id）が作成されている
- [ ] Security Rules が設定され、エージェントのみ作成可能
- [ ] ステータス ENUM（applied, screening, interview, offer, accepted, rejected）が定義されている

## テスト観点

### 検証方法
（実装時に詳細化）

## 要確認事項

（必要に応じて追加）

## 参考資料

- [実装計画](../docs/08_implementation_plan.md)
- [要件定義書](../docs/01_requirements.md)
- [アーキテクチャ設計書](../docs/02_architecture.md)
