import {EVENT_TYPE, KEY_TYPE} from "../utils/constans.js";

export const TodoInput = function ({onAdd}) {
  const $todoInput = document.querySelector("#new-todo-title");

  const addTodoItem = event => {
    const $newTodoTarget = event.target;
    if (isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };

  const isValid = function (event, value) {
    const isEnter = event.key === KEY_TYPE.ENTER;
    const isNotEmpty = value !== "";
    return isEnter && isNotEmpty;
  }

  const init = () => {
    $todoInput.addEventListener(EVENT_TYPE.KEY_PRESS, event => addTodoItem(event));
  }

  init();
}