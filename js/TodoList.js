import { todoItemTemplate } from './TodoTemplates.js';
import { EVENT, KEY } from './utils/constants.js'

export default function TodoList({ onRemove, onCompleted, onUpdate }) {
  const $todoList = document.querySelector("#todo-list")

  this.render = todoItems => {
    const template = todoItems.map(todoItemTemplate)
    $todoList.innerHTML = template.join("")
  }

  $todoList.addEventListener(EVENT.CLICK, event => onCheckBoxHandler(event))
  $todoList.addEventListener(EVENT.CLICK, event => onRemoveHandler(event))
  $todoList.addEventListener(EVENT.CLICK, event => onEditHandler(event))

  const getTodoItemId = event => {
    const $todoItem = event.target.closest("li")
    return $todoItem.dataset.id
  }

  const onRemoveHandler = event => {
    if (event.target.classList.contains("destroy")) {
      const id = getTodoItemId(event)
      onRemove(id)
    }
  }

  const onCheckBoxHandler = event => {
    if (event.target.classList.contains("toggle")) {
      const id = getTodoItemId(event)
      onCompleted(id)
    }
  }

  const onEditHandler = event => {
    const $todoItem = event.target.closest("li")

    if (!$todoItem.classList.contains("editing")) {
      $todoItem.classList.toggle("editing")
      const $editInput = $todoItem.querySelector(".edit")
      $editInput.addEventListener("keydown", onFinishEditHandler)
      $editInput.focus()
    }
  }

  const onFinishEditHandler = event => {
    if (event.key === KEY.ESC) {
      const $todoItem = event.target.closest("li")
      $todoItem.classList.toggle("editing")
    }

    if (event.key && event.key !== KEY.ENTER) {
      return
    }

    if (event.target.classList.contains("edit")) {
      const id = getTodoItemId(event)
      const content = event.target.value
      onUpdate(id, content)
    }
  }

}
