import { TodoInput } from './TodoInput.js'
import { TodoList } from './TodoList.js'
import { TodoItem } from './TodoItem.js'

function TodoApp() {
  this.todoItems = [];

  const todoList = new TodoList();
  
  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
  };

  new TodoInput({
    onAdd: contents => {
      const newTodoItem = new TodoItem(contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    }
  });
}

new TodoApp();