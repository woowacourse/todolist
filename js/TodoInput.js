export function TodoInput(onInputContents) {
  const $todoInput = document.querySelector("#new-todo-title");
  $todoInput.addEventListener("keyup", (event) => this.addItem(event));
  this.addItem = event => {
    const $target = event.target;
    if (this.isValid(event, $target.value)) {
      onInputContents($target.value);
      $target.value = "";
    }
  }
  this.isValid = (event, value) => {
    return event.key === "Enter" && value.trim().length !== 0;
  }
}
