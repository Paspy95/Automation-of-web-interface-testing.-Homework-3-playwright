import { test, expect } from '@playwright/test';
const {email, password, noValideMail, noValidePassword} = require("../User");
const {chromium} = require("playwright");

test('valideTest', async ({page}) => {
  await page.goto('https://netology.ru/?modal=sign_in');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(password);
  await page.getByTestId('login-submit-btn').click();
  await page.waitForTimeout(15000);//из-за приветсвенной загрузки в 6 секунд, пришлось выставлять таймаут, что бы тест прошел.
  await expect(page.locator("[class='src-components-pages-Profile-Programs--title--Kw5NH']")).toContainText("Моё обучение");
});


test('noValideTets', async ({page}) => {
   await page.goto('https://netology.ru/?modal=sign_in');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(noValideMail);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill(noValidePassword);
    await page.getByTestId('login-submit-btn').click();
    await expect(page.locator("[data-testid='login-error-hint']")).toContainText("Вы ввели неправильно логин или пароль.");
  });