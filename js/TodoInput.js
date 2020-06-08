import { EVENT_TYPE, KEY_TYPE } from "./constants.js";

function TodoInput(onAdd) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener(EVENT_TYPE.KEYUP, (event) =>
    this.addTodoItem(event)
  );

  this.addTodoItem = (event) => {
    const $newTodoTarget = event.target;
    if (this.isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };

  this.isValid = function (event, s) {
    return !!(event.key === KEY_TYPE.ENTER && s.trim());
  };
}

export default TodoInput;
