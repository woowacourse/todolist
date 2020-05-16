import { TodoInput } from "./TodoInput.js";
import { TodoList } from "./TodoList.js";
import { TodoItem } from "./TodoItem.js";

// 부모 컴포넌트
function TodoApp() {
  const $count = document.querySelector(".todo-count");

  this.todoItems = [];

  this.setState = (updatedItems) => {
    // this.todoItems = updatedItems;
    todoList.setState(updatedItems);
  };

  const todoList = new TodoList();

  const ShowList = () => {
    $count.innerHTML = `총 <strong>${this.todoItems.length}</strong> 개`;
  };

  new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
      ShowList();
    },
  });

  function initEventListener() {
    console.log("hi");
  }

  this.init = () => {
    initEventListener();
  };
}

const todoApp = new TodoApp();
todoApp.init();
