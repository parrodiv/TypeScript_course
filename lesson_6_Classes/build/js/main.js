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
// console.log(Ale.getAge())
// console.log(Ale.age)
// console.log(Ale.lang)
class WebDev extends CoderDry {
    constructor(computer, name, music, age) {
        // super extends properties from the parent Class and must be before the other properties
        super(name, music, age);
        this.computer = computer;
        this.computer = computer;
    }
    getLang() {
        return `I write ${this.lang}`;
        // I can access to lang because lang has a default value "TypeScript"
        // I can access to lang also because I'm in a subclass of CoderDry since that lang has protected visibility
    }
}
const Jack = new WebDev('Mac', 'Jack', 'Lofi', 25);
console.log(Jack.getLang());
