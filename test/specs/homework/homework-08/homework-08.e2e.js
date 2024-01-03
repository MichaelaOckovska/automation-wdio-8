/**
 * Lesson 8: Page Object Pattern
 */

import { username, password, registrationName, uniqueUsername, uniqueUsername2 } from '../../fixtures.js';
import RegistrationPage from './homework-08/08-registration.page.js';


describe('Czechitas Registration Page', async () => {

    before(async () => {
        await RegistrationPage.open();
    });

    it('should display the registration page', async () => {

        await expect(RegistrationPage.nameField).toBeEnabled();
        await expect(RegistrationPage.emailField).toBeEnabled();
        await expect(RegistrationPage.passwordField).toBeEnabled();
        await expect(RegistrationPage.passwordConfirmField).toBeEnabled();
        await expect(RegistrationPage.registrationButton).toBeClickable();
        await expect(RegistrationPage.header).toHaveText('Registrace');

    });

    it('should register new user', async () => {

        await RegistrationPage.registration(registrationName, password, uniqueUsername);

        await expect(RegistrationPage.currentUser).toExist();

    });

    describe('Tests for invalid registration', async () => {

        before(async () => {
            await RegistrationPage.open();
        });

        it('should not register new user, because of email is already registered and invalid password', async () => {

            await RegistrationPage.registration(registrationName, '123456', 'stabilo.boss@czechitas.cz');

            await expect(RegistrationPage.toastMessage).toHaveText('Více polí obsahuje špatně zadanou hodnotu');
            await expect(RegistrationPage.invalidFeedback).toHaveText(['Účet s tímto emailem již existuje', 'Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici']);

        });

        it('should not register new user, because email is already registered', async () => {

            await RegistrationPage.registration(registrationName, password, 'stabilo.boss@czechitas.cz');

            await expect(RegistrationPage.toastMessage).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');
            await expect(RegistrationPage.invalidFeedback).toHaveText('Účet s tímto emailem již existuje');

        });

        it('should not register new user, because of invalid password', async () => {

            await RegistrationPage.registration(registrationName, '123456', uniqueUsername2);

            await expect(RegistrationPage.toastMessage).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');
            await expect(RegistrationPage.invalidFeedback).toHaveText('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici');

        });

    });
});