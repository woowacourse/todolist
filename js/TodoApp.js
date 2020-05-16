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

  this.todoListMethods = {
    onDeleteItem: contents => {
      const deleteItem = new TodoItem(contents);
      const index = this.todoItems.findIndex(item => item.contents === deleteItem.contents);
      this.todoItems.splice(index, 1);
      this.setState(this.todoItems);
    }
  }

  const todoList = new TodoList(this.todoListMethods);
  new TodoInput(this.todoInputMethods);
}

new TodoApp();