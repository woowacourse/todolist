import { todoCountTemplate } from '../../utils/templates.js';

export class TodoCount {
  constructor() {
    this.$count = document.querySelector(".todo-count");
  }

  render(todoCount) {
    this.$count.innerHTML = todoCountTemplate(todoCount);
  }
}