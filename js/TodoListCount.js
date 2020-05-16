import { countTemplate } from './Templates.js';

export function TodoListCount() {
  const $count = document.querySelector(".todo-count");

  this.setState = list => {
    this.render(list);
  }

  this.render = list => {
    $count.innerHTML = countTemplate(list);
  }
}