# Issue #3: 認証API実装（ログイン・ログアウト）

## 背景 / 目的
ユーザー認証機能はシステムの基盤となる機能であり、応募者・エージェント両方が使用する。Firebase Authentication を使った認証APIエンドポイントを実装し、セッション管理の仕組みを確立する。

- **依存**: #1, #2
- **ラベル**: `backend`, `auth`, `phase-0`

## スコープ / 作業項目

### 認証エンドポイント実装
- [ ] `POST /api/v1/auth/login` エンドポイント実装
  - メールアドレス・パスワード認証
  - Firebase Authentication との連携
  - セッショントークン発行
- [ ] `POST /api/v1/auth/logout` エンドポイント実装
  - セッション無効化
- [ ] `GET /api/v1/auth/me` エンドポイント実装
  - 現在のユーザー情報取得
  - セッション検証

### ミドルウェア実装
- [ ] 認証ミドルウェア（`authMiddleware.js`）作成
  - Firebase Admin SDK を使ったセッション検証
  - リクエストヘッダーからトークン取得
  - ユーザー情報を `req.user` に格納
- [ ] エラーハンドリングミドルウェア作成
  - 401 Unauthorized
  - 400 Bad Request
  - 500 Internal Server Error

### バリデーション
- [ ] ログインリクエストのバリデーション
  - email: RFC準拠のメールアドレス形式
  - password: 8文字以上
- [ ] express-validator を使ったバリデーション実装

### テスト
- [ ] 単体テスト（Jest）作成
  - ログイン成功パターン
  - ログイン失敗パターン（メール不正、パスワード不正）
  - ログアウト成功パターン
  - 認証ミドルウェアのテスト

## ゴール / 完了条件（Acceptance Criteria）

- [ ] `POST /api/v1/auth/login` エンドポイントが実装され、正しいメール・パスワードでログイン成功する
- [ ] `POST /api/v1/auth/logout` エンドポイントが実装され、セッションが無効化される
- [ ] `GET /api/v1/auth/me` エンドポイントが実装され、認証済みユーザー情報が取得できる
- [ ] Firebase Admin SDK を使ったセッション検証ミドルウェアが実装され、保護されたエンドポイントで動作する
- [ ] エラーハンドリング（401, 400）が適切に実装され、エラーメッセージがJSON形式で返される
- [ ] Postman または curl でAPIテストが成功する
- [ ] API仕様書（04_api.md）に記載内容と実装が整合している

## テスト観点

### ユニットテスト（Jest）
- ログイン成功テスト
  ```javascript
  POST /api/v1/auth/login
  Body: { email: "applicant@example.com", password: "password123" }
  Expected: 200 OK + { user: {...}, token: "..." }
  ```
- ログイン失敗テスト（メール不正）
  ```javascript
  POST /api/v1/auth/login
  Body: { email: "invalid@example.com", password: "password123" }
  Expected: 401 Unauthorized
  ```
- ログアウト成功テスト
  ```javascript
  POST /api/v1/auth/logout
  Headers: { Authorization: "Bearer <token>" }
  Expected: 200 OK + { message: "ログアウトしました" }
  ```

### リクエストテスト（Postman/curl）
- 認証なしで保護されたエンドポイントにアクセス → 401
- 認証ありで保護されたエンドポイントにアクセス → 200
- 無効なトークンでアクセス → 401
- 検証方法: Postman Collection 作成

### セキュリティテスト
- パスワードがログに出力されないか確認
- トークンが適切に暗号化されているか確認
- HTTPS でのみ動作するか確認（本番環境）

## 要確認事項

- [ ] セッション管理方法: Cookie vs JWT どちらを使用するか？（推奨: Cookie + HttpOnly）
- [ ] トークンの有効期限は何時間にするか？（推奨: 24時間）
- [ ] リフレッシュトークンは実装するか？
- [ ] ログイン試行回数制限（ブルートフォース対策）は実装するか？

## 参考資料

- [API設計書](../docs/04_api.md) - 3. 認証API
- [アーキテクチャ設計書](../docs/02_architecture.md) - 5.1 認証・認可の仕組み
- [Firebase Authentication ドキュメント](https://firebase.google.com/docs/auth)
