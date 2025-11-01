# Issue #32: 求人情報管理API実装

## 背景 / 目的
求人情報のCRUD APIを実装する。エージェントが求人を管理できる機能を提供する。

- **依存**: #31
- **ラベル**: `backend`, `api`, `agent`, `phase-4`

## スコープ / 作業項目

### 求人CRUD API
- [ ] POST /api/v1/agent/jobs エンドポイント実装
- [ ] GET /api/v1/agent/jobs エンドポイント実装（一覧）
- [ ] GET /api/v1/agent/jobs/:id エンドポイント実装（詳細）
- [ ] PUT /api/v1/agent/jobs/:id エンドポイント実装（更新）
- [ ] DELETE /api/v1/agent/jobs/:id エンドポイント実装（削除）
- [ ] バリデーション（タイトル、企業名、雇用形態）
- [ ] API仕様書と整合性確認

## ゴール / 完了条件（Acceptance Criteria）

- [ ] POST /api/v1/agent/jobs エンドポイントが実装されている
- [ ] GET /api/v1/agent/jobs エンドポイント（一覧）が実装されている
- [ ] GET /api/v1/agent/jobs/:id エンドポイント（詳細）が実装されている
- [ ] PUT /api/v1/agent/jobs/:id エンドポイント（更新）が実装されている
- [ ] DELETE /api/v1/agent/jobs/:id エンドポイント（削除）が実装されている
- [ ] バリデーション（タイトル、企業名、雇用形態）が実装されている
- [ ] API仕様書と整合性がある

## テスト観点

### 検証方法
（実装時に詳細化）

## 要確認事項

（必要に応じて追加）

## 参考資料

- [実装計画](../docs/08_implementation_plan.md)
- [要件定義書](../docs/01_requirements.md)
- [アーキテクチャ設計書](../docs/02_architecture.md)
