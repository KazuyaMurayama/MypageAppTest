# Issue #8: E2Eテスト環境構築（Walking Skeleton検証）

## 背景 / 目的
Walking Skeleton（#1〜#7）が完成したため、エンドツーエンドのテスト環境を構築し、ログインからダッシュボード表示までの基本動線を自動テストで検証する。CI/CDパイプラインの基盤を確立し、継続的な品質保証を可能にする。

- **依存**: #7
- **ラベル**: `test`, `e2e`, `phase-0`

## スコープ / 作業項目

### Playwright セットアップ
- [ ] Playwright をインストール
- [ ] Playwright 設定ファイル（`playwright.config.ts`）作成
- [ ] テスト用ブラウザ設定（Chromium, Firefox, WebKit）
- [ ] ベースURL設定（開発環境・本番環境切り替え）

### テストシナリオ作成
- [ ] ログインテスト（`tests/auth/login.spec.ts`）
  - ログイン画面表示
  - メールアドレス入力
  - パスワード入力
  - ログインボタンクリック
  - ダッシュボード表示確認
- [ ] ログイン失敗テスト
  - 間違ったパスワードでエラーメッセージ表示確認
- [ ] ログアウトテスト

### CI/CD パイプライン
- [ ] GitHub Actions ワークフロー作成
- [ ] テスト実行ステップ追加
- [ ] スクリーンショット・動画キャプチャ保存
- [ ] テスト結果レポート生成

### テストデータ管理
- [ ] テストユーザー作成スクリプト
- [ ] テスト前のデータ初期化
- [ ] テスト後のデータクリーンアップ

## ゴール / 完了条件（Acceptance Criteria）

- [ ] Playwright がインストール・設定され、`npx playwright test` でテストが実行できる
- [ ] ログインテストシナリオが作成され、ログイン→ダッシュボード表示までの動線が自動テストできる
- [ ] テストが CI/CD パイプライン（GitHub Actions）で実行可能になっている
- [ ] テスト実行結果がレポートとして出力され、GitHub Actions のアーティファクトとして保存される
- [ ] スクリーンショット・動画キャプチャがテスト失敗時に自動保存される
- [ ] テストが全て成功し、Walking Skeleton の動作が検証される

## テスト観点

### E2Eテストシナリオ
1. **ログイン成功シナリオ**
   ```typescript
   test('should login successfully', async ({ page }) => {
     await page.goto('/login');
     await page.fill('[name="email"]', 'applicant@example.com');
     await page.fill('[name="password"]', 'password123');
     await page.click('button[type="submit"]');
     await expect(page).toHaveURL('/dashboard');
   });
   ```

2. **ログイン失敗シナリオ**
   ```typescript
   test('should show error on invalid credentials', async ({ page }) => {
     await page.goto('/login');
     await page.fill('[name="email"]', 'applicant@example.com');
     await page.fill('[name="password"]', 'wrongpassword');
     await page.click('button[type="submit"]');
     await expect(page.locator('.error-message')).toBeVisible();
   });
   ```

### パフォーマンステスト
- ログイン画面の表示時間（2秒以内）
- ログインAPIのレスポンス時間（1秒以内）

### レスポンシブテスト
- モバイル（iPhone SE 375px）でのテスト
- タブレット（iPad 768px）でのテスト
- デスクトップ（1920px）でのテスト

## 要確認事項

- [ ] E2Eテストツール: Playwright vs Cypress どちらを使用するか？（推奨: Playwright）
- [ ] テスト実行タイミング: PR作成時のみ vs コミット毎 vs 毎日定時実行？
- [ ] テスト失敗時の通知方法: Slack vs メール？
- [ ] テストカバレッジ目標は何%にするか？

## 参考資料

- [Playwright ドキュメント](https://playwright.dev/)
- [GitHub Actions ワークフロー例](https://playwright.dev/docs/ci-intro)
- [要件定義書](../docs/01_requirements.md) - 7. 対象範囲（スコープ）
