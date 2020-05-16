import {TodoList} from "./TodoList.js";
import {TodoInput} from "./TodoInput.js";
import {TodoItem} from "./TodoItem.js";
import {TodoCount} from "./TodoCount.js";
import {TodoFilter} from "./TodoFilter.js";

export function TodoApp() {
  this.todoItems = [];

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    this.render();
  };

  this.addItem = (content) => {
    const newItem = new TodoItem(content);
    this.setState([...this.todoItems, newItem]);
  };

  this.render = () => {
    this.todoFilter.render(window.location.href);
  };

  this.renderFilteredItems = (filter) => {
    const todoItemsToShow = this.todoItems.filter(item => filter(item));
    this.todoList.render(this.todoItemsTemplate(todoItemsToShow));
    this.todoCount.render(todoItemsToShow.length);
  };

  this.todoItemsTemplate = (todoItemsToShow) => {
    return todoItemsToShow.map(item => item.renderingHtml()).join("");
  };

  this.toggleComplete = (itemId) => {
    const updatedItems = this.todoItems.map(item => item.toggleCompleteIf(itemId));
    this.setState(updatedItems);
  };

  this.deleteItem = (itemId) => {
    const updateItems = this.todoItems.filter(item => !item.is(itemId));
    this.setState(updateItems);
  };

  this.toggleEdit = (itemId) => {
    const updatedItems = this.todoItems.map(item => item.toggleEditIf(itemId));
    this.setState(updatedItems);
  };

  this.saveEdit = (itemId, modifiedContent) => {
    const updatedItems = this.todoItems.map(item => item.editContentIf(itemId, modifiedContent));
    this.setState(updatedItems);
  };

  this.todoList = new TodoList(this.toggleComplete, this.deleteItem, this.toggleEdit, this.saveEdit);

  this.todoCount = new TodoCount();

  this.todoFilter = new TodoFilter(this.renderFilteredItems);

  new TodoInput(this.addItem);

  this.render();
}