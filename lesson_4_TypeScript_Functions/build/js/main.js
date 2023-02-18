"use strict";
// It doesn't work with interface
// * interface PostId = stringOrNumber
// LITERAL TYPES
let myName;
// it expects to be 'Ale' instead John, so it throws an error
// * myName = 'John'
let userName;
userName = 'Amy';
//FUNCTIONS
// returns a number
const add = (a, b) => {
    return a + b;
};
// void is the type for functions that don't return anything
const logMsg = (message) => {
    console.log(message);
};
logMsg('Hello');
logMsg(add(2, 3));
// function keyword
let subtract = function (c, d) {
    return c - d;
};
let multiply = (c, d) => {
    return c * d;
};
logMsg(multiply(2, 3));
// optional parameters
// ! REMEMBER that the optional parameters need to be the last in the list!
const addAll = (a, b, c) => {
    // type guard
    if (typeof c !== 'undefined') {
        return a + b + c;
    }
    return a + b;
};
// default param value
const sumAll = (a, b, c = 2) => {
    // type guard
    if (typeof c !== 'undefined') {
        return a + b + c;
    }
    return a + b;
};
logMsg(addAll(2, 3, 2)); // 7
logMsg(addAll(2, 3)); // 5
logMsg(sumAll(2, 3)); // 7 because c is set to default value 2
const sumAll2 = (a = 10, b, c = 2) => {
    // type guard
    if (typeof c !== 'undefined') {
        return a + b + c;
    }
    return a + b;
};
logMsg(sumAll2(undefined, 3)); // returns 15 because a is set to default value 10, to skip you should put undefined as the first argument
// Rest Parameters
// in the parameter specify the array of numbers, but when you call the function put the numbers without array
// ! REMEMBER with the rest operator must be the last parameter on the list (a, b, ...nums)
const total = (...nums) => {
    return nums.reduce((prev, curr) => prev + curr);
};
logMsg(total(1, 2, 3, 4));
// Never type
// 1 - never type is for functions that explicitly throw errors & 2 - for infinite loops
const createError = (errMsg) => {
    throw new Error(errMsg);
};
const infinite = () => {
    let i = 1;
    while (true) {
        i++;
        // if I break the loop it will return a void type
        if (i > 10)
            break;
    }
};
// custom type guard
const isNumber = (value) => {
    return typeof value === 'number' ? true : false;
};
// using never type
// I cannot just put "return" of the function because the return type is set to a string and not undefined
// returning an error is useful in this situations because it returns a never type
const numberOrString = (value) => {
    if (typeof value === 'string')
        return 'string';
    if (isNumber(value))
        return 'number';
    return createError('This should never happen!');
};
logMsg(numberOrString(7));
