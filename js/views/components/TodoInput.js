import { ERROR_MESSAGE, KEY_TYPE } from '../../utils/constants.js';

export function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener("keydown", event => this.addTodoItem(event));

  this.isValid = (event, value) => {
    if (event.key && event.key !== KEY_TYPE.ENTER) {
      return false;
    }

    if (!value) {
      alert(ERROR_MESSAGE.EMPTY)
      return false;
    }
    return true;
  }

  this.addTodoItem = event => {
    const $newTodoTarget = event.target;

    if (this.isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };
}