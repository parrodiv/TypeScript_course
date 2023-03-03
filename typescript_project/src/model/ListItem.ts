export interface Item {
  id: string,
  item: string,
  checked: boolean
}

// La classe ListItem implementa l'interfaccia Item, quindi deve avere le proprietà definite nell'interfaccia. Nell'interfaccia Item, le proprietà sono definite senza underscore, quindi la classe ListItem deve avere le proprietà id, item e checked senza underscore.

// Nella classe ListItem, sono state definite le proprietà private _id, _item e _checked per implementare le proprietà pubbliche definite nell'interfaccia Item. I getter e i setter pubblici, come get id(), set id(value: string), get item(), set item(value: string), get checked(), set checked(value: boolean) permettono di accedere e modificare le proprietà private _id, _item e _checked.

export default class ListItem implements Item {
  constructor(
    private _id: string,
    private _item: string,
    private _checked: boolean
  ) {
    this._id = _id
    this._item = _item
    this._checked = _checked
  }

  get id(): string {
    return this._id
  }
  set id(value: string) {
    this._id = value
  }

  get item(): string {
    return this._item
  }
  set item(value: string) {
    this._item = value
  }

  get checked(): boolean {
    return this._checked
  }
  set checked(value: boolean) {
    this._checked = value
  }
}