import {todoItemTemplate} from '../utils/templates.js';
import {EVENT_TYPE, KEY} from "../utils/constants.js";

export function TodoList({onEdit, onToggle, onDelete}) {
  const $todoList = document.querySelector('.todo-list');

  this.render = items => {
    const template = items.map(todoItemTemplate);
    $todoList.innerHTML = template.join("");
  };

  const onStartEditTodoItem = event => {
    const $target = event.target;
    const isEditing = $target.closest('li').classList.contains('editing');
    if (isEditing) {
      return;
    }
    //TODO:수정 시작하려고 더블클릭하면 전에 입력했던 텍스트가 뜸
    $target.closest('li').classList.toggle('editing');
  }

  const onEndEditTodoItem = event => {
    const $target = event.target;
    if (event.key === KEY.ESC) {
      $target.closest('li').classList.toggle('editing');
    } else if (event.key === KEY.ENTER) {
      const input = $target.value;
      const id = $target.closest('li').dataset.id;
      onEdit(id, input);
    }
  }

  const onToggleTodoItem = event => {
    const $target = event.target;
    const isToggleButtonClicked = $target.classList.contains('toggle');
    if (!isToggleButtonClicked) {
      return;
    }
    onToggle($target.closest('li').dataset.id);
  }

  const onDeleteTodoItem = event => {
    const $target = event.target;
    const isDeleteButtonClicked = $target.classList.contains('destroy');
    if (!isDeleteButtonClicked) {
      return;
    }
    onDelete($target.closest('li').dataset.id);
  }

  $todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, onStartEditTodoItem);
  $todoList.addEventListener(EVENT_TYPE.KEY_DOWN, onEndEditTodoItem);
  $todoList.addEventListener(EVENT_TYPE.CLICK, onToggleTodoItem);
  $todoList.addEventListener(EVENT_TYPE.CLICK, onDeleteTodoItem);
}
