/*

1. Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové Objednávky pro MŠ/ZŠ
2. Po kliknutí na Pro učitele > Objednávka pro MŠ/ZŠ se otevře formulář, kde může uživatel vyplnit detail objednávky
3. Po vyplnění IČO do formuláře objednávky se automaticky načte jméno odběratele a adresa odběratele z ARESu
4. Uživatel může odeslat vyplněnou objednávku na příměstský tábor
5. Objednávku nelze odeslat pokud není řádně vyplněna

*/

import { username, userFullName } from '../fixtures.js';
import OrderPage from '../../pageobjects/order.page.js';

describe('Order for kindergarten and school', async () => {

    describe('User navigation', async () => {

        beforeEach(async () => {
            await browser.reloadSession();
            await browser.url('/');
        });

        it('should open the order page through the navigation menu', async () => {

            await expect(OrderPage.dropForTeachers).toBeDisplayed();
            await OrderPage.dropForTeachers.click();

            await expect(OrderPage.orderLink).toBeClickable();
            await OrderPage.orderLink.click();

            await expect(OrderPage.header).toHaveText('Nová objednávka');
            await expect($('.card-body')).toBeExisting();
            await expect($('h3')).toHaveText('Objednávka akce');
        });
    });

    describe('Create a new order', async () => {

        beforeEach(async () => {
            await browser.reloadSession();
            await browser.url('/objednavka/pridat');
            await expect(OrderPage.header).toHaveText('Nová objednávka');
        });

        it('should automatically retrieve the data from ARES after filling in IČO,', async () => {

            await OrderPage.idField.setValue('22834958');
            await browser.keys('Enter');
            await OrderPage.toastMessage.waitForDisplayed();

            await expect(OrderPage.clientField).toHaveValue('Czechitas');
            await expect(OrderPage.addressField).toHaveValue('Václavské náměstí 837/11, 110 000 Praha');
        });

        it.only('should allow user to submit a completed order for a city camp', async () => {

            await OrderPage.idField.setValue('22834958');
            await browser.keys('Enter');
            // await OrderPage.toastMessage.waitForDisplayed();
            await browser.pause(20000);

            await OrderPage.clientField.setValue('Czechitas');
            await OrderPage.addressField.setValue('Václavské náměstí 837/11, 110 000 Praha');
            await OrderPage.substituteField.setValue(userFullName);
            await OrderPage.contactNameField.setValue(userFullName);
            await OrderPage.phoneNumberField.setValue('12345679');
            await OrderPage.contactEmailField.setValue(username);
            await OrderPage.startDate.setValue('01.01.2024');
            await OrderPage.endDate.setValue('31.01.2024');


        });

        describe('Order cannot be sent if it is not filled in properly', async () => {

        });
    })
});

