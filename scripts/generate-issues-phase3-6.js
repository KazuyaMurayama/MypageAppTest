/**
 * GitHub Issues自動生成スクリプト (Phase 3-6)
 *
 * 使い方:
 * node scripts/generate-issues-phase3-6.js
 */

const fs = require('fs');
const path = require('path');

// Issue データ定義（Phase 3-6）
const issuesData = [
  // Phase 3: ファイル管理機能
  {
    number: 25,
    title: 'filesコレクション設計とセキュリティルール',
    phase: 3,
    labels: ['backend', 'database', 'storage', 'phase-3'],
    dependencies: ['#2'],
    background: 'Firestoreにfilesコレクションを作成し、Firebase Storageと連携する。ファイル管理の基盤を構築し、セキュリティルールを設定する。',
    scope: `### Firestoreスキーマ
- [ ] Firestore に files コレクション作成
- [ ] フィールド: user_id, file_name, file_path, file_type, file_size, uploaded_at
- [ ] Firebase Storage バケット作成（applicants/, jobs/）
- [ ] Storage Security Rules 設定（認証済みユーザーのみアップロード可能）
- [ ] ファイルサイズ制限（300MB）設定
- [ ] ファイル形式制限（PDF, Word, Excel）設定`,
    ac: [
      'Firestore に files コレクションが作成されている',
      'フィールド: user_id, file_name, file_path, file_type, file_size, uploaded_at が定義されている',
      'Firebase Storage バケット（applicants/, jobs/）が作成されている',
      'Storage Security Rules が設定され、認証済みユーザーのみアップロード可能',
      'ファイルサイズ制限（300MB）が設定されている',
      'ファイル形式制限（PDF, Word, Excel）が設定されている'
    ]
  },
  {
    number: 26,
    title: 'ファイルアップロードAPI実装',
    phase: 3,
    labels: ['backend', 'api', 'file', 'phase-3'],
    dependencies: ['#25'],
    background: 'ファイルアップロード用のAPIエンドポイントを実装する。multipart/form-dataを扱い、Firebase Storageへのアップロードとメタデータ保存を行う。',
    scope: `### アップロードAPI
- [ ] POST /api/v1/files/upload エンドポイント実装
- [ ] multipart/form-data 形式のファイル受信
- [ ] Firebase Storage へのアップロード
- [ ] Firestore に ファイルメタデータ保存
- [ ] ファイル形式・サイズのバリデーション
- [ ] ウイルススキャン（ClamAV）統合（将来機能のプレースホルダー）
- [ ] エラーハンドリング（413, 400）`,
    ac: [
      'POST /api/v1/files/upload エンドポイントが実装されている',
      'multipart/form-data 形式のファイルが受信できる',
      'Firebase Storage へのアップロードが成功する',
      'Firestore に ファイルメタデータが保存される',
      'ファイル形式・サイズのバリデーションが動作する',
      'ウイルススキャン統合のプレースホルダーが用意されている',
      'エラーハンドリング（413, 400）が適切に実装されている'
    ]
  },
  {
    number: 27,
    title: 'ファイルアップロード画面UI実装',
    phase: 3,
    labels: ['frontend', 'applicant', 'file', 'phase-3'],
    dependencies: ['#26'],
    background: '応募者が履歴書をアップロードできる画面を実装する。ドラッグ&ドロップとファイル選択の両方に対応し、使いやすいUIを提供する。',
    scope: `### アップロード画面UI
- [ ] ファイルアップロード画面（/applicant/files）作成
- [ ] ドラッグ&ドロップでファイルアップロード可能
- [ ] ファイル選択ボタンでファイルアップロード可能
- [ ] アップロード進捗バー表示
- [ ] アップロード成功時にトーストメッセージ表示
- [ ] アップロード済みファイル一覧表示
- [ ] ファイル形式・サイズエラー時にエラーメッセージ表示`,
    ac: [
      'ファイルアップロード画面（/applicant/files）が表示される',
      'ドラッグ&ドロップでファイルアップロードが可能',
      'ファイル選択ボタンでファイルアップロードが可能',
      'アップロード進捗バーが表示される',
      'アップロード成功時にトーストメッセージが表示される',
      'アップロード済みファイル一覧が表示される',
      'ファイル形式・サイズエラー時にエラーメッセージが表示される'
    ]
  },
  {
    number: 28,
    title: 'ファイルダウンロード機能実装',
    phase: 3,
    labels: ['backend', 'frontend', 'file', 'phase-3'],
    dependencies: ['#27'],
    background: 'ファイルをダウンロードできる機能を実装する。認証・権限チェックを行い、安全なダウンロードを提供する。',
    scope: `### ダウンロードAPI
- [ ] GET /api/v1/files/:id/download エンドポイント実装
- [ ] Firebase Storage から署名付きURLを取得
- [ ] 認証・権限チェック（自分のファイルまたはエージェント）
- [ ] Content-Disposition ヘッダー設定

### ダウンロードUI
- [ ] ダウンロードボタンクリックでファイルダウンロード
- [ ] ダウンロード失敗時にエラーメッセージ表示`,
    ac: [
      'GET /api/v1/files/:id/download エンドポイントが実装されている',
      'Firebase Storage から署名付きURLが取得できる',
      '認証・権限チェック（自分のファイルまたはエージェント）が動作する',
      'Content-Disposition ヘッダーが設定されている',
      'ダウンロードボタンクリックでファイルがダウンロードされる',
      'ダウンロード失敗時にエラーメッセージが表示される'
    ]
  },
  {
    number: 29,
    title: 'ウイルススキャン統合（オプション）',
    phase: 3,
    labels: ['backend', 'security', 'file', 'phase-3'],
    dependencies: ['#26'],
    background: 'アップロードされたファイルのウイルススキャンを実装する（将来機能）。セキュリティを強化し、悪意のあるファイルの検出を行う。',
    scope: `### ウイルススキャン
- [ ] ClamAV または VirusTotal API 統合
- [ ] アップロード後に非同期でスキャン実行
- [ ] スキャン結果を Firestore に保存（clean, infected, pending）
- [ ] 感染ファイル検出時にファイル削除
- [ ] 感染ファイル検出時にエージェントに通知
- [ ] スキャン状態がファイル一覧で確認できる`,
    ac: [
      'ClamAV または VirusTotal API が統合されている',
      'アップロード後に非同期でスキャンが実行される',
      'スキャン結果が Firestore に保存される（clean, infected, pending）',
      '感染ファイル検出時にファイルが削除される',
      '感染ファイル検出時にエージェントに通知される',
      'スキャン状態がファイル一覧で確認できる'
    ]
  },
  {
    number: 30,
    title: 'ファイル管理E2Eテスト',
    phase: 3,
    labels: ['test', 'e2e', 'file', 'phase-3'],
    dependencies: ['#28'],
    background: 'ファイルアップロード・ダウンロード機能をE2Eテストで検証する。ファイル管理の全体フローが正しく動作することを確認する。',
    scope: `### E2Eテストシナリオ
- [ ] ファイルアップロードのテスト
- [ ] ファイルダウンロードのテスト
- [ ] ファイル削除のテスト
- [ ] ファイル形式エラーのテスト
- [ ] ファイルサイズエラーのテスト
- [ ] 権限エラー（他人のファイルダウンロード）のテスト`,
    ac: [
      'ファイルアップロードのテストが成功する',
      'ファイルダウンロードのテストが成功する',
      'ファイル削除のテストが成功する',
      'ファイル形式エラーのテストが成功する',
      'ファイルサイズエラーのテストが成功する',
      '権限エラー（他人のファイルダウンロード）のテストが成功する'
    ]
  },
  // Phase 4: 検索・マッチング機能
  {
    number: 31,
    title: 'job_applicantsコレクション設計',
    phase: 4,
    labels: ['backend', 'database', 'phase-4'],
    dependencies: ['#2'],
    background: '求人と応募者の紐付けを管理するコレクションを作成する。求人応募のワークフロー管理の基盤を構築する。',
    scope: `### Firestoreスキーマ
- [ ] Firestore に job_applicants コレクション作成
- [ ] フィールド: job_id, applicant_id, applied_at, status, notes
- [ ] 複合インデックス（job_id + applicant_id）作成
- [ ] Security Rules 設定（エージェントのみ作成可能）
- [ ] ステータス ENUM（applied, screening, interview, offer, accepted, rejected）`,
    ac: [
      'Firestore に job_applicants コレクションが作成されている',
      'フィールド: job_id, applicant_id, applied_at, status, notes が定義されている',
      '複合インデックス（job_id + applicant_id）が作成されている',
      'Security Rules が設定され、エージェントのみ作成可能',
      'ステータス ENUM（applied, screening, interview, offer, accepted, rejected）が定義されている'
    ]
  },
  {
    number: 32,
    title: '求人情報管理API実装',
    phase: 4,
    labels: ['backend', 'api', 'agent', 'phase-4'],
    dependencies: ['#31'],
    background: '求人情報のCRUD APIを実装する。エージェントが求人を管理できる機能を提供する。',
    scope: `### 求人CRUD API
- [ ] POST /api/v1/agent/jobs エンドポイント実装
- [ ] GET /api/v1/agent/jobs エンドポイント実装（一覧）
- [ ] GET /api/v1/agent/jobs/:id エンドポイント実装（詳細）
- [ ] PUT /api/v1/agent/jobs/:id エンドポイント実装（更新）
- [ ] DELETE /api/v1/agent/jobs/:id エンドポイント実装（削除）
- [ ] バリデーション（タイトル、企業名、雇用形態）
- [ ] API仕様書と整合性確認`,
    ac: [
      'POST /api/v1/agent/jobs エンドポイントが実装されている',
      'GET /api/v1/agent/jobs エンドポイント（一覧）が実装されている',
      'GET /api/v1/agent/jobs/:id エンドポイント（詳細）が実装されている',
      'PUT /api/v1/agent/jobs/:id エンドポイント（更新）が実装されている',
      'DELETE /api/v1/agent/jobs/:id エンドポイント（削除）が実装されている',
      'バリデーション（タイトル、企業名、雇用形態）が実装されている',
      'API仕様書と整合性がある'
    ]
  },
  {
    number: 33,
    title: '全文検索API実装',
    phase: 4,
    labels: ['backend', 'api', 'search', 'phase-4'],
    dependencies: ['#18'],
    background: 'FirestoreまたはAlgoliaを使った全文検索APIを実装する。エージェントが応募者を効率的に検索できる機能を提供する。',
    scope: `### 全文検索API
- [ ] POST /api/v1/agent/search エンドポイント実装
- [ ] 検索フィールド: work_history, skills, certifications, self_pr
- [ ] AND/OR/NOT 検索対応
- [ ] 部分一致・前方一致検索
- [ ] 検索結果ハイライト機能
- [ ] ページネーション対応
- [ ] 検索時間が1秒以内（99名のデータ）`,
    ac: [
      'POST /api/v1/agent/search エンドポイントが実装されている',
      '検索フィールド（work_history, skills, certifications, self_pr）が検索対象',
      'AND/OR/NOT 検索が対応している',
      '部分一致・前方一致検索が動作する',
      '検索結果ハイライト機能が実装されている',
      'ページネーションが対応している',
      '検索時間が1秒以内（99名のデータ）'
    ]
  },
  {
    number: 34,
    title: '検索画面UI実装',
    phase: 4,
    labels: ['frontend', 'agent', 'search', 'phase-4'],
    dependencies: ['#33'],
    background: 'エージェント管理画面に全文検索機能を実装する。検索結果のハイライト表示と、検索履歴の保存を行う。',
    scope: `### 検索画面UI
- [ ] 検索バー表示（/agent/search）
- [ ] 検索キーワード入力→検索実行
- [ ] 検索結果がテーブル表示される
- [ ] マッチ箇所がハイライト表示される
- [ ] 検索結果件数・実行時間が表示される
- [ ] 検索結果から応募者詳細へ遷移可能
- [ ] 検索履歴保存（LocalStorage）`,
    ac: [
      '検索バーが表示される（/agent/search）',
      '検索キーワード入力→検索実行が動作する',
      '検索結果がテーブル表示される',
      'マッチ箇所がハイライト表示される',
      '検索結果件数・実行時間が表示される',
      '検索結果から応募者詳細へ遷移できる',
      '検索履歴が保存される（LocalStorage）'
    ]
  },
  {
    number: 35,
    title: '求人応募機能実装',
    phase: 4,
    labels: ['backend', 'frontend', 'agent', 'phase-4'],
    dependencies: ['#32'],
    background: '求人と応募者を紐付ける機能を実装する。エージェントが求人に応募者を割り当て、マッチングを管理できるようにする。',
    scope: `### 求人応募API
- [ ] POST /api/v1/agent/jobs/:job_id/applicants エンドポイント実装
- [ ] 複数応募者を一括紐付け可能
- [ ] 重複チェック（既に紐付け済みの場合はエラー）

### 求人応募UI
- [ ] 求人管理画面で応募者を選択して紐付けボタンクリック
- [ ] 紐付け成功時にトーストメッセージ表示
- [ ] 応募者マイページで紐付けられた求人一覧が表示される`,
    ac: [
      'POST /api/v1/agent/jobs/:job_id/applicants エンドポイントが実装されている',
      '求人管理画面で応募者を選択して紐付けボタンをクリックできる',
      '複数応募者を一括紐付けできる',
      '重複チェック（既に紐付け済みの場合はエラー）が動作する',
      '紐付け成功時にトーストメッセージが表示される',
      '応募者マイページで紐付けられた求人一覧が表示される'
    ]
  },
  {
    number: 36,
    title: 'マッチング機能E2Eテスト',
    phase: 4,
    labels: ['test', 'e2e', 'search', 'phase-4'],
    dependencies: ['#35'],
    background: '検索・マッチング機能をE2Eテストで検証する。全文検索とマッチングのワークフローが正しく動作することを確認する。',
    scope: `### E2Eテストシナリオ
- [ ] 全文検索のテスト
- [ ] 検索結果ハイライトのテスト
- [ ] 求人作成のテスト
- [ ] 求人応募者紐付けのテスト
- [ ] 応募者が求人一覧を確認できるテスト
- [ ] 検索パフォーマンステスト（1秒以内）`,
    ac: [
      '全文検索のテストが成功する',
      '検索結果ハイライトのテストが成功する',
      '求人作成のテストが成功する',
      '求人応募者紐付けのテストが成功する',
      '応募者が求人一覧を確認できるテストが成功する',
      '検索パフォーマンステスト（1秒以内）が成功する'
    ]
  },
  // Phase 5: 通知・ステータス管理
  {
    number: 37,
    title: 'notificationsコレクション設計',
    phase: 5,
    labels: ['backend', 'database', 'phase-5'],
    dependencies: ['#2'],
    background: '通知機能のためのコレクションを作成する。ユーザーへの通知を管理し、未読/既読の状態を追跡する。',
    scope: `### Firestoreスキーマ
- [ ] Firestore に notifications コレクション作成
- [ ] フィールド: user_id, type, title, message, is_read, read_at, created_at
- [ ] インデックス（user_id + is_read）作成
- [ ] Security Rules 設定（自分の通知のみ閲覧可能）
- [ ] 通知タイプ ENUM（new_job, status_change, new_message, system）`,
    ac: [
      'Firestore に notifications コレクションが作成されている',
      'フィールド: user_id, type, title, message, is_read, read_at, created_at が定義されている',
      'インデックス（user_id + is_read）が作成されている',
      'Security Rules が設定され、自分の通知のみ閲覧可能',
      '通知タイプ ENUM（new_job, status_change, new_message, system）が定義されている'
    ]
  },
  {
    number: 38,
    title: '通知API実装',
    phase: 5,
    labels: ['backend', 'api', 'phase-5'],
    dependencies: ['#37'],
    background: '通知の取得・既読更新APIを実装する。ユーザーが通知を確認し、既読にできる機能を提供する。',
    scope: `### 通知API
- [ ] GET /api/v1/applicant/notifications エンドポイント実装
- [ ] PUT /api/v1/applicant/notifications/:id/read エンドポイント実装
- [ ] 未読通知数取得エンドポイント実装
- [ ] ページネーション対応
- [ ] 未読フィルタリング機能
- [ ] 通知作成ヘルパー関数実装`,
    ac: [
      'GET /api/v1/applicant/notifications エンドポイントが実装されている',
      'PUT /api/v1/applicant/notifications/:id/read エンドポイントが実装されている',
      '未読通知数取得エンドポイントが実装されている',
      'ページネーションが対応している',
      '未読フィルタリング機能が実装されている',
      '通知作成ヘルパー関数が実装されている'
    ]
  },
  {
    number: 39,
    title: '通知UI実装',
    phase: 5,
    labels: ['frontend', 'phase-5'],
    dependencies: ['#38'],
    background: '通知一覧画面とヘッダーの通知バッジを実装する。ユーザーが未読通知を確認し、既読にできるUIを提供する。',
    scope: `### 通知UI
- [ ] ヘッダーに通知アイコン・バッジ表示（未読件数）
- [ ] 通知一覧画面（/applicant/notifications）作成
- [ ] 未読・既読の区別（背景色変更）
- [ ] 通知クリックで既読に更新
- [ ] 通知の種類ごとにアイコン表示
- [ ] 全既読ボタン実装
- [ ] レスポンシブデザイン対応`,
    ac: [
      'ヘッダーに通知アイコン・バッジが表示される（未読件数）',
      '通知一覧画面（/applicant/notifications）が表示される',
      '未読・既読の区別がある（背景色変更）',
      '通知クリックで既読に更新される',
      '通知の種類ごとにアイコンが表示される',
      '全既読ボタンが実装されている',
      'レスポンシブデザインが対応している'
    ]
  },
  {
    number: 40,
    title: 'リアルタイム通知（Firebase Cloud Messaging）',
    phase: 5,
    labels: ['backend', 'frontend', 'notification', 'phase-5'],
    dependencies: ['#39'],
    background: 'Firebase Cloud Messagingを使ったリアルタイム通知を実装する。ユーザーに即座に通知を届ける機能を提供する。',
    scope: `### Firebase Cloud Messaging
- [ ] Firebase Cloud Messaging SDK 統合
- [ ] ブラウザでプッシュ通知許可リクエスト
- [ ] バックエンドから通知送信機能実装
- [ ] フォアグラウンド通知表示
- [ ] バックグラウンド通知表示
- [ ] 通知クリックで該当画面へ遷移
- [ ] 通知設定画面（オン/オフ切り替え）`,
    ac: [
      'Firebase Cloud Messaging SDK が統合されている',
      'ブラウザでプッシュ通知許可リクエストが表示される',
      'バックエンドから通知送信機能が実装されている',
      'フォアグラウンド通知が表示される',
      'バックグラウンド通知が表示される',
      '通知クリックで該当画面へ遷移する',
      '通知設定画面（オン/オフ切り替え）が実装されている'
    ]
  },
  {
    number: 41,
    title: 'ステータス変更機能実装',
    phase: 5,
    labels: ['backend', 'frontend', 'agent', 'phase-5'],
    dependencies: ['#21'],
    background: 'エージェントが応募者のステータスを変更できる機能を実装する。ステータス変更時に通知を送信し、ワークフローを管理する。',
    scope: `### ステータス変更API
- [ ] PUT /api/v1/agent/applicants/:id/status エンドポイント実装
- [ ] ステータス変更時に通知が応募者に送信される
- [ ] 活動履歴にステータス変更ログが記録される
- [ ] 備考欄（任意）入力可能

### ステータス変更UI
- [ ] ステータスドロップダウンから選択して更新
- [ ] ステータス変更履歴が画面に表示される`,
    ac: [
      'PUT /api/v1/agent/applicants/:id/status エンドポイントが実装されている',
      'ステータスドロップダウンから選択して更新できる',
      'ステータス変更時に通知が応募者に送信される',
      '活動履歴にステータス変更ログが記録される',
      'ステータス変更履歴が画面に表示される',
      '備考欄（任意）が入力可能'
    ]
  },
  {
    number: 42,
    title: 'ワークフローE2Eテスト',
    phase: 5,
    labels: ['test', 'e2e', 'phase-5'],
    dependencies: ['#41'],
    background: '通知・ステータス管理機能をE2Eテストで検証する。全体のワークフローが正しく動作することを確認する。',
    scope: `### E2Eテストシナリオ
- [ ] ステータス変更→通知送信のテスト
- [ ] 通知一覧表示のテスト
- [ ] 通知既読更新のテスト
- [ ] リアルタイム通知のテスト
- [ ] ステータス変更履歴表示のテスト
- [ ] 全ワークフローが正常に動作する`,
    ac: [
      'ステータス変更→通知送信のテストが成功する',
      '通知一覧表示のテストが成功する',
      '通知既読更新のテストが成功する',
      'リアルタイム通知のテストが成功する',
      'ステータス変更履歴表示のテストが成功する',
      '全ワークフローが正常に動作する'
    ]
  },
  // Phase 6: セキュリティ強化・本番化準備
  {
    number: 43,
    title: 'セキュリティ監査と脆弱性スキャン',
    phase: 6,
    labels: ['security', 'audit', 'phase-6'],
    dependencies: ['#8'],
    background: 'セキュリティベストプラクティスに従って脆弱性をチェックする。本番環境へのデプロイ前にセキュリティを確保する。',
    scope: `### セキュリティ監査
- [ ] npm audit で脆弱性ゼロ
- [ ] OWASP ZAP でセキュリティスキャン実施
- [ ] XSS対策確認（React エスケープ、CSP設定）
- [ ] CSRF対策確認（CSRFトークン）
- [ ] SQLインジェクション対策確認（Firestore使用のため該当なし）
- [ ] 認証・認可のペネトレーションテスト実施
- [ ] セキュリティ監査レポート作成`,
    ac: [
      'npm audit で脆弱性がゼロ',
      'OWASP ZAP でセキュリティスキャンが実施されている',
      'XSS対策が確認されている（React エスケープ、CSP設定）',
      'CSRF対策が確認されている（CSRFトークン）',
      'SQLインジェクション対策が確認されている（Firestore使用のため該当なし）',
      '認証・認可のペネトレーションテストが実施されている',
      'セキュリティ監査レポートが作成されている'
    ]
  },
  {
    number: 44,
    title: 'パフォーマンステスト',
    phase: 6,
    labels: ['test', 'performance', 'phase-6'],
    dependencies: ['#43'],
    background: '性能要件を満たすかパフォーマンステストを実施する。本番環境で快適に動作することを確認する。',
    scope: `### パフォーマンステスト
- [ ] Lighthouse スコア 90点以上（Performance）
- [ ] 画面表示が2秒以内
- [ ] 全文検索が1秒以内（99名のデータ）
- [ ] ファイルアップロード（100MB）が30秒以内
- [ ] 同時接続数20名でパフォーマンス低下なし
- [ ] Webページサイズが3MB以下
- [ ] パフォーマンステストレポート作成`,
    ac: [
      'Lighthouse スコアが90点以上（Performance）',
      '画面表示が2秒以内',
      '全文検索が1秒以内（99名のデータ）',
      'ファイルアップロード（100MB）が30秒以内',
      '同時接続数20名でパフォーマンス低下なし',
      'Webページサイズが3MB以下',
      'パフォーマンステストレポートが作成されている'
    ]
  },
  {
    number: 45,
    title: 'オンプレミス環境構築ガイド作成',
    phase: 6,
    labels: ['infra', 'documentation', 'phase-6'],
    dependencies: ['#44'],
    background: '本番環境（オンプレミス）構築手順をドキュメント化する。運用チームが環境を構築できるよう詳細な手順を提供する。',
    scope: `### 環境構築ガイド
- [ ] サーバースペック要件のドキュメント作成
- [ ] OS（Ubuntu/CentOS）インストール手順
- [ ] PostgreSQL/MySQL インストール・設定手順
- [ ] Node.js/Python インストール・設定手順
- [ ] Nginx/Apache インストール・設定手順
- [ ] SSL証明書設定手順
- [ ] ファイアウォール設定手順
- [ ] バックアップスクリプト作成`,
    ac: [
      'サーバースペック要件がドキュメント化されている',
      'OS（Ubuntu/CentOS）インストール手順が記載されている',
      'PostgreSQL/MySQL インストール・設定手順が記載されている',
      'Node.js/Python インストール・設定手順が記載されている',
      'Nginx/Apache インストール・設定手順が記載されている',
      'SSL証明書設定手順が記載されている',
      'ファイアウォール設定手順が記載されている',
      'バックアップスクリプトが作成されている'
    ]
  },
  {
    number: 46,
    title: 'データ移行スクリプト作成',
    phase: 6,
    labels: ['backend', 'migration', 'phase-6'],
    dependencies: ['#45'],
    background: 'FirebaseからオンプレミスDBへのデータ移行スクリプトを作成する。開発環境から本番環境へのスムーズな移行を可能にする。',
    scope: `### データ移行スクリプト
- [ ] Firestore エクスポートスクリプト作成
- [ ] PostgreSQL/MySQL インポートスクリプト作成
- [ ] ファイル移行スクリプト（Firebase Storage → ローカルストレージ）
- [ ] データ整合性チェックスクリプト
- [ ] ロールバックスクリプト
- [ ] 移行手順書作成
- [ ] テスト環境で移行テスト成功`,
    ac: [
      'Firestore エクスポートスクリプトが作成されている',
      'PostgreSQL/MySQL インポートスクリプトが作成されている',
      'ファイル移行スクリプト（Firebase Storage → ローカルストレージ）が作成されている',
      'データ整合性チェックスクリプトが作成されている',
      'ロールバックスクリプトが作成されている',
      '移行手順書が作成されている',
      'テスト環境で移行テストが成功している'
    ]
  },
  {
    number: 47,
    title: '本番デプロイ手順書作成',
    phase: 6,
    labels: ['infra', 'documentation', 'phase-6'],
    dependencies: ['#46'],
    background: '本番環境へのデプロイ手順を詳細にドキュメント化する。運用チームが安全にデプロイできる手順を提供する。',
    scope: `### デプロイ手順書
- [ ] ビルド手順のドキュメント作成
- [ ] デプロイ手順のドキュメント作成
- [ ] ロールバック手順のドキュメント作成
- [ ] ヘルスチェック手順のドキュメント作成
- [ ] デプロイチェックリスト作成
- [ ] ダウンタイム最小化手順
- [ ] デプロイ自動化スクリプト作成`,
    ac: [
      'ビルド手順がドキュメント化されている',
      'デプロイ手順がドキュメント化されている',
      'ロールバック手順がドキュメント化されている',
      'ヘルスチェック手順がドキュメント化されている',
      'デプロイチェックリストが作成されている',
      'ダウンタイム最小化手順が記載されている',
      'デプロイ自動化スクリプトが作成されている'
    ]
  },
  {
    number: 48,
    title: '運用監視設定',
    phase: 6,
    labels: ['infra', 'monitoring', 'phase-6'],
    dependencies: ['#47'],
    background: '本番環境の監視・ログ・アラート設定を行う。安定した運用を実現するための監視体制を構築する。',
    scope: `### 運用監視設定
- [ ] サーバーリソース監視（CPU、メモリ、ディスク）設定
- [ ] アプリケーションログ設定（Winston/Pino）
- [ ] エラーログ監視・アラート設定
- [ ] アクセスログ解析設定
- [ ] バックアップ自動化（日次、7日保持）
- [ ] ヘルスチェックエンドポイント実装
- [ ] アラート通知設定（メール/Slack）
- [ ] 運用マニュアル作成`,
    ac: [
      'サーバーリソース監視（CPU、メモリ、ディスク）が設定されている',
      'アプリケーションログ（Winston/Pino）が設定されている',
      'エラーログ監視・アラートが設定されている',
      'アクセスログ解析が設定されている',
      'バックアップ自動化（日次、7日保持）が設定されている',
      'ヘルスチェックエンドポイントが実装されている',
      'アラート通知（メール/Slack）が設定されている',
      '運用マニュアルが作成されている'
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
