import {todoItemTemplate} from "../templates/todoItemTemplate.js";

export function TodoItem(content, completed = false, editing = false) {
  this.id = Date.now();

  this.renderingHtml = () => todoItemTemplate(this.id, content, completed, editing);

  this.is = (id) => this.id === Number(id) || this.id === id;

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