import {TodoInput} from "./TodoInput.js";
import {TodoList} from "./TodoList.js";
import {TodoItem} from "./TodoItem.js";
import {TodoFilter} from "./TodoFilter.js";
import {TodoCount} from "./TodoCount.js";
import {TodoCheckBox} from "./TodoCheckBox.js";
import {TodoUpdate} from "./TodoUpdate.js";
import {TodoEdit} from "./TodoEdit.js";

// 부모 컴포넌트
function TodoApp() {
  const $todoList = document.querySelector("#todo-list");
  const $countContainer = document.querySelector(".count-container");

  this.todoItems = [];

  this.render = (updatedItems) => {
    const todoCount = new TodoCount();
    todoList.render(updatedItems);
    todoCount.showCount(updatedItems);
  };

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    this.render(updatedItems);
  };

  const todoList = new TodoList();

  new TodoInput({
    onAdd: (contents) => {
      const newTodoItem = new TodoItem(contents.name);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    },
  });

  const handleFilterButton = (event) => {
    const todoFilter = new TodoFilter();
    todoFilter.applyFilter(event, this.todoItems, this.render);
  };

  const handleUpdateLabel = (event) => {
    const todoUpdate = new TodoUpdate();
    todoUpdate.handleUpdate(event, this.todoItems, this.setState);
  };

  const handleEditLabel = (event) => {
    const todoEdit = new TodoEdit();
    todoEdit.handleEdit(event, this.todoItems, this.setState);
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
    const todoCheckBox = new TodoCheckBox();
    todoCheckBox.handleCheckBox(event, this.todoItems, this.setState);
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
