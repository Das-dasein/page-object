const { suite } = require("selenium-webdriver/testing");
const assert = require("assert");
const { RegistrationPage } = require("../pages/registration.page");
require("chromedriver");

suite(function (env) {
    describe("Страница Авторизации", () => {
        let driver;

        before(async () => {
            driver = await env.builder().build();
        });

        it('1', async () => {
            const page = new RegistrationPage(driver);
            await page.open();
            await page.setPhone('79272331224');
            await page.setPassword('12345');
            await page.setConfirmPassword('12345666666');
            await page.setName('artem');
            await page.setLastname('tarasov');
            await page.setEmail('a@a.ru');
            await page.register();
            const info = await page.logMessage.getText();
            assert.equal(info, `Заполните корректный e-mail.\nПароль должен быть не менее 6 символов длиной.`)
        })

        it('2', async () => {
            const page = new RegistrationPage(driver);
            await page.open();
            await page.setPhone('79277441939');
            await page.setPassword('12345');
            await page.setConfirmPassword('12345');
            await page.setName('artem');
            await page.setLastname('tarasov');
            await page.setEmail('a@a.ru');
            await page.register();
        })

        after(() => {
            driver.quit();
        });
    })
})