import {EVENT_TYPE} from "../utils/constants.js";
import {Validator} from "../utils/Validator.js";

export const TodoInput = class {
  constructor({onAdd}) {
    this.$todoInput = document.querySelector("#new-todo-title");
    this.$todoInput.addEventListener(EVENT_TYPE.KEY_PRESS,
      event => this.addTodoItem(onAdd, event));
  }

  addTodoItem(onAdd, event) {
    const $newTodoTarget = event.target;
    const isNotEmpty = event.target.value !== "";
    if (Validator.isEnter(event) && isNotEmpty) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  }
};