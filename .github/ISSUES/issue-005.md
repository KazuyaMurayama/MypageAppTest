# Issue #5: React初期化とルーティング設定

## 背景 / 目的
Walking Skeleton実装のため、React RouterとReact Hook Form、共通レイアウトを設定する。認証状態管理とルーティングの基盤を確立することで、後続の画面実装をスムーズに進められる。

- **依存**: #1
- **ラベル**: `frontend`, `setup`, `phase-0`

## スコープ / 作業項目

### React Router設定
- [ ] React Router v6 インストール・設定
- [ ] ルート定義（/login, /dashboard, /applicant/*, /agent/*）
- [ ] プライベートルート（認証必須）の実装
- [ ] 公開ルート（/login）の実装

### 状態管理
- [ ] Context API または Redux Toolkit で認証状態管理
- [ ] ログイン状態の永続化（LocalStorage）
- [ ] 認証トークンの管理

### 共通レイアウト
- [ ] Header コンポーネント作成
- [ ] Sidebar コンポーネント作成
- [ ] Footer コンポーネント作成
- [ ] レイアウトコンポーネント作成

### Axios設定
- [ ] Axios インスタンス作成
- [ ] ベースURL設定（環境変数）
- [ ] インターセプター設定（認証トークン自動付与）
- [ ] エラーハンドリング

## ゴール / 完了条件（Acceptance Criteria）

- [ ] React Router v6 がインストール・設定され、ルーティングが動作する
- [ ] Context API または Redux Toolkit で認証状態管理が実装されている
- [ ] 共通レイアウトコンポーネント（Header, Sidebar, Footer）が作成されている
- [ ] プライベートルート（認証必須）が実装され、未認証時に/loginへリダイレクトする
- [ ] 公開ルート（/login）と認証後ルート（/dashboard）が分離されている
- [ ] Bootstrap テンプレートが導入され、基本的なUIが整っている
- [ ] Axios インスタンスが設定され、ベースURLとインターセプターが動作する

## テスト観点

### 検証方法
（実装時に詳細化）

## 要確認事項

（必要に応じて追加）

## 参考資料

- [実装計画](../docs/08_implementation_plan.md)
- [要件定義書](../docs/01_requirements.md)
- [アーキテクチャ設計書](../docs/02_architecture.md)
