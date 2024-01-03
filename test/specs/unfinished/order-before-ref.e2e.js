/*

1. Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové Objednávky pro MŠ/ZŠ
2. x Po kliknutí na Pro učitele > Objednávka pro MŠ/ZŠ se otevře formulář, kde může uživatel vyplnit detail objednávky
3. Po vyplnění IČO do formuláře objednávky se automaticky načte jméno odběratele a adresa odběratele z ARESu
4. Uživatel může odeslat vyplněnou objednávku na příměstský tábor
5. Objednávku nelze odeslat pokud není řádně vyplněna

*/


describe('Order for kindergarten and school', async () => {

    describe('User navigation', async () => {

        beforeEach(async () => {
            await browser.reloadSession();
            await browser.url('/');
        });

        it('should open the order page through the navigation menu', async () => {

            const dropForTeachers = await $('=Pro učitelé');
            await expect(dropForTeachers).toBeDisplayed();
            await dropForTeachers.click();

            const orderLink = await $('=Objednávka pro MŠ/ZŠ');
            await expect(orderLink).toBeClickable();
            await orderLink.click();

            const header = $('h1')
            // console.log(await header.getText());
            await expect(header).toHaveText('Nová objednávka');
            await expect($('.card-body')).toBeExisting();
            await expect($('h3')).toHaveText('Objednávka akce');
        });
    });

    describe('Create a new order', async () => {

        beforeEach(async () => {
            await browser.reloadSession();
            await browser.url('/objednavka/pridat');
            await expect(header).toHaveText('Nová objednávka');
        });

    it('should automatically retrieve the data from ARES after filling in IČO,', async () => {

        const idField = await $('#ico');
        const clientField = await $('#client');
        const addressField = await $('#address');
        const toastMessage = await $('.toast-message');

        await idField.setValue('22834958');
        await browser.key('Enter');
        await toastMessage.waitForDisplayed();

        // await expect(clientField).toHaveValue('Czechitas');
        // await expect(addressField).toHaveValue('Václavské náměstí 837/11, 110 000 Praha');

    });

    it('should allow user to submit a completed order for a city camp', async () => {

        const idField = await $('#ico');
        const clientField = await $('#client');
        const addressField = await $('#address');
        const substituteField = await $('#substitute');
        const contactNameField = await $('#contact_name');
        const phoneNumberField = await $('#contact_tel');
        const emailField = await $('#contact_mail');
        const startDate = await $('#start_date_1');
        const endDate = await $('#end_date_1');


    });

    describe('Order cannot be sent if it is not filled in properly', async () => {

    });
})});