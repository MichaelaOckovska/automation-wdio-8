const students = []     // Iba na vysvetlenie príkazu "this", bez neho by bralo toto pole, pretože je vyššie

const course = {
    organizer: 'Czechitas',
    name: 'Automatizace v testování: Webdriver.io',
    teacher: 'Monika',
    students: [
        'Adéla', 'Jana', 'Míša', 'Terka', 'Petr',
    ],
    time: {
        startDate: '2023-04-10',
        endDate: '2023-12-20'
    },
    greetAllStudents: function (greeting) {
        this.students.forEach(student => {      // Príkaz "this" mi určuje presne s ktorým poľom "students" chcem pracovať
            console.log(`${greeting} ${student}`)
        });
        
        // for (const student of this.students) {       // Druhý spôsob iterácie, je kompatibilný len s novšími verziami JS
        //     console.log(`${greeting} ${student}`);
        // };
    },
    greetTeacher: function (greeting) {
        console.log(`${greeting} ${this.teacher}`);
    }
}

console.log(course);
console.log(course.name);
course.greetTeacher('Nazdar');
course.greetAllStudents('Nazdar');

console.log(course.students.length);     // Môžem s tými dátami rôzne pracovať
console.log(course.time);