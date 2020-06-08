import { GROUP_TYPE } from "./constants.js";
import TodoInput from "./TodoInput.js";
import TodoList from "./TodoList.js";
import TodoCount from "./TodoCount.js";

function TodoApp() {
  this.todoItems = [];

  this.createdCount = 0;

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    this.todoList.render(updatedItems);
    this.todoCount.render(updatedItems.length);
  };

  const toggleComplete = (event, id) => {
    const index = this.todoItems.findIndex((item) => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === GROUP_TYPE.COMPLETED) {
      todoItem.status = GROUP_TYPE.ACTIVE;
    } else if (todoItem.status === GROUP_TYPE.ACTIVE) {
      todoItem.status = GROUP_TYPE.COMPLETED;
    }
    this.todoItems[index] = todoItem;
    this.setState(this.todoItems);
  };

  const onDelete = (event, id) => {
    const index = this.todoItems.findIndex((item) => item.id === id);
    this.todoItems.splice(index, 1);
    this.setState(this.todoItems);
  };

  const onDblClick = (event, id) => {
    const index = this.todoItems.findIndex((item) => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === GROUP_TYPE.ACTIVE) {
      todoItem.status = GROUP_TYPE.EDITING;
    }
    this.todoItems[index] = todoItem;
    this.setState(this.todoItems);
  };

  const onCommit = (event, id, content) => {
    const index = this.todoItems.findIndex((item) => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === GROUP_TYPE.EDITING) {
      todoItem.content = content;
      todoItem.status = GROUP_TYPE.ACTIVE;
      this.todoItems[index] = todoItem;
      this.setState(this.todoItems);
    }
  };

  const onRollback = (event, id) => {
    const index = this.todoItems.findIndex((item) => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === GROUP_TYPE.EDITING) {
      todoItem.status = GROUP_TYPE.ACTIVE;
      this.todoItems[index] = todoItem;
      this.setState(this.todoItems);
    }
  };

  const onAdd = (contents) => {
    const newTodoItem = new TodoItem(
      ++this.createdCount,
      contents,
      GROUP_TYPE.ACTIVE
    );
    this.todoItems.push(newTodoItem);
    this.setState(this.todoItems);
  };

  const groupBy = (event, type) => {
    let items;
    if (type === GROUP_TYPE.ALL) {
      items = this.todoItems;
    } else {
      items = this.todoItems.filter((item) => item.status === type);
    }
    this.todoList.render(items);
    this.todoCount.render(items.length, type);
  };

  this.todoList = new TodoList(
    toggleComplete,
    onDelete,
    onDblClick,
    onRollback,
    onCommit
  );

  this.todoCount = new TodoCount(groupBy);

  new TodoInput(onAdd);
}

function TodoItem(id, content, status) {
  this.id = id;
  this.content = content;
  this.status = status;
}

new TodoApp();
