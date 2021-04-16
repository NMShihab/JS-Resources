"use strict";

/*
//function return function
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetingHello = greet("Hello");
greetingHello("N. M.");

greet("Hello")("N. M.");

// Rewrite greet to arrow function
const greetArrow = (greeting) => (nameG) => console.log(`${greeting} ${nameG}`);

greetArrow("Hello")("N.M."); */

const bimanBangladesh = {
  airline: "Biman Bangladesh",
  code: "BH",
  booking: [],
  book(flightNum, nameF) {
    console.log(
      `${nameF} booked a seat on ${this.airline} flight ${this.code}${flightNum}`
    );
    this.booking.push({ flight: `${this.code}${flightNum}`, nameF });
  },
};

bimanBangladesh.book(77, "N. M.");

const novoAir = {
  airline: "Novo Air",
  code: "AB",
  booking: [],
};

const book = bimanBangladesh.book;

// call function
book.call(novoAir, 23, "Abdullah");
book.call(bimanBangladesh, 23, "Abdullah");

const flightData = [27, "Khadiza"];
// Apply
book.call(bimanBangladesh, ...flightData);
console.log(bimanBangladesh);

// Bind Method
const bookNovo = book.bind(novoAir);
bookNovo(23, "ABCDE");
bookNovo(...flightData);

const bookNovo23 = book.bind(novoAir, 23);
bookNovo23("Aseem");
bookNovo23("Usthman");

console.log(novoAir);

// With event listener

novoAir.planes = 25;
novoAir.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector(".buy")
  .addEventListener("click", novoAir.buyPlane.bind(novoAir));

const addTaxRate = function (rate = 0.15) {
  return function (value) {
    return value + value * rate;
  };
};

const addVat = addTaxRate(0.25);
console.log(addVat(200));

/*  
Coding Challenge #1
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an
array with the number of replies for each option. This data is stored in the starter
'poll' object below.
Your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The
method does 2 things:
1.1. Display a prompt window for the user to input the number of the
selected option. The prompt should look like this:
What is your favourite programming language?
0: JavaScript
1: Python
2: Rust
3: C++
(Write option number)
1.2. Based on the input number, update the 'answers' array property. For
example, if the option is 3, increase the value at position 3 of the array by
1. Make sure to check if the input is a number and if the number makes
sense (e.g. answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. If type is 'array', simply display the results array as it is, using
console.log(). This should be the default option. If type is 'string', display a
string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each
'registerNewAnswer' method call.
5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
object! So what should the this keyword look like in this situation?
Test data for bonus:
§ Data 1: [5, 2, 3]
§ Data 2: [1, 5, 3, 9, 6, 1]
Hints: Use many of the tools you learned about in this and the last section �
GOOD LUCK �
*/
console.log("---------------------------------------------");
console.log("-----------------chalange 1------------------");
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  // display result
  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },

  // Register new result
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question} \n${this.options.join("\n")}\n(Write option number)`
      )
    );

    if (answer < this.answers.length) {
      for (let i = 0; i < this.answers.length; i++) {
        if (i === answer) {
          this.answers[i]++;

          // console.log(typeof this.answers);
        }
      }
    } else {
      alert(" Invalid input.. Check question clearly");
    }
    this.displayResults();
    this.displayResults("string");
  },
};

// document.querySelector(".poll").addEventListener("click", function () {
//   poll.registerNewAnswer();
//   console.log(poll.answers);
// });

// Answer poll button
document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

// Bonus part
const data1 = [5, 2, 3];
const data2 = [1, 5, 3, 9, 6, 1];
poll.displayResults.call({ answers: data1 });
poll.displayResults.call({ answers: data1 }, "string");
poll.displayResults.call({ answers: data2 }, "string");
poll.displayResults.call({ answers: data1 }, "string");

// Immediately invoked function expressions (IIFE)

const runOnece = function () {
  console.log(" this will never run again");
};

runOnece();

// This function will call once (IIFE)

(function () {
  console.log("Call onece");
})();

(() => console.log("Call once again"))();

// Clouser

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`Passenger number : ${passengerCount}`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

// Example 1
let f;

const a = function () {
  const b = 3;
  f = function () {
    console.log(b * 2);
  };
};

const e = function () {
  const c = 5;

  f = function () {
    console.log(c * 2);
  };
};

a();
f();

// reasign f
e();
f();

console.dir(f);

// Example 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 gopus, each group has ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`We will start boarding in ${wait} seconds`);
};
boardPassengers(240, 5);

/* 
Coding Challenge #2
This is more of a thinking challenge than a coding challenge �
Your tasks:
1. Take the IIFE below and at the end of the function, attach an event listener that
changes the color of the selected h1 element ('header') to blue, each time
the body element is clicked. Do not select the h1 element again!
2. And now explain to yourself (or someone around you) why this worked! Take all
the time you need. Think about when exactly the callback function is executed,
and what that means for the variables involved in this example.

*/
console.log("---------------------------------------------");
console.log("-----------------chalange 2------------------");

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();

/*
The callback here is already executed . So the variable "header" is already gone but  still enventlistener attached with that IIFE. So when the event is happned it used its variable . Becauce this events functions birth place is there. So its memorize that header variable though its already gone
*/
