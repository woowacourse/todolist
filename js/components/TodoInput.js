export default class TodoInput {
  constructor({ addTodoHandler }) {
    this.$todoInput = document.querySelector("#new-todo-title");
    this.$todoInput.addEventListener("keydown", event => this.addTodo(event));
    this.addTodoHandler = addTodoHandler;
  }

  addTodo(event) {
    if (event.key === "Enter") {
      this.addTodoHandler(event.target.value);
      this.$todoInput.value = "";
    }
  }
}
