/**
 * Lesson 9: Page Object Pattern
 */

import { username, password, registrationName, uniqueUsername, uniqueUsername2 } from '../fixtures.js';
import RegistrationPage from '../../pageobjects/registration.page.js';


describe('Chechitas Registration Page', async () => {

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

        it('should fail, because of email is already registered and invalid password', async () => {

            await RegistrationPage.registration(registrationName, '123456', 'stabilo.boss@czechitas.cz');

            await expect(RegistrationPage.toastMessage).toHaveText('Více polí obsahuje špatně zadanou hodnotu');
            await expect(RegistrationPage.invalidFeedback).toHaveText(['Účet s tímto emailem již existuje', 'Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici']);

        });

        it('should fail, because email is already registered', async () => {

            await RegistrationPage.registration(registrationName, password, 'stabilo.boss@czechitas.cz');

            await expect(RegistrationPage.toastMessage).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');
            await expect(RegistrationPage.invalidFeedback).toHaveText('Účet s tímto emailem již existuje');

        });

        it('should fail, because of invalid password', async () => {

            await RegistrationPage.registration(registrationName, '123456', uniqueUsername2);

            await expect(RegistrationPage.toastMessage).toHaveText('Některé pole obsahuje špatně zadanou hodnotu');
            await expect(RegistrationPage.invalidFeedback).toHaveText('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici');

        });

    });
});