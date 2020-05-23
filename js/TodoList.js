import { todoItemTemplate } from './TodoTemplates.js';

export default function TodoList() {
  const $todoList = document.querySelector("#todo-list")

  this.render = todoItems => {
    const template = todoItems.map(todoItemTemplate)
    $todoList.innerHTML = template.join("")
  }
}
