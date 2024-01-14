/**
 * Lesson 5: Assertions
 */

import { username, password, uniqueUsername } from '../fixtures.js';

describe('Czechitas Registration Page', async () => {

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
        const header = await $('h1');

        await expect(nameField).toBeEnabled();
        await expect(emailField).toBeEnabled();
        await expect(passwordField).toBeEnabled();
        await expect(passwordConfirmField).toBeEnabled();
        await expect(registrationButton).toBeClickable();
        await expect(header).toHaveText('Registrace');

    });

    it('should register new user', async () => {

        const nameField = await $('#name');
        const emailField = await $('#email');
        const passwordField = await $('#password');
        const passwordConfirmField = await $('#password-confirm');
        const registrationButton = await $('.btn-primary');

        await nameField.setValue('Stabilo Boss');
        await emailField.setValue(uniqueUsername);
        await passwordField.setValue('Stabilo.Boss123');
        await passwordConfirmField.setValue('Stabilo.Boss123');

        await registrationButton.click();

        const currentUser = $('.navbar-right').$('.dropdown-toggle');
        await expect(currentUser).toExist();

    });

    describe('Tests for invalid registration', async () => {

        before(async () => {

            await browser.reloadSession();
            await browser.url('/registrace');

        });

        it('should not register new user because email is already registered', async () => {

            const nameField = await $('#name');
            const emailField = await $('#email');
            const passwordField = await $('#password');
            const passwordConfirmField = await $('#password-confirm');
            const registrationButton = await $('.btn-primary');

            await nameField.setValue('Stabilo Boss');
            await emailField.setValue('stabilo.boss@czechitas.cz');
            await passwordField.setValue('Stabilo.Boss123');
            await passwordConfirmField.setValue('Stabilo.Boss123');

            await registrationButton.click();

            const toastMessage = $('.toast-message');
            await expect(toastMessage).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');

            const invalidFeedback = $('.invalid-feedback');
            await expect(invalidFeedback).toHaveText('Účet s tímto emailem již existuje');

        });

        it('should not register new user because of invalid password', async () => {

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
            await expect(toastMessage).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');

            const invalidFeedback = $('.invalid-feedback');
            await expect(invalidFeedback).toHaveText('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici');

        });

    });
});