import {EVENT_TYPE, KEY_TYPE} from "../utils/constans.js";

export const TodoInput = class {
  constructor({onAdd}) {
    this.todoId = 0;
    this.$todoInput = document.querySelector("#new-todo-title");
    this.$todoInput.addEventListener(EVENT_TYPE.KEY_PRESS, this.addTodoItem.bind(this));
    this.addTodoHandler = onAdd;
  }

  addTodoItem(event) {
    const $newTodoTarget = event.target;
    if (this.isValid(event)) {
      const item = {
        id: `${this.todoId++}`,
        value: $newTodoTarget.value,
        isCompleted: false
      }
      this.addTodoHandler(item);
      $newTodoTarget.value = "";
    }
  };

  isValid(event) {
    const isEnter = event.key === KEY_TYPE.ENTER;
    const isNotEmpty = event.target.value !== "";

    return isEnter && isNotEmpty;
  }
}