import {todoItem} from "../utils/templates.js";
import {EVENT_TYPE, INSERT_LOCATION, KEY_TYPE} from "../utils/constants.js";

const _localStorage = window.localStorage;
let todoItems = [];

function TodoApp() {
  const $todoInput = document.querySelector("#new-todo-title");
  const $todoList = document.querySelector("#todo-list");

  const onAddTodoItemHandler = event => {
    const todoValue = $todoInput.value;
    if (event.key === KEY_TYPE.ENTER && todoValue.trim() !== "") {
      $todoList.insertAdjacentHTML(INSERT_LOCATION.BEFORE_END, todoItem(todoValue));
      todoItems.push(todoValue);
      localStorage.setItem("todos", JSON.stringify(todoItems));
      $todoInput.value = "";

      console.log(localStorage.getItem("todos"));
    }
  }

  const initItemList = () => {
    todoItems = JSON.parse(_localStorage.getItem("todos"));
    if (!todoItems || !todoItems.length) {
      todoItems = [];
      return;
    }
    Array.from(todoItems).forEach(todo => {
      $todoList.insertAdjacentHTML(INSERT_LOCATION.BEFORE_END, todoItem(todo));
    });
  }

  const initEventListeners = () => {
    $todoInput.addEventListener(EVENT_TYPE.KEY_UP, onAddTodoItemHandler);
  }

  const init = () => {
    initItemList();
    initEventListeners();
  }

  return {
    init
  };
}

const todoApp = new TodoApp();
todoApp.init();