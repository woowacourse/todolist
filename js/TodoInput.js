import { EVENT_TYPE } from "./utils/constants.js";

export class TodoInput {

  constructor({ onAdd }) {
    const $todoTitleInput = document.getElementById("new-todo-title");
    
    $todoTitleInput.addEventListener(
      EVENT_TYPE.KEY_PRESS, 
      event => { 
        onAdd(event, $todoTitleInput.value);
      }
    );

    this.clear = () => {
      $todoTitleInput.value = "";
    }
  }
}
