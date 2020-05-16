import { EVENT_TYPE, KEY_TYPE } from '../utils/constants.js';

export default function TodoInput(todoInputMethods) {
  const $todoInput = document.querySelector('#new-todo-title');
  $todoInput.addEventListener(EVENT_TYPE.KEYPRESS, e => this.onPressEnterKey(e));

  this.onPressEnterKey = e => {
    if (e.key && e.key === KEY_TYPE.ENTER) {
      const $newTodoTarget = e.target;
      todoInputMethods.onAddItem($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  }
}