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

const isTrue = <T>(arg: T): { arg: T; is: boolean } => {
  if (Array.isArray(arg) && !arg.length) {
    return { arg, is: false }
  }
  if (isObj(arg) && !Object.keys(arg as keyof T).length) {
    // console.log(!Object.keys(arg as keyof T).length)
    return { arg, is: false }
  }
  return { arg, is: !!arg }
  // '!!' transform one value in boolean (for example if I pass 0 it will be false, an empty string it will be false and so on)
}

console.log(isTrue({ ok: 'ok' }))
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
  value: T
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

console.log(processUser({ id: 1, name: 'Ale' }))
// console.log(processUser({ name: 'Ale'})) // * Error

const getUsersProperty = <T extends HasID, K extends keyof T>(
  users: T[],
  key: K
): T[K][] => {
  return users.map((user) => user[key])
}
// La funzione getUsersProperty accetta due argomenti: un array di oggetti users e una chiave key che rappresenta la proprietà di cui si vuole estrarre il valore da ogni oggetto all'interno dell'array.

// In TypeScript, gli oggetti possono essere visti come un insieme di proprietà e valori associati. La sintassi T[K] viene utilizzata per estrarre il tipo della proprietà K dall'oggetto di tipo T. Ad esempio, se abbiamo un oggetto di tipo User con una proprietà name di tipo string, possiamo utilizzare la sintassi User['name'] per ottenere il tipo della proprietà name, che è string.

// La sintassi T[K][] viene utilizzata per indicare un array di valori del tipo della proprietà K degli oggetti di tipo T. Ad esempio, se abbiamo un array di oggetti di tipo User e vogliamo estrarre un array di nomi degli utenti, possiamo utilizzare la sintassi User['name'][], che rappresenta un array di stringhe.

// Nella funzione getUsersProperty, la sintassi T[K][] viene utilizzata per indicare un array di valori del tipo della proprietà K degli oggetti di tipo T. In altre parole, se la chiave K specificata è 'name', la funzione restituirà un array di valori di tipo string. Se invece la chiave K specificata è 'age', la funzione restituirà un array di valori di tipo number.


interface User extends HasID {
  name: string
  age: number
  email: string
}

const users: User[] = [
  { id: 1, name: 'Mario Rossi', age: 35, email: 'mario@example.com' },
  { id: 2, name: 'Giuseppe Verdi', age: 28, email: 'giuseppe@example.com' },
  { id: 3, name: 'Luigi Bianchi', age: 45, email: 'luigi@example.com' },
]

console.log(getUsersProperty(users, 'name')) // ['Mario Rossi', 'Giuseppe Verdi', 'Luigi Bianchi']
console.log(getUsersProperty(users, 'age')) // [35, 28, 45]
console.log(getUsersProperty(users, 'email')) // ['mario@example.com', 'giuseppe@example.com', 'luigi@example.com']


// Generic in a class

class StateObject<T> {
  private data: T

  constructor(value: T) {
    this.data = value
  }

  get state(): T {
    return this.data
  }

  set state(value: T) {
    this.data = value
  }
}

const storeString = new StateObject('John') 
// mouse over StateObject --> constructor StateObject<string>(value: string): StateObject<string>

const storeNumber = new StateObject(123) 
 // mouse over StateObject --> constructor StateObject<number>(value: number): StateObject<number>

storeString.state = 'Ale'
console.log(storeString.state)
// I can't reassign a different type  than string
// storeString.state = 1   // * Gives an error!

storeNumber.state = 35
console.log(storeNumber.state)
// I can't reassign a different type  than number
// storeString.state = 'Ciao'  // * Gives an error!

const myState = new StateObject<(string | number | boolean)[]>([1])
myState.state = [true, 5]
myState.state = ['ciao']