# アーキテクチャ設計書 - 人材エージェントマイページシステム

## 1. 改訂履歴

| 版数 | 日付 | 更新者 | 更新内容 |
|------|------|--------|----------|
| 1.0 | 2025/10/17 | 開発チーム | 初版作成 |

## 2. システム全体構成

### 2.1 アーキテクチャ概要図

```
┌─────────────────────────────────────────────────────────────────┐
│                        クライアント層                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ 応募者(PC)    │  │応募者(スマホ) │  │エージェント   │         │
│  │              │  │              │  │(PC)          │         │
│  │ Chrome/Edge  │  │Safari/Chrome │  │Chrome/Edge   │         │
│  │ Safari       │  │              │  │Firefox       │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                 │                 │                   │
│         └─────────────────┼─────────────────┘                   │
│                           │ HTTPS (SSL/TLS)                     │
└───────────────────────────┼─────────────────────────────────────┘
                            │
┌───────────────────────────┼─────────────────────────────────────┐
│                    Webサーバー層                                 │
├───────────────────────────┼─────────────────────────────────────┤
│                           ↓                                     │
│            ┌──────────────────────────┐                         │
│            │   Nginx / Apache         │                         │
│            │   - SSL/TLS終端          │                         │
│            │   - リバースプロキシ      │                         │
│            │   - 静的ファイル配信      │                         │
│            │   - ロードバランシング    │                         │
│            └──────────┬───────────────┘                         │
│                       │                                         │
└───────────────────────┼─────────────────────────────────────────┘
                        │
┌───────────────────────┼─────────────────────────────────────────┐
│                アプリケーション層                                 │
├───────────────────────┼─────────────────────────────────────────┤
│                       │                                         │
│   ┌──────────────────┼──────────────────┐                      │
│   │  フロントエンド  │                   │                      │
│   │  ┌──────────────┴──────────────┐   │                      │
│   │  │  React 18.3.x              │   │                      │
│   │  │  - TypeScript 5.x          │   │                      │
│   │  │  - Bootstrap 5.x (テンプレート) │                      │
│   │  │  - Vite (ビルドツール)      │   │                      │
│   │  │  - Axios (HTTP Client)      │   │                      │
│   │  └──────────────────────────────┘   │                      │
│   └──────────────────────────────────────┘                      │
│                       │                                         │
│                       ↓ RESTful API                             │
│   ┌────────────────────────────────────────┐                   │
│   │  バックエンド                           │                   │
│   │  ┌────────────────────────────────┐   │                   │
│   │  │ Node.js (Express)              │   │                   │
│   │  │ または                          │   │                   │
│   │  │ Python (Django/Flask)          │   │                   │
│   │  │                                │   │                   │
│   │  │  ├─ ルーティング                │   │                   │
│   │  │  ├─ ビジネスロジック            │   │                   │
│   │  │  ├─ 認証・認可                  │   │                   │
│   │  │  ├─ バリデーション              │   │                   │
│   │  │  ├─ ファイルアップロード処理    │   │                   │
│   │  │  └─ エラーハンドリング          │   │                   │
│   │  └────────────────────────────────┘   │                   │
│   └──────────┬────────┬───────────┬────────┘                   │
│              │        │           │                            │
└──────────────┼────────┼───────────┼────────────────────────────┘
               │        │           │
┌──────────────┼────────┼───────────┼────────────────────────────┐
│         データ層       │           │                            │
├──────────────┼────────┼───────────┼────────────────────────────┤
│              ↓        ↓           ↓                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│  │ PostgreSQL   │ │ Elasticsearch│ │ローカル       │           │
│  │ または        │ │ または        │ │ストレージ     │           │
│  │ MySQL        │ │ PostgreSQL   │ │(10GB)        │           │
│  │              │ │ 全文検索      │ │              │           │
│  │ - ユーザー情報│ │              │ │ - 履歴書      │           │
│  │ - 応募者情報  │ │ - 氏名検索   │ │ - 職務経歴書  │           │
│  │ - 求人情報    │ │ - 職歴検索   │ │ - 求人資料    │           │
│  │ - ステータス  │ │ - スキル検索 │ │              │           │
│  │ - 商談メモ    │ │ - 全文検索   │ │              │           │
│  │ - 活動履歴    │ │              │ │              │           │
│  └──────────────┘ └──────────────┘ └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 ネットワーク構成図

```
┌─────────────────────────────────────────────────────────┐
│                    インターネット                        │
└───────────────────────┬─────────────────────────────────┘
                        │
                        │ 443 (HTTPS)
                        │
        ┌───────────────┼───────────────┐
        │   ファイアウォール              │
        │   - 443ポート開放              │
        │   - 80ポート開放（HTTPSリダイレクト）│
        │   - 不正アクセス検知            │
        └───────────────┬───────────────┘
                        │
        ┌───────────────┴───────────────┐
        │   DMZ（非武装地帯）             │
        │   ┌─────────────────────┐     │
        │   │ Webサーバー          │     │
        │   │ Nginx/Apache         │     │
        │   │ 固定IPアドレス        │     │
        │   └──────────┬──────────┘     │
        └──────────────┼────────────────┘
                       │ 内部ネットワーク
        ┌──────────────┴────────────────┐
        │   内部ネットワーク              │
        │                               │
        │   ┌─────────────────────┐     │
        │   │ アプリケーションサーバー│     │
        │   │ Node.js/Python       │     │
        │   └──────────┬──────────┘     │
        │              │                │
        │   ┌──────────┴──────────┐     │
        │   │ データベースサーバー  │     │
        │   │ PostgreSQL/MySQL     │     │
        │   │ Elasticsearch        │     │
        │   └──────────────────────┘     │
        │                               │
        │   ┌──────────────────────┐     │
        │   │ ファイルストレージ    │     │
        │   │ ローカルストレージ(10GB)│     │
        │   └──────────────────────┘     │
        │                               │
        │   ┌──────────────────────┐     │
        │   │ バックアップサーバー  │     │
        │   │ NAS/外付けHDD         │     │
        │   └──────────────────────┘     │
        └───────────────────────────────┘
```

## 3. 技術スタックの選定

### 3.1 技術スタック一覧

| レイヤー | 技術 | バージョン | 選定理由 |
|---------|------|-----------|----------|
| **フロントエンド** |
| UI Framework | React | 18.3.x | コンポーネントベースで保守性が高い、豊富なエコシステム |
| 言語 | TypeScript | 5.x | 型安全性、開発効率向上、バグ削減 |
| UIライブラリ | Bootstrap | 5.x | レスポンシブ対応が容易、テンプレート豊富、学習コスト低 |
| ビルドツール | Vite | 5.x | 高速なビルド、HMR対応、最新の開発体験 |
| HTTPクライアント | Axios | 1.x | シンプルなAPI、インターセプター機能 |
| 状態管理 | Context API / Redux Toolkit | - | 中規模アプリに適した状態管理 |
| **バックエンド（選択肢1）** |
| ランタイム | Node.js | 20.x | JavaScriptフルスタック、非同期処理に強い |
| フレームワーク | Express | 4.x | 軽量、柔軟、豊富なミドルウェア |
| ORM | Prisma / Sequelize | - | 型安全なDB操作、マイグレーション管理 |
| **バックエンド（選択肢2）** |
| 言語 | Python | 3.11+ | データ処理に強い、豊富なライブラリ |
| フレームワーク | Django / Flask | 4.x / 3.x | 堅牢、セキュリティ機能充実 |
| ORM | Django ORM / SQLAlchemy | - | 強力なクエリビルダー |
| **データベース** |
| RDBMS（選択肢1） | PostgreSQL | 15.x | トランザクション処理に強い、全文検索機能あり |
| RDBMS（選択肢2） | MySQL | 8.0+ | 高速、シンプル、実績豊富 |
| 全文検索（選択肢1） | Elasticsearch | 8.x | 高速な全文検索、柔軟なクエリ |
| 全文検索（選択肢2） | PostgreSQL FTS | - | 追加インストール不要、軽量 |
| **Webサーバー** |
| Webサーバー（選択肢1） | Nginx | 1.24.x | 高性能、リバースプロキシ、静的ファイル配信 |
| Webサーバー（選択肢2） | Apache | 2.4.x | 安定性、豊富なモジュール |
| **インフラ** |
| OS（選択肢1） | Ubuntu Server | 22.04 LTS | 安定性、長期サポート、豊富な情報 |
| OS（選択肢2） | CentOS Stream | 9 | エンタープライズ向け、安定性 |
| SSL証明書 | Let's Encrypt | - | 無料、自動更新 |
| **開発・ビルド** |
| パッケージマネージャ | npm / pip | - | 標準ツール |
| Linter | ESLint / Pylint | - | コード品質維持 |
| Formatter | Prettier / Black | - | コードスタイル統一 |

### 3.2 技術選定の理由

#### フロントエンド: React + TypeScript + Bootstrap

**選定理由**:
- **React**: コンポーネントベースで再利用性が高く、保守性に優れる
- **TypeScript**: 型安全性により実行時エラーを削減、IDEの支援機能が充実
- **Bootstrap**: テンプレートを使用することで開発期間を短縮、レスポンシブ対応が容易
- フロントエンドエンジニアの学習コストが低く、採用しやすい

#### バックエンド: Node.js (Express) または Python (Django/Flask)

**選定理由**:
- **Node.js + Express**:
  - JavaScriptでフルスタック開発が可能
  - 非同期I/Oで高いパフォーマンス
  - 軽量で柔軟なフレームワーク
  
- **Python + Django/Flask**:
  - データ処理・解析に強い
  - セキュリティ機能が充実
  - ORM（Django ORM/SQLAlchemy）が強力

**推奨**: 開発チームのスキルセットに応じて選択

#### データベース: PostgreSQL または MySQL

**選定理由**:
- **PostgreSQL**:
  - トランザクション処理に強い
  - 全文検索機能が標準搭載
  - JSON型サポートで柔軟なデータ構造
  
- **MySQL**:
  - 高速で軽量
  - シンプルな構成
  - 実績豊富で情報が多い

**推奨**: 全文検索をPostgreSQLで実装する場合はPostgreSQL、Elasticsearchを使う場合はMySQLでも可

#### 全文検索: Elasticsearch または PostgreSQL全文検索

**選定理由**:
- **Elasticsearch**:
  - 高速な全文検索
  - 柔軟なクエリ（AND/OR/NOT、あいまい検索）
  - スケーラビリティに優れる
  - **コスト**: +20〜50万円
  
- **PostgreSQL全文検索**:
  - 追加インストール不要
  - 軽量で管理が簡単
  - 中小規模なら十分な性能
  - **コスト**: 追加費用なし

**推奨**: 予算とパフォーマンス要件に応じて選択

#### Webサーバー: Nginx または Apache

**選定理由**:
- **Nginx**:
  - 高性能・軽量
  - リバースプロキシに最適
  - 静的ファイル配信が高速
  
- **Apache**:
  - 安定性が高い
  - 豊富なモジュール
  - .htaccessで柔軟な設定

**推奨**: パフォーマンス重視ならNginx、管理の容易さ重視ならApache

## 4. データフロー

### 4.1 応募者マイページのデータフロー

#### 個人情報の閲覧・編集
```
[応募者] → [ブラウザ]
              ↓ GET /api/applicant/me
         [Nginx/Apache]
              ↓
         [Express/Django]
              ↓ 認証チェック
              ↓ SELECT * FROM applicants WHERE user_id = ?
         [PostgreSQL/MySQL]
              ↓ 応募者情報
         [Express/Django]
              ↓ JSON整形
         [Nginx/Apache]
              ↓ 200 OK + JSON
         [ブラウザ]
              ↓ Reactで表示
         [応募者]
         
         
[応募者] → 情報を編集 → [ブラウザ]
                          ↓ PUT /api/applicant/me
                     [Nginx/Apache]
                          ↓
                     [Express/Django]
                          ↓ バリデーション
                          ↓ 認証チェック
                          ↓ UPDATE applicants SET ... WHERE user_id = ?
                     [PostgreSQL/MySQL]
                          ↓ 更新成功
                     [Express/Django]
                          ↓ 200 OK
                     [ブラウザ]
                          ↓ 更新完了メッセージ
                     [応募者]
```

#### 履歴書・職務経歴書のアップロード
```
[応募者] → ファイル選択 → [ブラウザ]
                          ↓ POST /api/files/upload (multipart/form-data)
                     [Nginx/Apache]
                          ↓ ファイルサイズチェック
                     [Express/Django]
                          ↓ ファイル形式チェック（PDF, Word, Excel）
                          ↓ ウイルススキャン
                          ↓ ファイル保存（/var/uploads/applicants/{user_id}/）
                     [ローカルストレージ]
                          ↓ 保存成功
                     [Express/Django]
                          ↓ INSERT INTO files (user_id, file_name, file_path, ...)
                     [PostgreSQL/MySQL]
                          ↓ 200 OK + ファイルID
                     [ブラウザ]
                          ↓ アップロード完了メッセージ
                     [応募者]
```

### 4.2 エージェント管理画面のデータフロー

#### 応募者情報の全文検索
```
[エージェント] → 検索キーワード入力 → [ブラウザ]
                                      ↓ POST /api/search
                                 [Nginx/Apache]
                                      ↓
                                 [Express/Django]
                                      ↓ 認証・権限チェック
                                      ↓ 検索クエリ構築
                                      ↓
              ┌──────────────────────┴──────────────────────┐
              ↓ (Elasticsearch使用時)                       ↓ (PostgreSQL FTS使用時)
         [Elasticsearch]                              [PostgreSQL/MySQL]
              ↓ 全文検索実行                                ↓ SELECT * FROM applicants
              ↓ マッチング結果                              ↓ WHERE to_tsvector(...) @@ to_tsquery(...)
              ↓                                            ↓
              └──────────────────────┬──────────────────────┘
                                      ↓ 検索結果（1秒以内）
                                 [Express/Django]
                                      ↓ 結果整形・ハイライト処理
                                      ↓ 200 OK + JSON
                                 [ブラウザ]
                                      ↓ Reactで表示
                                 [エージェント]
```

#### 応募者のステータス更新
```
[エージェント] → ステータス変更 → [ブラウザ]
                                  ↓ PUT /api/applicants/{id}/status
                             [Nginx/Apache]
                                  ↓
                             [Express/Django]
                                  ↓ 認証・権限チェック
                                  ↓ BEGIN TRANSACTION
                                  ↓ UPDATE applicants SET status = ? WHERE id = ?
                             [PostgreSQL/MySQL]
                                  ↓ 更新成功
                             [Express/Django]
                                  ↓ INSERT INTO activity_logs (...)
                             [PostgreSQL/MySQL]
                                  ↓ ログ記録成功
                             [Express/Django]
                                  ↓ INSERT INTO notifications (applicant_id, message, ...)
                             [PostgreSQL/MySQL]
                                  ↓ 通知作成成功
                             [Express/Django]
                                  ↓ COMMIT TRANSACTION
                                  ↓ 200 OK
                             [ブラウザ]
                                  ↓ 更新完了メッセージ
                             [エージェント]
```

### 4.3 ファイルダウンロードのデータフロー

```
[ユーザー] → ダウンロードリンククリック → [ブラウザ]
                                          ↓ GET /api/files/{file_id}/download
                                     [Nginx/Apache]
                                          ↓
                                     [Express/Django]
                                          ↓ 認証・権限チェック
                                          ↓ SELECT file_path FROM files WHERE id = ?
                                     [PostgreSQL/MySQL]
                                          ↓ ファイルパス取得
                                     [Express/Django]
                                          ↓ ファイル読み込み
                                     [ローカルストレージ]
                                          ↓ ファイルデータ
                                     [Express/Django]
                                          ↓ Content-Type, Content-Disposition設定
                                          ↓ 200 OK + ファイルデータ
                                     [Nginx/Apache]
                                          ↓ ファイル送信
                                     [ブラウザ]
                                          ↓ ダウンロード開始
                                     [ユーザー]
```

## 5. セキュリティアーキテクチャ

### 5.1 認証・認可の仕組み

#### 認証フロー（ログイン）
```
[ユーザー] → メールアドレス・パスワード入力
    ↓
[ブラウザ] → POST /api/auth/login
    ↓
[Nginx/Apache]
    ↓
[Express/Django]
    ↓ バリデーション（入力値チェック）
    ↓ SELECT * FROM users WHERE email = ?
[PostgreSQL/MySQL]
    ↓ ユーザー情報取得
[Express/Django]
    ↓ パスワードハッシュ照合（bcrypt）
    ↓ セッションID生成
    ↓ セッション保存（Redisまたはデータベース）
    ↓ Set-Cookie: session_id=xxx; HttpOnly; Secure; SameSite=Strict
[ブラウザ]
    ↓ Cookie保存
[ユーザー] ログイン成功
```

#### 認可フロー（API リクエスト）
```
[ユーザー] → APIリクエスト + Cookie
    ↓
[ブラウザ] → GET /api/applicants (Cookie: session_id=xxx)
    ↓
[Nginx/Apache]
    ↓
[Express/Django]
    ↓ セッションID取得（Cookieから）
    ↓ SELECT * FROM sessions WHERE session_id = ?
[PostgreSQL/MySQL / Redis]
    ↓ セッション情報取得
[Express/Django]
    ↓ セッション有効期限チェック
    ↓ ユーザー情報取得
    ↓ 権限チェック（応募者 or エージェント）
    ↓ ─── 権限あり → 処理続行
    ↓ ─── 権限なし → 403 Forbidden
[ブラウザ]
    ↓ レスポンス表示
[ユーザー]
```

### 5.2 セキュリティ対策

#### 通信の暗号化
- **SSL/TLS 1.3**: 全ての通信をHTTPSで暗号化
- **Let's Encrypt**: 無料SSL証明書の使用
- **HSTS（HTTP Strict Transport Security）**: ブラウザに常にHTTPS接続を強制

#### XSS（クロスサイトスクリプティング）対策
- **Reactの標準エスケープ**: `dangerouslySetInnerHTML`の使用禁止
- **Content Security Policy (CSP)**: スクリプトの実行を制限
- **入力値のサニタイズ**: HTMLタグ・スクリプトの除去

```javascript
// CSPヘッダーの設定例
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
  );
  next();
});
```

#### SQLインジェクション対策
- **プリペアドステートメント必須**: ORMの使用を推奨
- **入力値のバリデーション**: 型・形式・長さのチェック

```javascript
// ✅ 良い例（プリペアドステートメント）
const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);

// ❌ 悪い例（SQLインジェクションの危険性）
const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
```

#### CSRF（クロスサイトリクエストフォージェリ）対策
- **CSRFトークン**: 全てのPOST/PUT/DELETEリクエストにトークンを付与
- **SameSite Cookie**: `SameSite=Strict`の設定

```javascript
// CSRFトークンの生成と検証
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.post('/api/applicants', csrfProtection, (req, res) => {
  // CSRFトークンが検証される
});
```

#### ファイルアップロードのセキュリティ
- **ファイル形式制限**: PDF、Word、Excelのみ許可
- **ファイルサイズ制限**: 最大300MB
- **ウイルススキャン**: ClamAVなどのウイルススキャンツール使用
- **ファイル名のサニタイズ**: パストラバーサル攻撃の防止

```javascript
// ファイルアップロードのバリデーション
const allowedMimeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

if (!allowedMimeTypes.includes(file.mimetype)) {
  throw new Error('対応していないファイル形式です');
}

if (file.size > 300 * 1024 * 1024) {
  throw new Error('ファイルサイズは300MB以下にしてください');
}
```

#### パスワードのセキュリティ
- **ハッシュ化**: bcryptを使用（ソルト自動生成、計算コスト調整可能）
- **パスワードポリシー**: 8文字以上、英数字記号を含む
- **パスワードリセット**: トークンの有効期限を1時間に設定

```javascript
const bcrypt = require('bcrypt');
const saltRounds = 12;

// パスワードのハッシュ化
const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

// パスワードの照合
const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
```

## 6. パフォーマンス最適化

### 6.1 フロントエンドの最適化

#### コード分割（Code Splitting）
- **ルート単位での分割**: 応募者マイページとエージェント管理画面を分離
- **遅延ロード**: 必要なコンポーネントのみロード

```typescript
// React.lazyによる遅延ロード
const ApplicantPage = React.lazy(() => import('./pages/ApplicantPage'));
const AgentPage = React.lazy(() => import('./pages/AgentPage'));

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/applicant/*" element={<ApplicantPage />} />
    <Route path="/agent/*" element={<AgentPage />} />
  </Routes>
</Suspense>
```

#### キャッシング戦略
- **静的ファイル**: ブラウザキャッシュ（1年間）
- **API レスポンス**: キャッシュヘッダーの適切な設定
- **画像最適化**: WebP形式、遅延ロード

#### React最適化
- **React.memo**: 不要な再レンダリング防止
- **useMemo / useCallback**: 計算コストの高い処理のメモ化
- **仮想スクロール**: 大量データの表示に使用

### 6.2 バックエンドの最適化

#### データベースクエリの最適化
- **インデックスの適切な設定**: 頻繁に検索されるカラムにインデックス
- **N+1問題の回避**: JOIN句やORMの`include`を使用
- **ページネーション**: 大量データの取得時は必ずページネーション

```sql
-- インデックスの設定例
CREATE INDEX idx_applicants_email ON applicants(email);
CREATE INDEX idx_applicants_status ON applicants(status);
CREATE INDEX idx_files_user_id ON files(user_id);
```

#### キャッシング
- **Redis**: セッション、頻繁にアクセスされるデータのキャッシュ
- **アプリケーションレベルキャッシュ**: Node.jsのメモリキャッシュ

#### コネクションプーリング
- データベース接続の再利用でパフォーマンス向上

```javascript
// PostgreSQLのコネクションプール設定例
const pool = new Pool({
  host: 'localhost',
  database: 'recruitment_db',
  max: 20, // 最大接続数
  idleTimeoutMillis: 30000, // アイドルタイムアウト
  connectionTimeoutMillis: 2000, // 接続タイムアウト
});
```

### 6.3 Webサーバーの最適化

#### Nginxの設定
- **gzip圧縮**: テキストファイルの圧縮
- **キャッシュ設定**: 静的ファイルのキャッシュ
- **リバースプロキシ**: バックエンドへのリクエスト転送

```nginx
# Nginx設定例
http {
    # gzip圧縮
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;

    # キャッシュ設定
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # リバースプロキシ
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 7. 障害対応・運用設計

### 7.1 ログ管理

#### ログの種類
- **アクセスログ**: Nginx/Apacheのアクセスログ
- **エラーログ**: アプリケーションエラー、データベースエラー
- **監査ログ**: ユーザーの操作履歴（ログイン、データ変更等）

#### ログの保存先
- `/var/log/nginx/access.log` - Nginxアクセスログ
- `/var/log/app/error.log` - アプリケーションエラーログ
- データベースの`activity_logs`テーブル - 監査ログ

#### ログのローテーション
```bash
# logrotateの設定例
/var/log/app/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
}
```

### 7.2 バックアップ戦略

#### バックアップ対象
- データベース（PostgreSQL/MySQL）
- アップロードファイル（ローカルストレージ）
- 設定ファイル

#### バックアップスケジュール
```bash
# 日次バックアップスクリプト例（cron）
0 2 * * * /usr/local/bin/backup.sh

# backup.sh
#!/bin/bash
DATE=$(date +%Y%m%d)
pg_dump recruitment_db > /backup/db_$DATE.sql
tar -czf /backup/files_$DATE.tar.gz /var/uploads
# 7日より古いバックアップを削除
find /backup -type f -mtime +7 -delete
```

### 7.3 監視・アラート

#### 監視項目
- **サーバーリソース**: CPU使用率、メモリ使用率、ディスク使用率
- **アプリケーション**: レスポンスタイム、エラー率
- **データベース**: クエリ実行時間、コネクション数
- **ネットワーク**: 帯域使用率、パケットロス

#### アラート設定
- CPU使用率 > 80%: 警告
- メモリ使用率 > 90%: 警告
- ディスク使用率 > 85%: 警告
- エラー率 > 5%: 緊急

## 8. デプロイメント戦略

### 8.1 デプロイメントフロー

```
[開発環境] → [テスト環境] → [ステージング環境] → [本番環境]
    ↓              ↓                ↓                  ↓
 ローカル開発    結合テスト    受入テスト        本番稼働
```

### 8.2 デプロイメント手順

1. **コードのビルド**
   ```bash
   # フロントエンド
   npm run build
   
   # バックエンド
   npm run build  # または python setup.py build
   ```

2. **データベースマイグレーション**
   ```bash
   npm run migrate  # または python manage.py migrate
   ```

3. **ファイルのデプロイ**
   ```bash
   rsync -avz dist/ user@server:/var/www/app/
   ```

4. **サービスの再起動**
   ```bash
   sudo systemctl restart nginx
   sudo systemctl restart app
   ```

5. **動作確認**
   - ヘルスチェックエンドポイントの確認
   - 主要機能の動作確認

### 8.3 ロールバック戦略

障害発生時は、前のバージョンに即座にロールバック可能な体制を整える。

```bash
# バージョン管理
/var/www/app-20251001/  # 旧バージョン
/var/www/app-20251015/  # 現在のバージョン
/var/www/app -> /var/www/app-20251015  # シンボリックリンク

# ロールバック
ln -sfn /var/www/app-20251001 /var/www/app
sudo systemctl restart app
```

## 9. 今後の拡張性

### 9.1 スケーラビリティ

現時点では最大99名の応募者+10名のエージェントに対応しているが、将来的にユーザー数が増加した場合の拡張性を考慮。

#### 水平スケーリング
- **ロードバランサー**: Nginxによる複数アプリケーションサーバーへの負荷分散
- **データベースレプリケーション**: マスター・スレーブ構成による読み取り負荷の分散
- **ファイルストレージ**: NAS・オブジェクトストレージへの移行

#### 垂直スケーリング
- **サーバースペックの増強**: CPU・メモリの増設

### 9.2 機能拡張の余地

- **メール・SMS通知**: SMTP/SMS APIとの連携
- **外部システム連携**: ATS（応募者追跡システム）、CRM、HRMSとのAPI連携
- **AIマッチング**: 機械学習による求人と応募者の自動マッチング
- **データ分析**: BI ツールとの連携、ダッシュボード機能

## 評価／改善点

### 成果物の評価視点
- **スケーラビリティ**: 将来的な拡張に対応できる設計か
- **セキュリティ**: 十分なセキュリティ対策が施されているか
- **パフォーマンス**: 性能要件を満たす設計か
- **保守性**: 運用・保守がしやすい設計か

### 今後の検討事項
- **マイクロサービス化**: 機能ごとにサービスを分離
- **コンテナ化**: Dockerによる環境の標準化
- **CI/CD パイプライン**: 自動ビルド・自動デプロイの実現
- **クラウド移行**: オンプレミスからクラウドへの段階的移行
