// class LoginPage {

//     constructor() {
//         this.url = '/prihlaseni';
//     }

//     // add page object functions here

// }

// export default new LoginPage();

import AppPage from './app.page.js';

class LoginPage extends AppPage {

    constructor() {
        super();
        this.url = '/prihlaseni';
    }

    get emailField() { return $('#email'); }
    get passwordField() { return $('#password'); }
    get loginButton() { return $('.btn-primary'); }
    get fieldError() { return $('.invalid-feedback'); }

    async open() {
        await browser.reloadSession();
        await browser.url(this.url);
    }

    async login(username, password) {
        await this.emailField.setValue(username);
        await this.passwordField.setValue(password);
        await this.loginButton.click();
    }

    async getFieldError() {
        return await this.fieldError.getText();
    }

}

// NEW INSTANCE !!!
export default new LoginPage();

// class Course {

//     constructor(name, teacher, students) {
//         this._name = name;
//         this._teacher = teacher;
//         this._students = students;
//     }

//     getName() {
//         return this._name;
//     }

//     get teacher() {
//         return this._teacher;
//     }

//     get students() {
//         return this._students;
//     }

//     set teacher(teacher) {
//         this._teacher = teacher
//     }

//     addStudent(student) {
//         this._students.push(student);
//     }

//     greetStudents(greeting) {
//         for (const student of this._students) {
//             console.log(`${greeting} ${student}`);
//         }
//     }

// }

// const testAutomation = new Course('Automatizace', 'Monika', ['Jana', 'Petra', 'Katka']);
// const javaScript = new Course('JavaScript', 'Pepik', ['Jana', 'Petra', 'Katka']);

// console.log(testAutomation);
// console.log(javaScript);


// const testAutomation = {
//     organizer: 'Czechitas',
//     name: 'Automatizace: WDIO',
//     teacher: 'Monika',
//     students: [
//         {
//             name: 'Jana'
//         },
//         {
//             name: 'Petra'
//         },
//         {
//             name: 'Katka'
//         }
//     ],
//     time: {
//         startDate: '2023-09-09',
//         endDate: '2023-12-24'
//     },
//     greetAllStudents: function(greeting) {
//         for (const student of this.students) {
//             console.log(`${greeting} ${student.name}`)
//         };
//     }
// };

// const javaScript = {
//     organizer: 'Czechitas',
//     name: 'JavaScript',
//     teacher: 'Tonda',
//     students: [
//         {
//             name: 'Jana'
//         },
//         {
//             name: 'Petra'
//         },
//         {
//             name: 'Katka'
//         }
//     ],
//     time: {
//         startDate: '2023-09-09',
//         endDate: '2023-12-24'
//     },
//     greetAllStudents: function(greeting) {
//         for (const student of this.students) {
//             console.log(`${greeting} ${student.name}`)
//         };
//     }
// };

// console.log(javaScript);