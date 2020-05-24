import { TodoInput } from './components/TodoInput.js';
import { TodoList } from './components/TodoList.js';

function TodoApp() {
  this.todoItems = [];
  const todoList = new TodoList();

  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
    console.log(this.todoItems);
  };

  new TodoInput({
    onAdd: content => {
      this.todoItems.push(content);
      this.setState(this.todoItems);
    }
  });
}

new TodoApp();