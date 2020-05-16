import { TodoInput } from './TodoInput.js';
import { TodoList } from './TodoList.js';
import { TodoItem } from './TodoItem.js';

function TodoApp() {
  const $todoList = document.querySelector("#todo-list");
  const $count = document.querySelector(".todo-count");
  const $all = document.querySelector(".all");
  const $active = document.querySelector(".active");
  const $completed = document.querySelector(".completed");

  this.todoItems = [];

  const showList = (list) => {
    todoList.setState(list);
    $count.innerHTML = `총 <strong>${list.length}</strong> 개`;
  }

  const todoList = new TodoList()

  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    showList(this.todoItems);
  };

  new TodoInput({
    onAdd: newTodoName => {
      const newTodoItem = new TodoItem(null, newTodoName, false);
      const updatedList = [...this.todoItems, newTodoItem];
      this.setState(updatedList);
    }
  });

  const uncheckItem = ($classList, index) => {
    $classList.remove("completed");
    this.todoItems[index].isCompleted = false;
  }

  const checkItem = ($classList, index) => {
    $classList.toggle("completed");
    this.todoItems[index].isCompleted = true;
  }

  const clickCheckBox = event => {
    const $target = event.target;
    if ($target.type !== "checkbox") {
      return;
    }
    const $list = $target.closest("li");
    const $classList = $list.classList;
    const nodes = Array.from($todoList.children);
    let index = nodes.indexOf($list);

    $classList.contains("completed") ? uncheckItem($classList, index)
      : checkItem($classList, index);
  };

  const clickDeleteBtn = event => {
    const $target = event.target;
    if (!$target.classList.contains("destroy")) {
      return;
    }
    event.preventDefault();
    if (confirm("삭제하시겠습니까?")) {
      const $list = $target.previousElementSibling;
      const updatedList = [...this.todoItems].filter(todoItem => todoItem.content !== $list.innerText);
      this.setState(updatedList);
    }
  };

  const switchToEditMode = event => {
    event.preventDefault();
    const $list = event.target.closest("li");
    $list.classList.toggle("editing");
  };

  const switchToViewMode = event => {
    if (event.keyCode !== 27) {
      return;
    }
    document.getSelection().anchorNode.classList.remove("editing");
  };

  const showAllItems = event => {
    event.preventDefault();
    showList(this.todoItems);
  }

  const showActiveItems = event => {
    event.preventDefault();
    const list = [...this.todoItems].filter(todoItem => todoItem.isCompleted === false);
    showList(list);
  }

  const showCompletedItems = event => {
    event.preventDefault();
    const list = [...this.todoItems].filter(todoItem => todoItem.isCompleted === true);
    showList(list);
  }

  const initEventListener = () => {
    $todoList.addEventListener('click', clickCheckBox);
    $todoList.addEventListener('click', clickDeleteBtn);
    $todoList.addEventListener('dblclick', switchToEditMode);
    $todoList.addEventListener('keydown', switchToViewMode);
    $all.addEventListener('click', showAllItems);
    $active.addEventListener('click', showActiveItems);
    $completed.addEventListener('click', showCompletedItems);
  };

  this.init = () => {
    initEventListener();
  };
}

const app = new TodoApp();
app.init();
