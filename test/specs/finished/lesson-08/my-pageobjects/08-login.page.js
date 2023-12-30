// Login Page bez predka (predtým, než sme si povedali o dedičnosti)

class LoginPage {

    constructor() {
        this._url = '/prihlaseni';

    }

    get emailField() { return $('#email'); }
    get passwordField() { return $('#password'); }
    get loginButton() { return $('.btn-primary'); }
    get passwordResetLink() { return $('.btn-link'); }
    get toastMessage() { return $('.toast-message'); }
    get invalidFeedback() { return $('.invalid-feedback'); }
    get navbarRight() { return $('.navbar-right') }
    get currentUser() { return this.navbarRight.$('.dropdown-toggle'); } // Môžem volať funkciu vo funkcii
    get logoutButton() { return $('#logout-link'); }

    async open() {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
    }

    async login(username, password) {

        await this.emailField.setValue(username);
        await this.passwordField.setValue(password);
        await this.loginButton.click();
    }
}


// Takto exportujem rovno instanci, v praxi sa používa tento spôsob.
// Slovko default znamená, že pri importe instance nepoužijem {}
export default new LoginPage();
