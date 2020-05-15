import template from "./TodoItem.js";

const addEventHandlers = (event, toggleCompleteHandler, deleteHandler) => {
  if (event.target.classList.contains("toggle")) {
    const id = event.target.closest("li").dataset.id;
    toggleCompleteHandler(id);
  }
  if (event.target.classList.contains("destroy")) {
    const id = event.target.closest("li").dataset.id;
    deleteHandler(id);
  }
};

export default class TodoList {
  constructor(items, { toggleCompleteHandler, deleteHandler }) {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoList.addEventListener("click", event => {
      addEventHandlers(event, toggleCompleteHandler, deleteHandler);
    });
    this.render(items);
  }

  render(items) {
    this.$todoList.innerHTML = items.map(item => template(item)).join("");
  }
}
