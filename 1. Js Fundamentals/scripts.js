let a = 5;
if (a === 5) alert("Welcome to Js fundamentals!");

// Show anything in console
console.log(20 + 88 - 50);

// Values and Variables
const country = "Bangladesh";
const continent = "Asia";
let population = 170.06;

// Show these variables in console
console.log(country);
console.log(continent);
console.log(population);

// Data Type
const isIsland = false;
let language;
console.log(isIsland, population, country, language);

// let, const, var
language = "Bangla";
console.log(isIsland, population, country, language, continent, population);

// Basic operation
/*If your country split in half, and each half would contain half the population,
then how many people would live in each half? */
const eachHalf = population / 2;
console.log(eachHalf);

/* Increase the population of your country by 1 and log the result to the console*/
population += 1;
console.log(population);

/* Finland has a population of 6 million. Does your country have more people than
Finland? */
let finPopulation = 6;
console.log(population > finPopulation);

/* The average population of a country is 33 million people. Does your country
have less people than the average country? */
let avgPopulation = 33;
console.log(population < avgPopulation);

/* Based on the variables you created, create a new variable 'description'
which contains a string with this format: 'Portugal is in Europe, and its 11 million
people speak portuguese' */

console.log(
  country +
    " is in " +
    continent +
    ", and its " +
    population +
    " million people speak " +
    language
);

/* Coding Challenge #1
Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).

Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.

Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall.
GOOD LUCK �  */

let massMark;
let heightMark;
let massJohn;
let heightJohn;

// Test 1
massMark = 78;
heightMark = 1.69;
massJohn = 92;
heightJohn = 1.95;

const markBmi = massMark / heightMark ** 2;
const johnBmi = massJohn / heightJohn ** 2;

let markHigherBMI = markBmi > johnBmi;

console.log(markBmi, johnBmi, markHigherBMI);

// Test 2
massMark = 95;
heightMark = 1.88;
massJohn = 85;
heightJohn = 1.76;

const markBMI = massMark / (heightMark * heightMark);
const johnBMI = massJohn / (heightJohn * heightJohn);
markHigherBMI = markBMI > johnBMI;

console.log(markBMI, johnBMI, markHigherBMI);
