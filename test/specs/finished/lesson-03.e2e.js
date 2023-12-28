/**
 * Lesson 3: Selectors and element interactions
 */

import { username, password } from '../fixtures.js';

describe('Czechitas Applications Page', async () => {

    beforeEach(async () => {

        await browser.reloadSession();

        await browser.url('/prihlaseni');

    });

    it('should find all elements', async () => {

        const buttons = await $$('button');
        console.log(await buttons.length);

        buttons.forEach(async (button) => {
            console.log(await button.getHTML());
        });


        // Iný zápis rovnakej funkcie

        console.log('Nový zápis');

        for await (const button of buttons) {
            console.log(await button.getHTML());
        };

    });

    it('should interact with elements', async () => {

        const emailField = await $('#email');
        const passwordField = await $('#password');
        const loginButton = await $('.btn-primary');
        const forgotPasswordLink = await $('=Zapomněli jste své heslo?');

        console.log(await loginButton.isEnabled());
        console.log(await loginButton.isDisplayed());
        console.log(await loginButton.getText());
        console.log(await forgotPasswordLink.getAttribute('href'));

        // Prvotný zápis, vhodnejšie sú konštanty, napr. ak by sa zmenili selektory

        // await $('#email').setValue('monika@czechitas.cz');
        // await $('#password').setValue('Heslo');
        // await $('.btn-primary').click();

        // await browser.pause(2000);

        // await $('#email').clearValue();
        // await $('#password').clearValue();

        // await browser.pause(2000);

        await emailField.clearValue();
        await emailField.setValue('da-app.admin@czechitas.cz');

        await passwordField.clearValue();
        await passwordField.setValue('Czechitas123');

        await loginButton.click();

        await browser.pause(2000);


        // Reťazenie selektorov vo WDIO

        await $('=Přihlášky').click();

        await browser.pause(2000);

        const rows = await $('table').$$('tr');   // Vyhľadávanie podľa tag name, predsa 

        rows.forEach(async (row) => {
            console.log(await row.getText());
        });

        // for await (const row of rows) {
        //     console.log(await row.getText());
        // }

    });

    it('should clean workspace for interactions with elements', async () => {

        // Chytanie prvkov na stránke

        await $('#email').setValue('monika@czechitas.cz');
        await $('#password').setValue('Heslo');
        await $('.btn-primary').click();

        const toastMessage = await $('.toast-message');

        await toastMessage.waitForExist();

        // Môžeme na ten prvok čakať iba po určitý čas
        // await toastMessage.waitForExist({timeout: 1000}); 

        await toastMessage.waitForExist({ reverse: true });

        // A môžeme to ešte viac vyladiť a doplniť mu tam aj správu
        // await toastMessage.waitForExist({
        // reverse: true,
        // timeout: 1000,
        // timeoutMsg: 'Nedočkali sme sa'
        // });

    });

    it('Exercises for lesson 3', async () => {

        // Cvičenie 1

        const emailField = await $('#email');
        const passwordField = await $('#password');
        const loginButton = await $('.btn-primary');
        const forgotPasswordLink = await $('=Zapomněli jste své heslo?');

        console.log(await emailField.isDisplayed());
        console.log(await emailField.isEnabled());

        console.log(await passwordField.isDisplayed());
        console.log(await passwordField.isEnabled());

        console.log(await loginButton.getText());

        console.log(await forgotPasswordLink.getAttribute('href'));

        await emailField.setValue(username);
        await passwordField.setValue(password);
        await loginButton.click();

        const currentUser = $('.navbar-right').$('strong');
        console.log(await currentUser.getText());

        // Cvičenie 2

        await $('=Přihlášky').click();

        // const rows = await $('tbody').$$('tr');

        // Nefunguje :(

        await $('#DataTables_Table_0_processing').waitForDisplayed();

        await $('#DataTables_Table_0_processing').waitForDisplayed({
            reverse: true
        });

        // await browser.pause(2000);

        // Prečo nefungujú tieto zápisy, keď predtým fungovali?

        // rows.forEach(async (row) => {
        //     console.log(await row.getText());
        // });

        // for await (const row of rows) {
        //     console.log(await row.getText());
        // }

        // Riešenie od Monči

        const rows = await $('.dataTable').$('tbody').$$('tr');
        console.log('There are ' + rows.length + ' rows in the table');
        for (const row of rows) {
            const rowText = await row.getText()
            console.log(rowText);
        }

        // Cvičenie 3

        await $('input[type=search]').setValue('Bubla');
        await browser.pause(1000);
        await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true });

        const filteredRows = await $('.dataTable').$('tbody').$$('tr')
        console.log('There are ' + filteredRows.length + ' filtered rows in the table');
        for (const row of filteredRows) {
            console.log(await row.getText());
        }

    });
});
