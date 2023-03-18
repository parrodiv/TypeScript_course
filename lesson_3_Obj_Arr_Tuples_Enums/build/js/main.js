"use strict";
let stringArr = ['one', 'hey', 'Dave'];
// union type
let guitars = ['Strat', 'Les Paul', 5150];
// union type
let mixedData = ['EVH', 1984, true];
stringArr[0] = 'John';
stringArr.push('hey');
guitars[0] = 10;
// Typescript allows to add without taking care about position (guitars has a string parameter at [2] position)
guitars.unshift('Jim');
// This doesn't work because stringArr accepts only strings and guitars contains also numbers
// * stringArr = guitars
let test = [];
let bands = [];
bands.push('Van Halen');
// TUPLE is a strict array with a specific length and specific type in one element position
let myTuple = ['Ale', 42, true];
let mixed = ['John', 1, false];
// this is ok because mixed accepts strings, numbers and boolean
mixed = myTuple;
// this doesn't work becuase myTuple has specific element position types
// * myTuple = mixed
// this is ok because at position 1 it accepts a number type
myTuple[1] = 2;
// OBJECTS
let myObj;
myObj = [];
console.log(typeof myObj); // object
myObj = bands; //it's ok even though bands is an array
myObj = {};
// OBJECT TYPE INTERFACE
const exampleObj = {
    prop1: 'Dave',
    prop2: true,
};
exampleObj.prop1 = 'John';
// Object assignment (correct)
let evh = {
    name: 'Eddie',
    active: false,
    albums: [1984, 5150, 'aaa']
};
// This is ok because age property can be (number | undefined)
let person = {
    name: 'Ale'
};
// OBJECT TYPE AS A PARAMETER
const greetingGuitartist = (guitarist) => {
    return `Hello ${guitarist.name}!`;
};
console.log(greetingGuitartist(evh));
// NARROWING WITH OPTIONAL PROPERTIES
// it is a trick of TypeScrypt to avoid errors regarding possible undefined values
let songerObj = {
    name: 'Karl',
    active: true,
    albums: [1, 2, 3]
};
// when adding a method toUpperCase() TS adds <?.> operator to avoid error when name is undefined
// remember that ?. returns undefined directly without throws any errors about trying to access a property of undefined
const greetSonger = (songer) => {
    var _a;
    return `Hello ${(_a = songer.name) === null || _a === void 0 ? void 0 : _a.toUpperCase()}`;
};
console.log(greetSonger(songerObj));
// ENUMS
// Unlike most Typescript features, Enums are not a type-level addition to JavaScript but something added to the language and runtime
var Grade;
(function (Grade) {
    Grade[Grade["U"] = 0] = "U";
    Grade[Grade["D"] = 1] = "D";
    Grade[Grade["C"] = 2] = "C";
    Grade[Grade["B"] = 3] = "B";
    Grade[Grade["A"] = 4] = "A";
})(Grade || (Grade = {}));
console.log(Grade.U);
var Steps;
(function (Steps) {
    Steps[Steps["A"] = 1] = "A";
    Steps[Steps["B"] = 2] = "B";
    Steps[Steps["C"] = 3] = "C";
    Steps[Steps["D"] = 4] = "D"; // 4
})(Steps || (Steps = {}));
console.log(Steps.D);
