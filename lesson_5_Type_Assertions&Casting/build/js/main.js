"use strict";
// convert to more or less specific 
let a = 'prova';
let b = 0; // less specific
let c = a; // more specific
// Angle brackets syntax instead of "as", but in React it doesn't work
let d = 'world';
let e = 'world';
const addOrConcat = (a, b, c) => {
    if (c === 'add')
        return a + b; // number
    return '' + a + b; // string
};
// this give an error because addOrConcat returns number or string but myVal is expected to be only a string
// * let myVal: string = addOrConcat(2, 2, 'concat')
// to see type assertion in action and resolve the error above: 
let myVal = addOrConcat(2, 2, 'concat');
// ! BE CAREFUL because TS sees no problem here but a string is returned instead of number
let nextVal = addOrConcat(2, 2, 'concat');
// double casting
// unknown is a special type
// ! don't recommended
10;
// DOM 
// more specific "HTMLImageElement
const img = document.querySelector('img');
// less specific HTMLElement
// "!" means that it is not null called non-null assertion
// if I put "as HTMLImageElement" I don't need "!" anymore because I'm telling to TS that it will be an HTMLImageElement therefore it isn't "null"
const myImg = document.getElementById('img');
const nextImg = document.getElementById('img');
img.src;
myImg.src;
