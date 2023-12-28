/**
 * Lesson 5: Assertions
 */

import { username, password } from '../fixtures.js';

describe('Learn how to use Assertations', async () => {

    describe('Login and Logout', async () => {

        beforeEach(async () => {

            await browser.reloadSession();
            await browser.url('/prihlaseni');

        });

        it('should show login form', async () => {

            const emailField = await $('#email');
            const passwordField = await $('#password');
            const loginButton = await $('.btn-primary');

            // To čo sme si vypisovali do logu môžeme prepísať ako asertáciu

            // console.log('Email field is displayed: ' + await emailField.isDisplayed());
            // console.log('Email field is enabled: ' + await emailField.isEnabled());

            await expect(emailField).toBeDisplayed();
            await expect(emailField).toBeEnabled();

            // console.log('Password field is displayed: ' + await passwordField.isDisplayed());
            // console.log('Password field is enabled: ' + await passwordField.isEnabled());

            await expect(passwordField).toBeDisplayed();
            await expect(passwordField).toBeEnabled();

            // console.log('Login button is displayed: ' + await loginButton.isDisplayed());
            // console.log('Login button text is ' + await loginButton.getText());

            await expect(loginButton).toBeDisplayed();
            await expect(loginButton).toHaveText('Přihlásit');

            const passwordResetLink = await $('.btn-link');
            await expect(passwordResetLink).toHaveHref('https://team8-2022brno.herokuapp.com/zapomenute-heslo');

        });

        describe('Tests for failed login', async () => {

            it('should fail at login without email or password', async () => {

                const emailField = $('#email');
                const passwordField = $('#password');
                const loginButton = $('.btn-primary');

                await loginButton.click();

                await expect(emailField).toBeDisplayed();
                await expect(passwordField).toBeDisplayed();
                await expect(loginButton).toBeClickable();

            });


            it('should fail at login with invalid password', async () => {

                const emailField = $('#email');
                const passwordField = $('#password');
                const loginButton = $('.btn-primary');

                await emailField.setValue(username);
                await passwordField.setValue('Invalid password');
                await loginButton.click();

                const toastMessage = $('.toast-message');
                await expect(toastMessage).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');

                const invalidFeedback = $('.invalid-feedback');
                await expect(invalidFeedback).toHaveText('Tyto přihlašovací údaje neodpovídají žadnému záznamu.');

            });

        });

        it('should login with valid credentials', async () => {

            const emailField = $('#email');
            const passwordField = $('#password');
            const loginButton = $('.btn-primary');

            await emailField.setValue(username);
            await passwordField.setValue(password);

            await loginButton.click();

            const currentUser = $('.navbar-right').$('.dropdown-toggle');
            await expect(currentUser).toBeExisting();

        });

        it('should logout user', async () => {

            const emailField = $('#email');
            const passwordField = $('#password');
            const loginButton = $('.btn-primary');
            const currentUser = $('.navbar-right').$('.dropdown-toggle');

            await emailField.setValue(username);
            await passwordField.setValue(password);

            await loginButton.click();

            await currentUser.click();

            const logoutButton = $('#logout-link');
            await logoutButton.click();

            await expect(currentUser).not.toBeExisting();

        });

    });

    describe('Tests for application table', async () => {

        beforeEach(async () => {

            await browser.reloadSession();
            await browser.url('/prihlaseni');

            const emailField = $('#email');
            const passwordField = $('#password');
            const loginButton = $('.btn-primary');

            await emailField.setValue(username);
            await passwordField.setValue(password);
            await loginButton.click();

            const applicationsButton = $('=Přihlášky');
            await applicationsButton.click();

            // Overím si, či som na správnej stránke, než spustím ďalšie testy

            await expect($('h1').toHaveText('Přihlášky'));

        })

        it('should display the application table', async () => {

            await $('#DataTables_Table_0_processing').waitForDisplayed();
            await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true });

            const rows = await $('.dataTable').$('tbody').$$('tr'); // Očividne to musí byť až po tom okne napísané v kóde.

            await expect(rows).toBeElementsArrayOfSize(30);

            for (const row of rows) {

                // console.log(await row.getText());

                // Tip od Monči

                const columns = await row.$$('td');

                // console.log(await columns[0].getText());
                // console.log(await columns[1].getText());
                // console.log(await columns[2].getText());
                // console.log(await columns[3].getText());

                const tableName = await columns[0];     // JS ako väčšina jazykov indexuje od nuly
                const tableDate = await columns[1];
                const tablePayment = await columns[2];
                const tableToPay = await columns[3];

                await expect(tableName).toHaveText(/[a-zA-Z]/);
                await expect(tableDate).toHaveText(/\d{1,2}\.\d{1,2}\.\d{4}/);
                await expect(tablePayment).toHaveText(/(Bankovní převod|Hotově|FKSP)/);
                await expect(tableToPay).toHaveText(/\d{1,3}(| \d{0,3}) Kč/g);

            }

        });

        it('should filtering in the application table', async () => {

            await $('input[type=search]').setValue('Bubla');
            await $('#DataTables_Table_0_processing').waitForDisplayed();
            // await browser.pause(1000);   // Aj Monči to robilo problém, toto je náhradné riešenie 
            await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true });

            const filteredRows = await $('.dataTable').$('tbody').$$('tr');

            for (const row of filteredRows) {

                const columns = await row.$$('td');

                const tableName = await columns[0];
                const tableDate = await columns[1];
                const tablePayment = await columns[2];
                const tableToPay = await columns[3];

                await expect(tableName).toHaveTextContaining(/Bubla/);
                await expect(tableDate).toHaveText(/\d{1,2}\.\d{1,2}\.\d{4}/);
                await expect(tablePayment).toHaveText(/(Bankovní převod|Hotově|FKSP)/);
                await expect(tableToPay).toHaveText(/\d{1,3}(| \d{0,3}) Kč/g);

            }

        });

    });

});

