// 입력 받는 컴포넌트
export function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener("keyup", (event) => this.addTodoItem(event));

  this.isValid = function (event, value) {
    event.preventDefault();
    return event.key === "Enter" && value !== "";
  };

  this.addTodoItem = (event) => {
    const $newTodoTarget = event.target;
    if (this.isValid(event, $newTodoTarget.value)) {
      onAdd({
        name: $newTodoTarget.value,
      });
      $newTodoTarget.value = "";
    }
  };
}
