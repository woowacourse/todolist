const makeTodoItemTemplate = todoItem => {
  if (todoItem.isInNormal()) {
    return makeTodoItemTemplateInNormal(todoItem);
  }
  else if (todoItem.isBeingEdited()) {
    return makeTodoItemTemplateBeingEdited(todoItem);
  }
  else if (todoItem.completed()) {
    return makeTodoItemTemplateCompleted(todoItem);
  }
};

const makeTodoItemTemplateInNormal = todoItem => `
  <li>
    <div class="view">
      <input class="toggle" type="checkbox">
      <label class="label">` + todoItem.title + `</label>
      <button class="destroy" data-id="` + todoItem.id + `"></button>
    </div>
    <input class="edit" value="새로운 타이틀">
  </li>`;

const makeTodoItemTemplateBeingEdited = todoItem => `
  <li class="editing">
    <div class="view">
      <input class="toggle" type="checkbox">
      <label class="label">` + todoItem.title + `</label>
      <button class="destroy" data-id="` + todoItem.id + `"></button>
    </div>
    <input class="edit" value="새로운 타이틀">
  </li>`;

const makeTodoItemTemplateCompleted = todoItem => `
  <li class="completed">
    <div class="view">
      <input class="toggle" type="checkbox">
      <label class="label">` + todoItem.title + `</label>
      <button class="destroy" data-id="` + todoItem.id + `"></button>
    </div>
    <input class="edit" value="새로운 타이틀">
  </li>`;

export default makeTodoItemTemplate;