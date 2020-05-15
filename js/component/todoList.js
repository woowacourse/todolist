export function TodoList(completeItem, deleteItem) {
  const $todoList = document.querySelector("#todo-list");

  this.render = (template) => {
    $todoList.innerHTML = template;
  };

  this.completeToggleHandler = (event) => {
    const $target = event.target;
    if ($target.classList.contains("toggle")) {
      const selectedItem = $target.closest("li");
      const itemId = selectedItem.dataset.itemId;
      completeItem(itemId);
    }
  };

  this.deleteHandler = (event) => {
    const $target = event.target;
    if ($target.classList.contains("destroy")) {
      const selectedItem = $target.closest("li");
      const itemId = selectedItem.dataset.itemId;
      deleteItem(itemId);
    }
  };

  $todoList.addEventListener("click", this.completeToggleHandler);
  $todoList.addEventListener("click", this.deleteHandler);
}
