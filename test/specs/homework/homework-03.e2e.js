/**
 * Lesson 3: Selectors and element interactions
 */

describe('Czechitas Registration Page', async () => {

        it('should register new user', async () => {

                await browser.reloadSession();
                await browser.url('/registrace');

                // Vyplní jméno a příjmení

                const nameField = await $('#name');
                await nameField.setValue('Stabilo Boss');

                // Vyplní email

                const emailField = await $('#email');
                await emailField.setValue('stabilo.boss@czechitas.cz');

                // Vyplní a potvrdí heslo

                const passwordField = await $('#password');
                await passwordField.setValue('Stabilo.Boss123');

                const passwordConfirmField = await $('#password-confirm');
                await passwordConfirmField.setValue('Stabilo.Boss123');

                // Tlačítko na registraci

                const registrationButton = await $('.btn-primary');
                await registrationButton.click();

                console.log('V ďalšom kroku vyskúšame, či registrácia prebehla úspešne.')

        });
});