const { test, expect } = require("@playwright/test");
const testdata = JSON.parse(JSON.stringify(require("..//signuptestdata.json")));

test.describe("Data Driven Signup Text", function () {
  for (let data of testdata) {
    test.describe(`SIgnup with users ${data.id}`, function () {
      test("Signup To application", async ({ page }) => {
        await page.goto("https://freelance-learn-automation.vercel.app/signup");

        await page.locator('//*[@id="name"]').fill(data.name);

        await page.locator("//*[@id='email']").fill(data.email);

        await page.locator("//*[@id='password']").fill(data.password);

        for (let i = 0; i < data.interests.length; i++) {
          await page
            .locator(`//label[normalize-space()='${data.interests[i]}']`)
            .click();
        }

        await page
          .locator(`//input[contains(@value,'${data.gender}')]`)
          .click();

        await page.locator("#state").selectOption({ label: `${data.state}` });

        await page.locator("#hobbies").selectOption(data.hobbies);

        await page
          .locator('//*[@id="signup_container"]/form/div/button')
          .click();

        await page.locator("//a[contains(.,'New user? Signup')]").isVisible();
      });
    });
  }
});
