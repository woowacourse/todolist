import {todoItemTemplate} from "../templates/TodoItemTemplate.js";

export function TodoItem(content, completed = false, editing = false) {
  this.id = Date.now();

  this.getTemplate = (todoFilter) => todoItemTemplate(this.id, content, completed, editing, todoFilter.expression(this));

  this.is = (id) => this.id === Number(id) || this.id === id;

  this.isComplete = () => completed;

  this.toggleCompleteIf = (id) => {
    if (this.is(id)) {
      return new TodoItem(content, !completed, editing);
    }
    return this;
  };

  this.toggleEditIf = (id) => {
    if (this.is(id)) {
      return new TodoItem(content, completed, !editing);
    }
    return this;
  };

  this.editContentIf = (id, modifiedContent) => {
    if (this.is(id)) {
      return new TodoItem(modifiedContent, completed, false);
    }
    return this;
  };
}