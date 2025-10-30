# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**人材エージェントマイページシステム** - 応募者と人材エージェントが情報を共有・管理できるWebシステム（デモ版：最大99名対応）

### 技術スタック

| 分類 | 技術 | バージョン |
|------|------|-----------|
| フロントエンド | React | 18.3.x |
| 言語 | TypeScript | 5.x |
| UIフレームワーク | Bootstrap | 5.x |
| 状態管理 | React Context API / Redux Toolkit | - |
| ビルドツール | Vite | 5.x |
| バックエンド | Node.js (Express) または Python (Django/Flask) | 20.x / 3.11+ |
| データベース | PostgreSQL または MySQL | 15.x / 8.0+ |
| 全文検索 | Elasticsearch または PostgreSQL全文検索 | 8.x / - |
| ファイルストレージ | ローカルストレージ | - |
| Webサーバー | Nginx または Apache | 1.24.x / 2.4.x |
| OS | Ubuntu Server または CentOS Stream | 22.04 LTS / 9 |

### プロジェクトの現状

**注意**: このリポジトリは現在設計段階です。`docs/`ディレクトリに設計書のみが存在し、実装コードはまだありません。

## 設計書の構造

作業前に必ず関連する設計書を確認してください。

| ファイル | 内容 |
|---------|------|
| `01_requirements.md` | 要件定義書 - 機能要件、非機能要件、UI/UX概要 |
| `02_architecture.md` | アーキテクチャ設計書 - システム構成、技術スタック、データフロー |
| `03_database.md` | データベース設計書 - データ構造、ER図、テーブル定義 |
| `04_api.md` | API設計書 - RESTful API仕様、認証、エラーハンドリング |
| `05_sitemap.md` | サイトマップ - 画面構成、URL設計、画面遷移 |

### 設計書の読み方

1. **要件定義書**から全体像を把握
2. **アーキテクチャ設計書**でシステム構成と技術選定理由を理解
3. **データベース設計書**でデータ構造を確認
4. 実装時は**API設計書**と**サイトマップ**を参照

## 開発コマンド（実装後に使用予定）

### フロントエンド
```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# Lintチェック
npm run lint

# 型チェック
npm run type-check

# ビルド
npm run build
```

### バックエンド (Node.js)
```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# テスト実行
npm test

# プロダクションビルド
npm run build
```

### バックエンド (Python)
```bash
# 仮想環境作成
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 依存関係のインストール
pip install -r requirements.txt

# 開発サーバー起動
python manage.py runserver  # Django
# または
flask run  # Flask

# マイグレーション実行
python manage.py migrate  # Django
```

### データベース
```bash
# PostgreSQL接続
psql -U postgres -d recruitment_db

# MySQL接続
mysql -u root -p recruitment_db

# マイグレーション実行
npm run migrate  # または python manage.py migrate
```

## アーキテクチャの重要なポイント

### システム構成

- **オンプレミス環境**: 自社サーバーへの導入（クラウド不使用）
- **3層アーキテクチャ**: プレゼンテーション層、ビジネスロジック層、データアクセス層
- **レスポンシブデザイン**: PC、タブレット、スマートフォン対応

### データフロー

- **応募者マイページ**: 個人情報閲覧・編集、求人資料ダウンロード、書類アップロード
- **エージェント管理画面**: 応募者情報管理、全文検索、ステータス管理、商談メモ
- **ファイル管理**: 1応募者平均30MB、最大300MB、全体10GB

### 認証・セキュリティ

- **認証方式**: ID・パスワード認証
- **通信暗号化**: SSL/TLS（Let's Encrypt）
- **セキュリティ対策**: SQLインジェクション、XSS、CSRF対策
- **ファイルセキュリティ**: アップロード時のウイルススキャン

### 主要コンポーネント（実装予定）

```
src/
├── applicant/                # 応募者マイページ
│   ├── components/
│   │   ├── Dashboard.tsx     # ダッシュボード
│   │   ├── ProfileForm.tsx   # 個人情報編集
│   │   ├── JobList.tsx       # 求人一覧
│   │   └── FileUpload.tsx    # 書類アップロード
│   └── pages/
│       ├── LoginPage.tsx
│       └── MyPage.tsx
│
├── agent/                    # エージェント管理画面
│   ├── components/
│   │   ├── ApplicantList.tsx    # 応募者一覧
│   │   ├── SearchBar.tsx        # 全文検索
│   │   ├── ApplicantDetail.tsx  # 詳細画面
│   │   └── MemoEditor.tsx       # 商談メモ
│   └── pages/
│       ├── DashboardPage.tsx
│       └── ManagementPage.tsx
│
├── shared/
│   ├── components/
│   │   ├── Notification.tsx  # 通知コンポーネント
│   │   └── FileViewer.tsx    # ファイル表示
│   └── services/
│       ├── api.ts            # API通信
│       ├── auth.ts           # 認証処理
│       └── fileService.ts    # ファイル操作
│
└── backend/
    ├── routes/
    │   ├── auth.ts           # 認証API
    │   ├── applicants.ts     # 応募者API
    │   ├── jobs.ts           # 求人API
    │   └── files.ts          # ファイルAPI
    ├── models/
    │   ├── User.ts
    │   ├── Applicant.ts
    │   ├── Job.ts
    │   └── File.ts
    └── services/
        ├── searchService.ts  # 全文検索
        └── notificationService.ts
```

## 言語設定

- **回答・説明は日本語で行うこと**
- コード内のコメントも日本語で記述
- 変数名・関数名は英語（業界標準に従う）

## コミットメッセージフォーマット

```
<type>(<scope>): <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Type（必須）
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードフォーマット
- `refactor`: リファクタリング
- `perf`: パフォーマンス改善
- `test`: テスト追加・修正
- `chore`: ビルド・ツール変更

### 例
```
feat(applicant): 応募者マイページのダッシュボードを実装

- Dashboardコンポーネントを作成
- 求人情報一覧の表示機能を実装
- 応募状況の確認機能を追加

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

## コーディングスタイル

### 命名規則
- **変数・関数**: `camelCase`
- **定数**: `UPPER_SNAKE_CASE`
- **型・インターフェース**: `PascalCase`
- **コンポーネント**: `PascalCase` (例: `ApplicantList.tsx`)
- **データベーステーブル**: `snake_case`

### TypeScript
- 型推論を活用しつつ、公開APIには明示的な型注釈を付ける
- `any`の使用は避け、`unknown`を使用
- React.FCよりも関数宣言を優先

```typescript
// ✅ 良い例
interface Applicant {
  id: number;
  name: string;
  email: string;
  status: ApplicationStatus;
  createdAt: Date;
}

function ApplicantCard({ applicant }: { applicant: Applicant }) {
  // ...
}

// ❌ 悪い例
const ApplicantCard: React.FC<any> = (props) => {
  // ...
}
```

### API使用時の注意点

```typescript
// ✅ 良い例: エラーハンドリング
try {
  const response = await api.createApplicant(data);
  return response.data;
} catch (error) {
  logger.error('応募者作成に失敗:', error);
  throw new AppError('応募者の作成に失敗しました', error);
}

// ❌ 悪い例: エラーを無視
try {
  await api.createApplicant(data);
} catch (e) {
  // 無視
}
```

### ファイルアップロード時の注意点

```typescript
// ✅ 良い例: バリデーションとウイルススキャン
async function uploadFile(file: File) {
  // ファイルサイズチェック
  if (file.size > 300 * 1024 * 1024) {
    throw new Error('ファイルサイズは300MB以下にしてください');
  }
  
  // ファイル形式チェック
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('対応していないファイル形式です');
  }
  
  // ウイルススキャン
  await virusScanService.scan(file);
  
  // アップロード処理
  return await fileService.upload(file);
}
```

## セキュリティ要件

### 必須対応事項

1. **入力値のバリデーション**
   - 氏名: 1-50文字
   - メールアドレス: RFC準拠
   - パスワード: 8文字以上、英数字記号を含む
   - ファイルサイズ: 最大300MB
   - ファイル形式: PDF, Word, Excel のみ
   - サーバー側でも必ず検証

2. **XSS対策**
   - Reactのデフォルトエスケープを利用
   - `dangerouslySetInnerHTML`は使用禁止
   - ユーザー入力は必ずサニタイズ

3. **SQLインジェクション対策**
   - プリペアドステートメント使用必須
   - ORMの使用を推奨

4. **CSRF対策**
   - CSRFトークンの実装
   - SameSite Cookie属性の設定

5. **認証・認可**
   - セッション管理の適切な実装
   - パスワードのハッシュ化（bcrypt推奨）
   - 応募者とエージェントの権限分離

## パフォーマンス要件

### 目標値

| 項目 | 目標値 |
|------|--------|
| 画面表示 | 2秒以内 |
| 検索実行 | 1秒以内 |
| ファイルアップロード | 100MBあたり30秒以内 |
| 同時接続数 | 最大20名 |

### 最適化手法

- React.memoによる再レンダリング防止
- Code Splittingで初期ロードサイズ削減
- データベースインデックスの適切な設定
- 全文検索エンジン（Elasticsearch）の活用
- ファイルの圧縮・最適化

## Git運用

### ブランチ戦略
- `main`: 本番環境（保護ブランチ）
- `develop`: 開発環境
- `feature/*`: 機能開発用
- `fix/*`: バグ修正用
- `release/*`: リリース準備用

### プルリクエスト
- タイトルはコミットメッセージと同様の形式
- 説明には変更内容・理由・影響範囲を記載
- 関連Issueをリンク
- レビュー必須（2名以上）

## Claude Code作業時の注意事項

### 実装前の確認
1. `docs/`配下の関連設計書を読む
2. 設計書と矛盾する実装が必要な場合は質問する
3. セキュリティリスクがある場合は質問する
4. データベーススキーマを確認する

### 作業中
- 小さく段階的に実装（大きな変更は避ける）
- データベース操作には必ずトランザクションを使用
- ファイル操作には必ずエラーハンドリングを実装
- 応募者とエージェントの権限を明確に分離

### テスト
- 単体テストの作成必須
- ブラウザ互換性テスト（Chrome、Edge、Safari、Firefox）
- モバイル対応テスト（レスポンシブデザイン）
- セキュリティテスト

### 質問が必要な場合
- 設計書と異なる実装が必要な場合
- セキュリティリスクがある可能性がある場合
- 複数の実装方法があり判断に迷う場合
- パフォーマンスに影響する可能性がある場合
