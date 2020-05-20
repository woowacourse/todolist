export function TodoInput(addItem) {
  const $todoInput = document.querySelector("#new-todo-title");

  this.addItemEventHandler = (event) => {
    if (event.key === "Enter") {
      const content = $todoInput.value;
      if (content) {
        addItem($todoInput.value);
        $todoInput.value = "";
        return;
      }
      alert("값을 입력해주세요.");
    }
  };

  $todoInput.addEventListener("keyup", this.addItemEventHandler);
}