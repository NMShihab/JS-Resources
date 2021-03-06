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

const displayTransactions = function (transaction, sort = false) {
  containerMovements.innerHTML = "";
  const trans = sort ? transaction.slice().sort((a, b) => a - b) : transaction;
  trans.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">
            ${i + 1} deposit
        </div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${Math.abs(mov)} ???</div>
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
const claculateBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance}???`;
};

// Calculation Statistis

const calculationStatistic = function (acc) {
  const income = acc.movements
    .filter((map) => map > 0) // return all deposite value
    .reduce((acc, map) => acc + map, 0); // sum all deposite
  labelSumIn.textContent = `${income}???`;

  const out = acc.movements
    .filter((map) => map < 0) // return all withdraw value
    .reduce((acc, map) => acc + Math.abs(map), 0); // Sum all withdraw
  labelSumOut.textContent = `${out}???`;

  const interest = acc.movements
    .filter((mov) => mov > 0) // return deposite values
    .map((deposite) => (deposite * acc.interestRate) / 100) // calculate interest of every values
    .filter((int) => int > 1) // return only the interest value > 1
    .reduce((acc, int) => acc + int, 0); // Sum all the values
  labelSumInterest.textContent = `${interest}???`;
};

const updateUI = function (currAcc) {
  // display all transaction
  displayTransactions(currAcc.movements);
  // Display Balance
  claculateBalance(currAcc);
  // Display account statistics
  calculationStatistic(currAcc);
};

let currentAcount;

// Login functionality
btnLogin.addEventListener("click", function (e) {
  // Prevent to refresh the page
  e.preventDefault();

  currentAcount = accounts.find(
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

  // Update UI
  updateUI(currentAcount);
});

// Money Transfer functionality
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const transferAmount = Number(inputTransferAmount.value);

  // Find the transfer account
  const transferAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  if (
    transferAmount > 0 &&
    transferAccount &&
    currentAcount.balance >= transferAmount &&
    transferAccount?.username !== currentAcount.username
  ) {
    currentAcount.movements.push(-transferAmount); // update current account movements
    transferAccount.movements.push(transferAmount); // update transfared account movements
  }
  inputTransferTo.value = inputTransferAmount.value = "";
  //update ui
  updateUI(currentAcount);
});

// Delete account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAcount.username &&
    Number(inputClosePin.value) === currentAcount.pin
  ) {
    const curIndex = accounts.findIndex(
      (acc) => acc.username === currentAcount.username
    );
    accounts.splice(curIndex, 1);
    // Welcome message
    labelWelcome.textContent = `Log in to get started`;

    // To show body
    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputClosePin.value = "";
  }
});

// Request Loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAcount.movements.some((mov) => mov >= loanAmount * 0.1)
  ) {
    // Update movements
    currentAcount.movements.push(loanAmount);
    // Update UI
    updateUI(currentAcount);

    console.log("Loan Accepted");
  } else {
    console.log("Loan decline");
  }
  inputLoanAmount.value = "";
});

let isSorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayTransactions(currentAcount.movements, !isSorted);
  isSorted = !isSorted;
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
???
")
4. Run the function for both test datasets
Test data:
?? Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
?? Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far ???
GOOD LUCK ???
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
from other challenges how we calculate averages ???)
4. Run the function for both test datasets
Test data:
?? Data 1: [5, 2, 4, 1, 15, 8, 3]
?? Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK ??? 
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
?? Data 1: [5, 2, 4, 1, 15, 8, 3]
?? Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK ???
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

/*
// Some Methods
console.log(movements);
// Its return boolean value for exact input
console.log(movements.includes(-40));
// Its return boolean value for exact input also conditional input
const anyDeposite = movements.some((mov) => mov > 0);
console.log(anyDeposite);

// Every
console.log(movements.every((mov) => mov > 0));

// Flat method
const arr = [[1, 2, 3], 4, 5, [6, 7]];
console.log(arr.flat());

const overAll = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overAll);
*/

/*
// Sorting

// Strings
const owners = ["Zaheer", "Babu", "Asif", "Naim"];
console.log(owners.sort());

//Numbers

console.log(movements);

// if returns < 0 then A,B
// If returns > 0 then B,A

// Accending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

//Decending order
movements.sort((a, b) => b - a);
console.log(movements);
 */

/*
// Array From

const a = Array.from({ length: 9 }, () => 1);
// console.log(a);

const b = Array.from({ length: 9 }, (cur, i) => i ** 2);
// console.log(b);

// 100 random dice roll
const diceRandom = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 6) + 1
);
// console.log(diceRandom);

// Get data from UI
labelBalance.addEventListener("click", function (e) {
  e.preventDefault();
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("???", ""))
  );
  // console.log(movementsUI);
});

// Array Extercise
console.log("-------Exercise---------");

// 1. Sum of bank deposit

const bankDepositeSum = accounts
  .map((acc) => acc.movements) // take all movements
  .flat() // make them one array
  .filter((mov) => mov > 0) // filter only deposite
  .reduce((curr, mov) => curr + mov, 0); // sum up all deposite

const bankDepositeSum2 = accounts
  .flatMap((acc) => acc.movements) // take all movements and make them one array
  .filter((mov) => mov > 0) // filter only deposite
  .reduce((curr, mov) => curr + mov, 0); // sum up all deposite

console.log(bankDepositeSum);
console.log(bankDepositeSum2);

// 2. Count all deposite atleast 1000 dollar

const countDeposite = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov >= 1000).length;

const countDeposite2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, curr) => (curr >= 1000 ? count + 1 : count), 0);
console.log(countDeposite);
console.log(countDeposite2);

// 3. Sum of all withdraw and deposite
const sums = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sum, curr) => {
      // curr > 0 ? (sum.deposite += curr) : (sum.withdraw += Math.abs(curr));
      sum[curr > 0 ? "deposite" : "withdraw"] += curr;
      return sum;
    },
    { deposite: 0, withdraw: 0 }
  );
console.log(sums);

// Convert text

const convertTitleCase = function (title) {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");

  return capitalize(titleCase);
};

console.log(convertTitleCase("This is a nice title"));
console.log(convertTitleCase("a nice title"));
console.log(convertTitleCase("Hello what is a nice title"));
console.log(convertTitleCase("This is a nice title"));
 */

/*  
Coding Challenge #4
Julia and Kate are still studying dogs, and this time they are studying if dogs are
eating too much or too little.
Eating too much means the dog's current food portion is larger than the
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10%
above and 10% below the recommended portion (see hint).
Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) ???
3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!"
5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)
6. Log to the console whether there is any dog eating an okay amount of food
(just true or false)
7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.)
8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects ???)

Hints:
?? Use many different tools to solve these challenges, you can use the summary
lecture to choose between them ???
?? Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion.
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

/* 
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg) */
const recommended_f = function (dogs) {
  dogs.forEach(function (dog) {
    dog.recommended_food = Math.trunc(dog.weight ** 0.75 * 28);
  });
};
recommended_f(dogs);
console.log(dogs);

/* 
2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) ??? */

/*
dogs.map((dog) => {
  if (dog.owners.includes("Sarah")) {
    // dog.curFood > dog.recommended_food
    //   ? console.log("Eating Too much")
    //   : console.log("Eating Too little");
    console.log(
      `Eating too ${dog.curFood > dog.recommended_food ? `much` : `little`}`
    );
  }
}); */

const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));
console.log(
  `Eating too ${
    dogSarah.curFood > dogSarah.recommended_food ? `much` : `little`
  }`
);

/*
3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').
*/
const ownersEatTooMuch = dogs.filter(
  (dog) => dog.curFood > dog.recommended_food
);

const ownersEatTooLittle = dogs.filter(
  (dog) => dog.curFood < dog.recommended_food
);

/*
4. Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!"
*/

const ownersEatTooMuchArr = ownersEatTooMuch.map((dog) => dog.owners).flat();
const ownersEatTooLittleArr = ownersEatTooLittle
  .map((dog) => dog.owners)
  .flat();

console.log(`${ownersEatTooMuchArr.join(" and ")}'s dog eat too much`);
console.log(`${ownersEatTooLittleArr.join(" and ")}'s dog eat too little`);

/*
5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)
*/

const IsEatingExact = dogs.some((dog) => dog.curFood === dog.recommended_food);
console.log(`is any dog eating exactly the amount of food
that is recommended? : ${IsEatingExact}`);

/*6. Log to the console whether there is any dog eating an okay amount of food
 (just true or false) */
const IsEatingOkey = dogs.some(
  (dog) =>
    dog.curFood > dog.recommended_food * 0.9 &&
    dog.curFood < dog.recommended_food * 1.1
);
console.log(`is any dog eating an okay amount of food? : ${IsEatingOkey}`);

/* 
7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.)
*/
const IsEatingOkeyArr = dogs.filter(
  (dog) =>
    dog.curFood > dog.recommended_food * 0.9 &&
    dog.curFood < dog.recommended_food * 1.1
);
console.log(IsEatingOkeyArr);

/*
8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects 
*/

const sortedDog = dogs
  .slice()
  .sort((a, b) => a.recommended_food - b.recommended_food);
console.log(sortedDog);
