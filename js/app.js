import {EVENT_TYPE, KEY_TYPE} from "./utils/constants.js";
import makeTodoItemTemplate from "./utils/templates.js";
import TodoItem from "./domain/todo-item.js"

function TodoApp() {
  
  const todoItems = [];

  const todoInput = new TodoInput({ onAdd: onAdd });

  const todoList = new TodoList({
    onDelete: onDelete,
    onComplete: onComplete,
    onStartEditing: onStartEditing,
    onSaveEditing: onSaveEditing
  });

  function onAdd (event, todoTitle) {
    if (event.key !== KEY_TYPE.ENTER) {
      return;
    }
    add(todoTitle);
  };

  function add(todoTitle) {
    todoItems.push(new TodoItem(todoTitle));
    todoList.setState(todoItems);
    todoInput.clear();
  };

  function onDelete(event) {
    if (!event.target.classList.contains("destroy")) {
      return;
    }
    remove(event.target.dataset.id);
  }

  function remove(id) {
    for (let index in todoItems) {
      if (todoItems[index].id + "" === id + "") {
        todoItems.splice(index, 1);
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

  function complete(id) {
    for (let index in todoItems) {
      if (todoItems[index].id + "" === id + "") {
        todoItems[index].completed = true;
      }
    }
    todoList.setState(todoItems);
  }

  function onStartEditing(event) {
    event.preventDefault();
    if (!event.target.classList.contains("label")) {
      return;
    }
    startEditing(event.target.dataset.id);
  }

  function startEditing(id) {
    for (let index in todoItems) {
      if (todoItems[index].id + "" === id + "") {
        todoItems[index].isBeingEdited = true;
      }
    }
    todoList.setState(todoItems);
  }

  function onSaveEditing(event) {
    if (!(event.target.classList.contains("edit") && event.key === KEY_TYPE.ENTER)) {
      return;
    }
    saveEditing(event.target.dataset.id, event.target.value);
  }

  function saveEditing(id, newTodoTitle) {
    for (let index in todoItems) {
      if (todoItems[index].id + "" === id + "") {
        todoItems[index].title = newTodoTitle;
        todoItems[index].isBeingEdited = false;
      }
    }
    todoList.setState(todoItems);
  }
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

  constructor({ onDelete, onComplete, onStartEditing, onSaveEditing }) {
    const $todoList = document.getElementById("todo-list");

    $todoList.addEventListener(EVENT_TYPE.CLICK, onDelete);
    $todoList.addEventListener(EVENT_TYPE.CLICK, onComplete);
    $todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, onStartEditing);
    $todoList.addEventListener(EVENT_TYPE.KEY_PRESS, onSaveEditing);

    this.render = todoItems => {
      $todoList.innerHTML = todoItems.map(todoItem => makeTodoItemTemplate(todoItem)).join("");
    };

    this.setState = todoItems => {
      this.render(todoItems);
    };
  }
}

new TodoApp();