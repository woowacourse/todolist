import {EVENT_TYPE, KEY_TYPE} from "./utils/constants.js";
import makeTodoItemTemplate from "./utils/templates.js";

const $todoTitleInput = document.getElementById("new-todo-title");
const $todoList = document.getElementById("todo-list");

const addTodoTitle = todoTitle => {
  $todoList.insertAdjacentHTML("beforeend", makeTodoItemTemplate(todoTitle))
};

const onAddTodo = (event, todoTitle) => {
  if (event.key !== KEY_TYPE.ENTER) {
    return;
  }
  addTodoTitle(todoTitle);
  $todoTitleInput.value = "";
};

const init = () => {
  $todoTitleInput.addEventListener(
    EVENT_TYPE.KEY_PRESS, 
    event => onAddTodo(event, $todoTitleInput.value)
  );
};

init();