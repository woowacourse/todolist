import { TodoItem } from "./views/TodoItem.js";
import { TodoInput } from "./views/TodoInput.js";
import { TodoList } from "./views/TodoList.js";
import { TodoCount } from "./views/TodoCount.js";
import { TodoFilter } from "./views/TodoFilter.js";
import { FILTER } from "./utils/Constracts.js";

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

  onAdd(todoInputValue) {
    const todoItem = new TodoItem(this.todoItems.length, todoInputValue, false);
    this.todoItems.push(todoItem);
    this.setState(this.todoItems);
  }

  onToggle(id) {
    const todoItems = this.todoItems.map((todoItem) => {
      if (todoItem.id === Number(id)) {
        todoItem.changeIsCompleted();
      }
      return todoItem;
    });
    console.log(todoItems);
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
    this.setState(todoItems);
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

  setState(todoItems, filter) {
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
      this.todoItems = todoItems;
      this.todoList.render(todoItems);
      this.setCount(this.todoItems.length);
    }
  }

  setCount(count) {
    this.todoCount.render(count);
  }
}

new TodoApp();
