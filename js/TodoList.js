import { todoItemTemplate } from './TodoTemplates.js';

export default function TodoList({ onRemove, onCompleted }) {
  const $todoList = document.querySelector("#todo-list")

  this.render = todoItems => {
    const template = todoItems.map(todoItemTemplate)
    $todoList.innerHTML = template.join("")
  }

  $todoList.addEventListener("click", event => onCheckBoxHandler(event))
  $todoList.addEventListener("click", event => onRemoveHandler(event))

  const onRemoveHandler = event => {
    if (event.target.classList.contains("destroy")) {
      const $todoItem = event.target.closest("li")
      const id = $todoItem.dataset.id
      onRemove(id)
    }

  }

  const onCheckBoxHandler = event => {
    if (event.target.classList.contains("toggle")) {
      const $todoItem = event.target.closest("li")
      const id = $todoItem.dataset.id
      onCompleted(id)
    }
  }
}
