import { TodoInput } from './TodoInput.js';
import { TodoItem } from './TodoItem.js';
import { TodoGrouping } from './TodoCount.js';
import { TodoList } from './TodoList.js';

function TodoApp() {
  this.items = [];

  this.setState = updatedItem => {
    this.items = updatedItem;
    this.todoList.render(this.items);
  };

  this.renderGroup = (items, type) => {
    this.group.render(items, type);
  }

  const onToggle = (event, index) => {
    const selectedItem = this.items[index];
    selectedItem.reverseStatus();
    this.items[index] = selectedItem;
    this.setState(this.items);
  }

  const onDelete = (event, index) => {
    this.items.splice(index, 1);
    this.setState(this.items);
    this.renderGroup(this.items);
  }

  const onDoubleClick = (event, index) => {
    const selectedItem = this.items[index];
    selectedItem.changeEditingMode();
    this.items[index] = selectedItem;
    this.setState(this.items);
  }

  const onInputContents = (contents) => {
    const newItem = new TodoItem(contents, "ready");
    this.items.push(newItem);
    this.setState(this.items);
    this.renderGroup(this.items, "all");
  }

  const onUpdateContents = (index, event) => {
    const selectedItem = this.items[index];
    selectedItem.changeContents(event.target.value);
    this.items[index] = selectedItem;
    this.setState(this.items);
  }

  const onUpdateRollBack = (index, event) => {
    const selectedItem = this.items[index];
    selectedItem.rollbackStatus();
    this.items[index] = selectedItem;
    this.setState(this.items);
  }

  const onGroupingAll = (event) => {
    this.todoList.render(this.items);
    this.renderGroup(this.items, "all");
  }

  const onGroupingActive = (event) => {
    let activeItems = this.items.filter(item => item.status === "ready");
    this.todoList.render(activeItems);
    this.renderGroup(activeItems, "active");
  }

  const onGroupingCompleted = (event) => {
    let completedItems = this.items.filter(item => item.status === "completed");
    this.todoList.render(completedItems);
    this.renderGroup(completedItems, "completed");
  }

  this.todoList = new TodoList(onToggle,
    onDelete,
    onDoubleClick,
    onUpdateContents,
    onUpdateRollBack);
  new TodoInput(onInputContents)
  this.group = new TodoGrouping(onGroupingAll, onGroupingActive, onGroupingCompleted);
}

new TodoApp();
