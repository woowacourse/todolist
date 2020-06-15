import {EVENT_TYPE, KEY_TYPE} from "./utils/constants.js";
import makeTodoItemTemplate from "./utils/templates.js";
import TodoItem from "./domain/todo-item.js"

function TodoApp() {
  
  const todoItems = [];

  const todoInput = new TodoInput({ onAdd });
  const todoList = new TodoList({ onDelete, onComplete, onStartEditing, onSaveEditing, onCancleEditing });
  const todoListTypeButton = new TodoListTypeButton({ onShowAll, onShowActive, onShowCompleted});
  const todoItemFilter = new TodoItemFilter();

  function onAdd (event, todoTitle) {
    if (event.key !== KEY_TYPE.ENTER) {
      return;
    }
    add(todoTitle);
  };

  function add(todoTitle) {
    todoItems.push(new TodoItem(todoTitle));
    todoList.setState(todoItems);
    todoInput.clear();
  };

  function onDelete(event) {
    if (!event.target.classList.contains("destroy")) {
      return;
    }
    remove(event.target.dataset.id);
  }

  function remove(id) {
    for (let index in todoItems) {
      if (todoItems[index].id + "" === id + "") {
        todoItems.splice(index, 1);
      }
    }
    todoList.setState(todoItems);
  }

  function onComplete(event) {
    if (!event.target.classList.contains("complete")) {
      return;
    }
    complete(event.target.dataset.id);
  }

  function complete(id) {
    for (let index in todoItems) {
      if (todoItems[index].id + "" === id + "") {
        todoItems[index].completed = true;
      }
    }
    todoList.setState(todoItems);
  }

  function onStartEditing(event) {
    event.preventDefault();
    if (!event.target.classList.contains("label")) {
      return;
    }
    startEditing(event.target.dataset.id);
  }

  function startEditing(id) {
    for (let index in todoItems) {
      if (todoItems[index].id + "" === id + "") {
        todoItems[index].isBeingEdited = true;
      }
    }
    todoList.setState(todoItems);
  }

  function onSaveEditing(event) {
    if (!(event.target.classList.contains("edit") && event.key === KEY_TYPE.ENTER)) {
      return;
    }
    saveEditing(event.target.dataset.id, event.target.value);
  }

  function saveEditing(id, newTodoTitle) {
    for (let index in todoItems) {
      if (todoItems[index].id + "" === id + "") {
        todoItems[index].title = newTodoTitle;
        todoItems[index].isBeingEdited = false;
      }
    }
    todoList.setState(todoItems);
  }

  function onCancleEditing(event) {
    if (!(event.target.classList.contains("edit") && event.key === KEY_TYPE.ESC)) {
      return;
    }
    cancleEditing(event.target.dataset.id);
  }

  function cancleEditing(id) {
    for (let index in todoItems) {
      if (todoItems[index].id + "" === id + "") {
        todoItems[index].isBeingEdited = false;
      }
    }
    todoList.setState(todoItems);
  }

  function onShowAll(event) {
    event.preventDefault();
    todoList.setState(todoItems);
    todoListTypeButton.focusOnShowAllButton();
  }

  function onShowActive(event) {
    event.preventDefault();
    todoList.setState(todoItemFilter.filterActive(todoItems));
    todoListTypeButton.focusOnShowActiveButton();
  }

  function onShowCompleted(event) {
    event.preventDefault();
    todoList.setState(todoItemFilter.filterCompleted(todoItems));
    todoListTypeButton.focusOnShowCompletedButton();
  }
};

class TodoInput {

  constructor({ onAdd }) {
    const $todoTitleInput = document.getElementById("new-todo-title");
    
    $todoTitleInput.addEventListener(
      EVENT_TYPE.KEY_PRESS, 
      event => { 
        onAdd(event, $todoTitleInput.value);
      }
    );

    this.clear = () => {
      $todoTitleInput.value = "";
    }
  }
}

class TodoList {

  constructor({ onDelete, onComplete, onStartEditing, onSaveEditing, onCancleEditing }) {
    const $todoList = document.getElementById("todo-list");

    const countContainer = new Count();

    $todoList.addEventListener(EVENT_TYPE.CLICK, onDelete);
    $todoList.addEventListener(EVENT_TYPE.CLICK, onComplete);
    $todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, onStartEditing);
    $todoList.addEventListener(EVENT_TYPE.KEY_PRESS, onSaveEditing);
    $todoList.addEventListener(EVENT_TYPE.KEY_DOWN, onCancleEditing);

    this.render = todoItems => {
      $todoList.innerHTML = todoItems.map(todoItem => makeTodoItemTemplate(todoItem)).join("");
    };

    this.setState = todoItems => {
      this.render(todoItems);
      countContainer.setState(todoItems.length);
    };
  }
}

class Count {

  constructor() {
    const $todoCountValue = document.getElementById("todo-count-value");

    this.setState = todoCount => {
      this.render(todoCount);
    }

    this.render = todoCount => {
      $todoCountValue.innerHTML = todoCount;
    }
  }
}

class TodoListTypeButton {
  
  constructor({ onShowAll, onShowActive, onShowCompleted }) {
    const classNameForFocusing = "selected";

    const $showAllButton = document.querySelector(".all");
    const $showActiveButton = document.querySelector(".active");
    const $showCompletedButton = document.querySelector(".completed");

    $showAllButton.addEventListener(EVENT_TYPE.CLICK, onShowAll);
    $showActiveButton.addEventListener(EVENT_TYPE.CLICK, onShowActive);
    $showCompletedButton.addEventListener(EVENT_TYPE.CLICK, onShowCompleted);

    this.focusOnShowAllButton = () => {
      if (!$showAllButton.classList.contains(classNameForFocusing)) {
        $showAllButton.classList.add(classNameForFocusing);
      }
      $showActiveButton.classList.remove(classNameForFocusing);
      $showCompletedButton.classList.remove(classNameForFocusing);
    }

    this.focusOnShowActiveButton = () => {
      if (!$showActiveButton.classList.contains(classNameForFocusing)) {
        $showActiveButton.classList.add(classNameForFocusing);
      }
      $showAllButton.classList.remove(classNameForFocusing);
      $showCompletedButton.classList.remove(classNameForFocusing);
    }

    this.focusOnShowCompletedButton = () => {
      if (!$showCompletedButton.classList.contains(classNameForFocusing)) {
        $showCompletedButton.classList.add(classNameForFocusing);
      }
      $showAllButton.classList.remove(classNameForFocusing);
      $showActiveButton.classList.remove(classNameForFocusing);
    }
  }
}

class TodoItemFilter {

  constructor() {
    this.filterCompleted = items => {
      return items.filter(item => item.completed);
    }

    this.filterActive = items => {
      return items.filter(item => !item.completed);
    }
  }
}

new TodoApp();