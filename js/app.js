import {EVENT_TYPE, KEY_TYPE} from "./utils/constants.js";
import makeTodoItemTemplate from "./utils/templates.js";
import TodoItem from "./domain/todo-item.js"

function TodoApp() {
  
  const $todoTitleInput = document.getElementById("new-todo-title");
  
  const todoItems = [];

  const todoList = new TodoList({
    onDelete: event => {
      if (!event.target.classList.contains("destroy")) {
        return;
      }
      remove(event.target.dataset.id);
      console.log("ondelete");
    }
  });

  const add = todoTitle => {
    todoItems.push(new TodoItem(todoTitle));
    todoList.setState(todoItems);
    document.querySelectorAll(".destroy")
  };

  const onAdd = (event, todoTitle) => {
    if (event.key !== KEY_TYPE.ENTER)    {
      return;
    }
    add(todoTitle);
    $todoTitleInput.value = "";
  };

  const remove = id => {
    for (let index in todoItems) {
      console.log("## remove")
      console.log(index)
      console.log(id)
      console.log(todoItems[index].id)
      if (todoItems[index].id + "" === id + "") {
        todoItems.splice(index, 1);
      }
    }
    todoList.setState(todoItems);
  }

  const init = () => {
    $todoTitleInput.addEventListener(
      EVENT_TYPE.KEY_PRESS, 
      event => onAdd(event, $todoTitleInput.value)
    );
  };

  return {
    init
  };
};

class TodoList {

  constructor({ onDelete }) {
    const $todoList = document.getElementById("todo-list");

    $todoList.addEventListener(EVENT_TYPE.CLICK, onDelete);

    this.render = todoItems => {
      $todoList.innerHTML = todoItems.map(todoItem => makeTodoItemTemplate(todoItem)).join("");
    };

    this.setState = todoItems => {
      this.render(todoItems);
    };
  }
}

new TodoApp().init();