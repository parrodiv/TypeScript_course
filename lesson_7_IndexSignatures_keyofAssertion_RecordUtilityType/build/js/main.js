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
// without [key: index] .... this give an error, with [key: string] it doesn't give an error because undefined is one of the possible values
// console.log(student.test)
// keyof Assertions is useful when there isn't index signature in interface (now commented out on interface Student)
// what the keyof does is creates a union type and union type is the specific string literal 
// in this case is the union type for the name, GPA and classes
// "name" | "GPA" | "classes"
for (const key in student) {
    console.log(`${key}: ${student[key]}`);
}
// When I don't know what the types of student object (the interface) are
// note the lower case student not the upper case Student
Object.keys(student).map(key => {
    console.log(student[key]);
});
// EXAMPLE WITH FUNCTIONS
const logStudentKey = (student, key) => {
    console.log(`Student ${key}: ${student[key]}`);
};
logStudentKey(student, 'GPA');
// Incomes is a type that has Streams keys and their values can be number or string
const monthlyIncomes = {
    salary: 500,
    bonus: 100,
    sidehustle: 250
};
// for loop with Record Utility Types
for (const revenue in monthlyIncomes) {
    console.log(monthlyIncomes[revenue]);
}
const users = {
    0: { id: 1, firstname: 'Chris', lastname: 'Bongers' },
    1: { id: 2, firstname: 'Yaatree', lastname: 'Bongers', age: 2 },
};
// we want to ensure we can only assign these keys to our list of admin users.
const adminUsers = {
    chris: { id: 1, firstname: 'Chris', lastname: 'Bongers' },
    nicole: { id: 2, firstname: 'Nicole', lastname: 'Bongers' },
};
