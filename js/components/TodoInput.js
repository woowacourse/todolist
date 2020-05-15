import { EVENT, KEY } from "../util/constants.js";

export default class TodoInput {
  constructor({ addTodoHandler }) {
    this.$todoInput = document.querySelector("#new-todo-title");
    this.$todoInput.addEventListener(EVENT.KEY_UP, event => this.addTodo(event));
    this.addTodoHandler = addTodoHandler;
  }

  addTodo(event) {
    if (event.key === KEY.ENTER) {
      this.addTodoHandler(event.target.value);
      this.$todoInput.value = "";
    }
  }
}
