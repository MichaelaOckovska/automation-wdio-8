class Course {

    constructor(name, teacher, students) {
        this._name = name;
        this._teacher = teacher;
        this._students = students;
    }

    get name() {    // Modernejší zápis getterov a setterov
        return this._name;
    }

    getTeacher() {     
        return this._teacher;
        
    }

    getStudents() {
        return this._students;
        
    }

    setTeacher(teacher) {
        this._teacher = teacher;
    }


    addStudent(student) {
        this._students.push(student);   // Ak chcem pridávať do poľa používam funkciu "push"
    }

    greetStudents(greeting) {
        for (const student of this._students) {
            console.log(`${greeting} ${student}`);
        }
    }
}

 // Toto sú instance triedy, ak má konstruktor parametr => musím mu dať hodnotu

 const testAutomation = new Course('Automatizácia', 'Monika', ['Jana', 'Petra', 'Katka']);
 const javaScript = new Course ('JavaScript', 'Honza', ['Jana', 'Petra', 'Katka']);
 
 console.log(testAutomation);
 console.log(javaScript);
 
 console.log(testAutomation.getTeacher());
 testAutomation.setTeacher('Lenka');
 console.log(testAutomation.getTeacher());
 
 console.log(testAutomation.getStudents());
 testAutomation.addStudent('Milada');
 console.log(testAutomation.getStudents());
 
 testAutomation.greetStudents('Hello');
 javaScript.greetStudents('Welcome');
 
 console.log(testAutomation.getTeacher());   // Volanie getterov a setterov, starší ako funkciu
 console.log(testAutomation.name);           // Novší ako atribút


class AutomationCourse extends Course {

    constructor(startDate, endDate) {
        super('Automatizece WDIO', 'Monika', ['Jana', 'Petra', 'Katka']);   // Volá konstruktor (parametre) triedy, z ktorej dedím. Dôležité ak máme nový konstruktor.
        this._start = startDate
        this._end = endDate
    }

    get runDays() {
        const diff = Math.abs(Date.now() - this.startDate);
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    get remainingDays() {
        const diff = Math.abs(this.endDate - Date.now());
        return Math.ceil( diff/ (1000 * 60 * 60 * 24));
    }
 }


const automationCourse = new AutomationCourse('2023-10-04', '2024-01-20');
console.log(automationCourse.runDays);
console.log(automationCourse.remainingDays);

