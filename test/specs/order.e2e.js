/*

Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové Objednávky pro MŠ/ZŠ
Po kliknutí na Pro učitele > Objednávka pro MŠ/ZŠ se otevře formulář, kde může uživatel vyplnit detail objednávky
Po vyplnění IČO do formuláře objednávky se automaticky načte jméno odběratele a adresa odběratele z ARESu
Uživatel může odeslat vyplněnou objednávku na příměstský tábor
Objednávku nelze odeslat pokud není řádně vyplněna


*/

xdescribe("Objednávka pre MŠ/ZŠ", async() => {

    it("Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové Objednávky pro MŠ/ZŠ", async() => {

        await browser.reloadSession();
        await browser.url('/');

        const forTeachersLink = await $("*=Pro učitelé");
        const orderLink = await $("*=Objednávka pro MŠ/ZŠ");

        await expect(forTeachersLink).toBeDisplayed();
        await forTeachersLink.click();

        await expect(orderLink).toBeDisplayed();
        await orderLink.click();
    });
    
    it("Po kliknutí na Pro učitele > Objednávka pro MŠ/ZŠ se otevře formulář, kde může uživatel vyplnit detail objednávky", async() => {

        await browser.reloadSession();
        await browser.url('/');

        const forTeachersLink = await $("*=Pro učitelé");
        const orderLink = await $("*=Objednávka pro MŠ/ZŠ");

        await expect(forTeachersLink).toBeDisplayed();
        await forTeachersLink.click();

        await expect(orderLink).toBeDisplayed();
        await orderLink.click();

        const header = await $('h1');
        await expect(header).toHaveText('Přihlášení');
    
    });

    beforeEach(async() => {

        await browser.reloadSession();
        await browser.url('/objednavka/pridat');
    });



    it("Po vyplnění IČO do formuláře objednávky se automaticky načte jméno odběratele a adresa odběratele z ARESu", async() => {


    });

    it("Uživatel může odeslat vyplněnou objednávku na příměstský tábor", async() => {


    });

    it("Objednávku nelze odeslat pokud není řádně vyplněna", async() => {


    });

});