/**
 * Lesson 1: First running code
 */

 xdescribe('Homework', async () => {

     it('Should open page and create screenshot', async () => {

         await browser.url("/registrace");

         await browser.saveScreenshot('login_page.png');
    
         await browser.pause(5000);

     });

 });


