import AppPage from './app.page.js';

class LoginPage extends AppPage {

    constructor() {
        super('/prihlaseni');
    }

    get emailField() { return $('#email'); }
    get passwordField() { return $('#password'); }
    get loginButton() { return $('.btn-primary'); }
    get passwordResetLink() { return $('.btn-link'); }
    

    async open() {
        await browser.reloadSession();
        await browser.url(this._url);
    }

    async login(username, password) {
        await this.emailField.setValue(username);
        await this.passwordField.setValue(password);
        await this.loginButton.click();
    }

    async getFieldError() {
        return await this.fieldError.getText();
    }

}

// NEW INSTANCE !!!
export default new LoginPage();