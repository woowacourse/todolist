import { todoCountTemplate } from '../../utils/templates.js';

export class TodoCount {
  constructor() {
    this.count = 0;
    this.$count = document.querySelector(".todo-count");
  }

  setCount(todoCount) {
    this.count = todoCount;
    this.render(this.count);
  };

  render(todoCount) {
    this.$count.innerHTML = todoCountTemplate(todoCount);
  }
}