export function TodoInput(addItem) {
  const $todoInput = document.querySelector("#new-todo-title");

  const initInput = () => {
    $todoInput.value = "";
  };

  this.addItemEventHandler = (event) => {
    if (event.key !== "Enter") {
      return;
    }
    const content = $todoInput.value;
    if (!content) {
      alert("값을 입력해주세요.");
      return;
    }
    addItem(content);
    initInput();
  };

  $todoInput.addEventListener("keyup", this.addItemEventHandler);
}