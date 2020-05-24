import { EVENT, KEY } from './utils/constants.js'

export default function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title")

  $todoInput.addEventListener(EVENT.KEY_UP, event => this.addTodoItem(event))

  this.addTodoItem = event => {
    const $target = event.target
    if (this.isValid(event, $target.value)) {
      onAdd($target.value)
      $target.value = ""
    }
  }

  this.isValid = (event, value) => {
    event.preventDefault()
    return event.key === KEY.ENTER && value.trim() !== ""
  }
}
