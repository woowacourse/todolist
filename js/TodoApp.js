import { todoItemTemplate } from '../util/template.js';

function TodoApp() {
  this.todoItems = [];

  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
  };

  const todoList = new TodoList();

  new TodoInput({
    onAdd: contents => {
      const newTodoItem = new TodoItem(contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    }
  });
}

// 입력 받는 컴포넌트
function TodoInput({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener("keydown", event => this.addTodoItem(event));

  this.addTodoItem = event => {
    const $newTodoTarget = event.target;
    if (this.isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };

  this.isValid = (event, title) => {
    return event.key === "Enter" && title.trim() !== "";
  }
}

// todoList 보여주는 컴포넌트
function TodoList() {
  this.$todoList = document.querySelector("#todo-list");

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = items => {
    const template = items.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join("");
  };
}

// todoItem
function TodoItem(contents) {
  this.contents = contents;
  this.status = "";
}

const todoApp = new TodoApp();
