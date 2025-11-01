# Issue #9: 応募者情報取得・更新API実装

## 背景 / 目的
Phase 1（応募者マイページMVP）の開始として、応募者が自身のプロフィール情報を取得・更新できるAPIエンドポイントを実装する。これにより応募者が自分の情報を管理できるようになる。

- **依存**: #3
- **ラベル**: `backend`, `api`, `phase-1`

## スコープ / 作業項目

### APIエンドポイント実装
- [ ] `GET /api/v1/applicant/me` エンドポイント実装
  - 認証ミドルウェア適用
  - Firestoreから applicants コレクション取得
  - ユーザー情報とマージして返却
- [ ] `PUT /api/v1/applicant/me` エンドポイント実装
  - 認証ミドルウェア適用
  - リクエストボディのバリデーション
  - Firestoreへデータ更新
  - 更新日時の自動設定

### バリデーション実装
- [ ] 必須フィールドチェック（name, phone, birth_date）
- [ ] 電話番号形式チェック（10-11桁数字）
- [ ] 生年月日形式チェック（YYYY-MM-DD）
- [ ] 文字数制限チェック
  - name: 1-50文字
  - work_history: 1-2000文字
  - skills: 1-500文字
  - self_pr: 1-1000文字

### エラーハンドリング
- [ ] 400 Bad Request（バリデーションエラー）
- [ ] 401 Unauthorized（未認証）
- [ ] 403 Forbidden（権限なし - エージェントがアクセス）
- [ ] 404 Not Found（応募者情報が存在しない）
- [ ] 500 Internal Server Error

### ユニットテスト
- [ ] GET /api/v1/applicant/me の成功テスト
- [ ] PUT /api/v1/applicant/me の成功テスト
- [ ] バリデーションエラーテスト
- [ ] 権限エラーテスト（エージェントがアクセス）

## ゴール / 完了条件（Acceptance Criteria）

- [ ] `GET /api/v1/applicant/me` エンドポイントが実装され、認証済み応募者の情報が取得できる
- [ ] `PUT /api/v1/applicant/me` エンドポイントが実装され、応募者情報が更新できる
- [ ] 認証ミドルウェアで応募者（role=applicant）のみアクセス可能に制限されている
- [ ] バリデーション（氏名・電話番号・生年月日）が実装され、不正な値でエラーが返される
- [ ] Firestore へのデータ保存・更新が成功し、updated_at が自動更新される
- [ ] API仕様書（04_api.md）と実装が整合している
- [ ] 単体テスト（Jest）が作成され、全てパスする

## テスト観点

### ユニットテスト（Jest）
```javascript
describe('GET /api/v1/applicant/me', () => {
  test('should return applicant info', async () => {
    const response = await request(app)
      .get('/api/v1/applicant/me')
      .set('Authorization', 'Bearer <applicant_token>');
    expect(response.status).toBe(200);
    expect(response.body.applicant).toHaveProperty('name');
  });

  test('should return 403 for agent', async () => {
    const response = await request(app)
      .get('/api/v1/applicant/me')
      .set('Authorization', 'Bearer <agent_token>');
    expect(response.status).toBe(403);
  });
});

describe('PUT /api/v1/applicant/me', () => {
  test('should update applicant info', async () => {
    const response = await request(app)
      .put('/api/v1/applicant/me')
      .set('Authorization', 'Bearer <applicant_token>')
      .send({ name: '山田太郎', phone: '09012345678' });
    expect(response.status).toBe(200);
  });

  test('should return 400 for invalid phone', async () => {
    const response = await request(app)
      .put('/api/v1/applicant/me')
      .set('Authorization', 'Bearer <applicant_token>')
      .send({ phone: 'invalid' });
    expect(response.status).toBe(400);
  });
});
```

### リクエストテスト（Postman）
- 正常系: 応募者で情報取得・更新
- 異常系: エージェントでアクセス → 403
- 異常系: 未認証でアクセス → 401
- 異常系: 不正な電話番号で更新 → 400

## 要確認事項

- [ ] 応募者情報が存在しない場合（初回ログイン時）の動作は？
  - 自動で空の applicants ドキュメント作成 vs 404エラー
- [ ] 部分更新（PATCH）vs 全体更新（PUT）どちらを採用するか？（推奨: PUT）
- [ ] 職歴・スキル等の任意項目は空文字列とnullどちらで保存するか？
- [ ] updated_atはクライアント側で指定するか、サーバー側で自動設定するか？（推奨: サーバー側）

## 参考資料

- [API設計書](../docs/04_api.md) - 4.1 応募者情報取得, 4.2 応募者情報更新
- [データベース設計書](../docs/03_database.md) - 4.2 applicants テーブル
- [要件定義書](../docs/01_requirements.md) - 5.2 応募者情報の登録・編集
