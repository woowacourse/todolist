import { TodoItem } from "./views/TodoItem.js";
import { TodoInput } from "./views/TodoInput.js";
import { TodoList } from "./views/TodoList.js";
import { TodoCount } from "./views/TodoCount.js";

class TodoApp {
  constructor() {
    this.todoItems = [];
    this.todoInput = new TodoInput(this.onAdd.bind(this));
    this.todoList = new TodoList(
      this.onToggle.bind(this),
      this.onDelete.bind(this),
      this.onEdit.bind(this),
      this.onCancelEdit.bind(this)
    );
    this.todoCount = new TodoCount();
  }

  onAdd(todoInputValue) {
    const todoItem = new TodoItem(this.todoItems.length, todoInputValue, false);
    this.todoItems.push(todoItem);
    this.setState(this.todoItems);
    this.setCount(this.todoItems.length);
  }

  onToggle(id) {
    const todoItems = this.todoItems.map((todoItem) => {
      if (todoItem.id === Number(id)) {
        todoItem.changeIsCompleted();
      }
      return todoItem;
    });
    this.setState(todoItems);
  }

  onEdit(todoItemValue, id) {
    const todoItems = this.todoItems.map((todoItem) => {
      if (todoItem.id === Number(id)) {
        todoItem.changeContent(todoItemValue);
      }
      return todoItem;
    });
    this.setState(todoItems);
  }

  onCancelEdit() {
    const todoItems = this.todoItems;
    this.setState(todoItems);
  }

  onDelete(id) {
    const todoItems = this.todoItems.filter(
      (todoItem) => todoItem.id !== Number(id)
    );
    this.setState(todoItems);
    this.setCount(this.todoItems.length);
  }

  setState(todoItems) {
    this.todoItems = todoItems;
    this.todoList.render(todoItems);
  }

  setCount(count) {
    this.todoCount.render(count);
  }
}

new TodoApp();
