# Issue #40: リアルタイム通知（Firebase Cloud Messaging）

## 背景 / 目的
Firebase Cloud Messagingを使ったリアルタイム通知を実装する。ユーザーに即座に通知を届ける機能を提供する。

- **依存**: #39
- **ラベル**: `backend`, `frontend`, `notification`, `phase-5`

## スコープ / 作業項目

### Firebase Cloud Messaging
- [ ] Firebase Cloud Messaging SDK 統合
- [ ] ブラウザでプッシュ通知許可リクエスト
- [ ] バックエンドから通知送信機能実装
- [ ] フォアグラウンド通知表示
- [ ] バックグラウンド通知表示
- [ ] 通知クリックで該当画面へ遷移
- [ ] 通知設定画面（オン/オフ切り替え）

## ゴール / 完了条件（Acceptance Criteria）

- [ ] Firebase Cloud Messaging SDK が統合されている
- [ ] ブラウザでプッシュ通知許可リクエストが表示される
- [ ] バックエンドから通知送信機能が実装されている
- [ ] フォアグラウンド通知が表示される
- [ ] バックグラウンド通知が表示される
- [ ] 通知クリックで該当画面へ遷移する
- [ ] 通知設定画面（オン/オフ切り替え）が実装されている

## テスト観点

### 検証方法
（実装時に詳細化）

## 要確認事項

（必要に応じて追加）

## 参考資料

- [実装計画](../docs/08_implementation_plan.md)
- [要件定義書](../docs/01_requirements.md)
- [アーキテクチャ設計書](../docs/02_architecture.md)
