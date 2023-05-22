// page object model
const { By } = require('selenium-webdriver');
const { SpinnerPage } = require('./spinner.page');

class RegistrationPage {
    get phone() {
        return this.driver.findElement(By.css("[type='tel']"))
    }

    get password() {
        return this.driver.findElement(By.name("PASSWORD"));
    }

    get registerButton() {
        return this.driver.findElement(By.css('.js-form-reg.js-form-reg .btn.btn-kk.btn-fw'));
    }

    get lastName() {
        return this.driver.findElement(By.name("LAST_NAME"));
    }

    get name() {
        return this.driver.findElement(By.name("NAME"));
    }

    get email() {
        return this.driver.findElement(By.name("EMAIL"));
    }

    get confirmPassword() {
        return this.driver.findElement(By.name("CONFIRM_PASSWORD"));
    }

    get logMessage() {
        return this.driver.findElement(By.css('.tabs__item.active .js-form-errors'))
    }

    constructor(driver) {
        this.driver = driver;
    }

    async open() {
        await this.driver.get('https://krasniykarandash.ru/login/#reg');
        const regTab = await this.driver.findElement(By.id('tab_reg'));
        await this.driver.wait(async () => {
            const classList = await regTab.getAttribute('class');
            return classList.includes('active');
        }, 3000);
    }

    async setPhone(phoneNumber) {
        const phone = await this.phone;

        for (const digit of phoneNumber.split('')) {
            await phone.sendKeys(digit);
            await this.driver.sleep(100);
        }
    }

    async setPassword(password) {
        this.password.sendKeys(password);
    }

    async setLastname(lastName) {
        this.lastName.sendKeys(lastName);
    }

    async setName(name) {
        this.name.sendKeys(name);
    }

    async setConfirmPassword(password) {
        this.confirmPassword.sendKeys(password);
    }

    async setEmail(email) {
        this.email.sendKeys(email);
    }

    async register() {
        const spinnerPage = new SpinnerPage(this.driver);
        await this.registerButton.click();
        await spinnerPage.waitUntilSpinnerVisible();
    }
}

module.exports = {
    RegistrationPage
}