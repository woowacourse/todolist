import {isEnterKey} from "./utils.js";

export default (setState, todoList) => {
  let count = 0;

  const $itemInput = document.querySelector("#new-todo-title");

  const inputItem = event => {
    const $newTodoTarget = event.target;
    if (isEnterKey(event)) {
      todoList.push({
        id: count++,
        title: $newTodoTarget.value,
        completed: false
      });
      $newTodoTarget.value = "";
      setState(todoList);
    }
  }

  $itemInput.addEventListener("keydown", event => inputItem(event));
}
