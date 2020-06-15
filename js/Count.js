export class Count {

  constructor() {
    const $todoCountValue = document.getElementById("todo-count-value");

    this.setState = todoCount => {
      this.render(todoCount);
    }

    this.render = todoCount => {
      $todoCountValue.innerHTML = todoCount;
    }
  }
}