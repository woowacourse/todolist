import { isEnter } from '../utils/util.js';

function TodoInput({ onAdd }) {

  const $todoInput = document.querySelector("#new-todo-title");

  const onAddHandler = event => {
    if (isEnter(event)) {
      return;
    }
    const $eventTarget = event.target;
    if (!$eventTarget.value) {
      return;
    }
    onAdd($eventTarget.value);
    $eventTarget.value = "";
  };

  $todoInput.addEventListener("keypress", onAddHandler);
}

export default TodoInput;