import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByText('Sign In').click();
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('kmit@gmail.com');
  await page.getByPlaceholder('password').click();
  await page.getByPlaceholder('password').fill('kmit');
  await page.getByRole('button', { name: 'Sign In →' }).click();
  await page.getByRole('link', { name: 'Pricing' }).click();
  await page.getByRole('link', { name: 'About' }).click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByRole('link', { name: 'Check out pricing plans' }).click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByRole('link').first().click();
  await page.getByRole('button', { name: 'Recently Reviewed Products' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Recently Reviewed Products' }).click();
  await page.getByText('ASUS ROG Strix G16 (2024)').click();
  await page.getByRole('link').first().click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.getByRole('button', { name: 'Logout' }).click();
});