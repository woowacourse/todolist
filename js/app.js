import {EVENT_TYPE, KEY_TYPE} from "./utils/constants.js";
import makeTodoItemTemplate from "./utils/templates.js";
import TodoItem from "./domain/todo-item.js"

function TodoApp() {
  
  const $todoTitleInput = document.getElementById("new-todo-title");
  
  const todoItems = [];

  const todoList = new TodoList();

  const addTodoTitle = todoTitle => {
    todoItems.push(new TodoItem(todoTitle));
    todoList.setState(todoItems);
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

  return {
    init
  };
};

function TodoList() {
  const $todoList = document.getElementById("todo-list");

  this.render = todoItems => {
    $todoList.innerHTML = todoItems.map(todoItem => makeTodoItemTemplate(todoItem)).join("");
  }
  
  this.setState = todoItems => {
    this.render(todoItems);
  }
}

new TodoApp().init();