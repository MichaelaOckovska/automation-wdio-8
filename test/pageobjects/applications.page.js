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

// // import AppPage from './app.page.js';

// // class ApplicationsPage extends AppPage {



// //     async getTableRows() {
// //         await this.waitForTableToLoad();
// //         return this.rows.map(async row => {
// //             const cols = await row.$$('td');
// //             return {
// //                 name: await cols[0].getText(),
// //                 date: await cols[1].getText(),
// //                 paymentType: await cols[2].getText(),
// //                 toPay: await cols[3].getText()
// //             };
// //         });
// //     }
// // }



// import AppPage from './app.page.js';

// class ApplicationsPage extends AppPage {

//     get applicationsLink() { return $('=Přihlášky'); }
//     get searchField() { return $('input[type="search"]'); }
//     get loading() { return $('#DataTables_Table_0_processing'); }
//     get table() { return $('.dataTable'); }
//     get rows() { return this.table.$('tbody').$$('tr'); }

//     async goToApplications() {
//         await this.applicationsLink.click();
//     }

//     async waitForTableToLoad() {
//         await browser.pause(1000);
//         await this.loading.waitForDisplayed({ reverse: true});
//     }

//     async searchInTable(searchText) {
//         await this.searchField.setValue(searchText);
//     }

//     async getTableRows() {
//         await this.waitForTableToLoad();
//         // return this.rows.map(async row => {
//         //     return new TableRow(row);
//         // });

//         return this.rows.map(async row => {
//             return new TableRow(row);
//          });
         
//     }
// }

// class TableRow {

//     constructor(rowElement) {
//         this.rowElement = rowElement;
//     }

//     async getValues() {
//         const cols = await this.rowElement.$$('td');
//         return {
//             name: await cols[0].getText(),
//             date: await cols[1].getText(),
//             paymentType: await cols[2].getText(),
//             toPay: await cols[3].getText()
//         }

//         // Zo záznamu!
//     }

//     async getInfo() {
//         await this.rowElement.$('[data-can="view"]').click();
//         return new ApplicationInfoPage();
//     }

// }

// class ApplicationInfoPage {

//     get table() { return $('.table-twocols') }

//     async getDetail() {
//         return Promise.all(await (this.table.$$('tr')).map(async row => {
//             return Promise.all(await (row.$$('td')).map(async col => {
//                 return await col.getText();
//             }));
//         }));
//     }
// }

// // NEW INSTANCE !!!
// export default new ApplicationsPage();