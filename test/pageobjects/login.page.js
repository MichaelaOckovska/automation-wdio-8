class LoginPage {

    constructor() {
        this.url = '/prihlaseni';
    }

    // add page object functions here

}

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