import AppPage from "./app.page.js";

class RegistrationPage extends AppPage {

    constructor() {
        super('/registrace');
    }
    get nameField() { return $('#name'); }
    get emailField() { return $('#email'); }
    get passwordField() { return $('#password'); }
    get passwordConfirmField() { return $('#password-confirm'); }
    get registrationButton() { return $('.btn-primary'); }
    // get currentUser() { return $('.navbar-right').$('.dropdown-toggle'); }
    // get toastMessage() { return $('.toast-message'); }
    // get invalidFeedback() { return $('.invalid-feedback'); }

    async open() {
        await browser.reloadSession();
        await browser.url('/registrace');
    }

    async registration(registrationName, password, uniqueUsername) {
        await this.nameField.setValue(registrationName);
        await this.emailField.setValue(uniqueUsername);
        await this.passwordField.setValue(password);
        await this.passwordConfirmField.setValue(password);
        await this.registrationButton.click();
    }

}

export default new RegistrationPage();