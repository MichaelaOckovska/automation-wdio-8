// Všeobecná application page (stránka aplikácie), bežne sa vytvára ako predok

class AppPage {

    constructor(url) {
        this._url = url;
    }

    get navbarRight() { return $('.navbar-right'); }
    get userNameDropdown() { return this.navbarRight.$('[data-toggle="dropdown"]'); }
    get logoutLink() { return $('#logout-link'); }
    
    async open() {
        await browser.open(this._url);
    }

    async getCurrentUser() {
        return await this.userNameDropdown.getText();
    }


}

// NOT A NEW INSTANCE!!! Tú si vytvorím až z potomka
export default AppPage;