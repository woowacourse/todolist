
function TodoItem({id, content, isCompleted = false}) {
  this.id = id;
  this.content = content;
  this.isCompleted = isCompleted;

  this.todoItemTemplate = () => `
      <li class="${this.isCompleted ? "completed" : ""}" data-id="${this.id}">
        <div class="view">
          <input class="toggle" type="checkbox" ${this.isCompleted ? "checked" : ""}>
          <label class="label">${this.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${this.content}">
      </li>`;
}

export default TodoItem;