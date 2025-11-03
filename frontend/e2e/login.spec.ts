import { test, expect } from '@playwright/test';

test.describe('ログイン画面', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('ログインページが正しく表示される', async ({ page }) => {
    // タイトル確認
    await expect(page.locator('h2').first()).toContainText('人材エージェント');
    await expect(page.locator('h3').first()).toContainText('マイページシステム');

    // フォーム要素の存在確認
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // テストアカウント情報の表示確認
    await expect(page.getByText('テストアカウント:')).toBeVisible();
    await expect(page.getByText('applicant-test@example.com')).toBeVisible();
    await expect(page.getByText('agent-test@example.com')).toBeVisible();
  });

  test('バリデーション: 空のメールアドレスでエラー表示', async ({ page }) => {
    // パスワードのみ入力
    await page.locator('input[type="password"]').fill('Test1234!');

    // 送信ボタンクリック
    await page.locator('button[type="submit"]').click();

    // エラーメッセージ確認
    await expect(page.getByText('メールアドレスを入力してください')).toBeVisible();
  });

  test('バリデーション: 無効なメールアドレスでエラー表示', async ({ page }) => {
    // 無効なメールアドレスを入力
    await page.locator('input[type="email"]').fill('invalid-email');
    await page.locator('input[type="password"]').fill('Test1234!');

    // 送信ボタンクリック
    await page.locator('button[type="submit"]').click();

    // エラーメッセージ確認
    await expect(page.getByText('有効なメールアドレスを入力してください')).toBeVisible();
  });

  test('バリデーション: 空のパスワードでエラー表示', async ({ page }) => {
    // メールアドレスのみ入力
    await page.locator('input[type="email"]').fill('test@example.com');

    // 送信ボタンクリック
    await page.locator('button[type="submit"]').click();

    // エラーメッセージ確認
    await expect(page.getByText('パスワードを入力してください')).toBeVisible();
  });

  test('ルートパス "/" はログインページにリダイレクトされる', async ({ page }) => {
    await page.goto('/');

    // ログインページにリダイレクトされることを確認
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('h2').first()).toContainText('人材エージェント');
  });

  // 注: 実際のログインテストはFirebase認証が必要なため、
  // Firestore APIが有効化され、シードデータが投入された後に実装
  test.skip('正常なログイン: 応募者アカウント', async ({ page }) => {
    await page.locator('input[type="email"]').fill('applicant-test@example.com');
    await page.locator('input[type="password"]').fill('Test1234!');
    await page.locator('button[type="submit"]').click();

    // ダッシュボードにリダイレクトされることを確認
    await expect(page).toHaveURL(/\/applicant\/dashboard/);
    await expect(page.getByText('応募者マイページ')).toBeVisible();
  });

  test.skip('正常なログイン: エージェントアカウント', async ({ page }) => {
    await page.locator('input[type="email"]').fill('agent-test@example.com');
    await page.locator('input[type="password"]').fill('Test1234!');
    await page.locator('button[type="submit"]').click();

    // ダッシュボードにリダイレクトされることを確認
    await expect(page).toHaveURL(/\/agent\/dashboard/);
    await expect(page.getByText('エージェント管理画面')).toBeVisible();
  });
});
