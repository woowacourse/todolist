export function TodoInput({addItem}) {
  this.$todoInput = document.querySelector("#new-todo-title");

  this.addItemEventHandler = (event) => {
    if (event.key === "Enter") {
      // TODO: Add input validation
      addItem(this.$todoInput.value);
      this.$todoInput.value = "";
    }
  };
  this.$todoInput.addEventListener("keyup", this.addItemEventHandler);
}