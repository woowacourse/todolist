import { todoItemTemplate } from "./Templates.js";

// todoList 보여주는 컴포넌트
export function TodoList() {
  this.$todoList = document.querySelector("#todo-list");

  this.render = (items) => {
    const template = items.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join("");
  };
}
