"use strict";

/*
const Person = function (fname, bithYear) {
  //   console.log(this);
  this.fname = fname;
  this.bithYear = bithYear;

  // create method
  //   this.calcAge = function () {
  //     console.log(2021 - Number(this.bithYear));
  //   };
};

const nm = new Person("N M", 1993);
// 1. Empty object is created
// 2. function is called , this = object
//3. Object linked to a prototype
//4. function autometically return Object

console.log(nm);
console.log(nm instanceof Person);

// Prototypes
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2021 - this.bithYear);
};
nm.calcAge();

*/
/*
Coding Challenge #1
Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10,
and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and
'brake' multiple times on each of them
Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h
GOOD LUCK �
*/

/*
console.log("-----------------Chalange 1-----------------");


const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`New Speed of ${this.make} is : ${this.speed} km/h`);
};


Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`New Speed of ${this.make} is : ${this.speed} km/h`);
};


const bmw = new Car("BMW", 120);
bmw.accelerate();
bmw.brake();

const mrcd = new Car("Mercedes", 95);
mrcd.accelerate();
mrcd.brake();

*/

/*
// Class in JavaScripts

class User {
  constructor(userName, birthYear) {
    this.userName = userName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2021 - this.birthYear);
  }
}

const a = new User("Abc", 1900);
a.calcAge();

User.prototype.greetings = function () {
  console.log(`Hello ${this.userName}`);
};

a.greetings();
*/

/*
Coding Challenge #2
Your tasks:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter.
Test data:
§ Data car 1: 'Ford' going at 120 km/h
GOOD LUCK �*/

/*
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
  accelerate() {
    this.speed += 10;
    console.log(`New Speed of ${this.make} is : ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`New Speed of ${this.make} is : ${this.speed} km/h`);
  }
}

const ford = new CarCl("Ford", 120);
console.log(ford.speedUS);
console.log(ford);

ford.speedUS = 90;
console.log(ford);
ford.accelerate();
ford.brake();
*/

/*
Coding Challenge #3
Your tasks:
1. Use a constructor function to implement an Electric Car (called 'EV') as a child
"class" of 'Car'. Besides a make and current speed, the 'EV' also has the
current battery charge in % ('charge' property)
2. Implement a 'chargeBattery' method which takes an argument
'chargeTo' and sets the battery charge to 'chargeTo'
3. Implement an 'accelerate' method that will increase the car's speed by 20,
and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
km/h, with a charge of 22%'
4. Create an electric car object and experiment with calling 'accelerate',
'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
you 'accelerate'! Hint: Review the definiton of polymorphism �
Test data:
§ Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
GOOD LUCK �
*/
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`New Speed of ${this.make} is : ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`New Speed of ${this.make} is : ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at 140km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV("Tesla", 120, 23);
console.log(tesla);
tesla.chargeBattery(32);
console.log(tesla);
tesla.accelerate();
*/

/*
Coding Challenge #4
Your tasks:
1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
child class of the 'CarCl' class
2. Make the 'charge' property private
3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl'
class. Then experiment with chaining!
Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
GOOD LUCK �
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
  accelerate() {
    this.speed += 10;
    console.log(`New Speed of ${this.make} is : ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`New Speed of ${this.make} is : ${this.speed} km/h`);
    return this;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed}km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
}

const rivian = new EVCl("Rivian", 100, 34);
rivian
  .accelerate()
  .chargeBattery(90)
  .accelerate()
  .brake()
  .brake()
  .accelerate()
  .brake();
console.log(rivian.speedUS);
