import {TodoInput} from "./TodoInput.js";
import {TodoList} from "./TodoList.js";
import {TodoItem} from "./TodoItem.js";

// 부모 컴포넌트
function TodoApp() {
  const $todoList = document.querySelector("#todo-list");
  const $count = document.querySelector(".todo-count");
  const $countContainer = document.querySelector(".count-container");

  this.todoItems = [];

  this.render = (updatedItems) => {
    todoList.render(updatedItems);
    ShowCount(updatedItems);
  };

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    this.render(updatedItems);
  };

  const todoList = new TodoList();

  const ShowCount = (updatedItems) => {
    $count.innerHTML = `총 <strong>${updatedItems.length}</strong> 개`;
  };

  new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(contents.name);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    },
  });

  const handleFilterButton = (event) => {
    const $target = event.target;
    if ($target.classList.contains("all")) {
      this.render(this.todoItems);
      $countContainer.innerHTML = `
      <span class="todo-count">총 <strong>0</strong> 개</span>
    <ul class="filters">
      <li>
        <a class="all selected" href="#/">전체보기</a>
      </li>
      <li>
        <a class="active" href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="completed" href="#/completed">완료한 일</a>
      </li>
    </ul>`;
    }

    if ($target.classList.contains("active")) {
      const filtered = this.todoItems.filter(function (item) {
        return !item.isCompleted;
      });
      this.render(filtered);
      $countContainer.innerHTML = `
      <span class="todo-count">총 <strong>0</strong> 개</span>
    <ul class="filters">
      <li>
        <a class="all" href="#/">전체보기</a>
      </li>
      <li>
        <a class="active selected" href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="completed" href="#/completed">완료한 일</a>
      </li>
    </ul>`;
    }

    if ($target.classList.contains("completed")) {
      const filtered = this.todoItems.filter(function (item) {
        return item.isCompleted;
      });
      this.render(filtered);
      $countContainer.innerHTML = `
      <span class="todo-count">총 <strong>0</strong> 개</span>
    <ul class="filters">
      <li>
        <a class="all" href="#/">전체보기</a>
      </li>
      <li>
        <a class="active" href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="completed selected" href="#/completed">완료한 일</a>
      </li>
    </ul>`;
    }
  };

  const handleUpdateLabel = (event) => {
    const $target = event.target;
    if (
      !$target.classList.contains("edit") ||
      (event.key !== "Enter" && event.key !== "Escape") ||
      $target.value.trim() === ""
    ) {
      return;
    }

    const $checkedItem = $target.closest("li");
    const updatingItems = this.todoItems.map((item) => {
      if (item.isEquals($checkedItem.dataset.itemId)) {
        if (event.key === "Escape") {
          return item.editingItem();
        }
        return item.updateItem($target.value);
      }
      return item;
    });

    this.setState(updatingItems);
  };

  const handleEditLabel = (event) => {
    const $target = event.target;
    if (!$target.classList.contains("label")) {
      return;
    }

    const $checkedItem = $target.closest("li");
    const editingItems = this.todoItems.map((item) => {
      if (item.isEquals($checkedItem.dataset.itemId)) {
        return item.editingItem();
      }
      return item;
    });

    this.setState(editingItems);
  };

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
    $todoList.addEventListener("dblclick", handleEditLabel);
    $todoList.addEventListener("keyup", handleUpdateLabel);
    $countContainer.addEventListener("click", handleFilterButton);
  }

  this.init = () => {
    initEventListener();
  };
}

const todoApp = new TodoApp();
todoApp.init();
