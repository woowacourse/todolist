import {todoItemTemplate} from "../templates/todoItemTemplate.js";

export function TodoItem(content) {
  this.renderingHtml = () => todoItemTemplate(this);

  this.setState = (content, completed, editing) => {
    this.content = content;
    this.completed = completed;
    this.editing = editing;
  }

  this.setState(content, false, false);
}