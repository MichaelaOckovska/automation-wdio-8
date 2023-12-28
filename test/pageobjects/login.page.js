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
    get rightNavbar() { return $('.navbar-right') }
    get currentUser() { return this.rightNavbar.$('.dropdown-toggle'); } // Môžem volať funkciu vo funkcii
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

export default new LoginPage();
// Takto exportujem rovno instanci, v praxi sa používa tento spôsob.
// Slovko default znamená, že pri importe instance nepoužijem {}


// import AppPage from './app.page.js';

// class LoginPage extends AppPage {

//     constructor() {
//         super();
//         this.url = '/prihlaseni';
//     }

//     get emailField() { return $('#email'); }
//     get passwordField() { return $('#password'); }
//     get loginButton() { return $('.btn-primary'); }
//     get fieldError() { return $('.invalid-feedback'); }

//     async open() {
//         await browser.reloadSession();
//         await browser.url(this.url);
//     }

//     async login(username, password) {
//         await this.emailField.setValue(username);
//         await this.passwordField.setValue(password);
//         await this.loginButton.click();
//     }

//     async getFieldError() {
//         return await this.fieldError.getText();
//     }

// }

// // NEW INSTANCE !!!
// export default new LoginPage();