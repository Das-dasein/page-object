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
            const user = {
                name: 'artem',
                lastname: 'tarasov',
                email: 'a@a.ru',
                password: '12345',
                phone: '79277441839'
            };
            await page.setUser(user);
            await page.setConfirmPassword('23123');
            await page.register();
            const info = await page.logMessageText;
            assert.equal(info, `Заполните корректный e-mail.\nПароль должен быть не менее 6 символов длиной.`)
        })

        it('2', async () => {
            const page = new RegistrationPage(driver);
            await page.open();
            const user = {
                name: 'artem',
                lastname: 'tarasov',
                email: 'a@a.ru',
                password: '12345',
                phone: '79277441839'
            };
            await page.setUser(user);

            await page.register();
        })

        after(() => {
            driver.quit();
        });
    })
})