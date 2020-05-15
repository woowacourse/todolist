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
  }

  this.completeItem = (itemId) => {
    const updatedItems = this.todoItems.map(item => {
      if (item.is(itemId)) {
        return item.completeToggled();
      }
      return item;
    });
    this.setState(updatedItems);
  };

  this.deleteItem = (itemId) => {
    const updateItems = this.todoItems.filter(item => !item.is(itemId));
    this.setState(updateItems);
  }

  this.todoList = new TodoList(this.completeItem, this.deleteItem);

  new TodoInput(this.addItem);
}