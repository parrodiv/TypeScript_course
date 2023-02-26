"use strict";
// class example without visibility modifiers
class Coder {
    constructor(name, music, age, lang) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
}
// class example with visibility modifiers
class CoderDry {
    constructor(name, // readonly means that this property can't be modified
    music, age, //private means that it can only be accessed inside of this class
    lang = 'Typescript' //protected means that it can also be accessed inside derived classes (if I extend to a subclass)
    ) {
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
        this.name = name;
        this.music = music;
        this.age = age;
        this.lang = lang;
    }
    getAge() {
        return `Hello, I'm ${this.age}`;
    }
}
const Ale = new CoderDry('Ale', 'Rock', 27);
console.log(Ale.getAge());
// console.log(Ale.age)
// console.log(Ale.lang)
