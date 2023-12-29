class ApplicationsPage {

    constructor() {
        this.url = '/admin/prihlasky';
    }

    get applicationsButton() { return $('=Přihlášky'); }
    get table() { return $('.dataTable'); }
    get tableRows() { return this.table.$('tbody').$$('tr'); }
    get searchField() { return $('input[type=search]'); }

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
        return await this.tableRows;
    }
    
    async setSearchInTable(searchText) {
        this.searchField.setValue(searchText);
    }

}

export default new ApplicationsPage();