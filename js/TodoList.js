import { todoItemTemplate } from './TodoTemplates.js';

export default function TodoList({onCompleted}) {
  const $todoList = document.querySelector("#todo-list")

  this.render = todoItems => {
    const template = todoItems.map(todoItemTemplate)
    $todoList.innerHTML = template.join("")
  }

  $todoList.addEventListener("click", event =>  onCheckBoxHandler(event))

  const onCheckBoxHandler = event => {
    if (event.target.classList.contains("toggle")) {
      const $todoItem = event.target.closest("li")
      const id = $todoItem.dataset.id
      onCompleted(id)
    }
  }
}
