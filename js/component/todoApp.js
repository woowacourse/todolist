import {TodoList} from "./todoList.js";
import {TodoInput} from "./todoInput.js";
import {TodoItem} from "./todoItem.js";

export function TodoApp() {
  this.todoItems = [];
  this.todoList = new TodoList();

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    this.todoList.render(this.todoItems);
  };

  new TodoInput({
    addItem: (content) => {
      const newItem = new TodoItem(content);
      this.setState([...this.todoItems, newItem])
    }
  });
}