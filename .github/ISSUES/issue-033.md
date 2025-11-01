# Issue #33: 全文検索API実装

## 背景 / 目的
FirestoreまたはAlgoliaを使った全文検索APIを実装する。エージェントが応募者を効率的に検索できる機能を提供する。

- **依存**: #18
- **ラベル**: `backend`, `api`, `search`, `phase-4`

## スコープ / 作業項目

### 全文検索API
- [ ] POST /api/v1/agent/search エンドポイント実装
- [ ] 検索フィールド: work_history, skills, certifications, self_pr
- [ ] AND/OR/NOT 検索対応
- [ ] 部分一致・前方一致検索
- [ ] 検索結果ハイライト機能
- [ ] ページネーション対応
- [ ] 検索時間が1秒以内（99名のデータ）

## ゴール / 完了条件（Acceptance Criteria）

- [ ] POST /api/v1/agent/search エンドポイントが実装されている
- [ ] 検索フィールド（work_history, skills, certifications, self_pr）が検索対象
- [ ] AND/OR/NOT 検索が対応している
- [ ] 部分一致・前方一致検索が動作する
- [ ] 検索結果ハイライト機能が実装されている
- [ ] ページネーションが対応している
- [ ] 検索時間が1秒以内（99名のデータ）

## テスト観点

### 検証方法
（実装時に詳細化）

## 要確認事項

（必要に応じて追加）

## 参考資料

- [実装計画](../docs/08_implementation_plan.md)
- [要件定義書](../docs/01_requirements.md)
- [アーキテクチャ設計書](../docs/02_architecture.md)
