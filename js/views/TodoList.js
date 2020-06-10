import {todoListRender} from '../utils/Templates.js';

export class TodoList {
  constructor(onToggle) {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoList.addEventListener("click", (event) => {
      this.onCompletedHandler(event, onToggle)
    }
   )
  }

  onCompletedHandler(event, onToggle) {
    if(!event.target.classList.contains("toggle")){
      return;
    }
    onToggle(event.target.closest("li").dataset.id);
  }

  render(todoItems) {
    this.$todoList.innerHTML = todoItems.map(todoItem => todoListRender(todoItem)).join("");
  }
}

