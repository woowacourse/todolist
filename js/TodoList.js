import makeTodoItemTemplate from "./utils/templates.js";
import { EVENT_TYPE } from "./utils/constants.js";
import { Count } from "./Count.js"

export class TodoList {

  constructor({ onDelete, onComplete, onStartEditing, onSaveEditing, onCancleEditing }) {
    const $todoList = document.getElementById("todo-list");

    const countContainer = new Count();

    $todoList.addEventListener(EVENT_TYPE.CLICK, onDelete);
    $todoList.addEventListener(EVENT_TYPE.CLICK, onComplete);
    $todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, onStartEditing);
    $todoList.addEventListener(EVENT_TYPE.KEY_PRESS, onSaveEditing);
    $todoList.addEventListener(EVENT_TYPE.KEY_DOWN, onCancleEditing);

    this.render = todoItems => {
      $todoList.innerHTML = todoItems.map(todoItem => makeTodoItemTemplate(todoItem)).join("");
    };

    this.setState = todoItems => {
      this.render(todoItems);
      countContainer.setState(todoItems.length);
    };
  }
}