export function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener("keyup", event => this.addTodoItem(event));

  this.addTodoItem = event => {
    const $newTodoTarget = event.target;
    if (this.isValid(event, $newTodoTarget.value)) {
      event.preventDefault();
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };

  this.isValid = (event, title) => {
    return event.key === "Enter" && !!title;
  }
}