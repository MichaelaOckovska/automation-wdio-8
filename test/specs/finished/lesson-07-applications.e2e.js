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

function applicationsButton() {
    return $('=Přihlášky');
}

async function openLoginPage() {
    await browser.reloadSession();
    await browser.url('/prihlaseni');
}

async function login(username, password) {

    await emailField().setValue(username);
    await passwordField().setValue(password);
    await loginButton().click();

}

async function goToApplications() {
    await applicationsButton().click();
}

async function getTableRows() {
    await waitForTableToLoad();
    return await $('.dataTable').$('tbody').$$('tr');
}

async function searchInTable(searchText) {
    await $('input[type=search]').setValue(searchText);
}

async function waitForTableToLoad() {
    // await $('#DataTables_Table_0_processing').waitForDisplayed();    // Toto je spráne riešienie, ale na tejto stránke väčšinou to nefunguje, ani Monči
    await browser.pause(1000);
    await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true });
}

describe('Learn how to organize tests for application table', async () => {

    beforeEach(async () => {

        await openLoginPage();
        await login(username, password);
        await goToApplications();

        // Overím si, či som na správnej stránke, než spustím ďalšie testy

        await expect($('h1').toHaveText('Přihlášky'));

    })

    it('should display the application table', async () => {

        const rows = await getTableRows();

        await expect(rows).toBeElementsArrayOfSize(30);

        rows.forEach(async (row) => {

            const columns = await row.$$('td');

            const tableName = await columns[0];
            const tableDate = await columns[1];
            const tablePayment = await columns[2];
            const tableToPay = await columns[3];

            await expect(tableName).toHaveText(/[a-zA-Z]/);
            await expect(tableDate).toHaveText(/\d{1,2}\.\d{1,2}\.\d{4}/);
            await expect(tablePayment).toHaveText(/(Bankovní převod|Hotově|FKSP)/);
            await expect(tableToPay).toHaveText(/\d{1,3}(| \d{0,3}) Kč/g);
        })

    });

    it('should filtering in the application table', async () => {

        await waitForTableToLoad();
        await searchInTable('Bill');

        const filteredRows = await getTableRows();

        filteredRows.forEach(async (row) => {

            const columns = await row.$$('td');

            const tableName = await columns[0];
            const tableDate = await columns[1];
            const tablePayment = await columns[2];
            const tableToPay = await columns[3];

            await browser.pause(1000);

            await expect(tableName).toHaveTextContaining(/Bill/);
            await expect(tableDate).toHaveText(/\d{1,2}\.\d{1,2}\.\d{4}/);
            await expect(tablePayment).toHaveText(/(Bankovní převod|Hotově|FKSP)/);
            await expect(tableToPay).toHaveText(/\d{1,3}(| \d{0,3}) Kč/g);
        })

    });
});