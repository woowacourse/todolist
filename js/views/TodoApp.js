import { TodoInput } from './components/TodoInput.js';
import { TodoList } from './components/TodoList.js';
import { TodoItem } from './components/TodoItem.js';
import { TodoCount } from './components/TodoCount.js';
import { TodoStatus } from './components/TodoStatus.js';
import api from '../api/ajax.js';

class TodoApp {
  constructor() {
    this.items = [];
    this.status = "all";

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
        await api.todo.create({ content }).catch(error => alert(error));
        this.items = await api.todo.readAll()
        .then(data => data.map(todoItem => new TodoItem(todoItem)))
        .catch(error => alert(error));
        await this.setItems(this.items);
        await this.todoCount.render(this.items.length);
        await this.setStatus("all");
      }
    });

    this.getAllData().catch(error => alert(error));
  }

  async getAllData() {
    const items = await api.todo.readAll()
    .then(data => data.map(todoItem => new TodoItem(todoItem)))
    .catch(error => alert(error));

    await this.setItems(items);
    await this.todoCount.render(items.length);
    await this.setStatus("all");
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
    let todoItems = [];

    if (todoStatus === "all") {
      return this.items;
    }

    if (todoStatus === "completed") {
      this.items.forEach(todoItem => {
        if (todoItem.isCompleted) {
          todoItems.push(todoItem);
        }
      });
      return todoItems;
    }

    if (todoStatus === "active") {
      this.items.forEach(todoItem => {
        if (!todoItem.isCompleted) {
          todoItems.push(todoItem);
        }
      });
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