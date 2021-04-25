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

console.log("-----------------Chalange 1-----------------");

/* 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h */
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
/* . Implement an 'accelerate' method that will increase the car's speed by 10,
and log the new speed to the console */
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`New Speed of ${this.make} is : ${this.speed} km/h`);
};

/*3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console */
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`New Speed of ${this.make} is : ${this.speed} km/h`);
};

/* 4. Create 2 'Car' objects and experiment with calling 'accelerate' and
'brake' multiple times on each of them */

const bmw = new Car("BMW", 120);
bmw.accelerate();
bmw.brake();

const mrcd = new Car("Mercedes", 95);
mrcd.accelerate();
mrcd.brake();
