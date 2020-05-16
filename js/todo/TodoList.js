import { itemTemplate } from '../template/template.js';

export default function TodoList() {
  this.$todoList = document.querySelector('#todo-list');

  this.setState = updatedTodoItems => {
    this.render(updatedTodoItems);
  }

  this.render = items => {
    const template = items.map(itemTemplate);
    this.$todoList.innerHTML = template.join("");
  }
}