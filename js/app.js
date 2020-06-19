import {FILTER_TYPE, isEnterKey} from "./utils.js"
import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";

function TodoApp() {
  const $itemList = document.querySelector("#todo-list");
  const $itemFilters = document.querySelector(".filters");
  let currentFilter = FILTER_TYPE.ALL;

  this.todoItems = [];

  const findItemByFilter = (allItem, filterState) => {
    if (filterState === FILTER_TYPE.ALL) {
      return allItem;
    } else if (filterState === FILTER_TYPE.COMPLETED) {
      return allItem.filter(item => item.completed);
    }
    return allItem.filter(item => !item.completed);
  }

  this.render = () => {
    return TodoList(findItemByFilter(this.todoItems, currentFilter));
  }

  this.setState = (todoItems) => {
    this.todoItems = todoItems;
    this.render();
  }

  TodoInput(this.setState, this.todoItems);

  this.clickItem = event => {
    const $target = event.target;
    const targetItem = findTargetItem($target);

    if ($target.classList.contains("destroy")) {
      const index = this.todoItems.indexOf(targetItem);
      this.todoItems.splice(index, 1);
      TodoList(this.todoItems);
    } else if ($target.classList.contains("label")) {
      $target.closest("li").classList.add("editing")
    } else if ($target.classList.contains("toggle")) {
      $target.closest("li").classList.toggle("completed")
      targetItem.completed = $target.closest('li').classList.contains('completed');
    }
  }

  const findTargetItem = $target => {
    const targetId = Number($target.closest("li").dataset.id);
    return this.todoItems.find((item) => item.id === targetId);
  }

  this.updateItem = event => {
    const $target = event.target;
    if (isEnterKey(event)) {
      const targetItem = findTargetItem($target);
      targetItem.title = $target.value;
      $target.closest("li").classList.remove("editing");
      TodoList(findItemByFilter(this.todoItems, currentFilter));
    }
  }

  this.clickFilter = event => {
    const $target = event.target;
    const $selected = document.querySelector(".selected");
    $selected.classList.toggle("selected", false);
    $target.classList.add("selected");

    if ($target.classList.contains("all")) {
      currentFilter = FILTER_TYPE.ALL;
    } else if ($target.classList.contains("completed")) {
      currentFilter = FILTER_TYPE.COMPLETED;
    } else if ($target.classList.contains("active")) {
      currentFilter = FILTER_TYPE.ACTIVE;
    }

    TodoList(findItemByFilter(this.todoItems, currentFilter));
  }

  this.init = () => {
    $itemList.addEventListener("click", event => this.clickItem(event));
    $itemList.addEventListener("keydown", event => this.updateItem(event));
    $itemFilters.addEventListener("click", event => this.clickFilter(event));
  }
}

const todoApp = new TodoApp();
todoApp.init();
