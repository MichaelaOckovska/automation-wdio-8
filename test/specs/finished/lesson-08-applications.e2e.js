/**
 * Lesson 8: Page Object Pattern
 */

import { username, password } from '../fixtures.js';
import LoginPage from '../../pageobjects/login.page.js';
import ApplicationsPage from '../../pageobjects/applications.page.js';


describe('Learn how to organize tests for application table', async () => {

    beforeEach(async () => {

        await LoginPage.open();
        await LoginPage.login(username, password);
        await ApplicationsPage.goToApplications();

        await expect($('h1').toHaveText('Přihlášky'));

    })

    it('should display the application table', async () => {

        const rows = await ApplicationsPage.getTableRows();

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

    it.only('should filtering in the application table', async () => {

        await ApplicationsPage.waitForTableToLoad();
        await ApplicationsPage.setSearchInTable('Bubla');

        const filteredRows = await ApplicationsPage.getTableRows();

        filteredRows.forEach(async (row) => {

            const columns = await row.$$('td');

            const tableName = await columns[0];
            const tableDate = await columns[1];
            const tablePayment = await columns[2];
            const tableToPay = await columns[3];

            await expect(tableName).toHaveTextContaining(/Bubla/);
            await expect(tableDate).toHaveText(/\d{1,2}\.\d{1,2}\.\d{4}/);
            await expect(tablePayment).toHaveText(/(Bankovní převod|Hotově|FKSP)/);
            await expect(tableToPay).toHaveText(/\d{1,3}(| \d{0,3}) Kč/g);
        })

    });
});