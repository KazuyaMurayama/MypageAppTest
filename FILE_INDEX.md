# FILE_INDEX.md — MypageAppTest

> **新セッション開始時に必ずこのファイルを読む。**
> ファイル追加・削除・移動時は必ずこのファイルを更新すること。
> 最終更新: 2026-04-30

## 概要
人材エージェントマイページシステム。応募者情報管理・求人閲覧・書類アップロードを備えたWebシステム。応募者マイページとエージェント管理画面の2画面構成。

**スタック:** React, TypeScript, Firebase, Firestore, Node.js, Express, Playwright

---

## 📋 最初に読むべきファイル

| 優先度 | ファイル | 内容 |
|---|---|---|
| ★★★ | `README.md` | システム概要・セットアップ手順 |
| ★★★ | `docs/CLAUDE.md` | Claude Code運用ルール |
| ★★★ | `frontend/src/App.tsx` | フロントエンドメインコンポーネント |
| ★★★ | `backend/src/index.ts` | バックエンドエントリポイント |
| ★★ | `docs/01_requirements.md` | 要件定義 |

---

## 🗂️ ディレクトリ構造

```
MypageAppTest/
├── README.md
├── firebase.json
├── .env.development.example
├── .env.production.example
├── docs/
│   ├── CLAUDE.md                ← Claude Code指針
│   ├── 01_requirements.md
│   ├── 02_architecture.md
│   ├── 03_database.md
│   ├── 04_api.md
│   ├── 05_sitemap.md
│   └── 06_environment.md
├── backend/
│   ├── src/
│   │   ├── index.ts             ← バックエンドエントリポイント
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── firestore/
│   │   └── utils/
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.tsx              ← フロントエンドルート
    │   ├── firebase.ts
    │   ├── pages/
    │   ├── components/
    │   └── contexts/
    ├── e2e/                     ← Playwrightテスト
    └── package.json
```

---

## 📑 全ファイル一覧

| パス | 種別 | 説明 |
|---|---|---|
| `README.md` | ドキュメント | システム概要・セットアップ手順 |
| `docs/CLAUDE.md` | ドキュメント | Claude Code運用ルール |
| `docs/01_requirements.md` | ドキュメント | 要件定義 |
| `docs/02_architecture.md` | ドキュメント | アーキテクチャ設計 |
| `docs/03_database.md` | ドキュメント | データベース設計 |
| `docs/04_api.md` | ドキュメント | API設計 |
| `frontend/src/App.tsx` | TypeScript | フロントエンドメインコンポーネント |
| `frontend/src/firebase.ts` | TypeScript | Firebase初期化 |
| `frontend/src/pages/` | TypeScript | ページコンポーネント群 |
| `frontend/src/components/` | TypeScript | UIコンポーネント群 |
| `frontend/e2e/` | TypeScript | Playwrightエンドツーエンドテスト |
| `backend/src/index.ts` | TypeScript | バックエンドエントリポイント（Express） |
| `backend/src/routes/` | TypeScript | APIルート定義 |
| `backend/src/firestore/` | TypeScript | Firestore操作モジュール |
| `firebase.json` | 設定 | Firebase設定（Firestore rules等） |

---

## 🔖 ファイル更新ルール

1. 新ファイル追加時: 該当セクションに1行追加
2. ファイル削除・移動時: 該当行を削除または更新
3. 更新後: `git add FILE_INDEX.md && git commit -m "docs: FILE_INDEX.md更新"`
