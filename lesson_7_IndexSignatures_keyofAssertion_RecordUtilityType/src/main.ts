// Index Signature
// Two main reasons why Index Signature are useful:

// 1 - They are useful when you're creating an object but you don't know the exact names of the object keys but you do know the shape of the object
// You can declare the type of the keys and the type of the values

// 2- Typescript requires an index signature if you attempt to access an object property dinamically

// interface TransactionObj {
//   Pizza: number
//   Books: number
//   Job: number
// }

// interface TransactionObj {
//   readonly [index: string]: number // INDEX SIGNATURE
// }

interface TransactionObj {
  readonly [index: string]: number
  Pizza: number,
  Books: number,
  Job: number
}



const todayTransactions: TransactionObj = {
  Pizza: -10,
  Books: -5,
  Job: 50,
  Ale: 27 // Ale is not required but the other 3 are, because they are defined in interface
}

console.log(todayTransactions.Pizza) // -10
console.log(todayTransactions['Pizza']) // -10

let prop: string = 'Pizza'

// Now it works
console.log(todayTransactions[prop])

// Now it works
const todaysNet = (transactions: TransactionObj): number => {
  let total = 0
  for (const transaction in transactions) {
    total += transactions[transaction] 
   
  }
  return total
}

console.log(todaysNet(todayTransactions))

// if there is "readonly" before [index] it can't be reassigned
// console.log(todayTransactions.Pizza = 20)

// now it works 
console.log(todayTransactions['Ale'])  // 27

// ************************************************

interface Student {
  // [key: string]: string | number | number[] | undefined
  // I have to insert all this types because they are all present in this interface
  // also undefined because classes is optional
  name: string,
  GPA: number,
  classes?: number[] // optional
}

const student: Student = {
  name: "Karl",
  GPA: 3.5,
  classes: [100, 200]
}

// without [key: index] .... this give an error, with [key: string] it doesn't give an error because undefined is one of the possible values
// console.log(student.test)


// keyof Assertions is useful when there isn't index signature in interface (now commented out on interface Student)
// what the keyof does is creates a union type and union type is the specific string literal 
// in this case is the union type for the name, GPA and classes
// "name" | "GPA" | "classes"
for (const key in student) {
  console.log(`${key}: ${student[key as keyof Student]}`)
}

// When I don't know what the types of student object (the interface) are
// note the lower case student not the upper case Student
Object.keys(student).map(key => {
  console.log(student[key as keyof typeof student])
})

// EXAMPLE WITH FUNCTIONS
const logStudentKey = (student: Student, key: keyof Student): void => {
  console.log(`Student ${key}: ${student[key]}`)
}

logStudentKey(student, 'GPA')

//******************************************************************* */

// RECORD UTILITY TYPES
// The main Syntax for the record type looks like this:

// Record<Keys, Type>

type Streams = 'salary' | 'bonus' | 'sidehustle'

type Incomes = Record<Streams, number | string>

// Incomes is a type that has Streams keys and their values can be number or string

const monthlyIncomes: Incomes = {
  salary: 500,
  bonus: 100,
  sidehustle: 250
}

// for loop with Record Utility Types
for (const revenue in monthlyIncomes) {
  console.log(monthlyIncomes[revenue as keyof Incomes])
}

// The principle advantage of using Record Utility type is that I can put a string literal option inside a key of an object, while I can't with Index Signature, for example: 

// ! this gives error
// interface Incomes2 {
//   [key: 'salary']: number
// }

// other example
interface User {
  id: number
  firstname: string
  lastname: string
  age?: number
}

const users: Record<number, User> = {
  0: { id: 1, firstname: 'Chris', lastname: 'Bongers' },
  1: { id: 2, firstname: 'Yaatree', lastname: 'Bongers', age: 2 },
}


type Admins = 'chris' | 'nicole'

// we want to ensure we can only assign these keys to our list of admin users.

const adminUsers: Record<Admins, User> = {
  chris: { id: 1, firstname: 'Chris', lastname: 'Bongers' },
  nicole: { id: 2, firstname: 'Nicole', lastname: 'Bongers' },
}
