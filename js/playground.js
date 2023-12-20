// Pustím to príkazom node ./js/playground.js

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

