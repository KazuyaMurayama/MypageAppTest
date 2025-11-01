# Issue #18: 応募者一覧取得API実装

## 背景 / 目的
エージェントが応募者一覧を取得できるAPIエンドポイントを実装する。ページネーション、フィルタリング、ソート機能を提供する。

- **依存**: #17
- **ラベル**: `backend`, `api`, `agent`, `phase-2`

## スコープ / 作業項目

### 応募者一覧API
- [ ] GET /api/v1/agent/applicants エンドポイント実装
- [ ] クエリパラメータ（page, limit, status, sort_by）に対応
- [ ] ページネーション実装（デフォルト20件/ページ）
- [ ] ステータスフィルタリング機能
- [ ] ソート機能（name, created_at, updated_at）
- [ ] レスポンスに pagination 情報含む
- [ ] API仕様書と整合性確認

## ゴール / 完了条件（Acceptance Criteria）

- [ ] GET /api/v1/agent/applicants エンドポイントが実装されている
- [ ] クエリパラメータ（page, limit, status, sort_by）に対応している
- [ ] ページネーションが実装されている（デフォルト20件/ページ）
- [ ] ステータスフィルタリング機能が動作する
- [ ] ソート機能（name, created_at, updated_at）が動作する
- [ ] レスポンスに pagination 情報が含まれている
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
