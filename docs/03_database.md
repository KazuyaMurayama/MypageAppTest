# データベース設計書 - 人材エージェントマイページシステム

## 1. 改訂履歴

| 版数 | 日付 | 更新者 | 更新内容 |
|------|------|--------|----------|
| 1.0 | 2025/10/17 | 開発チーム | 初版作成 |

## 2. ER図 (Entity-Relationship Diagram)

### エンティティ関係の概要

```
┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│    Users     │          │  Applicants  │          │     Jobs     │
│              │ 1     1  │              │ N     M  │              │
│ - id (PK)    │──────────│ - id (PK)    │──────────│ - id (PK)    │
│ - email      │ has      │ - user_id(FK)│ has_many │ - title      │
│ - password   │          │ - name       │          │ - company    │
│ - role       │          │ - phone      │          │ - description│
└──────────────┘          │ - status     │          └──────────────┘
       │                  └──────┬───────┘                  │
       │                         │                          │
       │ 1                       │ 1                        │ 1
       │                         │                          │
       │ N                       │ N                        │ N
       │                         │                          │
┌──────┴──────────┐    ┌────────┴─────────┐      ┌────────┴─────────┐
│ ActivityLogs    │    │      Files       │      │ JobApplicants    │
│                 │    │                  │      │ (中間テーブル)    │
│ - id (PK)       │    │ - id (PK)        │      │                  │
│ - user_id (FK)  │    │ - user_id (FK)   │      │ - job_id (FK)    │
│ - action        │    │ - applicant_id   │      │ - applicant_id   │
│ - description   │    │   (FK)           │      │   (FK)           │
└─────────────────┘    │ - file_name      │      │ - applied_at     │
                       │ - file_path      │      └──────────────────┘
                       │ - file_type      │
┌─────────────────┐    │ - file_size      │
│ Notifications   │    └──────────────────┘
│                 │
│ - id (PK)       │
│ - user_id (FK)  │           ┌──────────────────┐
│ - applicant_id  │           │      Memos       │
│   (FK)          │           │                  │
│ - message       │           │ - id (PK)        │
│ - is_read       │           │ - applicant_id   │
└─────────────────┘           │   (FK)           │
                              │ - agent_id (FK)  │
                              │ - title          │
                              │ - content        │
                              │ - created_at     │
                              └──────────────────┘
```

### リレーションシップ
- **Users - Applicants**: 1対1
  - 1人のユーザーは1つの応募者プロファイルを持つ（応募者の場合）
  
- **Applicants - Jobs**: N対M（多対多）
  - 1人の応募者は複数の求人に応募可能
  - 1つの求人には複数の応募者が応募可能
  - 中間テーブル`job_applicants`で管理
  
- **Users - ActivityLogs**: 1対N（一対多）
  - 1人のユーザーは複数の活動履歴を持つ
  
- **Applicants - Files**: 1対N（一対多）
  - 1人の応募者は複数のファイルをアップロード可能
  
- **Applicants - Memos**: 1対N（一対多）
  - 1人の応募者に対して複数の商談メモが存在
  
- **Users - Notifications**: 1対N（一対多）
  - 1人のユーザーは複数の通知を受け取る

## 3. テーブル定義一覧

| No | 物理テーブル名 | 論理テーブル名 | 概要 |
|----|---------------|---------------|------|
| 1 | users | ユーザー | システムユーザー（応募者・エージェント） |
| 2 | applicants | 応募者 | 応募者の詳細情報 |
| 3 | jobs | 求人 | 求人情報 |
| 4 | job_applicants | 求人応募 | 求人と応募者の紐付け |
| 5 | files | ファイル | アップロードされたファイル情報 |
| 6 | memos | 商談メモ | エージェントの商談メモ |
| 7 | activity_logs | 活動履歴 | ユーザーの操作履歴 |
| 8 | notifications | 通知 | システム内通知 |

## 4. テーブル定義書（各テーブルごと）

### 4.1 テーブル名: users（ユーザー）

**物理名**: `users`  
**論理名**: ユーザー  
**概要**: システムを利用するユーザー（応募者・エージェント）の認証情報

#### カラム定義

| No | 論理名 | 物理名 | データ型 | 長さ | PK | FK | Not Null | Default | 備考 |
|----|--------|--------|----------|------|----|----|----------|---------|------|
| 1 | ユーザーID | id | INT | - | ○ | - | ○ | AUTO_INCREMENT | 主キー |
| 2 | メールアドレス | email | VARCHAR | 255 | - | - | ○ | - | ログインID、ユニーク |
| 3 | パスワードハッシュ | password_hash | VARCHAR | 255 | - | - | ○ | - | bcryptでハッシュ化 |
| 4 | 役割 | role | ENUM | - | - | - | ○ | applicant | applicant, agent |
| 5 | 最終ログイン日時 | last_login_at | TIMESTAMP | - | - | - | - | NULL | 最後にログインした日時 |
| 6 | 作成日時 | created_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | レコード作成日時 |
| 7 | 更新日時 | updated_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | レコード更新日時 |

#### インデックス定義
- プライマリーキー: `id`
- ユニークインデックス: `email`（重複登録防止）

#### 制約
- `email`: RFC準拠のメールアドレス形式
- `role`: 'applicant' または 'agent' のみ

---

### 4.2 テーブル名: applicants（応募者）

**物理名**: `applicants`  
**論理名**: 応募者  
**概要**: 応募者の詳細情報

#### カラム定義

| No | 論理名 | 物理名 | データ型 | 長さ | PK | FK | Not Null | Default | 備考 |
|----|--------|--------|----------|------|----|----|----------|---------|------|
| 1 | 応募者ID | id | INT | - | ○ | - | ○ | AUTO_INCREMENT | 主キー |
| 2 | ユーザーID | user_id | INT | - | - | ○ | ○ | - | users.id への外部キー |
| 3 | 氏名 | name | VARCHAR | 50 | - | - | ○ | - | 姓名 |
| 4 | フリガナ | name_kana | VARCHAR | 50 | - | - | - | NULL | カタカナ |
| 5 | 電話番号 | phone | VARCHAR | 20 | - | - | ○ | - | ハイフンなし10-11桁 |
| 6 | 郵便番号 | postal_code | VARCHAR | 10 | - | - | - | NULL | 7桁（ハイフンあり） |
| 7 | 住所 | address | VARCHAR | 200 | - | - | - | NULL | 都道府県市区町村番地 |
| 8 | 生年月日 | birth_date | DATE | - | - | - | ○ | - | YYYY-MM-DD形式 |
| 9 | 性別 | gender | ENUM | - | - | - | - | NULL | male, female, other |
| 10 | 最終学歴 | education | VARCHAR | 100 | - | - | - | NULL | 大学名・学部等 |
| 11 | 職歴 | work_history | TEXT | - | - | - | - | NULL | 1-2000文字 |
| 12 | スキル | skills | TEXT | - | - | - | - | NULL | 1-500文字 |
| 13 | 資格 | certifications | TEXT | - | - | - | - | NULL | 1-500文字 |
| 14 | 自己PR | self_pr | TEXT | - | - | - | - | NULL | 1-1000文字 |
| 15 | 希望条件 | desired_conditions | TEXT | - | - | - | - | NULL | 1-500文字 |
| 16 | ステータス | status | ENUM | - | - | - | ○ | registered | registered, applying, document_review, interview, offer, hired, rejected |
| 17 | 作成日時 | created_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | |
| 18 | 更新日時 | updated_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | |

#### インデックス定義
- プライマリーキー: `id`
- インデックス: `user_id`（外部キー）
- インデックス: `status`（ステータスでのフィルタリング用）
- インデックス: `name`（氏名検索用）
- 全文検索インデックス: `work_history`, `skills`, `certifications`, `self_pr`（全文検索用）

#### 制約
- `user_id`: `users.id` への外部キー、CASCADE削除
- `status`: 定義されたステータス値のみ

---

### 4.3 テーブル名: jobs（求人）

**物理名**: `jobs`  
**論理名**: 求人  
**概要**: 求人情報

#### カラム定義

| No | 論理名 | 物理名 | データ型 | 長さ | PK | FK | Not Null | Default | 備考 |
|----|--------|--------|----------|------|----|----|----------|---------|------|
| 1 | 求人ID | id | INT | - | ○ | - | ○ | AUTO_INCREMENT | 主キー |
| 2 | 求人タイトル | title | VARCHAR | 100 | - | - | ○ | - | 求人名 |
| 3 | 企業名 | company_name | VARCHAR | 100 | - | - | ○ | - | 募集企業名 |
| 4 | 募集要項 | description | TEXT | - | - | - | - | NULL | 詳細説明 |
| 5 | 雇用形態 | employment_type | ENUM | - | - | - | ○ | full_time | full_time, part_time, contract, temporary |
| 6 | 勤務地 | location | VARCHAR | 200 | - | - | - | NULL | 勤務地住所 |
| 7 | 給与範囲（最小） | salary_min | DECIMAL | 10,2 | - | - | - | NULL | 最低給与（円） |
| 8 | 給与範囲（最大） | salary_max | DECIMAL | 10,2 | - | - | - | NULL | 最高給与（円） |
| 9 | 必須スキル | required_skills | TEXT | - | - | - | - | NULL | 必須スキルの説明 |
| 10 | 歓迎スキル | preferred_skills | TEXT | - | - | - | - | NULL | あると良いスキル |
| 11 | ステータス | status | ENUM | - | - | - | ○ | active | active, closed |
| 12 | 作成者ID | created_by | INT | - | - | ○ | ○ | - | users.id (エージェント) |
| 13 | 作成日時 | created_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | |
| 14 | 更新日時 | updated_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | |

#### インデックス定義
- プライマリーキー: `id`
- インデックス: `created_by`（外部キー）
- インデックス: `status`（アクティブな求人の検索用）
- インデックス: `company_name`（企業名検索用）

#### 制約
- `created_by`: `users.id` への外部キー
- `status`: 'active' または 'closed' のみ

---

### 4.4 テーブル名: job_applicants（求人応募）

**物理名**: `job_applicants`  
**論理名**: 求人応募  
**概要**: 求人と応募者の紐付け（中間テーブル）

#### カラム定義

| No | 論理名 | 物理名 | データ型 | 長さ | PK | FK | Not Null | Default | 備考 |
|----|--------|--------|----------|------|----|----|----------|---------|------|
| 1 | ID | id | INT | - | ○ | - | ○ | AUTO_INCREMENT | 主キー |
| 2 | 求人ID | job_id | INT | - | - | ○ | ○ | - | jobs.id への外部キー |
| 3 | 応募者ID | applicant_id | INT | - | - | ○ | ○ | - | applicants.id への外部キー |
| 4 | 応募日時 | applied_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | 応募した日時 |
| 5 | ステータス | status | ENUM | - | - | - | ○ | applied | applied, screening, interview, offer, accepted, rejected |
| 6 | 備考 | notes | TEXT | - | - | - | - | NULL | エージェントのメモ |
| 7 | 作成日時 | created_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | |
| 8 | 更新日時 | updated_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | |

#### インデックス定義
- プライマリーキー: `id`
- ユニークインデックス: `job_id`, `applicant_id`（重複応募防止）
- インデックス: `job_id`（求人ごとの応募者検索）
- インデックス: `applicant_id`（応募者ごとの求人検索）

#### 制約
- `job_id`: `jobs.id` への外部キー、CASCADE削除
- `applicant_id`: `applicants.id` への外部キー、CASCADE削除
- `status`: 定義されたステータス値のみ

---

### 4.5 テーブル名: files（ファイル）

**物理名**: `files`  
**論理名**: ファイル  
**概要**: アップロードされたファイルの情報

#### カラム定義

| No | 論理名 | 物理名 | データ型 | 長さ | PK | FK | Not Null | Default | 備考 |
|----|--------|--------|----------|------|----|----|----------|---------|------|
| 1 | ファイルID | id | INT | - | ○ | - | ○ | AUTO_INCREMENT | 主キー |
| 2 | ユーザーID | user_id | INT | - | - | ○ | ○ | - | users.id への外部キー |
| 3 | 応募者ID | applicant_id | INT | - | - | ○ | - | NULL | applicants.id への外部キー（応募者の場合） |
| 4 | 求人ID | job_id | INT | - | - | ○ | - | NULL | jobs.id への外部キー（求人資料の場合） |
| 5 | ファイル種別 | file_category | ENUM | - | - | - | ○ | - | resume, job_document, other |
| 6 | ファイル名 | file_name | VARCHAR | 255 | - | - | ○ | - | 元のファイル名 |
| 7 | 保存ファイル名 | stored_file_name | VARCHAR | 255 | - | - | ○ | - | サーバーに保存されるファイル名（UUID） |
| 8 | ファイルパス | file_path | VARCHAR | 500 | - | - | ○ | - | サーバー内のファイルパス |
| 9 | ファイル形式 | file_type | VARCHAR | 50 | - | - | ○ | - | MIMEタイプ |
| 10 | ファイルサイズ | file_size | BIGINT | - | - | - | ○ | - | バイト単位 |
| 11 | ウイルススキャン結果 | virus_scan_status | ENUM | - | - | - | ○ | pending | pending, clean, infected |
| 12 | アップロード日時 | uploaded_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | |
| 13 | 作成日時 | created_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | |
| 14 | 更新日時 | updated_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | |

#### インデックス定義
- プライマリーキー: `id`
- インデックス: `user_id`（ユーザーごとのファイル検索）
- インデックス: `applicant_id`（応募者ごとのファイル検索）
- インデックス: `job_id`（求人ごとのファイル検索）
- インデックス: `file_category`（ファイル種別での検索）

#### 制約
- `user_id`: `users.id` への外部キー、CASCADE削除
- `applicant_id`: `applicants.id` への外部キー、CASCADE削除
- `job_id`: `jobs.id` への外部キー、CASCADE削除
- `file_category`: 'resume', 'job_document', 'other' のみ
- `virus_scan_status`: 'pending', 'clean', 'infected' のみ

---

### 4.6 テーブル名: memos（商談メモ）

**物理名**: `memos`  
**論理名**: 商談メモ  
**概要**: エージェントが応募者に関して記録する商談メモ

#### カラム定義

| No | 論理名 | 物理名 | データ型 | 長さ | PK | FK | Not Null | Default | 備考 |
|----|--------|--------|----------|------|----|----|----------|---------|------|
| 1 | メモID | id | INT | - | ○ | - | ○ | AUTO_INCREMENT | 主キー |
| 2 | 応募者ID | applicant_id | INT | - | - | ○ | ○ | - | applicants.id への外部キー |
| 3 | エージェントID | agent_id | INT | - | - | ○ | ○ | - | users.id への外部キー |
| 4 | タイトル | title | VARCHAR | 100 | - | - | ○ | - | メモのタイトル |
| 5 | 内容 | content | TEXT | - | - | - | ○ | - | メモの本文 |
| 6 | 作成日時 | created_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | |
| 7 | 更新日時 | updated_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | |

#### インデックス定義
- プライマリーキー: `id`
- インデックス: `applicant_id`（応募者ごとのメモ検索）
- インデックス: `agent_id`（エージェントごとのメモ検索）

#### 制約
- `applicant_id`: `applicants.id` への外部キー、CASCADE削除
- `agent_id`: `users.id` への外部キー、CASCADE削除

---

### 4.7 テーブル名: activity_logs（活動履歴）

**物理名**: `activity_logs`  
**論理名**: 活動履歴  
**概要**: ユーザーの操作履歴（監査ログ）

#### カラム定義

| No | 論理名 | 物理名 | データ型 | 長さ | PK | FK | Not Null | Default | 備考 |
|----|--------|--------|----------|------|----|----|----------|---------|------|
| 1 | ログID | id | BIGINT | - | ○ | - | ○ | AUTO_INCREMENT | 主キー |
| 2 | ユーザーID | user_id | INT | - | - | ○ | - | NULL | users.id への外部キー |
| 3 | アクション | action | VARCHAR | 100 | - | - | ○ | - | login, logout, create, update, delete等 |
| 4 | 対象テーブル | target_table | VARCHAR | 50 | - | - | - | NULL | 操作対象のテーブル名 |
| 5 | 対象ID | target_id | INT | - | - | - | - | NULL | 操作対象のレコードID |
| 6 | 詳細 | description | TEXT | - | - | - | - | NULL | 操作の詳細説明 |
| 7 | IPアドレス | ip_address | VARCHAR | 45 | - | - | - | NULL | IPv4/IPv6対応 |
| 8 | ユーザーエージェント | user_agent | VARCHAR | 255 | - | - | - | NULL | ブラウザ情報 |
| 9 | 作成日時 | created_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | |

#### インデックス定義
- プライマリーキー: `id`
- インデックス: `user_id`（ユーザーごとの履歴検索）
- インデックス: `action`（アクション種別での検索）
- インデックス: `created_at`（日時での検索）

#### 制約
- `user_id`: `users.id` への外部キー、CASCADE削除

---

### 4.8 テーブル名: notifications（通知）

**物理名**: `notifications`  
**論理名**: 通知  
**概要**: システム内通知

#### カラム定義

| No | 論理名 | 物理名 | データ型 | 長さ | PK | FK | Not Null | Default | 備考 |
|----|--------|--------|----------|------|----|----|----------|---------|------|
| 1 | 通知ID | id | INT | - | ○ | - | ○ | AUTO_INCREMENT | 主キー |
| 2 | ユーザーID | user_id | INT | - | - | ○ | ○ | - | users.id への外部キー |
| 3 | 応募者ID | applicant_id | INT | - | - | ○ | - | NULL | applicants.id への外部キー |
| 4 | 求人ID | job_id | INT | - | - | ○ | - | NULL | jobs.id への外部キー |
| 5 | 通知種別 | notification_type | ENUM | - | - | - | ○ | - | new_job, status_change, new_message, system |
| 6 | タイトル | title | VARCHAR | 100 | - | - | ○ | - | 通知のタイトル |
| 7 | メッセージ | message | TEXT | - | - | - | ○ | - | 通知の本文 |
| 8 | 既読フラグ | is_read | BOOLEAN | - | - | - | ○ | false | false=未読, true=既読 |
| 9 | 既読日時 | read_at | TIMESTAMP | - | - | - | - | NULL | 既読にした日時 |
| 10 | 作成日時 | created_at | TIMESTAMP | - | - | - | ○ | CURRENT_TIMESTAMP | |

#### インデックス定義
- プライマリーキー: `id`
- インデックス: `user_id`（ユーザーごとの通知検索）
- インデックス: `is_read`（未読通知の検索）
- インデックス: `created_at`（新しい順でのソート）

#### 制約
- `user_id`: `users.id` への外部キー、CASCADE削除
- `applicant_id`: `applicants.id` への外部キー、SET NULL削除
- `job_id`: `jobs.id` への外部キー、SET NULL削除
- `notification_type`: 'new_job', 'status_change', 'new_message', 'system' のみ

## 5. リレーション定義

### 外部キー制約一覧

| No | 参照元テーブル | 参照元カラム | 参照先テーブル | 参照先カラム | 更新時の動作 | 削除時の動作 | 備考 |
|----|--------------|-------------|--------------|-------------|-------------|-------------|------|
| 1 | applicants | user_id | users | id | CASCADE | CASCADE | ユーザー削除時は応募者情報も削除 |
| 2 | jobs | created_by | users | id | CASCADE | RESTRICT | エージェント削除時は削除不可 |
| 3 | job_applicants | job_id | jobs | id | CASCADE | CASCADE | 求人削除時は応募情報も削除 |
| 4 | job_applicants | applicant_id | applicants | id | CASCADE | CASCADE | 応募者削除時は応募情報も削除 |
| 5 | files | user_id | users | id | CASCADE | CASCADE | ユーザー削除時はファイルも削除 |
| 6 | files | applicant_id | applicants | id | CASCADE | CASCADE | 応募者削除時はファイルも削除 |
| 7 | files | job_id | jobs | id | CASCADE | CASCADE | 求人削除時はファイルも削除 |
| 8 | memos | applicant_id | applicants | id | CASCADE | CASCADE | 応募者削除時はメモも削除 |
| 9 | memos | agent_id | users | id | CASCADE | CASCADE | エージェント削除時はメモも削除 |
| 10 | activity_logs | user_id | users | id | CASCADE | CASCADE | ユーザー削除時はログも削除 |
| 11 | notifications | user_id | users | id | CASCADE | CASCADE | ユーザー削除時は通知も削除 |
| 12 | notifications | applicant_id | applicants | id | CASCADE | SET NULL | 応募者削除時はNULLに |
| 13 | notifications | job_id | jobs | id | CASCADE | SET NULL | 求人削除時はNULLに |

## 6. データ初期投入計画

### 初期データ

#### ユーザー（テスト用）
```sql
INSERT INTO users (email, password_hash, role) VALUES
('admin@example.com', '$2b$12$...', 'agent'),
('agent1@example.com', '$2b$12$...', 'agent'),
('applicant1@example.com', '$2b$12$...', 'applicant');
```

#### ステータスマスタ（ENUMで定義済みのため不要）
- applicants.status: registered, applying, document_review, interview, offer, hired, rejected
- jobs.status: active, closed
- job_applicants.status: applied, screening, interview, offer, accepted, rejected

### 投入方法
- SQLスクリプトによる直接投入
- マイグレーションツール（Prisma, Django ORM等）による投入

## 7. データベース物理設計

### 7.1 ストレージ見積もり

#### テーブルごとのデータ量見積もり

| テーブル名 | レコード数 | 1レコードあたりのサイズ | 合計サイズ | 備考 |
|-----------|----------|----------------------|-----------|------|
| users | 109名 | 500 bytes | 54.5 KB | 応募者99名+エージェント10名 |
| applicants | 99名 | 2 KB | 198 KB | テキストデータが多い |
| jobs | 50件 | 1 KB | 50 KB | 求人情報 |
| job_applicants | 200件 | 300 bytes | 60 KB | 1応募者あたり平均2求人 |
| files | 300件 | 500 bytes | 150 KB | メタデータのみ（実ファイルは別） |
| memos | 100件 | 1 KB | 100 KB | 商談メモ |
| activity_logs | 10,000件 | 500 bytes | 5 MB | 1年分の履歴 |
| notifications | 1,000件 | 300 bytes | 300 KB | 通知データ |
| **合計** | - | - | **約6 MB** | データベースのみ |

**ファイルストレージ**:
- 1応募者平均30MB × 99名 = 2,970 MB = 約3 GB
- 余裕を持って10 GB確保

### 7.2 インデックス設計

#### 頻繁に使用されるクエリと対応するインデックス

| クエリの種類 | 対象テーブル | インデックス | 理由 |
|-------------|-------------|-------------|------|
| ログイン | users | email (UNIQUE) | メールアドレスで高速検索 |
| 応募者一覧 | applicants | status, name | ステータス・氏名でフィルタリング |
| 全文検索 | applicants | FULLTEXT(work_history, skills, self_pr) | 全文検索の高速化 |
| ファイル一覧 | files | user_id, applicant_id | ユーザー・応募者ごとの検索 |
| 通知一覧 | notifications | user_id, is_read, created_at | 未読通知の高速表示 |

### 7.3 パーティショニング

現時点ではデータ量が少ないためパーティショニング不要。将来的にデータ量が増加した場合は、以下のテーブルでパーティショニングを検討。

- **activity_logs**: 日付ベースのパーティショニング（月単位）
- **notifications**: 日付ベースのパーティショニング（四半期単位）

## 8. クエリ例

### 8.1 応募者情報の取得

```sql
-- 応募者の詳細情報を取得
SELECT 
    a.*,
    u.email,
    u.last_login_at
FROM applicants a
INNER JOIN users u ON a.user_id = u.id
WHERE a.id = 1;
```

### 8.2 全文検索

```sql
-- PostgreSQLの全文検索
SELECT 
    id,
    name,
    ts_headline('japanese', work_history, query) AS work_history_highlight
FROM applicants,
     to_tsquery('japanese', 'Python & AWS') AS query
WHERE to_tsvector('japanese', work_history || ' ' || skills || ' ' || self_pr) @@ query
ORDER BY ts_rank(to_tsvector('japanese', work_history || ' ' || skills || ' ' || self_pr), query) DESC
LIMIT 20;
```

```sql
-- MySQLの全文検索
SELECT 
    id,
    name,
    work_history
FROM applicants
WHERE MATCH(work_history, skills, self_pr) AGAINST('Python AWS' IN BOOLEAN MODE)
ORDER BY MATCH(work_history, skills, self_pr) AGAINST('Python AWS' IN BOOLEAN MODE) DESC
LIMIT 20;
```

### 8.3 応募者の求人応募状況

```sql
-- 応募者が応募した求人一覧
SELECT 
    j.id,
    j.title,
    j.company_name,
    ja.applied_at,
    ja.status
FROM job_applicants ja
INNER JOIN jobs j ON ja.job_id = j.id
WHERE ja.applicant_id = 1
ORDER BY ja.applied_at DESC;
```

### 8.4 エージェントの商談メモ一覧

```sql
-- 特定の応募者に対する商談メモ一覧
SELECT 
    m.*,
    u.email AS agent_email
FROM memos m
INNER JOIN users u ON m.agent_id = u.id
WHERE m.applicant_id = 1
ORDER BY m.created_at DESC;
```

### 8.5 未読通知の取得

```sql
-- ユーザーの未読通知を取得
SELECT 
    id,
    title,
    message,
    created_at
FROM notifications
WHERE user_id = 1 AND is_read = false
ORDER BY created_at DESC
LIMIT 10;
```

### 8.6 活動履歴の記録

```sql
-- ログイン履歴の記録
INSERT INTO activity_logs (user_id, action, description, ip_address, user_agent)
VALUES (1, 'login', 'ユーザーがログインしました', '192.168.1.100', 'Mozilla/5.0...');
```

## 9. バックアップ・リストア

### バックアップスクリプト例

#### PostgreSQL
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/postgres"
DB_NAME="recruitment_db"

# フルバックアップ
pg_dump -U postgres $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# 圧縮
gzip $BACKUP_DIR/backup_$DATE.sql

# 7日より古いバックアップを削除
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
```

#### MySQL
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/mysql"
DB_NAME="recruitment_db"

# フルバックアップ
mysqldump -u root -p $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# 圧縮
gzip $BACKUP_DIR/backup_$DATE.sql

# 7日より古いバックアップを削除
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
```

### リストアスクリプト例

#### PostgreSQL
```bash
#!/bin/bash
BACKUP_FILE=$1

# データベース削除・再作成
dropdb recruitment_db
createdb recruitment_db

# リストア
gunzip -c $BACKUP_FILE | psql -U postgres recruitment_db
```

#### MySQL
```bash
#!/bin/bash
BACKUP_FILE=$1

# データベース削除・再作成
mysql -u root -p -e "DROP DATABASE IF EXISTS recruitment_db; CREATE DATABASE recruitment_db;"

# リストア
gunzip -c $BACKUP_FILE | mysql -u root -p recruitment_db
```

## 10. パフォーマンスチューニング

### 10.1 スロークエリの監視

#### PostgreSQL
```sql
-- スロークエリログの有効化（postgresql.conf）
log_min_duration_statement = 1000  -- 1秒以上のクエリをログに記録
```

#### MySQL
```sql
-- スロークエリログの有効化（my.cnf）
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow-query.log
long_query_time = 1  -- 1秒以上のクエリをログに記録
```

### 10.2 EXPLAIN実行例

```sql
-- クエリの実行計画を確認
EXPLAIN ANALYZE
SELECT a.*, u.email
FROM applicants a
INNER JOIN users u ON a.user_id = u.id
WHERE a.status = 'applying';
```

## 評価／改善点

### 成果物の評価視点
- **正規化**: 第3正規形まで正規化されているか
- **インデックス**: 適切なインデックスが設定されているか
- **パフォーマンス**: 性能要件を満たせるか
- **拡張性**: 将来的なデータ増加に対応できるか
- **保守性**: テーブル構造が理解しやすいか

### 今後の検討事項
- **パーティショニング**: データ量増加時のパーティショニング戦略
- **レプリケーション**: 読み取り負荷分散のためのマスター・スレーブ構成
- **シャーディング**: データ量が大幅に増加した場合の水平分割
- **キャッシュ戦略**: Redisによる頻繁にアクセスされるデータのキャッシュ
