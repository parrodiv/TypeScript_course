// implicit
// * let myName = 'Ale'
// explicit
// * let myName:string = 'Ale'
// when I declare a variable and assign to it a string, TypeScript will implicit assign to it a string type
// when we reassign this variable with another type, TypeScript doesn't allow that and it will throw an error
// FOR EXAMPLE:
// myName = 42

let myName: string
let meaningOfLife: number
let isLoading: boolean
let album: string | number  // UNION TYPE

myName = 'Ale'
meaningOfLife = 42
isLoading = true
album = 1996

const sum = (a:string, b: number) => {
  return a + b
}

let postId: string | number
let isActive: number | boolean

let re: RegExp = /\w+/g
