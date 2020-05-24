import {EVENT_TYPE} from "../utils/constans.js";

export const TodoList = class {
  constructor({onComplete}) {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoList.addEventListener(EVENT_TYPE.CLICK, this.completeTodo.bind(this));
    this.completeTodoHandler = onComplete;
  }

  render(items) {
    const template = items.map(item => item.create());
    this.$todoList.innerHTML = template.join("");
  };

  completeTodo(event) {
    const $target = event.target;
    const isNotComplete = !$target.classList.contains("toggle");
    if (isNotComplete) {
      return;
    }
    const id = $target.closest("li").dataset.id;
    this.completeTodoHandler(id);
  }
}