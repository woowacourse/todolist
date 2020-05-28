export const TodoItemTemplate = todoItem => {
    return `<li id=${todoItem.id} class="${todoItem.completed ? "completed" : ""}">
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${todoItem.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀">
      </li>`
}