// Pustím to príkazom node ./js/function.js

function addNumber(a, b) {
    return a + b;
}

const result = addNumber;

console.log(result);


function sayHello(name) {
    console.log(`Hello ${name}`);   // Iný zápis stringu, lepšie sa formátuje, pozor na správne úvodzovky `` Alt + 96
}

const result2 = sayHello('Michaela');

console.log(result2);


// Príklad na scope premenných, konštánt a funkcií z lekci e
function myComplicatedFunction() {
    const myConst = 'Suma';
    let sum = 0;

    function myInnerFunction(number) {
        
        console.log('Inner call ' + number);  // Iba zavolá

        sum = sum + number;
        console.log('sum ' + sum);  // Pričíta hodnotu
        
    }

    myInnerFunction(2);
    myInnerFunction(3);
    myInnerFunction(5);

    return `${myConst} = ${sum}`    // Spočíta to
}

const result3 = myComplicatedFunction();
console.log(result3);

myComplicatedFunction();    // Volanie funguje aj takto, ale my si to ukladáme do const


// Príklad použitie anonymnej funkcie
function testIt(testName, testFunction) {
    
    console.log(`Test: ${testName}`);

    testFunction();

    console.log('Test is done, reporting');
}


testIt('My test', () => {
    console.log('... my test ...');
});