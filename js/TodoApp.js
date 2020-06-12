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
    this.todoInput = new TodoInput(this.onAdd.bind(this));
    this.todoList = new TodoList(
      this.onToggle.bind(this),
      this.onDelete.bind(this),
      this.onEdit.bind(this),
      this.onCancelEdit.bind(this)
    );
    this.todoCount = new TodoCount();
    this.todoFilter = new TodoFilter(this.onFilter.bind(this));
  }

  async onAdd(todoInputValue) {
    const todoItem = {
      content: todoInputValue,
    };
    await api.todoItem.create(todoItem).catch((error) => alert.log(error));

    this.setState(this.todoItems);
  }

  onToggle(id) {
    const todoItems = this.todoItems.map((todoItem) => {
      if (todoItem.id === Number(id)) {
        todoItem.changeIsCompleted();
      }
      return todoItem;
    });
    this.setState(todoItems);
  }

  onEdit(todoItemValue, id) {
    const todoItems = this.todoItems.map((todoItem) => {
      if (todoItem.id === Number(id)) {
        todoItem.changeContent(todoItemValue);
      }
      return todoItem;
    });
    this.setState(todoItems);
  }

  onCancelEdit() {
    const todoItems = this.todoItems;
    this.setState(todoItems).catch((error) => alert(error));
  }

  onDelete(id) {
    const todoItems = this.todoItems.filter(
      (todoItem) => todoItem.id !== Number(id)
    );
    this.setState(todoItems);
  }

  onFilter(filter) {
    this.setState(this.todoItems, filter);
  }

  async setState(todoItems, filter) {
    const todoItemsResponse = await api.todoItem.get();
    console.log(todoItemsResponse);
    if (filter === FILTER.ACTIVE) {
      const activeItems = this.todoItems.filter(
        (todoItem) => todoItem.isCompleted === false
      );
      this.todoList.render(activeItems);
      this.todoCount.render(activeItems.length);
    } else if (filter === FILTER.COMPLETED) {
      const completedItems = this.todoItems.filter(
        (todoItem) => todoItem.isCompleted === true
      );
      this.todoList.render(completedItems);
      this.setCount(completedItems.length);
    } else {
      this.todoItems = todoItemsResponse.map(
        (todoItem) => new TodoItem(todoItem)
      );
    console.log(this.todoList);
    }
    this.todoList.render(this.todoItems);
    this.setCount(this.todoItems.length);
  }

  setCount(count) {
    this.todoCount.render(count);
  }
}

new TodoApp();
