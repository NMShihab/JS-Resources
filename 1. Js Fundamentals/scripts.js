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

/* Coding Challenge #2
Use the BMI example from Challenge #1, and the code you already wrote, and
improve it.

Your tasks:
1. Print a nice output to the console, saying who has the higher BMI. The message
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!"

Hint: Use an if/else statement �
GOOD LUCK �  */

if (markHigherBMI) {
  console.log("Mark's BMI is higher than John's!");
  console.log(`Mark's BMI is (${markBMI}) is higher than John's (${johnBMI})!`);
} else {
  console.log("John's BMI is higher than Mark's!");
  console.log(`John's BMI is (${johnBMI}) is higher than Mark's (${markBMI})!`);
}

/* 
There are two gymnastics teams, Dolphins and Koalas. They compete against each
other 3 times. The winner with the highest average score wins a trophy!
Your tasks:
1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition,
and print it to the console. Don't forget that there can be a draw, so test for that
as well (draw means they have the same average score)
3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a
team only wins if it has a higher score than the other team, and the same time a
score of at least 100 points. Hint: Use a logical operator to test for minimum
score, as well as multiple else-if blocks �
4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when
both teams have the same score and both have a score greater or equal 100
points. Otherwise, no team wins the trophy
Test data:
§ Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
§ Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
§ Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
GOOD LUCK � */

/*
const avgDolphins = (96 + 108 + 89) / 3;
const avgKoalas = (88 + 91 + 110) / 3;
console.log(avgDolphins, avgKoalas);

if (avgDolphins > avgKoalas) {
  console.log("Dolphins Wins!");
} else if (avgDolphins === avgKoalas) {
  console.log("Draws!");
} else {
  console.log("Koalas Wins!");
}
*/
// Bonus 1

/*
const avgDolphins = (97 + 112 + 101) / 3;
const avgKoalas = (109 + 95 + 123) / 3;
console.log(avgDolphins, avgKoalas);

if (avgDolphins > avgKoalas && avgDolphins >= 100) {
  console.log("Dolphins Wins!");
} else if (avgKoalas > avgDolphins && avgKoalas >= 100) {
  console.log("Koalas Wins!");
} else {
  console.log("Draws!");
}
*/

// Bonus 2
const avgDolphins = (97 + 112 + 101) / 3;
const avgKoalas = (109 + 95 + 106) / 3;
console.log(avgDolphins, avgKoalas);

if (avgDolphins > avgKoalas && avgDolphins >= 100) {
  console.log("Dolphins Wins!");
} else if (avgKoalas > avgDolphins && avgKoalas >= 100) {
  console.log("Koalas Wins!");
} else if (
  avgDolphins === avgKoalas &&
  avgDolphins >= 100 &&
  avgKoalas >= 100
) {
  console.log("Draws!");
} else {
  console.log("No winner!");
}

/* Coding Challenge #4

Steven wants to build a very simple tip calculator for whenever he goes eating in a
restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and
300. If the value is different, the tip is 20%.

Your tasks:
1. Calculate the tip, depending on the bill value. Create a variable called 'tip' for
this. It's not allowed to use an if/else statement � (If it's easier for you, you can
start with an if/else statement, and then try to convert it to a ternary
operator!)
2. Print a string to the console containing the bill value, the tip, and the final value
(bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value
316.25”

Test data:
§ Data 1: Test for bill values 275, 40 and 430

Hints:
§ To calculate 20% of a value, simply multiply it by 20/100 = 0.2
§ Value X is between 50 and 300, if it's >= 50 && <= 300 �
GOOD LUCK � */

const bill = 430;

const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`
);
