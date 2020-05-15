import {todoItemTemplate} from "../templates/todoItemTemplate.js";

export function TodoItem(content, completed = false, editing = false) {
  this.id = Date.now();

  this.renderingHtml = () => todoItemTemplate(this.id, content, completed);

  this.is = (id) => this.id === Number(id);

  this.completeToggled = () => {
    return new TodoItem(content, !completed, editing);
  }
}