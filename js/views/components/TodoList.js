import { todoItemTemplate } from '../../utils/templates.js';
import { KEY_TYPE } from '../../utils/constants.js';

export class TodoList {
  constructor({ onToggle, onDelete, onUpdate }) {
    this.$todoList = document.querySelector("#todo-list");
    this.addEventListenerByType(KEY_TYPE.CLICK);
    this.$todoList.addEventListener(KEY_TYPE.DOUBLE_CLICK, event => this.changeInputMode(event));
    this.onToggle = onToggle;
    this.onDelete = onDelete;
    this.onUpdate = onUpdate;
  }

  selectCheckItem(event) {
    const $target = event.target;
    const isCheckButton = $target.classList.contains("toggle");
    if (!isCheckButton) {
      return;
    }
    const todoItem = $target.closest(".todo-item");
    this.onToggle(todoItem.dataset.id);
  }

  deleteItem(event) {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("destroy");
    if (!isDeleteButton) {
      return;
    }
    const todoItem = $target.closest(".todo-item");
    this.onDelete(todoItem.dataset.id);
  }

  changeInputMode(event) {
    const $target = event.target;
    const todoItem = $target.closest(".todo-item");
    if (!todoItem) {
      return;
    }

    todoItem.classList.add("editing");

    document.addEventListener(KEY_TYPE.KEY_DOWN, event => {

      if (!event.key) {
        return;
      }

      if (event.key === KEY_TYPE.ESC) {
        todoItem.classList.remove("editing");
      }
      if (event.key === KEY_TYPE.ENTER) {
        const content = todoItem.lastElementChild.value;
        this.onUpdate(todoItem.dataset.id, content, todoItem.dataset.status);
      }
    });
  }

  addEventListenerByType = type => {
    this.$todoList.addEventListener(type, event => this.selectCheckItem(event));
    this.$todoList.addEventListener(type, event => this.deleteItem(event));
  }

  render(items) {
    const template = items.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join("");
  };
}