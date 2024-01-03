import AppPage from './app.page.js';

class ApplicationsPage extends AppPage {

    constructor() {
        super('/');
    }

    get table() { return $('.dataTable'); }
    get tableRows() { return this.table.$('tbody').$$('tr'); }
    get searchField() { return $('input[type=search]'); }
    get applicationsButton() { return $('=Přihlášky'); }

    async goToApplications() {
        await this.applicationsButton.click();
    }

    async waitForTableToLoad() {
        // await $('#DataTables_Table_0_processing').waitForDisplayed();    // Toto je spráne riešienie, ale na tejto stránke väčšinou nefunguje, ani Monči
        await browser.pause(1000);
        await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true });
    }

    async getTableRows() {
        await this.waitForTableToLoad();

        // let rows = []
        // for await (const row of this.tableRows) {
        //     rows.push(new TableRow(row));
        // }
        // return rows;

        return this.tableRows.map(async row => {  // Toto je ekvivalent kódu vyššie, využíva funkciu map(), je bezpečnejší
            return new TableRow(row);
        });
    }

    async setSearchInTable(searchText) {
        this.searchField.setValue(searchText);
    }
}

// NEW INSTANCE !!!
export default new ApplicationsPage();

/*
Neporadila som si s tým, opísala som si kód od Moniky a vrátim sa k nemu neskôr, možno po JS kurze, aby som tomu lepšie rozumela
*/

class TableRow {    // V tejto triede sa pohybujem v kontexte iba jedného riadku!
    constructor(rowElement) {
        this._rowElement = rowElement;
    }

    get infoButton() { return $('[data-can="view"]'); }

    async getValues() {

        const cols = await this._rowElement.$$('td')

        return {
            name: await cols[0].getText(),
            date: await cols[1].getText(),
            paymentType: await cols[2].getText(),
            toPay: await cols[3].getText(),
        }
    }

    async getInfo() {
        await this.infoButton.click();
        return new ApplicationInfoPage();
    }
}

class ApplicationInfoPage {

    get applicationInfo() { return $('.table-twocols'); }

    async getDetail() {

        return Promise.all(await (this.applicationInfo.$$('tr')).map(async row => {     // Vráti obsah tabuľky v dvojdimenzionálnom poli
            return Promise.all(await (row.$$('td')).map(async col => {
                return await col.getText();
            }));
        }));
    }
}
