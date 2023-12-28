/**
 * Lesson 7: Code organization
 */

import { username, password } from '../fixtures.js';

async function openLoginPage() {
    await browser.reloadSession();
    await browser.url('/prihlaseni');
}

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

describe('Learn how to organize tests for login page', async () => {

    describe('Login and Logout', async () => {

        beforeEach(async () => {

            await openLoginPage();

        });

        it('should show login form', async () => {

            await expect(emailField()).toBeDisplayed();
            await expect(emailField()).toBeEnabled();

            await expect(passwordField()).toBeDisplayed();
            await expect(passwordField()).toBeEnabled();

            await expect(loginButton()).toBeDisplayed();
            await expect(loginButton()).toHaveText('Přihlásit');

            await expect(passwordResetLink()).toHaveHref('https://team8-2022brno.herokuapp.com/zapomenute-heslo');

        });

        describe('Tests for failed login', async () => {

            it('should fail at login without email or password', async () => {

                await loginButton().click();

                await expect(emailField()).toBeDisplayed();
                await expect(passwordField()).toBeDisplayed();
                await expect(loginButton()).toBeClickable();

            });


            it('should fail at login with invalid password', async () => {

                await login(username, 'invalid password');

                await expect(toastMessage()).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');
                await expect(invalidFeedback()).toHaveText('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');

            });

        });

        it('should login with valid credentials', async () => {

            await login(username, password);

            await expect(currentUser()).toBeExisting();

        });

        it('should logout user', async () => {

            await login(username, password);
            await currentUser().click();
            await logoutButton().click();

            await expect(currentUser).not.toBeExisting();

        });

    });

});