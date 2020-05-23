import {EVENT_TYPE, KEY_TYPE} from "../../utils/constans.js";

export const TodoInput = function ({onAdd}) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener(EVENT_TYPE.KEY_PRESS, event => this.addTodoItem(event));

  this.addTodoItem = event => {
    const $newTodoTarget = event.target;
    if (this.isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };

  this.isValid = function (event, value) {
    const isEnter = event.key === KEY_TYPE.ENTER;
    const isNotEmpty = value !== "";
    return isEnter && isNotEmpty;
  }
}