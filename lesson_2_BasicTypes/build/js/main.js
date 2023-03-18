"use strict";
// implicit
// * let myName = 'Ale'
// explicit
// * let myName:string = 'Ale'
// when I declare a variable and assign to it a string, TypeScript will implicit assign to it a string type
// when we reassign this variable with another type, TypeScript doesn't allow that and it will throw an error
// FOR EXAMPLE:
// myName = 42
let myName;
let meaningOfLife;
let isLoading;
let album; // UNION TYPE
myName = 'Ale';
meaningOfLife = 42;
isLoading = true;
album = 1996;
const sum = (a, b) => {
    return a + b;
};
let postId;
let isActive;
let re = /\w+/g;
