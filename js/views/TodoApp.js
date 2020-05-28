import { TodoInput } from './components/TodoInput.js';
import { TodoList } from './components/TodoList.js';
import { TodoItem } from './components/TodoItem.js';
import { TodoCount } from './components/TodoCount.js';
import { TodoStatus } from './components/TodoStatus.js';
import { STATE } from '../utils/constants.js';

class TodoApp {
  constructor() {
    this.todoItems = [];

    this.todoList = new TodoList({
      onDelete: id => {
        this.deleteItem(id);
        this.setTodoItems(this.todoItems);
        this.setTodoCount(this.todoItems.length);
        const tempItemList = this.showTodoItemsByStatus(this.todoStatusValue);
        this.todoCount.render(tempItemList.length);

      },
      onToggle: id => {
        this.toggleStatus(id);
        const tempItemList = this.showTodoItemsByStatus(this.todoStatusValue);
        this.todoCount.render(tempItemList.length);
      },
      onUpdate: (id, content) => {
        this.updateItem(id, content);
        this.setTodoItems(this.todoItems);
      }
    });

    this.todoStatusValue = "all";

    this.todoStatus = new TodoStatus({
      onSelectStatus: todoStatus => {
        this.setTodoStatus(todoStatus);
        const tempItemList = this.showTodoItemsByStatus(this.todoStatusValue);
        this.todoCount.render(tempItemList.length);
      }
    });

    this.todoCount = new TodoCount();

    new TodoInput({
      onAdd: contents => {
        const newTodoItem = new TodoItem(contents);
        this.todoItems.push(newTodoItem);
        this.setTodoItems(this.todoItems);
        this.setTodoCount(this.todoItems.length);
        this.setTodoStatus("all");
      }
    });
  }

  toggleStatus(id) {
    this.todoItems.filter(todoItem => todoItem.id === id)
    .map(todoItem => {
      todoItem.status = (todoItem.status === STATE.COMPLETE ? STATE.ACTIVE : STATE.COMPLETE)
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

  showTodoItemsByStatus(todoStatus) {
    const tempItemList = this.getTodoItemsByStatus(todoStatus);
    this.todoList.render(tempItemList);
    return tempItemList;
  }

  getTodoItemsByStatus(status) {
    let todoItems = [];

    if (status === "all") {
      return this.todoItems;
    }

    this.todoItems.forEach(todoItem => {
      if (todoItem.status === status) {
        todoItems.push(todoItem);
      }
    });

    return todoItems;
  }

  setTodoCount(todoCount) {
    this.todoCount.setCount(todoCount);
  }

  setTodoStatus(todoStatus) {
    this.todoStatusValue = todoStatus;
    this.todoStatus.setStatus(todoStatus);
  }

  setTodoItems(updatedItems) {
    this.todoItems = updatedItems;
    this.todoList.setState(this.todoItems);
  };
}

new TodoApp();