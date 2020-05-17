export function TodoListCheckBox({ onCheck }) {
  const $todoList = document.querySelector("#todo-list");

  $todoList.addEventListener('click', event => this.clickCheckBox(event));

  this.clickCheckBox = event => {
    const $target = event.target;
    if ($target.type !== "checkbox") {
      return;
    }

    onCheck($target.closest("li").id);
  }
}