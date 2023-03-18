// class example without visibility modifiers
class Coder {
  name: string
  music: string
  age: number
  lang: string

  constructor(name: string, music: string, age: number, lang: string) {
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
    private age: number, //private means that it can only be accessed inside of this class
    protected lang: string = 'Typescript' //protected means that it can also be accessed inside derived classes (if I extend to a subclass)
  ) {
    this.name = name
    this.music = music
    this.age = age
    this.lang = lang
  }

  public getAge() {
    return `Hello, I'm ${this.age}`
  }
}

const Ale = new CoderDry('Ale', 'Rock', 27)

// console.log(Ale.getAge())

// console.log(Ale.age)
// console.log(Ale.lang)

class WebDev extends CoderDry {
  constructor(
    public computer: string,
    name: string,
    music: string,
    age: number,
  ) {
    // super extends properties from the parent Class and must be before the other properties
    super(name, music, age)
    this.computer = computer
  }

  public getLang() {
    return `I write ${this.lang}`
    // I can access to lang because lang has a default value "TypeScript"
    // I can access to lang also because I'm in a subclass of CoderDry since that lang has protected visibility
  }
}

const Jack = new WebDev('Mac', 'Jack', 'Lofi', 25)
console.log(Jack.getLang())
//*********************************************************************************** */

interface Musician {
  name: string,
  instrument: string,
  play(action: string): string
}

class Guitarist implements Musician {
  name: string
  instrument: string

  constructor(name: string, instrument: string) {
    this.name = name
    this.instrument = instrument
  }

  play(action: string){
    return `${this.name} ${action} the ${this.instrument}`
  }
}

const Page = new Guitarist('Karl', 'guitar')
console.log(Page.play('strums'))
//********************************************************************* */

class Peeps {
  static count: number = 0
  // static methods are called directly on the class without creating an instance/object of the class

  static getCount(): number {
    return Peeps.count
  }

  public id: number

  constructor(public name: string) {
    this.name = name
    this.id = ++Peeps.count
  }
}

const John = new Peeps('John')
const Steve = new Peeps('Steve')
const Amy = new Peeps('Amy')

console.log(Peeps.count)
console.log(John.id) //1
console.log(Steve.id) //2
console.log(Amy.id) //3

//************************************************** */

class Bands {
  private dataState: string[]

  constructor() {
    this.dataState = []
  }

  //"get" is a special keyword that we can use in JS to get our data that we have inside our state
  public get data(): string[]{
    return this.dataState
  }

  public set data(value: string[]) {
    if(Array.isArray(value) && value.every(item => typeof(item) === 'string')){
      this.dataState = value
      return
    } else {
      throw new Error('Param is not an array of strings')
    }
  }
}

const MyBands = new Bands()
//set data
MyBands.data = ['Neil Young', 'Led Zep']
// get data
console.log(MyBands.data)
MyBands.data = [...MyBands.data, 'ZZ Top']
console.log(MyBands.data)
// this will give an error because data must be array of strings
// * MyBands.data= 'Ciao'
