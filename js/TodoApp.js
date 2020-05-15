import { TodoInput } from './TodoInput.js';
import { TodoList } from './TodoList.js';
import { TodoItem } from './TodoItem.js';

function TodoApp() {
  const $todoList = document.querySelector("#todo-list");
  const $countContainer = document.querySelector(".count-container");
  const $count = document.querySelector(".todo-count");
  let isEditMode = false;

  this.todoItems = [];

  const todoList = new TodoList()

  this.setState = newTodoItem => {
    this.todoItems = [...this.todoItems, newTodoItem];
    todoList.setState(this.todoItems);
    $count.innerHTML = `총 <strong>${this.todoItems.length}</strong> 개`;
  };

  new TodoInput({
    onAdd: newTodoName => {
      const newTodoItem = new TodoItem(newTodoName, null);
      this.setState(newTodoItem);
    }
  });

  const findIndex = (nodes, $list) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i] === $list) {
        return i;
      }
    }
  }

  const clickCheckBox = event => {
    const $target = event.target;
    if ($target.type !== "checkbox") {
      return;
    }
    const $list = $target.closest("li");
    const $classList = $list.classList;
    const nodes = $todoList.childNodes;
    let index = findIndex(nodes, $list);

    if ($classList.contains("completed")) {
      $classList.remove("completed");
      this.todoItems[index].completed = null;
    } else {
      $classList.toggle("completed");
      this.todoItems[index].completed = "completed";
    }
  };

  const clickDeleteBtn = event => {
    const $target = event.target;
    if (!$target.classList.contains("destroy")) {
      return;
    }
    event.preventDefault();
    if (confirm("삭제하시겟습니까?")) {
      const $list = $target.closest("li");
      $list.remove();
    }
  };

  const switchToEditMode = event => {
    event.preventDefault();
    const $list = event.target.closest("li");
    $list.classList.toggle("editing");
    isEditMode = true;
  };

  const switchToViewMode = event => {
    if (!isEditMode || event.keyCode !== 27) {
      return;
    }
    document.getSelection().anchorNode.classList.remove("editing");
  };

  const showItems = event => {
    const $target = event.target;
    let list;
    if ($target.classList.contains("all")) {
      todoList.setState(this.todoItems);
      $count.innerHTML = `총 <strong>${this.todoItems.length}</strong> 개`;
    }
    if ($target.classList.contains("active")) {
      list = [...this.todoItems].filter(todoItem => todoItem.completed === null);
      todoList.setState(list);
      $count.innerHTML = `총 <strong>${list.length}</strong> 개`;
    }
    if ($target.classList.contains("completed")) {
      list = [...this.todoItems].filter(todoItem => todoItem.completed === "completed");
      todoList.setState(list);
      $count.innerHTML = `총 <strong>${list.length}</strong> 개`;
    }
  }

  const initEventListener = () => {
    $todoList.addEventListener('click', clickCheckBox);
    $todoList.addEventListener('click', clickDeleteBtn);
    $todoList.addEventListener('dblclick', switchToEditMode);
    $todoList.addEventListener('keydown', switchToViewMode);
    $countContainer.addEventListener('click', showItems);
  };

  this.init = () => {
    initEventListener();
  };
}

const app = new TodoApp();
app.init();
