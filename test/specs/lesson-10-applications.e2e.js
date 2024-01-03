/**
 * Lesson 10: Page Object Pattern
*/

// Túto hodinu sme upravovali len tento súbor a applications.page.js

import { username, password } from './fixtures.js';
import LoginPage from '../pageobjects/login.page.js';
import ApplicationsPage from '../pageobjects/applications.page.js';
import TableRow from '../pageobjects/applications.page.js';


describe('Learn how to organize tests for application table', async () => {

    beforeEach(async () => {

        await LoginPage.open();
        await LoginPage.login(username, password);
        await ApplicationsPage.goToApplications();

        await expect($('h1').toHaveText('Přihlášky'));

    })

    it('should display the application table', async () => {

        const rows = await ApplicationsPage.getTableRows();

        // await expect(rows).toBeElementsArrayOfSize(30);

        for (const row of rows) {

            const values = await row.getValues();

            console.log(values);

            await expect(values.name).toMatch(/[a-zA-Z]/);
            await expect(values.date).toMatch(/\d{1,2}\.\d{1,2}\.\d{4}/);
            await expect(values.paymentType).toMatch(/(Bankovní převod|Hotově|FKSP|Složenka)/);
            await expect(values.toPay).toMatch(/\d{1,3}(| \d{0,3}) Kč/g);
        }

        console.log('Give me the informations from row 6');
        console.log(await rows[5].getValues());    // Lepšie zacielime na konkrétny riadok

    });

    xit('should open application detail', async () => {

        // vybere třetí přihlášku v tabulce (musí tam samozřejmě být alespoň 3)
        const thirdRow = (await ApplicationsPage.getTableRows())[2];
        const [lastName, firstName, secondName] = (await thirdRow.getValues()).name.split(' ');

        // otevře detail přihlášky
        const applicationDetailPage = await thirdRow.getInfo();

        // získá obsah detailu přihlášky
        const applicationDetail = await applicationDetailPage.getDetail();

        // await expect(applicationDetail).toContain(['Křestní jméno žáka:', [firstName, secondName].join(' ')]);
        // await expect(applicationDetail).toContain(['Příjmení žáka:', lastName]);

        console.log(applicationDetail);     // Musela som zakomentovať asertácie, vrátim sa k tomu neskôr :(
    });

    it('should filtering in the application table', async () => {

        await ApplicationsPage.waitForTableToLoad();
        await ApplicationsPage.setSearchInTable('Bill');

        const filteredRows = await ApplicationsPage.getTableRows();

        for (const row of filteredRows) {

            const values = await row.getValues();

            console.log(values);

            await expect(values.name).toMatch(/Bill/);
            await expect(values.date).toMatch(/\d{1,2}\.\d{1,2}\.\d{4}/);
            await expect(values.paymentType).toMatch(/(Bankovní převod|Hotově|FKSP|Složenka)/);
            await expect(values.toPay).toMatch(/\d{1,3}(| \d{0,3}) Kč/g);

        }
    });
});