export function TodoList(toggleComplete, deleteItem, toggleEdit, saveEdit) {
  const $todoList = document.querySelector("#todo-list");

  this.render = (todoItems, todoFilter) => {
    const itemsTemplate = todoItems.map(item => item.getTemplate(todoFilter)).join("");
    $todoList.innerHTML = itemsTemplate;
  };

  this.completeToggleHandler = (event) => {
    const $target = event.target;
    if (!$target.classList.contains("toggle")) {
      return;
    }
    const selectedItem = $target.closest("li");
    const itemId = selectedItem.dataset.itemId;
    toggleComplete(itemId);
  };

  this.deleteToggleHandler = (event) => {
    const $target = event.target;
    if (!$target.classList.contains("destroy")) {
      return;
    }
    const selectedItem = $target.closest("li");
    const itemId = selectedItem.dataset.itemId;
    deleteItem(itemId);
  };

  this.editToggleHandler = (event) => {
    const $target = event.target;
    if (!$target.classList.contains("label")) {
      return;
    }
    const selectedItem = $target.closest("li");
    const itemId = selectedItem.dataset.itemId;
    toggleEdit(itemId);
  };

  this.saveEditHandler = (event) => {
    if (event.key !== "Enter") {
      return;
    }
    const $target = event.target;
    if (!$target.classList.contains("edit")) {
      return;
    }
    const selectedItem = $target.closest("li");
    const itemId = selectedItem.dataset.itemId;
    const content = $target.value;
    saveEdit(itemId, content);
  };

  this.cancelEditHandler = (event) => {
    if (event.key !== "Escape") {
      return;
    }
    const $target = event.target;
    if (!$target.classList.contains("edit")) {
      return;
    }
    const selectedItem = $target.closest("li");
    const itemId = selectedItem.dataset.itemId;
    toggleEdit(itemId);
  };

  $todoList.addEventListener("click", this.completeToggleHandler);
  $todoList.addEventListener("click", this.deleteToggleHandler);
  $todoList.addEventListener("dblclick", this.editToggleHandler);
  $todoList.addEventListener("keyup", this.saveEditHandler);
  $todoList.addEventListener("keyup", this.cancelEditHandler);
}
