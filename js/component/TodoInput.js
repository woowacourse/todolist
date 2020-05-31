import { EVENT_TYPE, KEY } from '../../util/constants.js';

export function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener(EVENT_TYPE.KEYDOWN, event => this.addTodoItem(event));

  this.addTodoItem = event => {
    const $newTodoTarget = event.target;
    if (this.isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };

  this.isValid = (event, title) => {
    return event.key === KEY.ENTER && title.trim() !== "";
  }
}
