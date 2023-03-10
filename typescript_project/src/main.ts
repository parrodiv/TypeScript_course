import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/listItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  console.log(fullList.getListItemFromLocalStorage())

  const itemEntryForm = document.getElementById(
    'itemEntryForm'
  ) as HTMLFormElement
  itemEntryForm.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault()
    const input = document.getElementById('newItem') as HTMLInputElement
    const newEntryText: string = input.value.trim()
    const itemId = fullList.list.length
      ? fullList.list[fullList.list.length - 1].id + 1
      : 1
    const newItem = new ListItem(itemId.toString(), newEntryText, false)

    fullList.addItemPromise(newItem).then(response => {
      if (response) {
        input.value = ''
      }
    })

    template.render(fullList)
  })

  const clearItems = document.getElementById(
    'clearItemsButton'
  ) as HTMLButtonElement
  clearItems.addEventListener('click', () => {
    fullList.clearList()
    template.clear()
  })

  fullList.load()
  template.render(fullList)
}

document.addEventListener('DOMContentLoaded', initApp)
