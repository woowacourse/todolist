import {TodoItem} from "./views/TodoItem.js";
import {TodoInput} from "./views/TodoInput.js";
import {TodoList} from "./views/TodoList.js";

class TodoApp {
  constructor() {
    this.todoItems = [];
    this.todoInput = new TodoInput(this.onAdd.bind(this));
    this.todoList = new TodoList(this.onToggle.bind(this));
  }

  onAdd(todoInputValue) {
    const todoItem = new TodoItem(this.todoItems.length, todoInputValue, false);
    this.todoItems.push(todoItem);
    this.setState(this.todoItems);
  }

  onToggle(id) {
    const todoItems = this.todoItems.map(todoItem => {
        if (todoItem.id === Number(id)) {
          todoItem.changeIsCompleted();
        }
        return todoItem;
      }
    );
    this.setState(todoItems);
  }

  setState(todoItems) {
    this.todoItems = todoItems;
    this.todoList.render(todoItems);
  }
}

new TodoApp();