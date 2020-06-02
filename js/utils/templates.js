const makeTodoItemTemplate = todoItem => {
  if (todoItem.isInNormal()) {
    return makeTodoItemTemplateInNormal(todoItem.title);
  }
  else if (todoItem.isBeingEdited()) {
    return makeTodoItemTemplateBeingEdited(todoItem.title);
  }
  else if (todoItem.completed()) {
    return makeCompletedTodoItemTemplate(todoItem.title);
  }
};

const makeTodoItemTemplateInNormal = todoTitle => `
  <li>
    <div class="view">
      <input class="toggle" type="checkbox">
      <label class="label">` + todoTitle + `</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀">
  </li>`;

const makeTodoItemTemplateBeingEdited = todoTitle => `
  <li class="editing">
    <div class="view">
      <input class="toggle" type="checkbox">
      <label class="label">` + todoTitle + `</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀">
  </li>`;

const makeCompletedTodoItemTemplate = todoTitle => `
  <li class="completed">
    <div class="view">
      <input class="toggle" type="checkbox">
      <label class="label">` + todoTitle + `</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀">
  </li>`;

export default makeTodoItemTemplate;