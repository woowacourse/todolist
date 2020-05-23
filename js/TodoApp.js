import {TodoInput} from "./modules/TodoInput.js";
import {TodoList} from "./modules/TodoList.js";

const TodoApp = function () {
  this.todoItems = [];

  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    todoList.render(this.todoItems);
  };

  const todoInput = new TodoInput({
    onAdd: item => {
      this.todoItems.push(item);
      this.setState(this.todoItems);
    }
  });

  const todoList = new TodoList();
}

new TodoApp();