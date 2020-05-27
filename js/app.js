import {completedItemTemplate, todoItemTemplate} from "./templates.js"
import {FILTER_TYPE, isEnterKey} from "./utils.js"

function TodoApp() {
  const $itemInput = document.querySelector("#new-todo-title");
  const $itemList = document.querySelector("#todo-list");
  const $itemFilters = document.querySelector(".filters");
  let currentFilter = FILTER_TYPE.ALL;

  this.count = 0;
  this.todoItems = [];

  this.inputItem = event => {
    const $newTodoTarget = event.target;
    if (isEnterKey(event)) {
      this.todoItems.push({
        id: this.count++,
        title: $newTodoTarget.value,
        completed: false
      });
      $newTodoTarget.value = "";
      return new TodoList(this.todoItems, FILTER_TYPE.ALL);
    }
  };

  this.clickItem = event => {
    const $target = event.target;
    const targetId = $target.closest("li").dataset.id;
    const targetItem = findTargetItem(targetId);

    if ($target.classList.contains("destroy")) {
      this.todoItems.splice(targetId, 1);
      new TodoList(this.todoItems);
    }

    if ($target.classList.contains("label")) {
      $target.closest("li").classList.add("editing")
    }

    if ($target.classList.contains("toggle")) {
      $target.closest("li").classList.toggle("completed")
      targetItem.completed = true;
    }
  }

  const findTargetItem = targetId => {
    for (let i in this.todoItems) {
      if (this.todoItems[i].id == targetId) {
        return this.todoItems[i];
      }
    }
    return undefined;
  }

  this.updateItem = event => {
    const $target = event.target;
    if (isEnterKey(event)) {
      const index = $target.closest("li").dataset.index;
      this.todoItems.splice(index, 1, $target.value);
      $target.closest("li").classList.remove("editing");
      new TodoList(this.todoItems, currentFilter);
    }
  }

  this.clickFilter = event => {
    const $target = event.target;
    const $selected = document.querySelector(".selected");
    $selected.classList.toggle("selected", false);
    $target.classList.add("selected");

    if ($target.classList.contains("all")) {
      currentFilter = FILTER_TYPE.ALL;
    }

    if ($target.classList.contains("completed")) {
      currentFilter = FILTER_TYPE.COMPLETED;
    }

    if ($target.classList.contains("active")) {
      currentFilter = FILTER_TYPE.ACTIVE;
    }

    new TodoList(findItemsToPrint(this.todoItems,currentFilter));
  }

  this.init = () => {
    $itemInput.addEventListener("keydown", event => this.inputItem(event));
    $itemList.addEventListener("click", event => this.clickItem(event));
    $itemList.addEventListener("keydown", event => this.updateItem(event));
    $itemFilters.addEventListener("click", event => this.clickFilter(event));
  }
}

function TodoList(itemToPrint) {
  this.$todoList = document.querySelector("#todo-list");
  this.$todoCount = document.querySelector("#todo-count");

  this.render = items => {
    this.$todoList.innerHTML = items.map(item => {
      const template = findTemplate(item.completed);
      return template(item);
    }).join("");
    this.$todoCount.innerText = items.length;
  };

  this.render(itemToPrint);
}

function findItemsToPrint(allItem, filterType) {
  if (filterType === FILTER_TYPE.ALL) {
    return allItem;
  }
  if (filterType === FILTER_TYPE.COMPLETED) {
    return allItem.filter(item => item.completed);
  }
  return allItem.filter(item => !item.completed);
}

const findTemplate = isCompleted => {
  if (isCompleted) {
    return completedItemTemplate;
  }
  return todoItemTemplate;
}

const todoApp = new TodoApp();
todoApp.init();

