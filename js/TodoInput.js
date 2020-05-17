function TodoInput({ onAdd }) {

  const $todoInput = document.querySelector("#new-todo-title");

  const onAddHandler = event => {
    if (event.key && event.key !== "Enter") {
      return;
    }
    const $eventTarget = event.target;
    if (!$eventTarget.value) {
      return;
    }
    onAdd($eventTarget.value);
    $eventTarget.value = "";
  };

  $todoInput.addEventListener("keypress", onAddHandler);
}

export default TodoInput;