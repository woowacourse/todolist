import TodoItem from "./TodoItem.js"
import { KEY_TYPE } from "../../utils/constants.js"

export default ({ onToggle, onRemove, onUpdate, onEditing }) => {
  const $todoList = document.querySelector("#todo-list")

  $todoList.onclick = ({ target }) => {
    const $todoItem = target.closest(".todo-item")
    const todoId = $todoItem.dataset.id

    if (target.classList.contains("toggle")) {
      onToggle(todoId)
      return
    }

    if (target.classList.contains("destroy")) {
      onRemove(todoId)
      return
    }
  }

  $todoList.ondblclick = ({ target }) => {
    const $todoItem = target.closest(".todo-item")
    const todoId = $todoItem.dataset.id

    if (target.classList.contains("label")) {
      onEditing(todoId, true)
    }
  }

  $todoList.onkeydown = ({ target, key }) => {
    const $todoItem = target.closest(".todo-item")
    const todoId = $todoItem.dataset.id

    if (!target.classList.contains("edit")) {
      console.log("as")
      return
    }

    switch (key) {
      case KEY_TYPE.ENTER:
        onUpdate(todoId, target.value)
        onEditing(todoId, false)
        break
      case KEY_TYPE.ESCAPE:
        onEditing(todoId, false)
    }
  }

  return ({ todos }) => ($todoList.innerHTML = todos.map(TodoItem).join(""))
}
