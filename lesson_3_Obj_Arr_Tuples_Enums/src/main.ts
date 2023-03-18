let stringArr = ['one', 'hey', 'Dave']

// union type
let guitars = ['Strat', 'Les Paul', 5150]

// union type
let mixedData = ['EVH', 1984, true]

stringArr[0] = 'John'
stringArr.push('hey')

guitars[0] = 10
// Typescript allows to add without taking care about position (guitars has a string parameter at [2] position)
guitars.unshift('Jim')

// This doesn't work because stringArr accepts only strings and guitars contains also numbers
// * stringArr = guitars

let test = []
let bands: string[] = []
bands.push('Van Halen')

// TUPLE is a strict array with a specific length and specific type in one element position
let myTuple :[string, number, boolean] = ['Ale', 42, true]

let mixed = ['John', 1, false]

// this is ok because mixed accepts strings, numbers and boolean
mixed = myTuple

// this doesn't work becuase myTuple has specific element position types
// * myTuple = mixed

// this is ok because at position 1 it accepts a number type
myTuple[1] = 2

// OBJECTS
let myObj: object
myObj = []
console.log(typeof myObj) // object
myObj = bands  //it's ok even though bands is an array
myObj = {}

// OBJECT TYPE INTERFACE
const exampleObj = {
  prop1: 'Dave',
  prop2: true,
}

exampleObj.prop1 = 'John'

// OBJECT TYPE ANNOTATION
type Guitarist = {
  name: string,
  active: boolean,
  albums: (string | number)[]
}

// Object assignment (correct)
let evh: Guitarist = {
  name: 'Eddie',
  active: false,
  albums: [1984, 5150, 'aaa']
}

// Object assignment (incorrect)
// * let someGuitarist: Guitarist = {
// *  name: 'john',
// *  // it is incorrect because it miss the active prop ("Property 'active' is missing in type '{ name: string; albums: string[]; }' but required in type 'Guitarist'.")
// *  albums: ['I', 'II', 'III']
// * }


// OPTIONAL OBJECT PROPERTY
type ObjWithOptional = {
  name: string,
  age?: number
}

// This is ok because age property can be (number | undefined)
let person: ObjWithOptional = {
  name: 'Ale'
}

// OBJECT TYPE AS A PARAMETER
const greetingGuitartist = (guitarist: Guitarist) => {
  return `Hello ${guitarist.name}!`
}

console.log(greetingGuitartist(evh))


// TYPE VS INTERFACE
// the structure is the same except without the equal assign operator
// the question is when to use type and when to use interface
// interface is more used when you need to define a class 
interface Songer {
  name?: string, // this is optional for showing the example about NARROWING WITH OPTIONAL PROPERTIES
  active: boolean,
  albums: (string | number)[]
} 

// NARROWING WITH OPTIONAL PROPERTIES
// it is a trick of TypeScrypt to avoid errors regarding possible undefined values

let songerObj: Songer = {
  name: 'Karl',
  active: true,
  albums: [1,2,3]
}

// when adding a method toUpperCase() TS adds <?.> operator to avoid error when name is undefined
// remember that ?. returns undefined directly without throws any errors about trying to access a property of undefined
const greetSonger = (songer: Songer) => {
  return `Hello ${songer.name?.toUpperCase()}` 
}

console.log(greetSonger(songerObj))


// ENUMS
// Unlike most Typescript features, Enums are not a type-level addition to JavaScript but something added to the language and runtime

enum Grade {
  U, // 0
  D, // 1
  C, // 2
  B, // 3
  A, // 4
}
 
console.log(Grade.U)

enum Steps {
  A = 1,
  B, // 2
  C, // 3
  D // 4
}

console.log(Steps.D)
