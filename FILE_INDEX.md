# FILE INDEX - MypageAppTest

> 最終更新: 2026-05-06 | ファイル数: 116

## ディレクトリ構造 (depth=4)

```
.
├── .env.development.example
├── .env.production.example
├── .github/
│   ├── ISSUES/
│   │   ├── README.md
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
│   │   └── issue-048.md
│   ├── dependabot.yml
│   └── workflows/
│       ├── ci.yml
│       ├── codeql.yml
│       └── firebase-hosting.yml
├── .gitignore
├── .serena/
│   ├── .gitignore
│   └── project.yml
├── CLAUDE.md
├── FILE_INDEX.md
├── README.md
├── Timeout_Prevention.md
├── backend/
│   ├── FIRESTORE_SETUP.md
│   ├── nodemon.json
│   ├── package-lock.json
│   ├── package.json
│   ├── src/
│   │   ├── firestore/
│   │   │   └── schema.ts
│   │   ├── index.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── routes/
│   │   │   ├── applicants.ts
│   │   │   └── auth.ts
│   │   ├── scripts/
│   │   │   └── seed.ts
│   │   └── utils/
│   │       └── path.ts
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
├── firebase.json
├── frontend/
│   ├── .gitignore
│   ├── README.md
│   ├── e2e/
│   │   ├── login.spec.ts
│   │   └── protected-routes.spec.ts
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── playwright.config.ts
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   └── ProtectedRoute.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── firebase.ts
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── pages/
│   │       ├── AgentDashboard.tsx
│   │       ├── ApplicantDashboard.tsx
│   │       ├── ApplicantProfile.tsx
│   │       └── Login.tsx
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── scripts/
│   ├── generate-issues-phase3-6.js
│   └── generate-issues.js
└── tasks.md
```

## カテゴリ別ファイル一覧

### Documentation (68件)

<details><summary>68件（クリックして展開）</summary>

| ファイルパス | サイズ(bytes) | SHA |
|---|---|---|
| `.github/ISSUES/issue-001.md` | 3577 | 4ffd6c4 |
| `.github/ISSUES/issue-002.md` | 4037 | c08a0ae |
| `.github/ISSUES/issue-003.md` | 4325 | 0439559 |
| `.github/ISSUES/issue-004.md` | 4095 | ced05df |
| `.github/ISSUES/issue-005.md` | 2274 | 69138f7 |
| `.github/ISSUES/issue-006.md` | 2094 | 0d7aceb |
| `.github/ISSUES/issue-007.md` | 1967 | 2a954e3 |
| `.github/ISSUES/issue-008.md` | 4027 | 1660ba4 |
| `.github/ISSUES/issue-009.md` | 4791 | 2184b74 |
| `.github/ISSUES/issue-010.md` | 1626 | 37a3279 |
| `.github/ISSUES/issue-011.md` | 1588 | e1302f7 |
| `.github/ISSUES/issue-012.md` | 1969 | 3b561f8 |
| `.github/ISSUES/issue-013.md` | 1888 | d51ad38 |
| `.github/ISSUES/issue-014.md` | 1485 | 424476b |
| `.github/ISSUES/issue-015.md` | 1744 | 3248929 |
| `.github/ISSUES/issue-016.md` | 1461 | 452e804 |
| `.github/ISSUES/issue-017.md` | 1720 | 0ba6073 |
| `.github/ISSUES/issue-018.md` | 1626 | b75225e |
| `.github/ISSUES/issue-019.md` | 1740 | 7dd5ce2 |
| `.github/ISSUES/issue-020.md` | 1534 | 28566d0 |
| `.github/ISSUES/issue-021.md` | 1620 | 432366f |
| `.github/ISSUES/issue-022.md` | 1704 | e7a2762 |
| `.github/ISSUES/issue-023.md` | 1454 | dcf1c29 |
| `.github/ISSUES/issue-024.md` | 1460 | 5c96ff2 |
| `.github/ISSUES/issue-025.md` | 1682 | bc8fccd |
| `.github/ISSUES/issue-026.md` | 1681 | b6702d2 |
| `.github/ISSUES/issue-027.md` | 1752 | e5442aa |
| `.github/ISSUES/issue-028.md` | 1623 | 5be61b2 |
| `.github/ISSUES/issue-029.md` | 1556 | b12aa0b |
| `.github/ISSUES/issue-030.md` | 1432 | e236b10 |
| `.github/ISSUES/issue-031.md` | 1500 | ce220c1 |
| `.github/ISSUES/issue-032.md` | 1686 | 2365701 |
| `.github/ISSUES/issue-033.md` | 1471 | 32ffe9a |
| `.github/ISSUES/issue-034.md` | 1430 | aaf9418 |
| `.github/ISSUES/issue-035.md` | 1631 | bd932a5 |
| `.github/ISSUES/issue-036.md` | 1343 | 3368bad |
| `.github/ISSUES/issue-037.md` | 1461 | 284e2ad |
| `.github/ISSUES/issue-038.md` | 1403 | 1d49469 |
| `.github/ISSUES/issue-039.md` | 1453 | 57c137a |
| `.github/ISSUES/issue-040.md` | 1540 | e78f23e |
| `.github/ISSUES/issue-041.md` | 1553 | 4ccd628 |
| `.github/ISSUES/issue-042.md` | 1313 | 6b025ab |
| `.github/ISSUES/issue-043.md` | 1634 | a5f0802 |
| `.github/ISSUES/issue-044.md` | 1437 | 5899975 |
| `.github/ISSUES/issue-045.md` | 1703 | 07b7648 |
| `.github/ISSUES/issue-046.md` | 1622 | fa45b9b |
| `.github/ISSUES/issue-047.md` | 1521 | 5a178b2 |
| `.github/ISSUES/issue-048.md` | 1669 | 7d4ab20 |
| `.github/ISSUES/README.md` | 5612 | 27e4462 |
| `backend/FIRESTORE_SETUP.md` | 3646 | e90ace1 |
| `CLAUDE.md` | 1343 | 17e52e8 |
| `config/README.md` | 1419 | f9782e4 |
| `docs/01_requirements.md` | 25387 | 0d78277 |
| `docs/02_architecture.md` | 36987 | 9358df8 |
| `docs/03_database.md` | 28945 | 638b118 |
| `docs/04_api.md` | 34501 | 5448350 |
| `docs/05_sitemap.md` | 35627 | da45080 |
| `docs/06_environment.md` | 8469 | fdb6c79 |
| `docs/07_deployment.md` | 4463 | 8a4fe62 |
| `docs/07_firebase_setup_guide.md` | 12298 | f1f4abb |
| `docs/08_cicd.md` | 5766 | e17185b |
| `docs/08_implementation_plan.md` | 36264 | 6cdc601 |
| `docs/CLAUDE.md` | 11955 | d47ee45 |
| `FILE_INDEX.md` | 13655 | b1c898b |
| `frontend/README.md` | 2555 | d2e7761 |
| `README.md` | 6051 | a722b64 |
| `tasks.md` | 1190 | 171d71d |
| `Timeout_Prevention.md` | 4989 | d690243 |

</details>

### Code (23件)

| ファイルパス | サイズ(bytes) | SHA |
|---|---|---|
| `backend/src/firestore/schema.ts` | 2439 | 21c9b9d |
| `backend/src/index.ts` | 2020 | 7505563 |
| `backend/src/middleware/auth.ts` | 2726 | 199c5b5 |
| `backend/src/routes/applicants.ts` | 6809 | b08bfa7 |
| `backend/src/routes/auth.ts` | 4129 | 12a5241 |
| `backend/src/scripts/seed.ts` | 6727 | cee3874 |
| `backend/src/utils/path.ts` | 240 | c14c4b7 |
| `frontend/e2e/login.spec.ts` | 3967 | 5767c15 |
| `frontend/e2e/protected-routes.spec.ts` | 2370 | 4d55c37 |
| `frontend/eslint.config.js` | 621 | b19330b |
| `frontend/playwright.config.ts` | 1374 | 9ec3466 |
| `frontend/src/App.tsx` | 1390 | f9becb0 |
| `frontend/src/components/ProtectedRoute.tsx` | 906 | 530a007 |
| `frontend/src/contexts/AuthContext.tsx` | 2000 | e3e73fe |
| `frontend/src/firebase.ts` | 853 | 55f7060 |
| `frontend/src/main.tsx` | 326 | c8d8e5f |
| `frontend/src/pages/AgentDashboard.tsx` | 4403 | cce1096 |
| `frontend/src/pages/ApplicantDashboard.tsx` | 4531 | 21e0b5a |
| `frontend/src/pages/ApplicantProfile.tsx` | 11548 | 095af9b |
| `frontend/src/pages/Login.tsx` | 7360 | 969f046 |
| `frontend/vite.config.ts` | 161 | 8b0f57b |
| `scripts/generate-issues-phase3-6.js` | 31751 | 648f4b0 |
| `scripts/generate-issues.js` | 27284 | 36d54bd |

### Data (4件)

| ファイルパス | サイズ(bytes) | SHA |
|---|---|---|
| `backend/nodemon.json` | 72 | 22ff835 |
| `firebase.json` | 509 | 860e194 |
| `frontend/tsconfig.app.json` | 732 | a9b5a59 |
| `frontend/tsconfig.node.json` | 653 | 8a67f62 |

### Config (14件)

| ファイルパス | サイズ(bytes) | SHA |
|---|---|---|
| `.github/dependabot.yml` | 1037 | a4b81f4 |
| `.github/workflows/ci.yml` | 3507 | 27f6186 |
| `.github/workflows/codeql.yml` | 795 | e8cb473 |
| `.github/workflows/firebase-hosting.yml` | 1831 | 67f8271 |
| `.gitignore` | 799 | b94721e |
| `.serena/.gitignore` | 7 | 14d86ad |
| `.serena/project.yml` | 5591 | 727f449 |
| `backend/package-lock.json` | 134770 | fca4330 |
| `backend/package.json` | 727 | f66068f |
| `backend/tsconfig.json` | 1114 | bdbad8c |
| `frontend/.gitignore` | 253 | a547bf3 |
| `frontend/package-lock.json` | 172498 | 8f399ce |
| `frontend/package.json` | 1068 | 60efcd9 |
| `frontend/tsconfig.json` | 119 | 1ffef60 |

### Asset (2件)

| ファイルパス | サイズ(bytes) | SHA |
|---|---|---|
| `frontend/public/vite.svg` | 1497 | e7b8dfb |
| `frontend/src/assets/react.svg` | 4126 | 6c87de9 |

### Other (5件)

| ファイルパス | サイズ(bytes) | SHA |
|---|---|---|
| `.env.development.example` | 655 | 7414865 |
| `.env.production.example` | 1136 | 9250527 |
| `frontend/index.html` | 357 | 072a57e |
| `frontend/src/App.css` | 606 | b9d355d |
| `frontend/src/index.css` | 1154 | 08a3ac9 |

