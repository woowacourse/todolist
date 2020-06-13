import {EVENT_TYPE, KEY} from "../utils/constants.js";


export function TodoInput({ onAdd }) { //자식 컴포넌트에서는 부모 컴포넌트에서 관리하는 onAdd 메서드를 사용하기만 함
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener(EVENT_TYPE.KEY_DOWN, event => this.addTodoItem(event));

  this.isValid = (event, value) => {
    return event.key === KEY.ENTER && value.trim() !== '';
  }

  this.addTodoItem = event => {
    const $newTodoTarget = event.target;
    if (this.isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };
}
