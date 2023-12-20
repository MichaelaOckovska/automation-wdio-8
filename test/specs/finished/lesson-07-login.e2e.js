/**
 * Lesson 7: Code organization
 */

import { username, password } from '../fixtures.js';

function emailField() {
    return $('#email');
}

function passwordField() {
    return $('#password');
}

function loginButton() {
    return $('.btn-primary');
}

function passwordResetLink() {
    return $('.btn-link');
}

function toastMessage() {
    return $('.toast-message');
}

function invalidFeedback() {
    return $('.invalid-feedback');
}

function currentUser() {
    return $('.navbar-right').$('.dropdown-toggle');
}

function logoutButton() {
    return $('#logout-link');
}

async function login(username, password) {

    await emailField().setValue(username);
    await passwordField().setValue(password);
    await loginButton().click();

}

describe('Learn how to organize code', async () => {

    describe('Login and Logout', async () => {

        beforeEach(async () => {

            await browser.reloadSession();
            await browser.url('/prihlaseni');

        });

        it('Should show login form', async () => {

            await expect(emailField()).toBeDisplayed();
            await expect(emailField()).toBeEnabled();

            await expect(passwordField()).toBeDisplayed();
            await expect(passwordField()).toBeEnabled();

            await expect(loginButton()).toBeDisplayed();
            await expect(loginButton()).toHaveText('Přihlásit');

            await expect(passwordResetLink()).toHaveHref('https://team8-2022brno.herokuapp.com/zapomenute-heslo');

        });

        describe('Tests for failed login', async () => {

            it('Should fail at login without email or password', async () => {

                await loginButton().click();

                await expect(emailField()).toBeDisplayed();
                await expect(passwordField()).toBeDisplayed();
                await expect(loginButton()).toBeClickable();

            });


            it('Should fail at login with invalid password', async () => {

                await login(username, 'invalid password');

                await expect(toastMessage()).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');
                await expect(invalidFeedback()).toHaveText('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');

            });

        });

        it('Should succes in login with valid credentials', async () => {

            await login(username, password);

            await expect(currentUser()).toBeExisting();

        });

        it('Should logout user', async () => {

            await login(username, password);
            await currentUser().click();
            await logoutButton().click();

            await expect(currentUser).not.toBeExisting();

        });

    });

});