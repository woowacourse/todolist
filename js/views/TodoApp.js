import { TodoInput } from './components/TodoInput.js';
import { TodoList } from './components/TodoList.js';
import { TodoItem } from './components/TodoItem.js';
import { STATE } from '../utils/constants.js';

class TodoApp {
  constructor() {
    this.todoItems = [];
    this.todoList = new TodoList({
      onToggle: id => {
        this.toggleStatus(id);
        this.setState(this.todoItems);
      },
      onDelete: id => {
        this.deleteItem(id);
        this.setState(this.todoItems);
      },
      onUpdate: (id, content) => {
        this.updateItem(id, content);
        this.setState(this.todoItems);
      }
    });

    new TodoInput({
      onAdd: contents => {
        const newTodoItem = new TodoItem(contents);
        this.todoItems.push(newTodoItem);
        this.setState(this.todoItems);
      }
    });
  }

  toggleStatus(id) {
    this.todoItems.filter(todoItem => todoItem.id === id)
    .map(todoItem => {
      todoItem.status = (todoItem.status === STATE.COMPLETE ? STATE.NOT_COMPLETE : STATE.COMPLETE)
    });
  }

  deleteItem(id) {
    this.todoItems = this.todoItems.filter(todoItem => todoItem.id !== id)
  }

  updateItem(id, content) {
    this.todoItems.filter(todoItem => todoItem.id === id)
    .map(todoItem => {
      todoItem.content = content;
    });
  };


  setState(updatedItems) {
    this.todoItems = updatedItems;
    this.todoList.setState(this.todoItems);
    console.log(this.todoItems);
  };
}

new TodoApp();