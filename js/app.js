import {itemTemplate} from "./templates.js"
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
      return new TodoList(findItemsToPrint(this.todoItems, currentFilter));
    }
  };

  this.clickItem = event => {
    const $target = event.target;
    const targetItem = findTargetItem($target);

    if ($target.classList.contains("destroy")) {
      const index = this.todoItems.indexOf(targetItem);
      this.todoItems.splice(index, 1);
      new TodoList(this.todoItems);
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
      new TodoList(findItemsToPrint(this.todoItems, currentFilter));
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

    new TodoList(findItemsToPrint(this.todoItems, currentFilter));
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
    this.$todoList.innerHTML = items.map(item => itemTemplate(item)).join("");
    this.$todoCount.innerText = items.length;
    document.querySelectorAll(".checked").forEach(x => x.setAttribute("checked", true));
  };

  this.render(itemToPrint);
}

function findItemsToPrint(allItem, filterState) {
  if (filterState === FILTER_TYPE.ALL) {
    return allItem;
  } else if (filterState === FILTER_TYPE.COMPLETED) {
    return allItem.filter(item => item.completed);
  }
  return allItem.filter(item => !item.completed);
}


const todoApp = new TodoApp();
todoApp.init();

