import template from "./TodoItem.js";
import { CLASSNAME, EVENT, KEY, TAG } from "../util/constants.js";

class TodoList {
  constructor(items, { toggleCompleteHandler, deleteHandler, toggleEditingHandler, editHandler }) {
    this.$todoList = document.querySelector("#todo-list");
    this.render(items);
    this.addEventListeners(
      this.$todoList,
      toggleCompleteHandler,
      deleteHandler,
      toggleEditingHandler,
      editHandler
    );
  }

  render(items) {
    this.$todoList.innerHTML = items.map(item => template(item)).join("");
  }

  addEventListeners(todoList, toggleCompleteHandler, deleteHandler, toggleEditingHandler, editHandler) {
    todoList.addEventListener(EVENT.CLICK, event => {
      this.toggleListener(event, toggleCompleteHandler, deleteHandler);
    });
    todoList.addEventListener(EVENT.DOUBLE_CLICK, event => {
      this.toggleEditingListener(event, toggleEditingHandler);
    });
    todoList.addEventListener(EVENT.KEY_UP, event => {
      this.editListener(event, editHandler, toggleEditingHandler);
    });
  }

  toggleListener(event, toggleCompleteHandler, deleteHandler) {
    if (event.target.classList.contains(CLASSNAME.TOGGLE)) {
      toggleCompleteHandler(this.getId(event));
    }
    if (event.target.classList.contains(CLASSNAME.DESTROY)) {
      deleteHandler(this.getId(event));
    }
  }

  toggleEditingListener(event, toggleEditingHandler) {
    if (event.target.tagName === TAG.LABEL) {
      toggleEditingHandler(this.getId(event));
    }
  }

  editListener(event, editHandler) {
    if (event.target.tagName === TAG.INPUT) {
      if (event.key === KEY.ENTER) {
        editHandler(this.getId(event), event.target.value);
      }
      if (event.key === KEY.ESC) {
        editHandler(this.getId(event), this.getPreviousValue(event));
      }
    }
  }

  getId(event) {
    return event.target.closest("li").dataset.id;
  }

  getPreviousValue(event) {
    return event.target.closest("li").querySelector("label").innerText;
  }
}

export default TodoList;
