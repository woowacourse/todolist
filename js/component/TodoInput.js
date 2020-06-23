import {EVENT_TYPE} from "../utils/constans.js";
import {Validator} from "../utils/Validator.js";

export const TodoInput = class {
  constructor({onAdd}) {
    this.$todoInput = document.querySelector("#new-todo-title");
    this.$todoInput.addEventListener(EVENT_TYPE.KEY_PRESS, this.addTodoItem.bind(this));
    this.addTodoHandler = onAdd;
  }

  addTodoItem(event) {
    const $newTodoTarget = event.target;
    const isNotEmpty = event.target.value !== "";
    if (Validator.isEnter(event) && isNotEmpty) {
      this.addTodoHandler($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  }
};