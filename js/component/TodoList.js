export function TodoList(toggleComplete, deleteItem, toggleEdit, saveEdit) {
  const $todoList = document.querySelector("#todo-list");

  this.render = (template) => {
    $todoList.innerHTML = template;
  };

  this.completeToggleHandler = (event) => {
    const $target = event.target;
    if ($target.classList.contains("toggle")) {
      const selectedItem = $target.closest("li");
      const itemId = selectedItem.dataset.itemId;
      toggleComplete(itemId);
    }
  };

  this.deleteToggleHandler = (event) => {
    const $target = event.target;
    if ($target.classList.contains("destroy")) {
      const selectedItem = $target.closest("li");
      const itemId = selectedItem.dataset.itemId;
      deleteItem(itemId);
    }
  };

  this.editToggleHandler = (event) => {
    const $target = event.target;
    if (!$target.classList.contains("toggle") && !$target.classList.contains("destroy")) {
      const selectedItem = $target.closest("li");
      const itemId = selectedItem.dataset.itemId;
      toggleEdit(itemId);
    }
  };

  this.saveEditHandler = (event) => {
    const $target = event.target;
    if (event.key === "Enter" && $target.classList.contains("edit")) {
      const selectedItem = $target.closest("li");
      const itemId = selectedItem.dataset.itemId;
      const content = $target.value;
      saveEdit(itemId, content);
    }
  };

  this.cancelEditHandler = (event) => {
    const $target = event.target;
    if (event.key === "Escape" && $target.classList.contains("edit")) {
      const selectedItem = $target.closest("li");
      const itemId = selectedItem.dataset.itemId;
      toggleEdit(itemId);
    }
  };

  $todoList.addEventListener("click", this.completeToggleHandler);
  $todoList.addEventListener("click", this.deleteToggleHandler);
  $todoList.addEventListener("dblclick", this.editToggleHandler);
  $todoList.addEventListener("keyup", this.saveEditHandler);
  $todoList.addEventListener("keyup", this.cancelEditHandler);
}
