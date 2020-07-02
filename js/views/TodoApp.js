import { STATUS } from '../utils/constants.js';
import { TodoInput } from './components/TodoInput.js';
import { TodoList } from './components/TodoList.js';
import { TodoItem } from './components/TodoItem.js';
import { TodoCount } from './components/TodoCount.js';
import { TodoStatus } from './components/TodoStatus.js';
import api from '../api/ajax.js';

class TodoApp {
  constructor() {
    this.items = [];
    this.status = STATUS.ALL;

    this.todoList = new TodoList({
      onDelete: id => {
        this.deleteItem(id);
        this.setItems(this.items);
        this.todoCount.render(this.items.length);
      },
      onToggle: id => {
        this.toggleIsComplete(id);
        this.renderByStatus(this.status);
      },
      onUpdate: (id, content, status) => {
        this.updateItem({ id, content, status });
        this.setItems(this.items);
      },
    });

    this.todoStatus = new TodoStatus({
      onSelectStatus: todoStatus => {
        this.setStatus(todoStatus);
        this.renderByStatus(todoStatus);
      }
    });

    this.todoCount = new TodoCount();

    new TodoInput({
      onAdd: async content => {
        try {
          await api.todo.create({ content }).catch(error => alert(error));
          this.items = await api.todo.readAll()
          .then(data => data.map(todoItem => new TodoItem(todoItem)))
          .catch(error => alert(error));
          this.setItems(this.items);
          this.todoCount.render(this.items.length);
          this.setStatus(STATUS.ALL);
        }
        catch (err) {
          alert(err);
        }
      }
    });
    this.getAllData().catch(error => alert(error));
  }

  async getAllData() {
    try {
      const items = await api.todo.readAll()
      .then(data => data.map(todoItem => new TodoItem(todoItem)))
      .catch(error => alert(error));
      this.setItems(items);
      this.todoCount.render(items.length);
      this.setStatus("all");
    }
    catch (err) {
      alert(err);
    }
  }

  toggleIsComplete(id) {
    api.todo.toggle(id).catch(error => alert(error));
    this.items.map(todoItem => todoItem.toggle(id));
  }

  deleteItem(id) {
    api.todo.delete(id).catch(error => alert(error));
    this.setItems(this.items.filter(todoItem => todoItem.isNotSame(id)))
  }

  updateItem(data) {
    api.todo.update(data).catch(error => alert(error));
    this.items.map(todoItem => todoItem.update(data));
  };

  renderByStatus(todoStatus) {
    const tempItemList = this.getTodoItemsByStatus(todoStatus);
    this.todoList.render(tempItemList);
    this.todoStatus.render(todoStatus);
    this.todoCount.render(tempItemList.length);
  }

  getTodoItemsByStatus(todoStatus) {
    const todoItems = [];

    if (todoStatus === STATUS.ALL) {
      return this.items;
    }

    if (todoStatus === STATUS.COMPLETED) {
      this.items.filter(todoItem => todoItem.isCompleted)
        .forEach(todoItem => todoItems.push(todoItem));
      return todoItems;
    }

    if (todoStatus === STATUS.ACTIVE) {
      this.items.filter(todoItem => !todoItem.isCompleted)
      .forEach(todoItem => todoItems.push(todoItem));
      return todoItems;
    }
  }

  setItems(items) {
    this.items = items;
    this.todoList.render(items);
  }

  setStatus(status) {
    this.status = status;
    this.todoStatus.render(status);
  }
}

new TodoApp();