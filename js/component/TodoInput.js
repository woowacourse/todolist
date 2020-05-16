export function TodoInput(addItem) {
  const $todoInput = document.querySelector("#new-todo-title");

  this.addItemEventHandler = (event) => {
    if (event.key === "Enter") {
      // TODO: Add input validation
      addItem($todoInput.value);
      $todoInput.value = "";
    }
  };

  $todoInput.addEventListener("keyup", this.addItemEventHandler);
}