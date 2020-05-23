export default function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title")

  $todoInput.addEventListener("keyup", event => this.addTodoItem(event))

  this.addTodoItem = event => {
    const $target = event.target
    if (this.isValid(event, $target.value)) {
      onAdd($target.value)
      $target.value = ""
    }
  }

  this.isValid = (event, value) => {
    event.preventDefault()
    return event.key === "Enter" && value.trim() !== ""
  }
}
