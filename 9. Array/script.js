"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayTransactions = function (transaction) {
  containerMovements.innerHTML = "";
  transaction.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">
            ${i + 1} deposit
        </div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${Math.abs(mov)} €</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayTransactions(account1.movements);

// Create username
const ctrateUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner //create new value username of account object
      .toLowerCase() // convert owner name into lower case
      .split(" ") // split owner name according to space and make  array
      .map((str) => str[0]) // return every first leter of array
      .join(""); // join all return letter together
  });
};

ctrateUsername(accounts);

// Calculate total balance
const claculateBalance = function (movement) {
  const totalBalance = movement.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = totalBalance + "€";
  console.log(totalBalance);
};

// Calculation Statistis

const calculationStatistic = function (acc) {
  const income = acc.movements
    .filter((map) => map > 0) // return all deposite value
    .reduce((acc, map) => acc + map, 0); // sum all deposite
  labelSumIn.textContent = `${income}€`;

  const out = movements
    .filter((map) => map < 0) // return all withdraw value
    .reduce((acc, map) => acc + Math.abs(map), 0); // Sum all withdraw
  labelSumOut.textContent = `${out}€`;

  const interest = movements
    .filter((mov) => mov > 0) // return deposite values
    .map((deposite) => (deposite * acc.interestRate) / 100) // calculate interest of every values
    .filter((int) => int > 1) // return only the interest value > 1
    .reduce((acc, int) => acc + int, 0); // Sum all the values
  labelSumInterest.textContent = `${interest}€`;
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  const currentAcount = accounts.find(
    (acc) =>
      acc.username === inputLoginUsername.value &&
      acc.pin === Number(inputLoginPin.value)
  );
  // if user and password is not right
  if (!currentAcount) {
    labelWelcome.textContent = `Wrong user name or password`;
  }
  // Clear input fields
  inputLoginUsername.value = inputLoginPin.value = "";

  //remove cursor from input field
  inputLoginUsername.blur();
  inputLoginPin.blur();

  // Welcome message
  labelWelcome.textContent = `Welcome ${currentAcount.owner}!`;

  // To show body
  containerApp.style.opacity = 100;
  // display all transaction
  displayTransactions(currentAcount.movements);
  // Display Balance
  claculateBalance(currentAcount.movements);
  // Display account statistics
  calculationStatistic(currentAcount);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
// Slice
let arr = ["a", "b", "g", "t", "l"];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(0, -2));
console.log(arr.slice());
console.log([...arr]);

//Splice
console.log(arr.splice(2));
console.log(arr);

// Reverse
arr = ["a", "b", "g", "t", "l"];
console.log(arr.reverse());

// Concat
const arr2 = ["q", "k", "l"];
const arr3 = arr.concat(arr2);
console.log(arr3);
console.log([...arr, ...arr2]);

//Join
console.log(arr3.join(", "));

//Loop over Array

for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposite ${movement}`);
  } else {
    console.log(`You withdraw ${Math.abs(movement)}`);
  }
}

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movements ${i} You deposite ${movement}`);
  } else {
    console.log(`Movements ${i} You withdraw ${Math.abs(movement)}`);
  }
}

//  for each loop

console.log("------------------");
console.log("-----For Each-----");

movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposite ${movement}`);
  } else {
    console.log(`You withdraw ${Math.abs(movement)}`);
  }
});

movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`Movements ${i} You deposite ${movement}`);
  } else {
    console.log(`Movements ${i} You withdraw ${Math.abs(movement)}`);
  }
});

// forEach for map
console.log("--------forEach Map------------");
currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

// forEach for set
console.log("--------forEach set------------");
const uniqueCurrencies = new Set([
  "USD",
  "EUR",
  "GBP",
  "TK",
  "INR",
  "USD",
  "EUR",
]);
uniqueCurrencies.forEach(function (values, _, set) {
  console.log(`${values}`);
});
*/

/*
Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
�
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far �
GOOD LUCK �
*/

/*
console.log("-------------Challange 1--------------");
const checkDogs = function (dogsJulia, dogsKate) {
  const copiedJulia = [...dogsJulia];
  const copiedKate = [...dogsKate];

  // const actualDogJulia = copiedJulia.slice(1, 4);
  copiedJulia.splice(0, 1);
  copiedJulia.splice(-2);
  const dogdata = copiedJulia.concat(copiedKate);

  dogdata.forEach(function (age, i) {
    age >= 3
      ? console.log(`Dog number ${i + 1} is an adult and ${age} years old.`)
      : console.log(`Dog number ${i + 1} is still a puppy`);
  });

  console.log(copiedJulia);
};

const dogsJuliaData1 = [3, 5, 2, 12, 7];
const dogsKateData1 = [4, 1, 15, 8, 3];
const dogsJuliaData2 = [9, 16, 6, 8, 3];
const dogsKateData2 = [10, 5, 6, 1, 4];

console.log("-------Test Data 1-----------");
checkDogs(dogsJuliaData1, dogsKateData1);
console.log("-------Test Data 2-----------");
checkDogs(dogsJuliaData2, dogsKateData2);

*/

// Map method
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToTaka = 101.6; 
*/
/*
const movementsTaka = movements.map(function (mov) {
  return mov * euroToTaka;
}); */

// arrow function
/*
const movementsTaka = movements.map((mov) => mov * euroToTaka);
console.log(movements);
console.log(movementsTaka);

const transactionDescription = movementsTaka.map(
  (mov, i) =>
    `Movements ${i + 1} You ${mov > 0 ? `deposite` : `withdraw`} ${Math.abs(
      mov
    )}`
);
console.log(transactionDescription); 
*/

/*
// Filter method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposite = movements.filter((mov) => mov > 0);
const withdraw = movements.filter((mov) => mov < 0);
console.log(deposite, withdraw);

// Reduce method

const balance = movements.reduce(function (acc, cur, i, arr) {
  return acc + cur;
}, 0);
console.log(balance);

const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

console.log(max);

const min = movements.reduce((acc, mov) => {
  if (acc < mov) return acc;
  else return mov;
}, movements[0]);
console.log(min);
*/

/*
Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages �)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK � 
*/
/*
console.log("-------------Challange 2--------------");
const calcAverageHumanAge = function (ages) {
  const avgAge = ages.map((age) => {
    if (age <= 2) return 2 * age;
    else return 16 + age * 4;
  });
  const adultDogs = avgAge.filter((age) => age >= 18);
  const sumAdultDogs = adultDogs.reduce((acc, age) => acc + age, 0);
  const avgAdultDogsAge = sumAdultDogs / adultDogs.length;
  return avgAdultDogsAge;
};
const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];
const avg1 = calcAverageHumanAge(data1);
const avg2 = calcAverageHumanAge(data2);
console.log(avg1);
console.log(avg2);
*/

// Chaining Method
/*
const euroToTaka = 101.6;
const depositeTaka = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * euroToTaka)
  .reduce((acc, mov) => acc + mov, 0);
console.log(depositeTaka);
*/

/*
Coding Challenge #3
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining!
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK �
*/

/*
console.log("-------------Challange 3--------------");
const calcAverageHumanAge = function (ages) {
  const avgAdultDogsAge = ages
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((age) => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  return avgAdultDogsAge;
};
const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];
const avg1 = calcAverageHumanAge(data1);
const avg2 = calcAverageHumanAge(data2);
console.log(avg1);
console.log(avg2);
*/
