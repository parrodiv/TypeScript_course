"use strict";
// Index Signature
// Two main reasons why Index Signature are useful:
// interface TransactionObj {
//   Pizza: number
//   Books: number
//   Job: number
// }
const todayTransactions = {
    Pizza: -10,
    Books: -5,
    Job: 50,
};
console.log(todayTransactions.Pizza); // -10
console.log(todayTransactions['Pizza']); // -10
let prop = 'Pizza';
// Now it works
console.log(todayTransactions[prop]);
// Now it works
const todaysNet = (transactions) => {
    let total = 0;
    for (const transaction in transactions) {
        total += transactions[transaction]; // * <--- here
        // Err: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'TransactionObj'.
        // No index signature with a parameter of type 'string' was found on type 'TransactionObj'
    }
    return total;
};
console.log(todaysNet(todayTransactions));
// if there is "readonly" before [index] it can't be reassigned
// console.log(todayTransactions.Pizza = 20)
// Non existing properties returns undefined
// because it has no way to know what names we would give the keys
// because rememeber our interface just says it's going to be an index of string and it should return a number
// so TypeScript really thinks this is going to return a number but it's going to be undefined
// this does open up the possibility for you to try to access a key on an object that does not exist
console.log(todayTransactions['Ale']); // UNDEFINED
