import AppPage from './app.page.js';

class OrderPage extends AppPage {

    constructor() {
        super('/prihlaseni');
    }

    get dropForTeachers() { return $('=Pro učitelé'); }
    get orderLink() { return $('=Objednávka pro MŠ/ZŠ'); }
    get idField() { return $('#ico'); }
    get clientField() { return $('#client'); }
    get addressField() { return $('#address'); }
    get substituteField() { return $('#substitute'); }
    get contactNameField() { return $('#contact_name'); }
    get phoneNumberField() { return $('#contact_tel'); }
    get contactEmailField() { return $('#contact_mail'); }
    get startDate() { return $('#start_date_1'); }
    get endDate() { return $('#end_date_1'); }



}

// NEW INSTANCE !!!
export default new OrderPage();

/*
    describe('Create a new order', async () => {

        it('should allow user to submit a completed order for a city camp', async () => {

            await idField.setValue('22834958');
            await browser.keys('Enter');
            await toastMessage.waitForDisplayed();
            await browser.pause(10000);

            await clientField.setValue('Czechitas');
            await addressField.setValue('Václavské náměstí 837/11, 110 000 Praha');
            await substituteField.setValue(userFullName);
            await contactNameField.setValue(userFullName);
            await phoneNumberField.setValue('12345679');
            await emailField.setValue(username);
            await startDate.setValue('01.01.2024');
            await endDate.setValue('31.01.2024');

            const cityCampButton = await $('=Příměstský tábor');
            const cityCampTab = await $('#orderCreateTabs');

            await cityCampButton.click();
            await expect(cityCampTab).toBeDisplayed();

            const campDatePart = await $('#camp-date_part');
            const campStudents = await $('#camp-students');
            const campAge = await $('#camp-age');
            const campAdults = await $('#camp-adults');
            const orderButton = await $('.btn-primary');

            await expect(campDatePart).toBeDisplayed();
            await campDatePart.selectByVisibleText('Dopolední');
            await campStudents.setValue('5');
            await campAge.setValue('5 - 9');
            await campAdults.setValue('2');
            await orderButton.click();

            const toastSuccess = await $('.toast-success');
            const thankYouMessage = await $('*=Děkujeme za objednávku');

            await toastSuccess.waitForDisplayed();
            await expect(thankYouMessage).toBeDisplayed();

        });

        describe('Order cannot be sent if it is not filled in properly', async () => {

            it('should not sent order because neither field is filled')

            const idField = await $('#ico');
            const clientField = await $('#client');
            const addressField = await $('#address');
            const substituteField = await $('#substitute');
            const contactNameField = await $('#contact_name');
            const phoneNumberField = await $('#contact_tel');
            const emailField = await $('#contact_mail');
            const startDate = await $('#start_date_1');
            const endDate = await $('#end_date_1');
            const toastMessage = await $('.toast-message');

            const cityCampButton = await $('=Příměstský tábor');
            const cityCampTab = await $('#orderCreateTabs');

            const campDatePart = await $('#camp-date_part');
            const campStudents = await $('#camp-students');
            const campAge = await $('#camp-age');
            const campAdults = await $('#camp-adults');
            const orderButton = await $('.btn-primary');

        });
    })
});

*/