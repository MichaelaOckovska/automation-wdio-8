/**
 * Lesson 7: Code organization
 */

import { username, password, registrationName, uniqueUsername, uniqueUsername2 } from '../fixtures.js';

function nameField() {
    return $('#name');
}
function emailField() {
    return $('#email');
}
function passwordField() {
    return $('#password');
}
function passwordConfirmField() {
    return $('#password-confirm');
}
function registrationButton() {
    return $('.btn-primary');
}
function header() {
    return $('h1');
}
function currentUser() {
    return $('.navbar-right').$('.dropdown-toggle');
}
function toastMessage() {
    return $('.toast-message');

}
function invalidFeedback() {
    return $('.invalid-feedback');
}
async function registration(registrationName, password, uniqueUsername) {
    await nameField().setValue(registrationName);
    await emailField().setValue(uniqueUsername);
    await passwordField().setValue(password);
    await passwordConfirmField().setValue(password);
    await registrationButton().click();
}

describe('Czechitas Registration Page', async () => {

    before(async () => {

        await browser.reloadSession();
        await browser.url('/registrace');

    });

    it('should display the registration page', async () => {

        await expect(nameField()).toBeEnabled();
        await expect(emailField()).toBeEnabled();
        await expect(passwordField()).toBeEnabled();
        await expect(passwordConfirmField()).toBeEnabled();
        await expect(registrationButton()).toBeClickable();
        await expect(header()).toHaveText('Registrace');

    });

    it('should register new user', async () => {

        await registration(registrationName, password, uniqueUsername);

        await expect(currentUser()).toExist();

    });

    describe('Tests for invalid registration', async () => {

        before(async () => {

            await browser.reloadSession();
            await browser.url('/registrace');

        });

        it('should not register new user because of email is already registered and invalid password', async () => {

            await registration(registrationName, '123456', 'stabilo.boss@czechitas.cz');

            await expect(toastMessage()).toHaveText('Více polí obsahuje špatně zadanou hodnotu');
            await expect(invalidFeedback()).toHaveText(['Účet s tímto emailem již existuje', 'Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici']);

        });

        it('should not register new user because email is already registered', async () => {

            await registration(registrationName, password, 'stabilo.boss@czechitas.cz');

            await expect(toastMessage()).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');
            await expect(invalidFeedback()).toHaveText('Účet s tímto emailem již existuje');

        });

        it('should not register new user because of invalid password', async () => {

            await registration(registrationName, '123456', uniqueUsername2);

            await expect(toastMessage()).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');
            await expect(invalidFeedback()).toHaveText('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici');

        });

    });
});