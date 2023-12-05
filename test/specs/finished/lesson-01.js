/**
 * Lesson 1: First running code
 */


describe("Chechitas Login Page", async () => {
    
    it("Should open login page", async () => {
        
        await browser.reloadSession();
        
        await browser.url("/prihlaseni");
        
        await browser.pause(5000);    
    });
});


describe("My first try with JS", async () =>{

    it("Working out the task", async () => {
        
        await browser.url("/prihlaseni");

        const windowSize = await browser.getWindowSize ();
            console.log(windowSize);

        await browser.saveScreenshot('login_page.png');

        await browser.pause(5000);
         
    })
})
