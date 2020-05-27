import {allTodoItemTemplate, completedTodoItemTemplate, activeTodoItemTemplate} from "./templates.js"
import {isEnterKey, FILTER_TYPE} from "./utils.js"

function TodoApp() {
  const $itemInput = document.querySelector("#new-todo-title");
  const $itemList = document.querySelector("#todo-list");
  const $itemFilters = document.querySelector(".filters");
  let currentFilter = FILTER_TYPE.ALL;

  this.todoItems = [];
  this.completed = [];

  this.inputItem = event => {
    const $newTodoTarget = event.target;
    if (isEnterKey(event)) {
      this.todoItems.push($newTodoTarget.value);
      $newTodoTarget.value = "";
      return new TodoList(findItemsByFilter(currentFilter), currentFilter);
    }
  };

  const findItemsByFilter = currentFilter => {
    if (currentFilter === FILTER_TYPE.ALL) {
      return this.todoItems;
    }
    if (currentFilter === FILTER_TYPE.COMPLETED) {
      return this.completed;
    }
    return findActiveItems(this.todoItems, this.completed);
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
      new TodoList(this.todoItems, FILTER_TYPE.ALL);
      currentFilter = FILTER_TYPE.ALL;
    }

    if ($target.classList.contains("completed")) {
      new TodoList(this.completed, FILTER_TYPE.COMPLETED);
      currentFilter = FILTER_TYPE.COMPLETED;
    }

    if ($target.classList.contains("active")) {
      const activeItems = findActiveItems(this.todoItems, this.completed);
      new TodoList(activeItems, FILTER_TYPE.ACTIVE);
      currentFilter = FILTER_TYPE.ACTIVE;
    }
  }

  function findActiveItems(todoItems, completed) {
    const activeItems = JSON.parse(JSON.stringify(todoItems));
    completed.forEach(x => {
      const idx = activeItems.indexOf(x);
      activeItems.splice(idx, 1);
    })
    return activeItems;
  }

  this.clickItem = event => {
    const $target = event.target;
    const index = $target.closest("li").dataset.index;

    if ($target.classList.contains("destroy")) {
      this.todoItems.splice(index, 1);
      new TodoList(this.todoItems);
    }

    if ($target.classList.contains("label")) {
      $target.closest("li").classList.add("editing")
    }

    if ($target.classList.contains("toggle")) {
      $target.closest("li").classList.toggle("completed")
      this.completed.push(this.todoItems[index])
    }
  }

  this.init = () => {
    $itemInput.addEventListener("keydown", event => this.inputItem(event));
    $itemList.addEventListener("click", event => this.clickItem(event));
    $itemList.addEventListener("keydown", event => this.updateItem(event));
    $itemFilters.addEventListener("click", event => this.clickFilter(event));
  }
}

function TodoList(items, type) {
  const templateByType = findTemplateByType(type);

  this.$todoList = document.querySelector("#todo-list");
  this.$todoCount = document.querySelector("#todo-count");

  this.render = items => {
    const template = items.map((item, index) => templateByType(item, index));
    this.$todoList.innerHTML = template.join("");
    this.$todoCount.innerText = items.length;
  };

  this.render(items)
}

const findTemplateByType = type => {
  if (type === FILTER_TYPE.ALL) {
    return allTodoItemTemplate;
  }
  if (type === FILTER_TYPE.COMPLETED) {
    return completedTodoItemTemplate;
  }
  return activeTodoItemTemplate;
}

const todoApp = new TodoApp();
todoApp.init();

