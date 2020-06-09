import {EVENT_TYPE, KEY_TYPE} from "./utils/constants.js";
import makeTodoItemTemplate from "./utils/templates.js";
import TodoItem from "./domain/todo-item.js"

function TodoApp() {
  
  const todoItems = [];

  const todoInput = new TodoInput({ onAdd: onAdd });

  const todoList = new TodoList({ onDelete: onDelete, onComplete: onComplete });

  function remove(id) {
    for (let index in todoItems) {
      if (todoItems[index].id + "" === id + "") {
        todoItems.splice(index, 1);
      }
    }
    todoList.setState(todoItems);
  }

  function onDelete(event) {
    if (!event.target.classList.contains("destroy")) {
      return;
    }
    remove(event.target.dataset.id);
  }

  function complete(id) {
    for (let index in todoItems) {
      console.log("## index");
      console.log(index);
      console.log("## id");
      console.log(id);
      if (todoItems[index].id + "" === id + "") {
        todoItems[index].completed = true;
      }
    }
    todoList.setState(todoItems);
  }

  function onComplete(event) {
    if (!event.target.classList.contains("complete")) {
      return;
    }
    complete(event.target.dataset.id);
  }

  function add(todoTitle) {
    todoItems.push(new TodoItem(todoTitle));
    todoList.setState(todoItems);
    todoInput.clear();
  };

  function onAdd (event, todoTitle) {
    if (event.key !== KEY_TYPE.ENTER) {
      return;
    }
    add(todoTitle);
  };
};

class TodoInput {

  constructor({ onAdd }) {
    const $todoTitleInput = document.getElementById("new-todo-title");
    
    $todoTitleInput.addEventListener(
      EVENT_TYPE.KEY_PRESS, 
      event => { 
        onAdd(event, $todoTitleInput.value);
      }
    );

    this.clear = () => {
      $todoTitleInput.value = "";
    }
  }
}

class TodoList {

  constructor({ onDelete, onComplete }) {
    const $todoList = document.getElementById("todo-list");

    $todoList.addEventListener(EVENT_TYPE.CLICK, onDelete);
    $todoList.addEventListener(EVENT_TYPE.CLICK, onComplete);

    this.render = todoItems => {
      $todoList.innerHTML = todoItems.map(todoItem => makeTodoItemTemplate(todoItem)).join("");
    };

    this.setState = todoItems => {
      this.render(todoItems);
    };
  }
}

new TodoApp();