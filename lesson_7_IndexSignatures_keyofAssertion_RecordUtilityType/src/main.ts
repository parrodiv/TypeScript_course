// Index Signature
// Two main reasons why Index Signature are useful:

// 1 - Are useful when you're creating an object but you don't know the exact names of the object keys but you do know the shape of the object
// You can declare the type of the keys and the type of the values

// 2- Typescript requires an index signature if you attempt to access an object property dinamically

interface TransactionObj {
  Pizza: number
  Books: number
  Job: number
}

const todayTransactions: TransactionObj = {
  Pizza: -10,
  Books: -5,
  Job: 50,
}

console.log(todayTransactions.Pizza)  // -10
console.log(todayTransactions['Pizza'])  // -10

let prop: string = 'Pizza'

// * This is not possible with TypeScript
// console.log(todayTransactions[prop]) 

// * Also this give us an error 
const todaysNet = (transactions: TransactionObj): number => {
  let total = 0
  for (const transaction in transactions) {
    total += transactions[transaction] // * <--- here
    // Err: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'TransactionObj'.
    // No index signature with a parameter of type 'string' was found on type 'TransactionObj'
  }
  return total
}

console.log(todaysNet(todayTransactions))