/**
 * Lesson 4: Test structure
 */

import { username, password } from '../fixtures.js';

describe('Learn how to organize your tests', async () => {

    xit('Long and ugly tests script', async () => {

        await browser.reloadSession();
        await browser.url('/prihlaseni');

        const loginButton = $('.btn-primary');
        console.log(await loginButton.getText());

        await loginButton.click();

        // await loginButton.waitForDisplayed({
        //     reverse:  true,
        //     timeout: 1000,
        //     timeoutMsg: 'Nie sme prihlásený'
        // })

        // Riešenie od Monči 

        console.log('Login failed: ' + await loginButton.isDisplayed());

        const emailField = $('#email');
        const passwordField = $('#password');

        await emailField.setValue(username);
        await passwordField.setValue('Invalid password');

        await loginButton.click();

        const toastMessage = $('.toast-message');
        console.log(await toastMessage.waitForDisplayed());
        // console.log(await toastMessage.waitForDisplayed({ reverse: true }));
        console.log(await toastMessage.getText());

        const invalidFeedback = $('.invalid-feedback');
        console.log(await invalidFeedback.waitForDisplayed());
        console.log('User is logged in: ' + await invalidFeedback.getText());

        await browser.saveScreenshot('failed_login.png');

        await emailField.setValue(username);
        await passwordField.setValue(password);

        await loginButton.click();

        const currentUser = $('.navbar-right').$('.dropdown-toggle');
        console.log(await currentUser.getText());

        const applicationsButton = $('=Přihlášky');
        console.log(await applicationsButton.getAttribute('href'));
        await applicationsButton.click();

        const rows = await $('.dataTable').$('tbody').$$('tr'); // Musí to byť pod tým čakaním na prvok? => pomohol await na const rows

        await $('#DataTables_Table_0_processing').waitForDisplayed();

        await $('#DataTables_Table_0_processing').waitForDisplayed({
            reverse: true
        });

        // Hádže chybu "TypeError: Cannot read properties of undefined (reading 'getText')" => pomohol await na const rows, ale aj riešenie nižšie

        // await rows.forEach(async (row) => {
        //         console.log(await row.getText());
        //     });

        for (const row of rows) {
            console.log(await row.getText());
        }

        await $('input[type=search]').setValue('Bubla');
        await $('#DataTables_Table_0_processing').waitForDisplayed();
        // await browser.pause(1000);   // Aj Monči to robilo problém, toto je náhradné riešenie 
        await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true });

        const filteredRows = await $('.dataTable').$('tbody').$$('tr')
        console.log('There are ' + filteredRows.length + ' filtered rows in the table');
        for (const row of filteredRows) {
            console.log(await row.getText());
        }

        await currentUser.click();

        const logoutButton = $('#logout-link');
        await logoutButton.click();

        console.log('User is logged out: ' + await loginButton.waitForDisplayed());

        await browser.saveScreenshot('succes_logout.png');

    });

    describe('Login and Logout', async () => {

        beforeEach(async () => {

            await browser.reloadSession();
            await browser.url('/prihlaseni');

        })

        it('should show login form', async () => {

            const emailField = await $('#email');
            const passwordField = await $('#password');
            const loginButton = await $('.btn-primary');

            console.log('Email field is displayed: ' + await emailField.isDisplayed());
            console.log('Email field is enabled: ' + await emailField.isEnabled());

            console.log('Password field is displayed: ' + await passwordField.isDisplayed());
            console.log('Password field is enabled: ' + await passwordField.isEnabled());

            console.log('Login button is displayed: ' + await loginButton.isDisplayed());
            console.log('Login button text is ' + await loginButton.getText());

        });

        describe('Tests for failed login', async () => {

            it('should fail at login without email or password', async () => {

                const emailField = $('#email');
                const passwordField = $('#password');
                const loginButton = $('.btn-primary');

                console.log(await loginButton.getText());
                await loginButton.click();

                console.log('Login failed: ' + await loginButton.isDisplayed());

            });


            it('should fail at login with invalid password', async () => {

                const emailField = $('#email');
                const passwordField = $('#password');
                const loginButton = $('.btn-primary');

                await emailField.setValue(username);
                await passwordField.setValue('Invalid password');
                await loginButton.click();

                const toastMessage = $('.toast-message');
                console.log(await toastMessage.waitForDisplayed());
                console.log(await toastMessage.getText());

                const invalidFeedback = $('.invalid-feedback');
                console.log(await invalidFeedback.waitForDisplayed());
                console.log('User is not logged in: ' + await invalidFeedback.getText());

                await browser.saveScreenshot('failed_login.png');

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
            console.log(await currentUser.getText());

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

            console.log('User is logged out: ' + await loginButton.waitForDisplayed());

            await browser.saveScreenshot('succes_logout.png');

        });

    });

    describe('Tests for application table', async () => {

        beforeEach(async () => {

            await browser.reloadSession();
            await browser.url('/prihlaseni');

        })

        it('should display the application table', async () => {

            const emailField = $('#email');
            const passwordField = $('#password');
            const loginButton = $('.btn-primary');
            const applicationsButton = $('=Přihlášky');


            await emailField.setValue(username);
            await passwordField.setValue(password);
            await loginButton.click();

            console.log(await applicationsButton.getAttribute('href'));
            await applicationsButton.click();

            await $('#DataTables_Table_0_processing').waitForDisplayed();
            await $('#DataTables_Table_0_processing').waitForDisplayed({
                reverse: true
            });

            const rows = await $('.dataTable').$('tbody').$$('tr'); // Očividne to musí byť až po tom okne napísané v kóde.

            for (const row of rows) {
                console.log(await row.getText());
            }

        });

        it('should filtering in the application table', async () => {

            const emailField = $('#email');
            const passwordField = $('#password');
            const loginButton = $('.btn-primary');
            const applicationsButton = $('=Přihlášky');

            await emailField.setValue(username);
            await passwordField.setValue(password);
            await loginButton.click();

            console.log(await applicationsButton.getAttribute('href'));
            await applicationsButton.click();

            await $('input[type=search]').setValue('Bubla');
            await $('#DataTables_Table_0_processing').waitForDisplayed();
            // await browser.pause(1000);   // Aj Monči to robilo problém, toto je náhradné riešenie 
            await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true });

            const filteredRows = await $('.dataTable').$('tbody').$$('tr')
            console.log('There are ' + filteredRows.length + ' filtered rows in the table');
            for (const row of filteredRows) {
                console.log(await row.getText());
            }

        });

    });

});