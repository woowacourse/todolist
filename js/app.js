import {
  activeFilterTemplate,
  allFilterTemplate,
  completeFilterTemplate,
  todoItemTemplate,
} from "./templates.js";

import { GROUP_TYPE } from "./constants.js";

function TodoApp() {
  this.todoItems = [];

  this.createdCount = 0;

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    this.todoList.render(updatedItems);
    this.todoCount.render(updatedItems.length);
  };

  const toggleComplete = (event, id) => {
    const index = this.todoItems.findIndex((item) => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === GROUP_TYPE.COMPLETED) {
      todoItem.status = GROUP_TYPE.ACTIVE;
    } else if (todoItem.status === GROUP_TYPE.ACTIVE) {
      todoItem.status = GROUP_TYPE.COMPLETED;
    }
    this.todoItems[index] = todoItem;
    this.setState(this.todoItems);
  };

  const onDelete = (event, id) => {
    const index = this.todoItems.findIndex((item) => item.id === id);
    this.todoItems.splice(index, 1);
    this.setState(this.todoItems);
  };

  const onDblClick = (event, id) => {
    const index = this.todoItems.findIndex((item) => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === GROUP_TYPE.ACTIVE) {
      todoItem.status = "editing";
    }
    this.todoItems[index] = todoItem;
    this.setState(this.todoItems);
  };

  const onCommit = (event, id, content) => {
    const index = this.todoItems.findIndex((item) => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === "editing") {
      todoItem.content = content;
      todoItem.status = GROUP_TYPE.ACTIVE;
      this.todoItems[index] = todoItem;
      this.setState(this.todoItems);
    }
  };

  const onRollback = (event, id) => {
    const index = this.todoItems.findIndex((item) => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === "editing") {
      todoItem.status = GROUP_TYPE.ACTIVE;
      this.todoItems[index] = todoItem;
      this.setState(this.todoItems);
    }
  };

  const onAdd = (contents) => {
    const newTodoItem = new TodoItem(
      ++this.createdCount,
      contents,
      GROUP_TYPE.ACTIVE
    );
    this.todoItems.push(newTodoItem);
    this.setState(this.todoItems);
  };

  const groupBy = (event, type) => {
    let items;
    if (type === GROUP_TYPE.ALL) {
      items = this.todoItems;
    } else {
      items = this.todoItems.filter((item) => item.status === type);
    }
    this.todoList.render(items);
    this.todoCount.render(items.length, type);
  };

  this.todoList = new TodoList(
    toggleComplete,
    onDelete,
    onDblClick,
    onRollback,
    onCommit
  );

  this.todoCount = new TodoCount(groupBy);

  new TodoInput(onAdd);
}

function TodoInput(onAdd) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener("keyup", (event) => this.addTodoItem(event));

  this.addTodoItem = (event) => {
    const $newTodoTarget = event.target;
    if (this.isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };

  this.isValid = function (event, s) {
    return !!(event.key === "Enter" && s.trim());
  };
}

function TodoList(onToggle, onDelete, onDblClick, onRollback, onCommit) {
  this.$todoList = document.querySelector("#todo-list");

  this.$todoList.addEventListener("click", (event) => this.onClick(event));

  this.$todoList.addEventListener("dblclick", (event) => this.startEdit(event));

  this.$todoList.addEventListener("keyup", (event) => this.finishEdit(event));

  this.onClick = (event) => {
    const $target = event.target;
    const id = Number($target.closest("li").getAttribute("id"));
    if ($target.classList.contains("toggle")) {
      onToggle(event, id);
    } else if ($target.classList.contains("destroy")) {
      onDelete(event, id);
    }
  };

  this.startEdit = (event) => {
    const $target = event.target;
    const id = Number($target.closest("li").getAttribute("id"));
    if ($target.classList.contains("label")) {
      onDblClick(event, id);
    }
  };

  this.finishEdit = (event) => {
    const $target = event.target;
    const id = Number($target.closest("li").getAttribute("id"));
    if ($target.classList.contains("edit")) {
      if (event.key === "Enter") {
        onCommit(event, id, $target.value);
      } else if (event.key === "Escape") {
        onRollback(event, id);
      }
    }
  };

  this.render = (items) => {
    this.$todoList.innerHTML = items.map(todoItemTemplate).join("");
  };
}

function TodoItem(id, content, status) {
  this.id = id;
  this.content = content;
  this.status = status;
}

function TodoCount(groupBy) {
  this.$todoCount = document.querySelector(".count-container");

  this.$todoCount.addEventListener("click", (event) =>
    this.groupByStatus(event)
  );

  this.groupByStatus = (event) => {
    if (event.target.classList.contains(GROUP_TYPE.ACTIVE)) {
      groupBy(event, GROUP_TYPE.ACTIVE);
    } else if (event.target.classList.contains(GROUP_TYPE.COMPLETED)) {
      groupBy(event, GROUP_TYPE.COMPLETED);
    } else if (event.target.classList.contains(GROUP_TYPE.ALL)) {
      groupBy(event, GROUP_TYPE.ALL);
    }
  };

  this.render = (total, type) => {
    if (type === GROUP_TYPE.ALL || type === undefined) {
      this.$todoCount.innerHTML = allFilterTemplate(total);
    } else if (type === GROUP_TYPE.ACTIVE) {
      this.$todoCount.innerHTML = activeFilterTemplate(total);
    } else if (type === GROUP_TYPE.COMPLETED) {
      this.$todoCount.innerHTML = completeFilterTemplate(total);
    }
  };
}

new TodoApp();
