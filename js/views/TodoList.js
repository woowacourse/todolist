import {todoListRender} from '../utils/Templates.js';
import {CLASS_TYPE, EVENT_TYPE, GUIDE_MESSAGE, TAG_TYPE} from "../utils/Constracts.js";

export class TodoList {
  constructor(onToggle, OnDelete) {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoList.addEventListener(EVENT_TYPE.CLICK, (event) => {
        this.onToggleHandler(event, onToggle)
        this.onDeleteHandler(event, OnDelete)
      }
    )
  }

  onToggleHandler(event, onToggle) {
    if (!event.target.classList.contains(CLASS_TYPE.TOGGLE)) {
      return;
    }
    onToggle(event.target.closest(TAG_TYPE.LI).dataset.id);
  }

  onDeleteHandler(event, OnDelete) {
    if (!event.target.classList.contains("destroy")) {
      return;
    }
    if (!confirm(GUIDE_MESSAGE.DELETE)) {
      return;
    }
    OnDelete(event.target.closest(TAG_TYPE.LI).dataset.id);
  }

  render(todoItems) {
    this.$todoList.innerHTML = todoItems.map(todoItem => todoListRender(todoItem)).join("");
  }
}

