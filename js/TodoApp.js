import { TodoInput } from "./TodoInput.js";
import { TodoList } from "./TodoList.js";
import { TodoItem } from "./TodoItem.js";

// 부모 컴포넌트
function TodoApp() {
  const $todoList = document.querySelector("#todo-list");
  const $count = document.querySelector(".todo-count");

  this.todoItems = [];

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    todoList.setState(updatedItems);
  };

  const todoList = new TodoList();

  const ShowList = () => {
    $count.innerHTML = `총 <strong>${this.todoItems.length}</strong> 개`;
  };

  new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(contents.name);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
      ShowList();
    },
  });

  const handleDeleteButton = (event) => {
    const $target = event.target;
    if (!$target.classList.contains("destroy")) {
      return;
    }

    const $checkedItem = $target.closest("li");

    const deletedItems = this.todoItems.map((item) => {
      if (item.isEquals($checkedItem.dataset.itemId)) {
        return;
      }
      return item;
    });

    const filtered = deletedItems.filter(function (el) {
      return el != null;
    });

    this.setState(filtered);
  };

  const handleCheckBox = (event) => {
    const $target = event.target;
    if (!$target.classList.contains("toggle")) {
      return;
    }

    const $checkedItem = $target.closest("li");
    const updatedItems = this.todoItems.map((item) => {
      if (item.isEquals($checkedItem.dataset.itemId)) {
        return item.completedToggle();
      }
      return item;
    });

    this.setState(updatedItems);
  };

  function initEventListener() {
    $todoList.addEventListener("click", handleCheckBox);
    $todoList.addEventListener("click", handleDeleteButton);
  }

  this.init = () => {
    initEventListener();
  };
}

const todoApp = new TodoApp();
todoApp.init();
