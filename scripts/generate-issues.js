/**
 * GitHub Issues自動生成スクリプト
 *
 * 使い方:
 * node scripts/generate-issues.js
 */

const fs = require('fs');
const path = require('path');

// Issue データ定義
const issuesData = [
  {
    number: 5,
    title: 'React初期化とルーティング設定',
    phase: 0,
    labels: ['frontend', 'setup', 'phase-0'],
    dependencies: ['#1'],
    background: 'Walking Skeleton実装のため、React RouterとReact Hook Form、共通レイアウトを設定する。認証状態管理とルーティングの基盤を確立することで、後続の画面実装をスムーズに進められる。',
    scope: `### React Router設定
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
- [ ] エラーハンドリング`,
    ac: [
      'React Router v6 がインストール・設定され、ルーティングが動作する',
      'Context API または Redux Toolkit で認証状態管理が実装されている',
      '共通レイアウトコンポーネント（Header, Sidebar, Footer）が作成されている',
      'プライベートルート（認証必須）が実装され、未認証時に/loginへリダイレクトする',
      '公開ルート（/login）と認証後ルート（/dashboard）が分離されている',
      'Bootstrap テンプレートが導入され、基本的なUIが整っている',
      'Axios インスタンスが設定され、ベースURLとインターセプターが動作する'
    ]
  },
  {
    number: 6,
    title: 'フロントエンド・バックエンドAPI接続確認',
    phase: 0,
    labels: ['frontend', 'backend', 'integration', 'phase-0'],
    dependencies: ['#3', '#5'],
    background: 'フロントエンドとバックエンドが独立して実装されたため、API接続を確認しCORS設定を行う。エンドツーエンドの通信が確立されることで、Walking Skeletonの動線が完成する。',
    scope: `### CORS設定
- [ ] バックエンドで CORS 設定
- [ ] 開発環境: localhost:5173 許可
- [ ] 本番環境: 本番ドメイン許可

### API接続テスト
- [ ] Axios で GET /api/v1/auth/me 呼び出し
- [ ] ログイン後の認証トークン保存（Cookie）
- [ ] 認証トークンの自動付与（インターセプター）

### エラーハンドリング
- [ ] APIエラー時のエラーメッセージ表示
- [ ] ネットワークエラー時のフォールバック
- [ ] 401エラー時の自動ログアウト

### 環境変数管理
- [ ] 開発環境・本番環境のベースURL切り替え
- [ ] proxy設定または環境変数でURL管理`,
    ac: [
      'バックエンドで CORS 設定が完了し、開発環境（localhost:5173）からのアクセスが許可される',
      'Axios で GET /api/v1/auth/me が成功し、ユーザー情報が取得できる',
      'ログイン後に認証トークンがCookieに保存され、次回リクエストで自動付与される',
      'API エラー時にフロントエンドでエラーメッセージが表示される',
      '開発環境で proxy 設定または環境変数でベースURLが管理されている',
      'ブラウザ開発者ツールでネットワーク通信を確認し、正常に動作している'
    ]
  },
  {
    number: 7,
    title: 'Firebase Hostingへのデプロイ（開発環境）',
    phase: 0,
    labels: ['infra', 'deployment', 'phase-0'],
    dependencies: ['#4', '#6'],
    background: 'Walking Skeletonが完成したため、Firebase Hostingにデプロイして動作確認を行う。デプロイフローを確立することで、継続的なデプロイとチーム全体での動作確認が可能になる。',
    scope: `### Firebase Hosting設定
- [ ] Firebase CLI インストール
- [ ] firebase init hosting 実行
- [ ] public ディレクトリ設定（dist/）
- [ ] ビルドコマンド設定

### ビルド設定
- [ ] 本番ビルドコマンド（npm run build）確認
- [ ] 環境変数の本番設定
- [ ] ビルド成果物の確認

### デプロイ
- [ ] firebase deploy --only hosting 実行
- [ ] デプロイURL確認
- [ ] 本番環境での動作確認

### ドキュメント
- [ ] デプロイ手順のドキュメント化
- [ ] ロールバック手順のドキュメント化`,
    ac: [
      'Firebase CLI がインストールされ、firebase init hosting が完了している',
      'ビルドコマンド（npm run build）が成功し、dist/ディレクトリにビルド成果物が生成される',
      'Firebase Hosting にデプロイされ、デプロイURLでアクセスできる',
      'デプロイされたURLでログイン画面が表示され、ログイン機能が動作する',
      '本番ビルドで環境変数が正しく読み込まれ、Firebase APIキーが設定されている',
      'デプロイ手順がdocs/またはREADME.mdにドキュメント化されている'
    ]
  }
];

// Issueテンプレート生成関数
function generateIssueMarkdown(issue) {
  const deps = issue.dependencies.join(', ');
  const labels = issue.labels.map(l => `\`${l}\``).join(', ');
  const acList = issue.ac.map(ac => `- [ ] ${ac}`).join('\n');

  return `# Issue #${issue.number}: ${issue.title}

## 背景 / 目的
${issue.background}

- **依存**: ${deps}
- **ラベル**: ${labels}

## スコープ / 作業項目

${issue.scope}

## ゴール / 完了条件（Acceptance Criteria）

${acList}

## テスト観点

### 検証方法
（実装時に詳細化）

## 要確認事項

（必要に応じて追加）

## 参考資料

- [実装計画](../docs/08_implementation_plan.md)
- [要件定義書](../docs/01_requirements.md)
- [アーキテクチャ設計書](../docs/02_architecture.md)
`;
}

// Issues生成
const issuesDir = path.join(__dirname, '..', '.github', 'ISSUES');

issuesData.forEach(issue => {
  const filename = `issue-${String(issue.number).padStart(3, '0')}.md`;
  const filepath = path.join(issuesDir, filename);
  const content = generateIssueMarkdown(issue);

  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✓ Generated ${filename}`);
});

console.log(`\n${issuesData.length} issues generated successfully!`);
