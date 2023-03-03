import  FullList  from '../model/FullList'

interface DOMList {
  ul: HTMLUListElement
  clear(): void
  render(fullList: FullList): void
}

// - export default class that implement DOMList
// - Singleton
// - clear method should just clear out all of the HTML inside the unordered list

export default class ListTemplate implements DOMList {

  ul: HTMLUListElement

  static instance: ListTemplate = new ListTemplate()

  private constructor() {
    this.ul = document.getElementById('listItems') as HTMLUListElement
  }

  clear(): void {
    this.ul.innerHTML = ''
  }

  render(fullList: FullList): void {
    this.clear()

    fullList.list.forEach((item) => {
      const li: HTMLLIElement = document.createElement('li')
      li.className = 'item'

      const check: HTMLInputElement = document.createElement('input')
      check.type = 'checkbox'
      check.id = item.id
      check.checked = item.checked
      li.append(check)

      check.addEventListener('change', () => {
        item.checked = !item.checked
        fullList.save()
      })

      const label: HTMLLabelElement = document.createElement('label')
      label.htmlFor = item.id
      label.textContent = item.item
      li.append(label)

      const button: HTMLButtonElement = document.createElement('button')
      button.className = 'button'
      button.textContent = 'X'
      li.append(button)

      button.addEventListener('click', () => {
        fullList.removeItem(item.id)
        this.render(fullList)
      })

      this.ul.append(li)
    })
  }
}
