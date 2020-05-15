import template from "./TodoItem.js";

export default class TodoList {
  constructor(items, { toggleCompleteHandler }) {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoList.addEventListener("click", event => {
      if (event.target.classList.contains("toggle")) {
        const id = event.target.closest("li").dataset.id;
        toggleCompleteHandler(id);
      }
    });
    this.render(items);
  }

  render(items) {
    this.$todoList.innerHTML = items.map(item => template(item)).join("");
  }
}
