type One = string 
type Two = string | number
type Three = 'Hello'

// convert to more or less specific 
let a: One = 'prova'
let b = 0 as Two  // less specific
let c = a as Three // more specific

// Angle brackets syntax instead of "as", but in React it doesn't work
let d = <One>'world'
let e = <string | number>'world'



const addOrConcat = (a: number, b: number, c: 'add' | 'concat'): string | number => {
  if (c === 'add') return a + b // number
  return '' + a + b // string
}

// this give an error because addOrConcat returns number or string but myVal is expected to be only a string
// * let myVal: string = addOrConcat(2, 2, 'concat')

// to see type assertion in action and resolve the error above: 
let myVal : string = addOrConcat(2, 2, 'concat') as string

// ! BE CAREFUL because TS sees no problem here but a string is returned instead of number
let nextVal: number = addOrConcat(2, 2, 'concat') as number

// double casting
// unknown is a special type
// ! don't recommended
(10 as unknown) as string


// DOM 

// more specific "HTMLImageElement
const img = document.querySelector('img') as HTMLImageElement
// less specific HTMLElement
// "!" means that it is not null called non-null assertion
// if I put "as HTMLImageElement" I don't need "!" anymore because I'm telling to TS that it will be an HTMLImageElement therefore it isn't "null"
const myImg = document.getElementById('img')! as HTMLImageElement
const nextImg = <HTMLImageElement>document.getElementById('img') 

img.src
myImg.src


