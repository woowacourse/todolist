export const TodoItemTemplate = todoItem => {
    return `<li id=${todoItem.id} class="${todoItem.completed ? "completed" : ""}">
        <div class="view">
          <input class="toggle" type="checkbox" ${todoItem.isCompleted ? "checked" : "unchecked"}>
          <label class="label">${todoItem.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀">
      </li>`
}

export const TodoCountTemplate = todoItems => {
    return `총 <strong>${todoItems.length}</strong> 개`;
};