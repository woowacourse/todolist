import { TodoItem } from "./views/TodoItem.js";
import { TodoInput } from "./views/TodoInput.js";
import { TodoList } from "./views/TodoList.js";
import { TodoCount } from "./views/TodoCount.js";
import { TodoFilter } from "./views/TodoFilter.js";
import { FILTER } from "./utils/Constracts.js";
import api from "./api/index.js";

class TodoApp {
  constructor() {
    this.todoItems = [];
    this.todoList = new TodoList(
      this.onToggle.bind(this),
      this.onDelete.bind(this),
      this.onEdit.bind(this),
      this.onCancelEdit.bind(this)
    );
    this.filter = FILTER.ALL;
    this.todoCount = new TodoCount();
    new TodoInput(this.onAdd.bind(this));
    new TodoFilter(this.onFilter.bind(this));
  }

  async onAdd(todoInputValue) {
    const content = {
      content: todoInputValue,
    };
    try {
      await api.todoItem.create(content);
      this.todoItems = await api.todoItem.get();
      this.setState(this.todoItems);
    } catch (e) {
      alert(e.message);
    }
  }

  async onToggle(id) {
    try {
      await api.todoItem.toggle(id);
    } catch (e) {
      alert(e);
    }
    this.todoItems.map((todoItem) => {
      if (todoItem._id === id) {
        todoItem.toggleCompleted();
        return todoItem;
      }
    });
    this.setState();
  }

  onEdit(todoItemValue, id) {
    this.todoItems = this.todoItems.map((todoItem) => {
      if (todoItem._id === id) {
        todoItem.changeContent(todoItemValue);
      }
      return todoItem;
    });
    this.setState();
  }

  onCancelEdit() {
    this.setState();
  }

  async onDelete(id) {
    try {
      await api.todoItem.delete(id);
    } catch (e) {
      alert(e);
    }
    this.todoItems = this.todoItems.filter((todoItem) => todoItem._id !== id);
    this.setState();
  }

  onFilter(filter) {
    this.filter = filter;
    this.setState(this.todoItems);
  }

  setState() {
    if (this.filter === FILTER.ACTIVE) {
      const activeItems = this.todoItems.filter(
        (todoItem) => !todoItem.isCompleted
      );
      this.todoList.render(activeItems);
      this.todoCount.render(activeItems.length);
      return;
    } else if (this.filter === FILTER.COMPLETED) {
      const completedItems = this.todoItems.filter(
        (todoItem) => todoItem.isCompleted
      );
      this.todoList.render(completedItems);
      this.setCount(completedItems.length);
      return;
    }
    this.todoItems.map((todoItem) => new TodoItem(todoItem));
    this.todoList.render(this.todoItems);
    this.setCount(this.todoItems.length);
  }

  setCount(count) {
    this.todoCount.render(count);
  }

  async init() {
    try {
      this.todoItems = await api.todoItem
        .get()
        .then((todoItems) =>
          todoItems.map((todoItem) => new TodoItem(todoItem))
        );
    } catch (e) {
      alert(e);
    }
    this.setState();
  }
}

new TodoApp().init();
