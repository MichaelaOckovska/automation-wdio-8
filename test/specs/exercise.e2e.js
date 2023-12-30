/**
 * Lesson 9: Page Object Pattern
 */

import { username, password } from './fixtures.js';
import LoginPage from '../pageobjects/login.page.js';


describe('Learn how to organize tests for login page', async () => {

    describe('Login and Logout', async () => {

        beforeEach(async () => {
            await LoginPage.open();
        });

        it('should show login form', async () => {
            await expect(LoginPage.emailField).toBeDisplayed();
            await expect(LoginPage.emailField).toBeEnabled();
            await expect(LoginPage.passwordField).toBeDisplayed();
            await expect(LoginPage.passwordField).toBeEnabled();
            await expect(LoginPage.loginButton).toBeDisplayed();
            await expect(LoginPage.loginButton).toHaveText('Přihlásit');
            await expect(LoginPage.passwordResetLink).toHaveHref('https://team8-2022brno.herokuapp.com/zapomenute-heslo');

        });

        it('should login with valid credentials', async () => {
            await LoginPage.login(username, password);
            await expect(LoginPage.currentUser).toBeExisting();
        });


        describe('Tests for failed login', async () => {

            it('should fail at login without email or password', async () => {
                await LoginPage.loginButton.click();
                await expect(LoginPage.emailField).toBeDisplayed();
                await expect(LoginPage.passwordField).toBeDisplayed();
                await expect(LoginPage.loginButton).toBeClickable();
            });


            it('should fail at login with invalid password', async () => {
                await LoginPage.login(username, 'invalid');
                await expect(LoginPage.toastMessage).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');
                await expect(LoginPage.invalidFeedback).toHaveText('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');
                await expect(LoginPage.emailField).toBeDisplayed();
                await expect(LoginPage.passwordField).toBeDisplayed();
                await expect(LoginPage.loginButton).toBeDisplayed();
            });

        });

        it('should logout user', async () => {
            await LoginPage.login(username, password);
            await LoginPage.currentUser.isDisplayed();;
            await LoginPage.currentUser.click();
            await LoginPage.logoutButton.click();
            await expect(LoginPage.currentUser).not.toBeExisting();
        });

    });

});