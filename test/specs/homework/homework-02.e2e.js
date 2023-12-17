/**
/ * Lesson 2: Selectors
*/

describe("Chechitas Registration Page", async () => {
    
    it("Should find selectors for registration page", async () => {
        
        await browser.reloadSession();
        
        await browser.url("/registrace");

// Políčko pro jméno a příjmení

        const nameField = await $("#name");
            console.log(await nameField.getHTML());

// Políčko pro email

        const emailField = await $("#email");
            console.log(await emailField.getHTML());

// Políčko pro zadání hesla

        const passwordField = await $("#password");
            console.log(await passwordField.getHTML());

// Políčko pro kontrolu zadaného hesla

        const passwordConfirmField = await $("#password-confirm");
            console.log(await passwordConfirmField.getHTML());

// Tlačítko na registraci

        const registrationButton = await $(".btn-primary");
            console.log(await registrationButton.getHTML());

        await browser.pause(5000);    
    });
});