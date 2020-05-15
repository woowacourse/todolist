export function TodoList(completeToggle) {
  const $todoList = document.querySelector("#todo-list");

  this.render = (template) => {
    $todoList.innerHTML = template;
  };

  this.completeToggleHandler = (event) => {
    const $target = event.target;
    if ($target.classList.contains("toggle")) {
      const selectedItem = $target.closest("li");
      const itemId = selectedItem.dataset.itemId;
      completeToggle(itemId);
    }
  };

  $todoList.addEventListener("click", this.completeToggleHandler);
}
