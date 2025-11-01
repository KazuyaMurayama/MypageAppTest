# Issue #2: Firestore データベーススキーマ初期設定

## 背景 / 目的
Walking Skeleton実装のため、Firestoreに基本的なデータ構造（users, applicants コレクション）を作成し、シードデータを投入する必要がある。認証APIとの連携テストを可能にするため、テストユーザーの登録も行う。

- **依存**: #1
- **ラベル**: `backend`, `database`, `phase-0`

## スコープ / 作業項目

### Firestoreコレクション設計
- [ ] `users` コレクション作成
  - フィールド: id, email, password_hash, role, last_login_at, created_at, updated_at
- [ ] `applicants` コレクション作成
  - フィールド: id, user_id, name, name_kana, phone, postal_code, address, birth_date, gender, education, work_history, skills, certifications, self_pr, desired_conditions, status, created_at, updated_at

### Security Rules設定
- [ ] Firestore Security Rules の初期設定
  - 認証済みユーザーのみ読み書き可能
  - users: 自分のドキュメントのみ読み書き可能
  - applicants: 自分のドキュメントまたはエージェントのみ読み書き可能

### シードデータ投入
- [ ] シードデータ投入スクリプト（seed.js）作成
- [ ] テストユーザー登録
  - 応募者ユーザー: applicant@example.com
  - エージェントユーザー: agent@example.com

### ドキュメント
- [ ] データベーススキーマドキュメント作成（Firestore版）
- [ ] シードデータ投入手順をREADMEに記載

## ゴール / 完了条件（Acceptance Criteria）

- [ ] Firestore に `users` コレクションが作成され、必要なフィールドが定義されている
- [ ] Firestore に `applicants` コレクションが作成され、DB設計書に基づくフィールドが定義されている
- [ ] シードデータ投入スクリプト（`backend/scripts/seed.js`）が作成され、実行できる
- [ ] テストユーザー（応募者1名、エージェント1名）が Firestore に登録され、Firebase Authentication にも登録されている
- [ ] Firestore Security Rules の初期設定が完了し、認証済みユーザーのみ読み書き可能になっている
- [ ] `backend/docs/firestore-schema.md` にスキーマ定義が記載されている

## テスト観点

### Firestoreコレクション確認
- Firebase Console でコレクション・フィールドが正しく作成されているか確認
- ドキュメントIDの形式確認（自動生成 vs カスタムID）

### シードデータ確認
- `npm run seed` コマンド実行
- Firebase Console でテストユーザーが登録されているか確認
- 各フィールドに正しい型・値が入っているか確認
- 検証方法: Firestore エミュレータまたは本番Firebase Console

### Security Rules テスト
- 未認証ユーザーでアクセス → 403 エラー
- 認証済みユーザーで自分のドキュメントにアクセス → 成功
- 認証済みユーザーで他人のドキュメントにアクセス → 403 エラー
- エージェントで全applicantsにアクセス → 成功
- 検証方法: Firebase Security Rules Simulator

## 要確認事項

- [ ] Firestore のドキュメントIDは自動生成（Auto-ID）を使用するか、カスタムID（email等）を使用するか？（推奨: Auto-ID）
- [ ] シードデータのパスワードはハッシュ化するか、平文で保存するか？（推奨: bcrypt でハッシュ化）
- [ ] Firestore インデックスは手動作成するか、自動作成に任せるか？
- [ ] テストユーザーのメールアドレスは実在するメールアドレスを使用するか？

## 参考資料

- [データベース設計書](../docs/03_database.md)
- [Firebase Security Rules ドキュメント](https://firebase.google.com/docs/firestore/security/get-started)
- [Firestore データモデリング](https://firebase.google.com/docs/firestore/data-model)
