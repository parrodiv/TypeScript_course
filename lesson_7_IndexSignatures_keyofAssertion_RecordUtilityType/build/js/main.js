"use strict";
// Index Signature
// Two main reasons why Index Signature are useful:
const todayTransactions = {
    Pizza: -10,
    Books: -5,
    Job: 50,
    Ale: 27 // Ale is not required but the other 3 are, because they are defined in interface
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
        total += transactions[transaction];
    }
    return total;
};
console.log(todaysNet(todayTransactions));
// if there is "readonly" before [index] it can't be reassigned
// console.log(todayTransactions.Pizza = 20)
// now it works 
console.log(todayTransactions['Ale']); // 27
const student = {
    name: "Karl",
    GPA: 3.5,
    classes: [100, 200]
};
console.log(student.test);
