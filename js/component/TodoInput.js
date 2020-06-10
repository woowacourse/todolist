import {KEY_TYPE, EVENT_TYPE} from "../constant/event.js";
import {ERROR_MESSAGE} from "../constant/event.js";

export function TodoInput(addItem) {
  const $todoInput = document.querySelector("#new-todo-title");

  const initInput = () => {
    $todoInput.value = '';
  };

  this.addItemEventHandler = (event) => {
    if (event.key !== KEY_TYPE.ENTER) {
      return;
    }
    const content = $todoInput.value;
    if (!content) {
      alert(ERROR_MESSAGE.NEED_INPUT);
      return;
    }
    addItem(content);
    initInput();
  };

  $todoInput.addEventListener(EVENT_TYPE.KEY_UP, this.addItemEventHandler);
}