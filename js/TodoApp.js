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

  const ShowCount = (items) => {
    $count.innerHTML = `총 <strong>${items.length}</strong> 개`;
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

    const $allButton = document.querySelector(".all");
    const $activeButton = document.querySelector(".active");
    const $completedButton = document.querySelector(".completed");

    $allButton.classList.remove("selected");
    $activeButton.classList.remove("selected");
    $completedButton.classList.remove("selected");

    if ($target.classList.contains("all")) {
      $allButton.classList.add("selected");
      this.render(this.todoItems);
    }

    if ($target.classList.contains("active")) {
      const filtered = this.todoItems.filter(function (item) {
        return !item.isCompleted;
      });
      $activeButton.classList.add("selected");
      this.render(filtered);
    }

    if ($target.classList.contains("completed")) {
      const filtered = this.todoItems.filter(function (item) {
        return item.isCompleted;
      });
      $completedButton.classList.add("selected");
      this.render(filtered);
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
