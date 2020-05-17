function TodoList({ onRemove, onUpdate, onCompleted }) {
  const $todoList = document.querySelector("#todo-list");

  const setState = todos => {
    this.todos = todos;
    this.render(todos);
  }

  this.render = (todos) => {
    $todoList.innerHTML = todos.map(todo => todo.todoItemTemplate()).join("");
  }

  const onRemoveHandler = event => {
    if (event.target.classList.contains("destroy")) {
      const $todoItem = event.target.closest("li");
      const id = parseInt($todoItem.dataset.id);
      onRemove(id);
    }
  }

  const onCompletedHandler = event => {
    if (event.target.classList.contains("toggle")) {
      const $todoItem = event.target.closest("li");
      const id = parseInt($todoItem.dataset.id);
      onCompleted(id);
    }
  }

  const onFinishEditingHandler = event => {
    if (event.key && event.key !== "Enter") {
      return;
    }
    if (event.target.classList.contains("edit")) {
      const $todoItem = event.target.closest("li");
      const id = parseInt($todoItem.dataset.id);
      const content = event.target.value;
      onUpdate(id, content);
    }
  }

  const onEditHandler = event => {
    const $todoItem = event.target.closest("li");
    if(!$todoItem.classList.contains("editing")) {
      $todoItem.classList.add("editing");
      const $editInput = $todoItem.querySelector(".edit");
      $editInput.addEventListener("keypress", onFinishEditingHandler);
      $editInput.focus();
    }
  }

  $todoList.addEventListener("click", onRemoveHandler);
  $todoList.addEventListener("dblclick", onEditHandler);
  $todoList.addEventListener("click", onCompletedHandler);

  return {
    setState,
  }
}

export default TodoList;