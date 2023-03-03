import ListItem from './listItem'

interface List {
  list: ListItem[] // [{_id: string, _item: string, _checked: boolean}, {.....}]
  load(): void
  save(): void
  clearList(): void
  removeItem(id: string): void
  addItem(itemObj: ListItem): void
}

export class FullList implements List {
  // singleton pattern (only 1 instance of this class)
  // 2 steps:
  // 1) static instance so I can call it inside the class without intantiate it
  // 2) private constructor
  static instance: FullList = new FullList()

  // rendendo privato il costruttore non rendo possibili instanziare questa classe con new FullList
  private constructor(private _list: ListItem[] = []) {
    // don't needed the constructor with visibility modifiers
  }

  get list(): ListItem[] {
    return this._list
  }

  load(): void {
    const stringifiedList: string | null = localStorage.getItem('myList') //'[{}, {}, {}]'
    if (typeof stringifiedList !== 'string') return

    // ! perchè non è uguale a :ListItem[] 
    // se definisco il tipo come :ListItem[] quando istanzio ListItem non posso accedere ai vari parametri con underscore, essendo essi dichiarati privati, posso solo usare i getters
    // se definisco il tipo :{_id, _item, _checked}[] quando istanzio ListItem posso accedere a _id, _item e _checked siccome sono stati dichiarati come semplice tipo invece che essere privati come nella classe ListItem
    const parsedList: ListItem[] = JSON.parse(stringifiedList)
    
    console.log(parsedList)

    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(itemObj.id, itemObj.item, itemObj.checked)
      FullList.instance.addItem(newListItem)
    })
  }

  save(): void {
    localStorage.setItem('myList', JSON.stringify(this._list))
  }

  clearList(): void {
    this._list = []
    this.save()
  }

  removeItem(id: string): void {
    this._list = this._list.filter((obj) => obj.id !== id)
    this.save()
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj)
    this.save()
  }
}
