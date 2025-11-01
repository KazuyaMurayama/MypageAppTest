# Issue #38: 通知API実装

## 背景 / 目的
通知の取得・既読更新APIを実装する。ユーザーが通知を確認し、既読にできる機能を提供する。

- **依存**: #37
- **ラベル**: `backend`, `api`, `phase-5`

## スコープ / 作業項目

### 通知API
- [ ] GET /api/v1/applicant/notifications エンドポイント実装
- [ ] PUT /api/v1/applicant/notifications/:id/read エンドポイント実装
- [ ] 未読通知数取得エンドポイント実装
- [ ] ページネーション対応
- [ ] 未読フィルタリング機能
- [ ] 通知作成ヘルパー関数実装

## ゴール / 完了条件（Acceptance Criteria）

- [ ] GET /api/v1/applicant/notifications エンドポイントが実装されている
- [ ] PUT /api/v1/applicant/notifications/:id/read エンドポイントが実装されている
- [ ] 未読通知数取得エンドポイントが実装されている
- [ ] ページネーションが対応している
- [ ] 未読フィルタリング機能が実装されている
- [ ] 通知作成ヘルパー関数が実装されている

## テスト観点

### 検証方法
（実装時に詳細化）

## 要確認事項

（必要に応じて追加）

## 参考資料

- [実装計画](../docs/08_implementation_plan.md)
- [要件定義書](../docs/01_requirements.md)
- [アーキテクチャ設計書](../docs/02_architecture.md)
