// Generics
const stringEcho = (arg: string): string => arg

const echo = <T>(arg: T): T => arg

// Generics allow creating 'type variables' which can be used to create classes, functions & type aliases that don't need to explicitly define the types that they use. Generics makes it easier to write reusable code.

const isObj = <T>(arg: T): boolean => {
  return typeof arg === 'object' && !Array.isArray(arg) && arg !== null
}

// console.log(isObj(true))
// console.log(isObj('John'))
// console.log(isObj({ name: 'John' }))
// console.log(isObj(null))

const isTrue = <T>(arg: T): { arg: T, is: boolean } => {
  if(Array.isArray(arg) && !arg.length){
    return { arg, is: false}
  }
  if(isObj(arg) && !Object.keys(arg as keyof T).length) {
    // console.log(!Object.keys(arg as keyof T).length)
    return {arg, is: false}
  }
  return { arg, is: !!arg }
  // '!!' transform one value in boolean (for example if I pass 0 it will be false, an empty string it will be false and so on)
}

console.log(isTrue({ok:'ok'}))
console.log(isTrue(false))
console.log(isTrue(0))
console.log(isTrue(true))
console.log(isTrue(1))
console.log(isTrue('Ale'))
console.log(isTrue('false'))
console.log(isTrue(null))
console.log(isTrue(undefined))
console.log(isTrue({}))


interface BoolCheck<T> {
  value: T,
  is: boolean
}

const checkBoolVal = <T>(arg: T): BoolCheck<T> => {
  if (Array.isArray(arg) && !arg.length) {
    return { value: arg, is: false }
  }
  if (isObj(arg) && !Object.keys(arg as keyof T).length) {
    // console.log(!Object.keys(arg as keyof T).length)
    return { value: arg, is: false }
  }
  return { value: arg, is: !!arg }
  // '!!' transform one value in boolean (for example if I pass 0 it will be false, an empty string it will be false and so on)
}

interface HasID {
  id: number
}

// narrowing Generic with extends
// now what we pass in user has to have an id property
const processUser = <T extends HasID>(user: T): T => {
  return user
}

console.log(processUser({id: 1, name: 'Ale'}))
// console.log(processUser({ name: 'Ale'})) // * Error