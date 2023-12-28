/**
 * Lesson 4: Test structure
 */

describe('Chechitas Registration Page', async () => {

    before(async () => {

        await browser.reloadSession();
        await browser.url('/registrace');

    });

    it('should display the registration page', async () => {

        const nameField = await $('#name');
        const emailField = await $('#email');
        const passwordField = await $('#password');
        const passwordConfirmField = await $('#password-confirm');
        const registrationButton = await $('.btn-primary');

        console.log('Name field is visible: ' + await nameField.waitForDisplayed());
        console.log('Email field is visible: ' + await emailField.waitForDisplayed());
        console.log('Password field is visible: ' + await passwordField.waitForDisplayed());
        console.log('Password confirm field is visible: ' + await passwordConfirmField.waitForDisplayed());
        console.log('Registration button is clickable: ' + await registrationButton.waitForClickable());

    });

    it('should register new user', async () => {

        const nameField = await $('#name');
        const emailField = await $('#email');
        const passwordField = await $('#password');
        const passwordConfirmField = await $('#password-confirm');
        const registrationButton = await $('.btn-primary');

        await nameField.setValue('Stabilo Boss2');
        await emailField.setValue('stabilo.boss2@czechitas.cz');
        await passwordField.setValue('Stabilo.Boss123');
        await passwordConfirmField.setValue('Stabilo.Boss123');

        await registrationButton.click();

        const currentUser = $('.navbar-right').$('.dropdown-toggle');
        await expect(currentUser).toHaveText('Stabilo Boss2');

        await browser.pause(1000);

        await browser.saveScreenshot('succes_registration.png');

    });

    describe('Tests for invalid registration', async () => {

        before(async () => {

            await browser.reloadSession();
            await browser.url('/registrace');

        });

        it('should fail, because email is already registered', async () => {

            const nameField = await $('#name');
            const emailField = await $('#email');
            const passwordField = await $('#password');
            const passwordConfirmField = await $('#password-confirm');
            const registrationButton = await $('.btn-primary');

            await nameField.setValue('Stabilo Boss2');
            await emailField.setValue('stabilo.boss2@czechitas.cz');
            await passwordField.setValue('Stabilo.Boss123');
            await passwordConfirmField.setValue('Stabilo.Boss123');

            await registrationButton.click();

            const toastMessage = $('.toast-message');
            console.log(await toastMessage.waitForDisplayed());
            console.log(await toastMessage.getText());

            const invalidFeedback = $('.invalid-feedback');
            console.log(await invalidFeedback.waitForDisplayed());
            console.log(await invalidFeedback.getText());

        });

        it('should fail, because of invalid password', async () => {

            const nameField = await $('#name');
            const emailField = await $('#email');
            const passwordField = await $('#password');
            const passwordConfirmField = await $('#password-confirm');
            const registrationButton = await $('.btn-primary');

            await nameField.setValue('Stabilo Boss3');
            await emailField.setValue('stabilo.boss3@czechitas.cz');
            await passwordField.setValue('123456');
            await passwordConfirmField.setValue('123456');

            await registrationButton.click();

            const toastMessage = $('.toast-message');
            console.log(await toastMessage.waitForDisplayed());
            console.log(await toastMessage.getText());

            const invalidFeedback = $('.invalid-feedback');
            console.log(await invalidFeedback.waitForDisplayed());
            console.log(await invalidFeedback.getText());

        });

    });
});