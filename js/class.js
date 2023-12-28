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


class AutomationCourse extends Course {

    constructor(start, end) {
        super('Automatizece WDIO', 'Monika');
        this.start = start
        this.end = end
    }

    get runDays() {
        const diff = Math.abs(Date.now() - startDate)
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    get remainingDays() {
        const diff = Math.abs(endDate - Date.now())
        return Math.ceil( diff/ (1000 * 60 * 60 * 24));
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
 

const automationCourse = new AutomationCourse('2023-06-07', '2023-06-07');
console.log(automationCourse);
