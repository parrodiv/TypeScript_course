
// class example without visibility modifiers
class Coder {
  name: string
  music: string
  age: number
  lang: string

  constructor(
    name: string,
    music: string,
    age: number,
    lang: string
    ) {
    this.name = name
    this.music = music
    this.age = age
    this.lang = lang
  }
}

// class example with visibility modifiers
class CoderDry {
  
  // without "!"  it gives an error. With the "!" means that I'm just not going to initialize this right away
  secondLang!: string

  constructor(
    public readonly name: string, // readonly means that this property can't be modified
    public music: string,
    private age: number,  //private means that it can only be accessed inside of this class
    protected lang: string = 'Typescript'  //protected means that it can also be accessed inside derived classes (if I extend to a subclass)
  ){
    this.name = name
    this.music = music
    this.age = age
    this.lang = lang
  }

  public getAge(){
    return `Hello, I'm ${this.age}`
  }
}

const Ale = new CoderDry('Ale', 'Rock', 27)

console.log(Ale.getAge())

// console.log(Ale.age)
// console.log(Ale.lang)

