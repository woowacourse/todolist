import {TodoList} from "./TodoList.js";
import {TodoInput} from "./TodoInput.js";
import {TodoItem} from "./TodoItem.js";
import {TodoCount} from "./TodoCount.js";
import {TodoFilter} from "./TodoFilter.js";

export function TodoApp() {
  this.todoItems = [new TodoItem("예시입니다.")];

  this.setItems = (updatedItems) => {
    this.todoItems = updatedItems;
    this.render();

  };

  this.setFilter = (updatedFilter) => {
    this.todoFilter = updatedFilter;
    this.render();
  };

  const filters = new TodoFilter(this.setFilter);

  this.todoFilter = filters.getFilter();

  this.render = () => {
    this.todoList.render(this.todoItems, this.todoFilter);
    const showItemCount = this.todoItems.filter(item => this.todoFilter.expression(item)).length;
    this.todoCount.render(showItemCount);
    filters.render(this.todoFilter);
  };

  this.addItem = (content) => {
    const newItem = new TodoItem(content);
    this.setItems([...this.todoItems, newItem]);
  };

  this.toggleComplete = (itemId) => {
    const updatedItems = this.todoItems.map(item => item.toggleCompleteIf(itemId));
    this.setItems(updatedItems);
  };

  this.deleteItem = (itemId) => {
    const updateItems = this.todoItems.filter(item => !item.is(itemId));
    this.setItems(updateItems);
  };

  this.toggleEdit = (itemId) => {
    const updatedItems = this.todoItems.map(item => item.toggleEditIf(itemId));
    this.setItems(updatedItems);
  };

  this.saveEdit = (itemId, modifiedContent) => {
    const updatedItems = this.todoItems.map(item => item.editContentIf(itemId, modifiedContent));
    this.setItems(updatedItems);
  };

  this.todoList = new TodoList(this.toggleComplete, this.deleteItem, this.toggleEdit, this.saveEdit);

  this.todoCount = new TodoCount();

  new TodoInput(this.addItem);

  this.render();
}