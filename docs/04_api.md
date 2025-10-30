# API設計書 - 人材エージェントマイページシステム

## 1. 改訂履歴

| 版数 | 日付 | 更新者 | 更新内容 |
|------|------|--------|----------|
| 1.0 | 2025/10/17 | 開発チーム | 初版作成 |

## 2. API概要

### 2.1 API設計方針

- **REST API**: RESTful な設計に準拠
- **JSON形式**: リクエスト・レスポンスはJSON形式
- **HTTPステータスコード**: 標準的なHTTPステータスコードを使用
- **認証**: セッションベース認証（Cookie）
- **HTTPS必須**: 全ての通信はHTTPS

### 2.2 ベースURL

```
https://example.com/api/v1
```

### 2.3 共通ヘッダー

#### リクエストヘッダー
```
Content-Type: application/json
Cookie: session_id=xxxxx
X-CSRF-Token: xxxxx  (POST/PUT/DELETEの場合)
```

#### レスポンスヘッダー
```
Content-Type: application/json; charset=utf-8
X-Request-ID: uuid
```

### 2.4 HTTPステータスコード

| ステータスコード | 意味 | 使用例 |
|---------------|------|--------|
| 200 OK | 成功 | GET, PUT成功時 |
| 201 Created | 作成成功 | POST成功時 |
| 204 No Content | 成功（レスポンスボディなし） | DELETE成功時 |
| 400 Bad Request | リクエストエラー | バリデーションエラー |
| 401 Unauthorized | 未認証 | ログインが必要 |
| 403 Forbidden | 権限なし | アクセス権限がない |
| 404 Not Found | リソースが存在しない | 該当データなし |
| 409 Conflict | 競合 | 重複登録等 |
| 422 Unprocessable Entity | 処理不可 | ビジネスロジックエラー |
| 500 Internal Server Error | サーバーエラー | 予期しないエラー |

### 2.5 エラーレスポンス形式

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ",
    "details": [
      {
        "field": "email",
        "message": "メールアドレスの形式が正しくありません"
      }
    ]
  }
}
```

## 3. 認証API

### 3.1 ログイン

**エンドポイント**: `POST /api/v1/auth/login`

#### 概要
メールアドレスとパスワードでログインし、セッションを開始する。

#### リクエスト
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### レスポンス（成功）
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "applicant",
    "last_login_at": "2025-10-17T12:00:00Z"
  }
}
```

#### ステータスコード
- 200: ログイン成功
- 400: リクエストエラー
- 401: メールアドレスまたはパスワードが間違っている

---

### 3.2 ログアウト

**エンドポイント**: `POST /api/v1/auth/logout`

#### 概要
現在のセッションを終了する。

#### リクエスト
```json
{}
```

#### レスポンス（成功）
```json
{
  "message": "ログアウトしました"
}
```

#### ステータスコード
- 200: ログアウト成功
- 401: 未認証

---

### 3.3 現在のユーザー情報取得

**エンドポイント**: `GET /api/v1/auth/me`

#### 概要
現在ログイン中のユーザー情報を取得する。

#### リクエスト
なし（Cookieでセッション認証）

#### レスポンス（成功）
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "applicant",
    "created_at": "2025-01-01T00:00:00Z",
    "last_login_at": "2025-10-17T12:00:00Z"
  }
}
```

#### ステータスコード
- 200: 取得成功
- 401: 未認証

---

### 3.4 パスワード変更

**エンドポイント**: `PUT /api/v1/auth/password`

#### 概要
現在のパスワードを新しいパスワードに変更する。

#### リクエスト
```json
{
  "current_password": "old_password",
  "new_password": "new_password123",
  "new_password_confirmation": "new_password123"
}
```

#### レスポンス（成功）
```json
{
  "message": "パスワードを変更しました"
}
```

#### ステータスコード
- 200: 変更成功
- 400: バリデーションエラー
- 401: 現在のパスワードが間違っている

---

## 4. 応募者マイページAPI

### 4.1 応募者情報取得

**エンドポイント**: `GET /api/v1/applicant/me`

#### 概要
ログイン中の応募者の詳細情報を取得する。

#### 権限
応募者のみ

#### リクエスト
なし

#### レスポンス（成功）
```json
{
  "applicant": {
    "id": 1,
    "user_id": 1,
    "name": "山田太郎",
    "name_kana": "ヤマダタロウ",
    "phone": "09012345678",
    "postal_code": "123-4567",
    "address": "東京都渋谷区xxx",
    "birth_date": "1990-01-01",
    "gender": "male",
    "education": "〇〇大学 工学部",
    "work_history": "2015年4月 株式会社ABC入社...",
    "skills": "Python, JavaScript, AWS...",
    "certifications": "応用情報技術者, TOEIC 800点",
    "self_pr": "主にバックエンド開発を...",
    "desired_conditions": "リモートワーク可能な環境...",
    "status": "applying",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-10-17T12:00:00Z"
  }
}
```

#### ステータスコード
- 200: 取得成功
- 401: 未認証
- 403: 権限なし（エージェントはアクセス不可）
- 404: 応募者情報が存在しない

---

### 4.2 応募者情報更新

**エンドポイント**: `PUT /api/v1/applicant/me`

#### 概要
ログイン中の応募者の情報を更新する。

#### 権限
応募者のみ

#### リクエスト
```json
{
  "name": "山田太郎",
  "name_kana": "ヤマダタロウ",
  "phone": "09012345678",
  "postal_code": "123-4567",
  "address": "東京都渋谷区xxx",
  "birth_date": "1990-01-01",
  "gender": "male",
  "education": "〇〇大学 工学部",
  "work_history": "2015年4月 株式会社ABC入社...",
  "skills": "Python, JavaScript, AWS...",
  "certifications": "応用情報技術者, TOEIC 800点",
  "self_pr": "主にバックエンド開発を...",
  "desired_conditions": "リモートワーク可能な環境..."
}
```

#### レスポンス（成功）
```json
{
  "applicant": {
    "id": 1,
    "user_id": 1,
    "name": "山田太郎",
    "name_kana": "ヤマダタロウ",
    "phone": "09012345678",
    "postal_code": "123-4567",
    "address": "東京都渋谷区xxx",
    "birth_date": "1990-01-01",
    "gender": "male",
    "education": "〇〇大学 工学部",
    "work_history": "2015年4月 株式会社ABC入社...",
    "skills": "Python, JavaScript, AWS...",
    "certifications": "応用情報技術者, TOEIC 800点",
    "self_pr": "主にバックエンド開発を...",
    "desired_conditions": "リモートワーク可能な環境...",
    "status": "applying",
    "updated_at": "2025-10-17T13:00:00Z"
  }
}
```

#### ステータスコード
- 200: 更新成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし

---

### 4.3 求人情報一覧取得

**エンドポイント**: `GET /api/v1/applicant/jobs`

#### 概要
応募者に紐付けられた求人情報の一覧を取得する。

#### 権限
応募者のみ

#### クエリパラメータ
- `page`: ページ番号（デフォルト: 1）
- `limit`: 1ページあたりの件数（デフォルト: 20）
- `status`: 求人ステータス（active, closed）

#### リクエスト例
```
GET /api/v1/applicant/jobs?page=1&limit=20&status=active
```

#### レスポンス（成功）
```json
{
  "jobs": [
    {
      "id": 1,
      "title": "バックエンドエンジニア募集",
      "company_name": "株式会社ABC",
      "description": "Python/Djangoを使った開発",
      "employment_type": "full_time",
      "location": "東京都渋谷区",
      "salary_min": 5000000,
      "salary_max": 8000000,
      "required_skills": "Python, Django, AWS",
      "preferred_skills": "Docker, Kubernetes",
      "status": "active",
      "applied_at": "2025-10-15T10:00:00Z",
      "application_status": "screening"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 3,
    "total_count": 45,
    "limit": 20
  }
}
```

#### ステータスコード
- 200: 取得成功
- 401: 未認証
- 403: 権限なし

---

### 4.4 求人詳細取得

**エンドポイント**: `GET /api/v1/applicant/jobs/:id`

#### 概要
特定の求人の詳細情報を取得する。

#### 権限
応募者のみ（自分に紐付けられた求人のみ）

#### リクエスト
```
GET /api/v1/applicant/jobs/1
```

#### レスポンス（成功）
```json
{
  "job": {
    "id": 1,
    "title": "バックエンドエンジニア募集",
    "company_name": "株式会社ABC",
    "description": "Python/Djangoを使った開発...",
    "employment_type": "full_time",
    "location": "東京都渋谷区",
    "salary_min": 5000000,
    "salary_max": 8000000,
    "required_skills": "Python, Django, AWS",
    "preferred_skills": "Docker, Kubernetes",
    "status": "active",
    "created_at": "2025-10-01T00:00:00Z",
    "files": [
      {
        "id": 1,
        "file_name": "求人詳細.pdf",
        "file_size": 1024000,
        "uploaded_at": "2025-10-01T00:00:00Z"
      }
    ]
  }
}
```

#### ステータスコード
- 200: 取得成功
- 401: 未認証
- 403: 権限なし
- 404: 求人が存在しない

---

### 4.5 応募状況確認

**エンドポイント**: `GET /api/v1/applicant/applications`

#### 概要
自分の応募状況一覧を取得する。

#### 権限
応募者のみ

#### クエリパラメータ
- `page`: ページ番号（デフォルト: 1）
- `limit`: 1ページあたりの件数（デフォルト: 20）

#### レスポンス（成功）
```json
{
  "applications": [
    {
      "id": 1,
      "job": {
        "id": 1,
        "title": "バックエンドエンジニア募集",
        "company_name": "株式会社ABC"
      },
      "applied_at": "2025-10-15T10:00:00Z",
      "status": "screening",
      "notes": "書類選考中"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 2,
    "total_count": 25,
    "limit": 20
  }
}
```

#### ステータスコード
- 200: 取得成功
- 401: 未認証
- 403: 権限なし

---

### 4.6 通知一覧取得

**エンドポイント**: `GET /api/v1/applicant/notifications`

#### 概要
自分宛の通知一覧を取得する。

#### 権限
応募者のみ

#### クエリパラメータ
- `page`: ページ番号（デフォルト: 1）
- `limit`: 1ページあたりの件数（デフォルト: 20）
- `is_read`: 既読フィルター（true/false）

#### レスポンス（成功）
```json
{
  "notifications": [
    {
      "id": 1,
      "notification_type": "status_change",
      "title": "ステータスが更新されました",
      "message": "応募状況が「書類選考中」に更新されました",
      "is_read": false,
      "created_at": "2025-10-17T10:00:00Z"
    },
    {
      "id": 2,
      "notification_type": "new_job",
      "title": "新しい求人情報",
      "message": "新しい求人「フロントエンドエンジニア募集」が追加されました",
      "is_read": true,
      "read_at": "2025-10-17T11:00:00Z",
      "created_at": "2025-10-16T15:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_count": 100,
    "limit": 20
  }
}
```

#### ステータスコード
- 200: 取得成功
- 401: 未認証
- 403: 権限なし

---

### 4.7 通知を既読にする

**エンドポイント**: `PUT /api/v1/applicant/notifications/:id/read`

#### 概要
特定の通知を既読にする。

#### 権限
応募者のみ

#### リクエスト
```
PUT /api/v1/applicant/notifications/1/read
```

#### レスポンス（成功）
```json
{
  "notification": {
    "id": 1,
    "is_read": true,
    "read_at": "2025-10-17T12:00:00Z"
  }
}
```

#### ステータスコード
- 200: 更新成功
- 401: 未認証
- 403: 権限なし
- 404: 通知が存在しない

---

## 5. ファイル管理API

### 5.1 ファイルアップロード

**エンドポイント**: `POST /api/v1/files/upload`

#### 概要
履歴書や職務経歴書などのファイルをアップロードする。

#### 権限
応募者・エージェント

#### リクエスト（multipart/form-data）
```
POST /api/v1/files/upload
Content-Type: multipart/form-data

file: [ファイルデータ]
file_category: resume  (resume, job_document, other)
applicant_id: 1  (エージェントの場合は必須)
job_id: 1  (求人資料の場合は必須)
```

#### レスポンス（成功）
```json
{
  "file": {
    "id": 1,
    "file_name": "resume.pdf",
    "file_category": "resume",
    "file_type": "application/pdf",
    "file_size": 1024000,
    "virus_scan_status": "pending",
    "uploaded_at": "2025-10-17T12:00:00Z"
  }
}
```

#### ステータスコード
- 201: アップロード成功
- 400: ファイル形式エラー、サイズ超過
- 401: 未認証
- 413: ファイルサイズが大きすぎる

#### 備考
- 対応ファイル形式: PDF, Word (.doc, .docx), Excel (.xls, .xlsx)
- 最大ファイルサイズ: 300MB（応募者）、100MB（求人資料）
- ウイルススキャンは非同期で実行

---

### 5.2 ファイル一覧取得

**エンドポイント**: `GET /api/v1/files`

#### 概要
自分がアップロードしたファイルの一覧を取得する。

#### 権限
応募者・エージェント

#### クエリパラメータ
- `page`: ページ番号（デフォルト: 1）
- `limit`: 1ページあたりの件数（デフォルト: 20）
- `file_category`: ファイル種別（resume, job_document, other）
- `applicant_id`: 応募者ID（エージェントの場合のみ）

#### レスポンス（成功）
```json
{
  "files": [
    {
      "id": 1,
      "file_name": "resume.pdf",
      "file_category": "resume",
      "file_type": "application/pdf",
      "file_size": 1024000,
      "virus_scan_status": "clean",
      "uploaded_at": "2025-10-17T12:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 2,
    "total_count": 25,
    "limit": 20
  }
}
```

#### ステータスコード
- 200: 取得成功
- 401: 未認証
- 403: 権限なし

---

### 5.3 ファイルダウンロード

**エンドポイント**: `GET /api/v1/files/:id/download`

#### 概要
特定のファイルをダウンロードする。

#### 権限
応募者（自分のファイルのみ）・エージェント（全ファイル）

#### リクエスト
```
GET /api/v1/files/1/download
```

#### レスポンス（成功）
- Content-Type: application/pdf (または該当するMIMEタイプ)
- Content-Disposition: attachment; filename="resume.pdf"
- ファイルのバイナリデータ

#### ステータスコード
- 200: ダウンロード成功
- 401: 未認証
- 403: 権限なし
- 404: ファイルが存在しない

---

### 5.4 ファイル削除

**エンドポイント**: `DELETE /api/v1/files/:id`

#### 概要
特定のファイルを削除する。

#### 権限
応募者（自分のファイルのみ）・エージェント（全ファイル）

#### リクエスト
```
DELETE /api/v1/files/1
```

#### レスポンス（成功）
```json
{
  "message": "ファイルを削除しました"
}
```

#### ステータスコード
- 204: 削除成功
- 401: 未認証
- 403: 権限なし
- 404: ファイルが存在しない

---

## 6. エージェント管理API

### 6.1 応募者一覧取得

**エンドポイント**: `GET /api/v1/agent/applicants`

#### 概要
応募者の一覧を取得する（フィルタリング・ソート可能）。

#### 権限
エージェントのみ

#### クエリパラメータ
- `page`: ページ番号（デフォルト: 1）
- `limit`: 1ページあたりの件数（デフォルト: 20）
- `status`: ステータスフィルター（registered, applying, document_review, interview, offer, hired, rejected）
- `sort_by`: ソート項目（name, created_at, updated_at）
- `sort_order`: ソート順（asc, desc）

#### リクエスト例
```
GET /api/v1/agent/applicants?page=1&limit=20&status=applying&sort_by=updated_at&sort_order=desc
```

#### レスポンス（成功）
```json
{
  "applicants": [
    {
      "id": 1,
      "name": "山田太郎",
      "email": "yamada@example.com",
      "phone": "09012345678",
      "status": "applying",
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-10-17T12:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_count": 99,
    "limit": 20
  }
}
```

#### ステータスコード
- 200: 取得成功
- 401: 未認証
- 403: 権限なし（応募者はアクセス不可）

---

### 6.2 応募者詳細取得

**エンドポイント**: `GET /api/v1/agent/applicants/:id`

#### 概要
特定の応募者の詳細情報を取得する。

#### 権限
エージェントのみ

#### リクエスト
```
GET /api/v1/agent/applicants/1
```

#### レスポンス（成功）
```json
{
  "applicant": {
    "id": 1,
    "user_id": 1,
    "name": "山田太郎",
    "name_kana": "ヤマダタロウ",
    "email": "yamada@example.com",
    "phone": "09012345678",
    "postal_code": "123-4567",
    "address": "東京都渋谷区xxx",
    "birth_date": "1990-01-01",
    "gender": "male",
    "education": "〇〇大学 工学部",
    "work_history": "2015年4月 株式会社ABC入社...",
    "skills": "Python, JavaScript, AWS...",
    "certifications": "応用情報技術者, TOEIC 800点",
    "self_pr": "主にバックエンド開発を...",
    "desired_conditions": "リモートワーク可能な環境...",
    "status": "applying",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-10-17T12:00:00Z",
    "files": [
      {
        "id": 1,
        "file_name": "resume.pdf",
        "file_category": "resume",
        "file_size": 1024000,
        "uploaded_at": "2025-10-01T00:00:00Z"
      }
    ],
    "applications": [
      {
        "job_id": 1,
        "job_title": "バックエンドエンジニア募集",
        "applied_at": "2025-10-15T10:00:00Z",
        "status": "screening"
      }
    ]
  }
}
```

#### ステータスコード
- 200: 取得成功
- 401: 未認証
- 403: 権限なし
- 404: 応募者が存在しない

---

### 6.3 応募者情報更新

**エンドポイント**: `PUT /api/v1/agent/applicants/:id`

#### 概要
特定の応募者の情報を更新する。

#### 権限
エージェントのみ

#### リクエスト
```json
{
  "name": "山田太郎",
  "name_kana": "ヤマダタロウ",
  "phone": "09012345678",
  "postal_code": "123-4567",
  "address": "東京都渋谷区xxx",
  "birth_date": "1990-01-01",
  "gender": "male",
  "education": "〇〇大学 工学部",
  "work_history": "2015年4月 株式会社ABC入社...",
  "skills": "Python, JavaScript, AWS...",
  "certifications": "応用情報技術者, TOEIC 800点",
  "self_pr": "主にバックエンド開発を...",
  "desired_conditions": "リモートワーク可能な環境..."
}
```

#### レスポンス（成功）
```json
{
  "applicant": {
    "id": 1,
    "name": "山田太郎",
    "updated_at": "2025-10-17T13:00:00Z"
  }
}
```

#### ステータスコード
- 200: 更新成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし
- 404: 応募者が存在しない

---

### 6.4 応募者ステータス更新

**エンドポイント**: `PUT /api/v1/agent/applicants/:id/status`

#### 概要
応募者のステータスを更新する。

#### 権限
エージェントのみ

#### リクエスト
```json
{
  "status": "interview",
  "notes": "1次面接を実施予定"
}
```

#### レスポンス（成功）
```json
{
  "applicant": {
    "id": 1,
    "status": "interview",
    "updated_at": "2025-10-17T13:00:00Z"
  }
}
```

#### ステータスコード
- 200: 更新成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし
- 404: 応募者が存在しない

#### 備考
- ステータス更新時、応募者に通知が送信される
- 活動履歴に記録される

---

### 6.5 全文検索

**エンドポイント**: `POST /api/v1/agent/search`

#### 概要
応募者情報を全文検索する。

#### 権限
エージェントのみ

#### リクエスト
```json
{
  "query": "Python AWS 経験3年以上",
  "search_fields": ["work_history", "skills", "self_pr"],
  "filters": {
    "status": ["applying", "document_review"]
  },
  "page": 1,
  "limit": 20
}
```

#### レスポンス（成功）
```json
{
  "results": [
    {
      "applicant": {
        "id": 1,
        "name": "山田太郎",
        "email": "yamada@example.com",
        "status": "applying"
      },
      "highlights": {
        "work_history": "...AWSを用いた開発に3年従事...",
        "skills": "Python, Django, AWS..."
      },
      "score": 0.95
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 2,
    "total_count": 25,
    "limit": 20
  },
  "search_time_ms": 150
}
```

#### ステータスコード
- 200: 検索成功
- 400: クエリが不正
- 401: 未認証
- 403: 権限なし

---

### 6.6 求人情報作成

**エンドポイント**: `POST /api/v1/agent/jobs`

#### 概要
新しい求人情報を作成する。

#### 権限
エージェントのみ

#### リクエスト
```json
{
  "title": "バックエンドエンジニア募集",
  "company_name": "株式会社ABC",
  "description": "Python/Djangoを使った開発...",
  "employment_type": "full_time",
  "location": "東京都渋谷区",
  "salary_min": 5000000,
  "salary_max": 8000000,
  "required_skills": "Python, Django, AWS",
  "preferred_skills": "Docker, Kubernetes"
}
```

#### レスポンス（成功）
```json
{
  "job": {
    "id": 1,
    "title": "バックエンドエンジニア募集",
    "company_name": "株式会社ABC",
    "description": "Python/Djangoを使った開発...",
    "employment_type": "full_time",
    "location": "東京都渋谷区",
    "salary_min": 5000000,
    "salary_max": 8000000,
    "required_skills": "Python, Django, AWS",
    "preferred_skills": "Docker, Kubernetes",
    "status": "active",
    "created_by": 2,
    "created_at": "2025-10-17T13:00:00Z"
  }
}
```

#### ステータスコード
- 201: 作成成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし

---

### 6.7 求人情報一覧取得

**エンドポイント**: `GET /api/v1/agent/jobs`

#### 概要
求人情報の一覧を取得する。

#### 権限
エージェントのみ

#### クエリパラメータ
- `page`: ページ番号（デフォルト: 1）
- `limit`: 1ページあたりの件数（デフォルト: 20）
- `status`: ステータスフィルター（active, closed）

#### レスポンス（成功）
```json
{
  "jobs": [
    {
      "id": 1,
      "title": "バックエンドエンジニア募集",
      "company_name": "株式会社ABC",
      "employment_type": "full_time",
      "status": "active",
      "created_at": "2025-10-01T00:00:00Z",
      "applicant_count": 5
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 3,
    "total_count": 50,
    "limit": 20
  }
}
```

#### ステータスコード
- 200: 取得成功
- 401: 未認証
- 403: 権限なし

---

### 6.8 求人詳細取得

**エンドポイント**: `GET /api/v1/agent/jobs/:id`

#### 概要
特定の求人の詳細情報を取得する。

#### 権限
エージェントのみ

#### レスポンス（成功）
```json
{
  "job": {
    "id": 1,
    "title": "バックエンドエンジニア募集",
    "company_name": "株式会社ABC",
    "description": "Python/Djangoを使った開発...",
    "employment_type": "full_time",
    "location": "東京都渋谷区",
    "salary_min": 5000000,
    "salary_max": 8000000,
    "required_skills": "Python, Django, AWS",
    "preferred_skills": "Docker, Kubernetes",
    "status": "active",
    "created_by": 2,
    "created_at": "2025-10-01T00:00:00Z",
    "files": [
      {
        "id": 1,
        "file_name": "求人詳細.pdf",
        "file_size": 1024000,
        "uploaded_at": "2025-10-01T00:00:00Z"
      }
    ],
    "applicants": [
      {
        "id": 1,
        "name": "山田太郎",
        "applied_at": "2025-10-15T10:00:00Z",
        "status": "screening"
      }
    ]
  }
}
```

#### ステータスコード
- 200: 取得成功
- 401: 未認証
- 403: 権限なし
- 404: 求人が存在しない

---

### 6.9 求人情報更新

**エンドポイント**: `PUT /api/v1/agent/jobs/:id`

#### 概要
求人情報を更新する。

#### 権限
エージェントのみ

#### リクエスト
```json
{
  "title": "バックエンドエンジニア募集（更新）",
  "company_name": "株式会社ABC",
  "description": "Python/Djangoを使った開発...",
  "employment_type": "full_time",
  "location": "東京都渋谷区",
  "salary_min": 5500000,
  "salary_max": 8500000,
  "required_skills": "Python, Django, AWS",
  "preferred_skills": "Docker, Kubernetes"
}
```

#### レスポンス（成功）
```json
{
  "job": {
    "id": 1,
    "title": "バックエンドエンジニア募集（更新）",
    "updated_at": "2025-10-17T14:00:00Z"
  }
}
```

#### ステータスコード
- 200: 更新成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし
- 404: 求人が存在しない

---

### 6.10 求人削除

**エンドポイント**: `DELETE /api/v1/agent/jobs/:id`

#### 概要
求人情報を削除する。

#### 権限
エージェントのみ

#### レスポンス（成功）
```json
{
  "message": "求人情報を削除しました"
}
```

#### ステータスコード
- 204: 削除成功
- 401: 未認証
- 403: 権限なし
- 404: 求人が存在しない

---

### 6.11 求人と応募者の紐付け

**エンドポイント**: `POST /api/v1/agent/jobs/:job_id/applicants`

#### 概要
求人に応募者を紐付ける。

#### 権限
エージェントのみ

#### リクエスト
```json
{
  "applicant_ids": [1, 2, 3],
  "notes": "スキルマッチしているため提案"
}
```

#### レスポンス（成功）
```json
{
  "message": "3名の応募者を紐付けました",
  "job_applicants": [
    {
      "job_id": 1,
      "applicant_id": 1,
      "applied_at": "2025-10-17T14:00:00Z",
      "status": "applied"
    }
  ]
}
```

#### ステータスコード
- 201: 紐付け成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし
- 404: 求人または応募者が存在しない
- 409: 既に紐付けられている

---

### 6.12 商談メモ作成

**エンドポイント**: `POST /api/v1/agent/memos`

#### 概要
応募者に対する商談メモを作成する。

#### 権限
エージェントのみ

#### リクエスト
```json
{
  "applicant_id": 1,
  "title": "初回面談",
  "content": "2025年10月17日に初回面談を実施。\nPythonでの開発経験が豊富で、AWSの知識も十分..."
}
```

#### レスポンス（成功）
```json
{
  "memo": {
    "id": 1,
    "applicant_id": 1,
    "agent_id": 2,
    "title": "初回面談",
    "content": "2025年10月17日に初回面談を実施。\nPythonでの開発経験が豊富で、AWSの知識も十分...",
    "created_at": "2025-10-17T14:00:00Z"
  }
}
```

#### ステータスコード
- 201: 作成成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし
- 404: 応募者が存在しない

---

### 6.13 商談メモ一覧取得

**エンドポイント**: `GET /api/v1/agent/applicants/:applicant_id/memos`

#### 概要
特定の応募者に対する商談メモ一覧を取得する。

#### 権限
エージェントのみ

#### クエリパラメータ
- `page`: ページ番号（デフォルト: 1）
- `limit`: 1ページあたりの件数（デフォルト: 20）

#### レスポンス（成功）
```json
{
  "memos": [
    {
      "id": 1,
      "applicant_id": 1,
      "agent_id": 2,
      "agent_email": "agent1@example.com",
      "title": "初回面談",
      "content": "2025年10月17日に初回面談を実施...",
      "created_at": "2025-10-17T14:00:00Z",
      "updated_at": "2025-10-17T14:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 1,
    "total_count": 5,
    "limit": 20
  }
}
```

#### ステータスコード
- 200: 取得成功
- 401: 未認証
- 403: 権限なし
- 404: 応募者が存在しない

---

### 6.14 商談メモ更新

**エンドポイント**: `PUT /api/v1/agent/memos/:id`

#### 概要
商談メモを更新する。

#### 権限
エージェントのみ（自分が作成したメモのみ）

#### リクエスト
```json
{
  "title": "初回面談（更新）",
  "content": "2025年10月17日に初回面談を実施。\nPythonでの開発経験が豊富..."
}
```

#### レスポンス（成功）
```json
{
  "memo": {
    "id": 1,
    "title": "初回面談（更新）",
    "content": "2025年10月17日に初回面談を実施。\nPythonでの開発経験が豊富...",
    "updated_at": "2025-10-17T15:00:00Z"
  }
}
```

#### ステータスコード
- 200: 更新成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし
- 404: メモが存在しない

---

### 6.15 商談メモ削除

**エンドポイント**: `DELETE /api/v1/agent/memos/:id`

#### 概要
商談メモを削除する。

#### 権限
エージェントのみ（自分が作成したメモのみ）

#### レスポンス（成功）
```json
{
  "message": "商談メモを削除しました"
}
```

#### ステータスコード
- 204: 削除成功
- 401: 未認証
- 403: 権限なし
- 404: メモが存在しない

---

### 6.16 活動履歴取得

**エンドポイント**: `GET /api/v1/agent/activity-logs`

#### 概要
システムの活動履歴を取得する。

#### 権限
エージェントのみ

#### クエリパラメータ
- `page`: ページ番号（デフォルト: 1）
- `limit`: 1ページあたりの件数（デフォルト: 50）
- `user_id`: ユーザーIDでフィルター
- `action`: アクション種別でフィルター
- `start_date`: 開始日（YYYY-MM-DD）
- `end_date`: 終了日（YYYY-MM-DD）

#### レスポンス（成功）
```json
{
  "logs": [
    {
      "id": 1,
      "user_id": 1,
      "user_email": "yamada@example.com",
      "action": "login",
      "target_table": null,
      "target_id": null,
      "description": "ユーザーがログインしました",
      "ip_address": "192.168.1.100",
      "user_agent": "Mozilla/5.0...",
      "created_at": "2025-10-17T12:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 50,
    "total_count": 2500,
    "limit": 50
  }
}
```

#### ステータスコード
- 200: 取得成功
- 401: 未認証
- 403: 権限なし

---

### 6.17 データエクスポート

**エンドポイント**: `POST /api/v1/agent/export`

#### 概要
応募者データをCSV形式でエクスポートする。

#### 権限
エージェントのみ

#### リクエスト
```json
{
  "export_type": "applicants",  // applicants, jobs, applications
  "filters": {
    "status": ["applying", "document_review"],
    "start_date": "2025-01-01",
    "end_date": "2025-10-17"
  },
  "fields": ["id", "name", "email", "phone", "status", "created_at"]
}
```

#### レスポンス（成功）
```json
{
  "download_url": "/api/v1/agent/export/download/abc123",
  "file_name": "applicants_20251017.csv",
  "expires_at": "2025-10-17T16:00:00Z"
}
```

#### ステータスコード
- 200: エクスポート成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし

---

## 7. バリデーションルール

### 7.1 ユーザー関連

| フィールド | 必須 | 形式 | 備考 |
|-----------|------|------|------|
| email | ○ | RFC準拠のメールアドレス | 最大255文字 |
| password | ○ | 8文字以上、英数字記号を含む | 最大255文字 |

### 7.2 応募者関連

| フィールド | 必須 | 形式 | 備考 |
|-----------|------|------|------|
| name | ○ | 文字列 | 1-50文字 |
| name_kana | - | カタカナ | 1-50文字 |
| phone | ○ | 数字のみ | 10-11桁 |
| postal_code | - | XXX-XXXX | ハイフンあり7桁 |
| address | - | 文字列 | 1-200文字 |
| birth_date | ○ | YYYY-MM-DD | 日付形式 |
| gender | - | male, female, other | |
| work_history | - | 文字列 | 1-2000文字 |
| skills | - | 文字列 | 1-500文字 |
| certifications | - | 文字列 | 1-500文字 |
| self_pr | - | 文字列 | 1-1000文字 |
| desired_conditions | - | 文字列 | 1-500文字 |

### 7.3 求人関連

| フィールド | 必須 | 形式 | 備考 |
|-----------|------|------|------|
| title | ○ | 文字列 | 1-100文字 |
| company_name | ○ | 文字列 | 1-100文字 |
| description | - | 文字列 | 1-5000文字 |
| employment_type | ○ | full_time, part_time, contract, temporary | |
| location | - | 文字列 | 1-200文字 |
| salary_min | - | 数値 | 0以上 |
| salary_max | - | 数値 | salary_min以上 |

### 7.4 ファイル関連

| フィールド | 必須 | 形式 | 備考 |
|-----------|------|------|------|
| file | ○ | PDF, Word, Excel | 最大300MB（応募者）、100MB（求人） |
| file_category | ○ | resume, job_document, other | |

## 8. レート制限

### 8.1 レート制限ポリシー

- **一般API**: 100リクエスト/分/ユーザー
- **検索API**: 30リクエスト/分/ユーザー
- **ファイルアップロード**: 10リクエスト/分/ユーザー

### 8.2 レート制限超過時のレスポンス

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "リクエスト数が制限を超えました。しばらく待ってから再度お試しください。",
    "retry_after": 60
  }
}
```

**ステータスコード**: 429 Too Many Requests

**ヘッダー**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1697544120
Retry-After: 60
```

## 評価／改善点

### 成果物の評価視点
- **RESTful設計**: 適切なHTTPメソッド・ステータスコードの使用
- **セキュリティ**: 認証・認可の実装
- **エラーハンドリング**: 適切なエラーレスポンス
- **拡張性**: 将来的な機能追加への対応

### 今後の検討事項
- **GraphQL API**: 柔軟なクエリが必要な場合
- **WebSocket**: リアルタイム通知の実装
- **API バージョニング**: v2, v3等の段階的なバージョン管理
- **Webhooks**: 外部システムへのイベント通知
