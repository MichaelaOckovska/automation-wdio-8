/**
 * Lesson 2: async / await
 */

// Vysvetlenie funkcií

function greetAndAsk(name, role) {
    console.log('Hello ' + role + ' ' + name + '! How are you?');
    return new Date();
}

const value = greetAndAsk('Michaela', 'student');
console.log(value);


/**
/ * Lesson 2: Selectors
*/

describe('Czechitas Login Page', async () => {

    it('should find selectors for login page', async () => {

        await browser.reloadSession();

        await browser.url('/prihlaseni');

        // 1. Podľa tagu

        const formTag = await $('form');
        console.log(await formTag.getHTML());

        const inputTag = await $('input');
        console.log(await inputTag.getHTML());

        const buttonTag = await $('button');
        console.log(await buttonTag.getHTML());

        // 2. Podľa ID

        const emailField = await $('#email');
        console.log(await emailField.getHTML());

        const passwordField = await $('#password');
        console.log(await passwordField.getHTML());

        // 3. Podľa triedy

        const loginButton = await $('.btn-primary');
        //     console.log(loginButton);   // vypíše sa celý element
        console.log(await loginButton.getHTML());
        console.log(await loginButton.getText());

        // 4. Podľa atribútu

        const emailFieldAttribute = await $('[name="email"]');
        console.log(await emailFieldAttribute.getHTML());

        const passwordFieldAttribute = await $('[type="password"]');
        console.log(await passwordFieldAttribute.getHTML());

        // Čiastočné vyhľadávanie

        const obsahujePassword = await $('[type*="ass"]');
        console.log(await obsahujePassword.getHTML());

        const konciPassword = await $('[type$="word"]');
        console.log(await obsahujePassword.getHTML());

        const zacinaPassword = await $('[type^="pass"]');
        console.log(await obsahujePassword.getHTML());

        // 5. Kombinované selektory

        const kombinovanyTagID = await $('input#email');
        console.log(await kombinovanyTagID.getHTML());

        const kombinovanyTagAttribute = await $('input[type="password"]');
        console.log(await kombinovanyTagAttribute.getHTML());

        const kombinovanyTagClass = await $('button.btn-primary');
        console.log(await kombinovanyTagClass.getHTML());
        console.log(await kombinovanyTagClass.getText());

        // 6. Reťazenie selektorov

        const chainSelectors = await $('div > form > div input[type$="word"]');
        console.log(await chainSelectors.getHTML());

        // Riešenie od lektorky - reťazenie elementov je užitočné pri navigácii po stránke

        const selectorChain = $('div').$('form').$('input[type$="word"]');
        console.log(await selectorChain.getHTML());

        // 7. WDIO selektory podľa textu

        const textSelectors = await $('=Zapomněli jste své heslo?');
        console.log(await textSelectors.getHTML());


        await browser.pause(5000);
    });
});
