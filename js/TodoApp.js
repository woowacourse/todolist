import TodoInput from './todo/TodoInput.js';
import TodoItem from './todo/TodoItem.js';
import TodoList from './todo/TodoList.js';

function TodoApp() {
  this.todoItems = [];

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems;
    todoList.setState(this.todoItems);
  }

  this.todoInputMethods = {
    onAddItem: contents => {
      const newTodoItem = new TodoItem(contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    }
  };

  const todoList = new TodoList();
  new TodoInput(this.todoInputMethods);
}

new TodoApp();