// Všeobecná application page (stránka aplikácie), bežne sa vytvára ako predok

class AppPage {

    constructor(url) {
        this._url = url;
    }

    get navbarRight() { return $('.navbar-right'); }
    get currentUser() { return this.navbarRight.$('.dropdown-toggle'); }
    get logoutButton() { return $('#logout-link'); }
    get toastMessage() { return $('.toast-message'); }      // Dá sa predpokladať, že toast bude bežný pre celú aplikáciu
    get invalidFeedback() { return $('.invalid-feedback'); }
    get header() { return $('h1'); }

    async open() {
        await browser.open(this._url);
    }

}

// NOT A NEW INSTANCE!!! Tú si vytvorím až z potomka
export default AppPage;