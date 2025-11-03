import { test, expect } from '@playwright/test';

test.describe('保護されたルート', () => {
  test('未認証ユーザーは応募者ダッシュボードにアクセスできない', async ({ page }) => {
    await page.goto('/applicant/dashboard');

    // ログインページにリダイレクトされることを確認
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('h2').first()).toContainText('人材エージェント');
  });

  test('未認証ユーザーはエージェントダッシュボードにアクセスできない', async ({ page }) => {
    await page.goto('/agent/dashboard');

    // ログインページにリダイレクトされることを確認
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator('h2').first()).toContainText('人材エージェント');
  });

  // 注: 認証済みユーザーのテストはFirebase認証が必要なため、
  // Firestore APIが有効化され、シードデータが投入された後に実装
  test.skip('応募者アカウントでエージェントダッシュボードにアクセスできない', async ({ page }) => {
    // 応募者としてログイン
    await page.goto('/login');
    await page.locator('input[type="email"]').fill('applicant-test@example.com');
    await page.locator('input[type="password"]').fill('Test1234!');
    await page.locator('button[type="submit"]').click();

    // エージェントダッシュボードにアクセス試行
    await page.goto('/agent/dashboard');

    // 応募者ダッシュボードにリダイレクトされることを確認
    await expect(page).toHaveURL(/\/applicant\/dashboard/);
  });

  test.skip('エージェントアカウントで応募者ダッシュボードにアクセスできない', async ({ page }) => {
    // エージェントとしてログイン
    await page.goto('/login');
    await page.locator('input[type="email"]').fill('agent-test@example.com');
    await page.locator('input[type="password"]').fill('Test1234!');
    await page.locator('button[type="submit"]').click();

    // 応募者ダッシュボードにアクセス試行
    await page.goto('/applicant/dashboard');

    // エージェントダッシュボードにリダイレクトされることを確認
    await expect(page).toHaveURL(/\/agent\/dashboard/);
  });
});
