"use strict";
// Generics
const stringEcho = (arg) => arg;
const echo = (arg) => arg;
// Generics allow creating 'type variables' which can be used to create classes, functions & type aliases that don't need to explicitly define the types that they use. Generics makes it easier to write reusable code.
const isObj = (arg) => {
    return typeof arg === 'object' && !Array.isArray(arg) && arg !== null;
};
// console.log(isObj(true))
// console.log(isObj('John'))
// console.log(isObj({ name: 'John' }))
// console.log(isObj(null))
const isTrue = (arg) => {
    if (Array.isArray(arg) && !arg.length) {
        return { arg, is: false };
    }
    if (isObj(arg) && !Object.keys(arg).length) {
        // console.log(!Object.keys(arg as keyof T).length)
        return { arg, is: false };
    }
    return { arg, is: !!arg };
    // '!!' transform one value in boolean (for example if I pass 0 it will be false, an empty string it will be false and so on)
};
console.log(isTrue({ ok: 'ok' }));
console.log(isTrue(false));
console.log(isTrue(0));
console.log(isTrue(true));
console.log(isTrue(1));
console.log(isTrue('Ale'));
console.log(isTrue('false'));
console.log(isTrue(null));
console.log(isTrue(undefined));
console.log(isTrue({}));
const checkBoolVal = (arg) => {
    if (Array.isArray(arg) && !arg.length) {
        return { value: arg, is: false };
    }
    if (isObj(arg) && !Object.keys(arg).length) {
        // console.log(!Object.keys(arg as keyof T).length)
        return { value: arg, is: false };
    }
    return { value: arg, is: !!arg };
    // '!!' transform one value in boolean (for example if I pass 0 it will be false, an empty string it will be false and so on)
};
// narrowing Generic with extends
// now what we pass in user has to have an id property
const processUser = (user) => {
    return user;
};
console.log(processUser({ id: 1, name: 'Ale' }));
// console.log(processUser({ name: 'Ale'})) // * Error
const getUsersProperty = (users, key) => {
    return users.map((user) => user[key]);
};
const users = [
    { id: 1, name: 'Mario Rossi', age: 35, email: 'mario@example.com' },
    { id: 2, name: 'Giuseppe Verdi', age: 28, email: 'giuseppe@example.com' },
    { id: 3, name: 'Luigi Bianchi', age: 45, email: 'luigi@example.com' },
];
console.log(getUsersProperty(users, 'name')); // ['Mario Rossi', 'Giuseppe Verdi', 'Luigi Bianchi']
console.log(getUsersProperty(users, 'age')); // [35, 28, 45]
console.log(getUsersProperty(users, 'email')); // ['mario@example.com', 'giuseppe@example.com', 'luigi@example.com']
// Generic in a class
class StateObject {
    constructor(value) {
        this.data = value;
    }
    get state() {
        return this.data;
    }
    set state(value) {
        this.data = value;
    }
}
const storeString = new StateObject('John');
// mouse over StateObject --> constructor StateObject<string>(value: string): StateObject<string>
const storeNumber = new StateObject(123);
// mouse over StateObject --> constructor StateObject<number>(value: number): StateObject<number>
storeString.state = 'Ale';
console.log(storeString.state);
// I can't reassign a different type  than string
// storeString.state = 1   // * Gives an error!
storeNumber.state = 35;
console.log(storeNumber.state);
// I can't reassign a different type  than number
// storeString.state = 'Ciao'  // * Gives an error!
const myState = new StateObject([1]);
myState.state = [true, 5];
myState.state = ['ciao'];
