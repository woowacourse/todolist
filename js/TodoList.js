import { todoItemTemplate } from './templates.js';

export function TodoList(onToggle, onDelete, onDoubleClick, onUpdateContent, onRollback) {
  this.$todoList = document.querySelector("#todo-list");
  this.$todoList.addEventListener("click", (event) => this.click(event));
  this.$todoList.addEventListener("dblclick", (event) => this.doubleClick(event));
  this.$todoList.addEventListener("keyup", event => this.onUpdatedByEnter(event));
  this.$todoList.addEventListener("keyup", event => this.onCancelByEsc(event));

  this.click = event => {
    const $target = event.target;
    if ($target.classList.contains("toggle")) {
      const index = findIndex(event, $target);
      onToggle(event, index);
    } else if ($target.classList.contains("destroy")) {
      const index = findIndex(event, $target);
      onDelete(event, index);
    }
  };
  this.doubleClick = event => {
    const $target = event.target;
    if ($target.classList.contains("label")) {
      const index = findIndex(event, $target);
      onDoubleClick(event, index);
    }
  }
  this.onUpdatedByEnter = (event) => {
    if (event.key === "Enter" && event.target.classList.contains("edit")) {
      const $target = event.target;
      const index = findIndex(event, $target)
      onUpdateContent(index, event);
    }
  }
  this.onCancelByEsc = (event) => {
    if (event.key === "Escape" && event.target.classList.contains("edit")) {
      const $target = event.target;
      const index = findIndex(event, $target)
      onRollback(index, event);
    }
  }

  this.render = items => {
    this.$todoList.innerHTML = items.map(todoItemTemplate).join("");
  }
}

export function findIndex(event, $target) {
  const $itemList = $target.closest("ul");
  const $item = $target.closest("li");
  for (let i = 0; i < $itemList.childNodes.length; i++) {
    if ($item === $itemList.childNodes[i]) {
      return i;
    }
  }
}
