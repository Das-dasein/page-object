const { By } = require('selenium-webdriver');

class SpinnerPage {
    get spinner() {
        return this.driver.findElement(By.id("js-spinner-common"));
    }

    constructor(driver) {
        this.driver = driver;
    }

    waitUntilSpinnerVisible() {
        const spinner = this.spinner;

        return this.driver.wait(async () => {
            const classList = await spinner.getAttribute('class');

            return !classList.includes('ui-spinner--state_opened');
        });
    }
}

module.exports = {
    SpinnerPage
}