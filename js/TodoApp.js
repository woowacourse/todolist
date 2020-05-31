import { TodoInput } from './TodoInput.js';
import { TodoList } from './TodoList.js';
import { TodoItem } from './TodoItem.js';

function TodoApp() {
  this.todoItems = [];

  this.setState = updatedItems => {
    this.todoItems = updatedItems; // todo: 이 코드 필요한가?
    todoList.setState(this.todoItems);
  };

  const todoList = new TodoList({
    onToggle: id => {
      const targetItem = this.todoItems.find(item => item.id === Number.parseInt(id));
      targetItem.toggleStatus();
      this.setState(this.todoItems);
    },
    onDelete: id => {
      const targetItem = this.todoItems.find(item => item.id === Number.parseInt(id));
      this.todoItems.splice(this.todoItems.indexOf(targetItem), 1);
      this.setState(this.todoItems);
    }
  });

  new TodoInput({
    onAdd: contents => {
      const todoCount = this.todoItems.length;
      const newTodoItem = new TodoItem(todoCount + 1, contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    }
  });
}

const todoApp = new TodoApp();
