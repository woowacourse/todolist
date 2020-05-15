import {TodoList} from "./todoList.js";
import {TodoInput} from "./todoInput.js";
import {TodoItem} from "./todoItem.js";

export function TodoApp() {
  this.todoItems = [];

  this.addItem = (content) => {
    const newItem = new TodoItem(content);
    this.setState([...this.todoItems, newItem]);
  };

  this.setState = (updatedItems) => {
    this.todoItems = updatedItems;
    this.todoList.render(this.todoItemsTemplate());
  };

  this.todoItemsTemplate = () => {
    return this.todoItems.map(item => item.renderingHtml()).join("");
  };

  this.toggleComplete = (itemId) => {
    const updatedItems = this.todoItems.map(item => item.toggleCompleteIf(itemId));
    this.setState(updatedItems);
  };

  this.toggleDelete = (itemId) => {
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

  this.todoList = new TodoList(this.toggleComplete, this.toggleDelete, this.toggleEdit, this.saveEdit);

  new TodoInput(this.addItem);
}