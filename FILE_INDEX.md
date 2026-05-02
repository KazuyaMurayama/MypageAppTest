# FILE_INDEX — MypageAppTest

> ⚠️ このファイルは自動生成です。手動編集は次回更新で上書きされます。

| 項目 | 値 |
|---|---|
| リポジトリ | KazuyaMurayama/MypageAppTest |
| ブランチ | main |
| 総ファイル数 | 116 |
| 最終更新 | 2026-05-02 |
| 管理者 | 男座員也（Kazuya Oza） |

---

## カテゴリ別サマリー

| カテゴリ | ファイル数 |
|---|---|
| Documentation | 68 |
| Code | 22 |
| Data | 9 |
| Asset | 2 |
| Config | 10 |
| Other | 5 |

---

## ディレクトリ構成

```
.
├── .github/
│   ├── ISSUES/
│   │   ├── issue-001.md
│   │   ├── issue-002.md
│   │   ├── issue-003.md
│   │   ├── issue-004.md
│   │   ├── issue-005.md
│   │   ├── issue-006.md
│   │   ├── issue-007.md
│   │   ├── issue-008.md
│   │   ├── issue-009.md
│   │   ├── issue-010.md
│   │   ├── issue-011.md
│   │   ├── issue-012.md
│   │   ├── issue-013.md
│   │   ├── issue-014.md
│   │   ├── issue-015.md
│   │   ├── issue-016.md
│   │   ├── issue-017.md
│   │   ├── issue-018.md
│   │   ├── issue-019.md
│   │   ├── issue-020.md
│   │   ├── issue-021.md
│   │   ├── issue-022.md
│   │   ├── issue-023.md
│   │   ├── issue-024.md
│   │   ├── issue-025.md
│   │   ├── issue-026.md
│   │   ├── issue-027.md
│   │   ├── issue-028.md
│   │   ├── issue-029.md
│   │   ├── issue-030.md
│   │   ├── issue-031.md
│   │   ├── issue-032.md
│   │   ├── issue-033.md
│   │   ├── issue-034.md
│   │   ├── issue-035.md
│   │   ├── issue-036.md
│   │   ├── issue-037.md
│   │   ├── issue-038.md
│   │   ├── issue-039.md
│   │   ├── issue-040.md
│   │   ├── issue-041.md
│   │   ├── issue-042.md
│   │   ├── issue-043.md
│   │   ├── issue-044.md
│   │   ├── issue-045.md
│   │   ├── issue-046.md
│   │   ├── issue-047.md
│   │   ├── issue-048.md
│   │   └── README.md
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── codeql.yml
│   │   └── firebase-hosting.yml
│   └── dependabot.yml
├── .serena/
│   ├── .gitignore
│   └── project.yml
├── backend/
│   ├── src/
│   │   ├── firestore/
│   │   │   ... (1 items)
│   │   ├── middleware/
│   │   │   ... (1 items)
│   │   ├── routes/
│   │   │   ... (2 items)
│   │   ├── scripts/
│   │   │   ... (1 items)
│   │   ├── utils/
│   │   │   ... (1 items)
│   │   └── index.ts
│   ├── FIRESTORE_SETUP.md
│   ├── nodemon.json
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── config/
│   └── README.md
├── docs/
│   ├── 01_requirements.md
│   ├── 02_architecture.md
│   ├── 03_database.md
│   ├── 04_api.md
│   ├── 05_sitemap.md
│   ├── 06_environment.md
│   ├── 07_deployment.md
│   ├── 07_firebase_setup_guide.md
│   ├── 08_cicd.md
│   ├── 08_implementation_plan.md
│   └── CLAUDE.md
├── frontend/
│   ├── e2e/
│   │   ├── login.spec.ts
│   │   └── protected-routes.spec.ts
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ... (1 items)
│   │   ├── components/
│   │   │   ... (1 items)
│   │   ├── contexts/
│   │   │   ... (1 items)
│   │   ├── pages/
│   │   │   ... (4 items)
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── firebase.ts
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── playwright.config.ts
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── scripts/
│   ├── generate-issues-phase3-6.js
│   └── generate-issues.js
├── .env.development.example
├── .env.production.example
├── .gitignore
├── CLAUDE.md
├── FILE_INDEX.md
├── firebase.json
├── README.md
├── tasks.md
└── Timeout_Prevention.md
```

---

## ファイル詳細

### Documentation (68件)

<details>
<summary>クリックして展開 (68件)</summary>

| ファイル | サイズ | 説明 |
|---|---|---|
| `.github/ISSUES/issue-001.md` | 3.5 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-002.md` | 3.9 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-003.md` | 4.2 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-004.md` | 4.0 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-005.md` | 2.2 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-006.md` | 2.0 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-007.md` | 1.9 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-008.md` | 3.9 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-009.md` | 4.7 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-010.md` | 1.6 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-011.md` | 1.6 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-012.md` | 1.9 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-013.md` | 1.8 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-014.md` | 1.5 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-015.md` | 1.7 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-016.md` | 1.4 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-017.md` | 1.7 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-018.md` | 1.6 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-019.md` | 1.7 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-020.md` | 1.5 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-021.md` | 1.6 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-022.md` | 1.7 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-023.md` | 1.4 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-024.md` | 1.4 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-025.md` | 1.6 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-026.md` | 1.6 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-027.md` | 1.7 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-028.md` | 1.6 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-029.md` | 1.5 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-030.md` | 1.4 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-031.md` | 1.5 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-032.md` | 1.6 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-033.md` | 1.4 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-034.md` | 1.4 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-035.md` | 1.6 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-036.md` | 1.3 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-037.md` | 1.4 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-038.md` | 1.4 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-039.md` | 1.4 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-040.md` | 1.5 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-041.md` | 1.5 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-042.md` | 1.3 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-043.md` | 1.6 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-044.md` | 1.4 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-045.md` | 1.7 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-046.md` | 1.6 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-047.md` | 1.5 KB | Markdown ドキュメント |
| `.github/ISSUES/issue-048.md` | 1.6 KB | Markdown ドキュメント |
| `.github/ISSUES/README.md` | 5.5 KB | リポジトリ概要・セットアップ手順 |
| `backend/FIRESTORE_SETUP.md` | 3.6 KB | Markdown ドキュメント |
| `CLAUDE.md` | 1.3 KB | Claude Code プロジェクト設定・命名ルール |
| `config/README.md` | 1.4 KB | リポジトリ概要・セットアップ手順 |
| `docs/01_requirements.md` | 24.8 KB | Markdown ドキュメント |
| `docs/02_architecture.md` | 36.1 KB | Markdown ドキュメント |
| `docs/03_database.md` | 28.3 KB | Markdown ドキュメント |
| `docs/04_api.md` | 33.7 KB | Markdown ドキュメント |
| `docs/05_sitemap.md` | 34.8 KB | Markdown ドキュメント |
| `docs/06_environment.md` | 8.3 KB | Markdown ドキュメント |
| `docs/07_deployment.md` | 4.4 KB | Markdown ドキュメント |
| `docs/07_firebase_setup_guide.md` | 12.0 KB | Markdown ドキュメント |
| `docs/08_cicd.md` | 5.6 KB | Markdown ドキュメント |
| `docs/08_implementation_plan.md` | 35.4 KB | Markdown ドキュメント |
| `docs/CLAUDE.md` | 11.7 KB | Claude Code プロジェクト設定・命名ルール |
| `FILE_INDEX.md` | 3.5 KB | （このファイル）全ファイルインデックス |
| `frontend/README.md` | 2.5 KB | リポジトリ概要・セットアップ手順 |
| `README.md` | 5.9 KB | リポジトリ概要・セットアップ手順 |
| `tasks.md` | 1.2 KB | タスク管理・セッション履歴 |
| `Timeout_Prevention.md` | 4.9 KB | タイムアウト対策ガイド |

</details>

### Code (22件)

| ファイル | サイズ | 説明 |
|---|---|---|
| `backend/src/firestore/schema.ts` | 2.4 KB | TypeScript モジュール |
| `backend/src/index.ts` | 2.0 KB | TypeScript モジュール |
| `backend/src/middleware/auth.ts` | 2.7 KB | TypeScript モジュール |
| `backend/src/routes/applicants.ts` | 6.6 KB | TypeScript モジュール |
| `backend/src/routes/auth.ts` | 4.0 KB | TypeScript モジュール |
| `backend/src/scripts/seed.ts` | 6.6 KB | TypeScript モジュール |
| `backend/src/utils/path.ts` | 240 B | TypeScript モジュール |
| `frontend/e2e/login.spec.ts` | 3.9 KB | TypeScript モジュール |
| `frontend/e2e/protected-routes.spec.ts` | 2.3 KB | TypeScript モジュール |
| `frontend/eslint.config.js` | 621 B | JavaScript モジュール |
| `frontend/playwright.config.ts` | 1.3 KB | TypeScript モジュール |
| `frontend/src/App.tsx` | 1.4 KB | React コンポーネント |
| `frontend/src/components/ProtectedRoute.tsx` | 906 B | React コンポーネント |
| `frontend/src/contexts/AuthContext.tsx` | 2.0 KB | React コンポーネント |
| `frontend/src/firebase.ts` | 853 B | TypeScript モジュール |
| `frontend/src/main.tsx` | 326 B | React コンポーネント |
| `frontend/src/pages/AgentDashboard.tsx` | 4.3 KB | React コンポーネント |
| `frontend/src/pages/ApplicantDashboard.tsx` | 4.4 KB | React コンポーネント |
| `frontend/src/pages/ApplicantProfile.tsx` | 11.3 KB | React コンポーネント |
| `frontend/src/pages/Login.tsx` | 7.2 KB | React コンポーネント |
| `scripts/generate-issues-phase3-6.js` | 31.0 KB | JavaScript モジュール |
| `scripts/generate-issues.js` | 26.6 KB | JavaScript モジュール |

### Data (9件)

| ファイル | サイズ | 説明 |
|---|---|---|
| `.github/dependabot.yml` | 1.0 KB | YAML 設定 |
| `.github/workflows/ci.yml` | 3.4 KB | GitHub Actions ワークフロー |
| `.github/workflows/codeql.yml` | 795 B | GitHub Actions ワークフロー |
| `.github/workflows/firebase-hosting.yml` | 1.8 KB | GitHub Actions ワークフロー |
| `.serena/project.yml` | 5.5 KB | YAML 設定 |
| `backend/nodemon.json` | 72 B | JSON データ |
| `firebase.json` | 509 B | JSON データ |
| `frontend/tsconfig.app.json` | 732 B | JSON データ |
| `frontend/tsconfig.node.json` | 653 B | JSON データ |

### Asset (2件)

| ファイル | サイズ | 説明 |
|---|---|---|
| `frontend/public/vite.svg` | 1.5 KB | SVG 画像 |
| `frontend/src/assets/react.svg` | 4.0 KB | SVG 画像 |

### Config (10件)

| ファイル | サイズ | 説明 |
|---|---|---|
| `.gitignore` | 799 B | Git 除外設定 |
| `.serena/.gitignore` | 7 B | Git 除外設定 |
| `backend/package-lock.json` | 131.6 KB | npm ロックファイル（自動生成） |
| `backend/package.json` | 727 B | npm パッケージ設定 |
| `backend/tsconfig.json` | 1.1 KB | TypeScript コンパイラ設定 |
| `frontend/.gitignore` | 253 B | Git 除外設定 |
| `frontend/package-lock.json` | 168.5 KB | npm ロックファイル（自動生成） |
| `frontend/package.json` | 1.0 KB | npm パッケージ設定 |
| `frontend/tsconfig.json` | 119 B | TypeScript コンパイラ設定 |
| `frontend/vite.config.ts` | 161 B | Vite ビルド設定 |

### Other (5件)

| ファイル | サイズ | 説明 |
|---|---|---|
| `.env.development.example` | 655 B | ファイル |
| `.env.production.example` | 1.1 KB | ファイル |
| `frontend/index.html` | 357 B | ファイル |
| `frontend/src/App.css` | 606 B | ファイル |
| `frontend/src/index.css` | 1.1 KB | ファイル |

---

_自動生成: 2026-05-02 | 管理者: 男座員也（Kazuya Oza）_
