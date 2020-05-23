import {TodoInput} from "./component/TodoInput.js";
import {TodoList} from "./component/TodoList.js";

const TodoApp = function () {
  this.todoItems = [];

  const setState = updatedItems => {
    this.todoItems = updatedItems;
    todoList.render(this.todoItems);
  };

  const todoInput = new TodoInput({
    onAdd: item => {
      this.todoItems.push(item);
      setState(this.todoItems);
    }
  });

  const todoList = new TodoList();
}

new TodoApp();