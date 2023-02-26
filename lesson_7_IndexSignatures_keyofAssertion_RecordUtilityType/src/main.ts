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
  [key: string]: string | number | number[] | undefined
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

console.log(student.test)