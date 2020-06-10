import { TodoItem } from "./views/TodoItem.js";
import { TodoInput } from "./views/TodoInput.js";
import { TodoList } from "./views/TodoList.js";

class TodoApp {
  constructor() {
    this.todoItems = [];
    this.todoInput = new TodoInput(this.onAdd.bind(this));
    this.todoList = new TodoList();
  }

  onAdd(todoInputValue) {
    const todoItem = new TodoItem('1', todoInputValue, false);
    this.todoItems.push(todoItem);
    this.setState(this.todoItems);
  }

  setState(todoItems){
    this.todoList.render(todoItems);
  }
}

new TodoApp();