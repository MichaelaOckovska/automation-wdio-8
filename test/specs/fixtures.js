export const username = 'da-app.admin@czechitas.cz';
export const password = 'Czechitas123';
export const userFullName = 'Lišák Admin';
export const expectedApplicationsPageRows = 30;

export const uniqueUsername = 'stabilo' + Date.now() + '@czechitas.cz';
export const uniqueUsername2 = 'stabilo2' + Date.now() + '@czechitas.cz';
export const registrationName = 'Stabilo Boss';

export function getFieldValueById(id) {
    return browser.execute((id) => {
        return document.getElementById(id).value
    }, id);
}


