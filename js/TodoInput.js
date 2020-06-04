// 입력 받는 컴포넌트
export function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener("keydown", event => this.addTodoItem(event));

  this.isValid = function (event, value) {
    return event.key === 'Enter' && value.trim() !== '';
  }

  this.addTodoItem = event => {
    const $newTodoTarget = event.target;
    if (this.isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };
}
