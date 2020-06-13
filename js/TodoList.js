import {todoItemTemplate} from '../utils/templates.js';
import {EVENT_TYPE, KEY} from "../utils/constants.js";

export function TodoList({onEdit, onToggle, onDelete}) {
  const $todoList = document.querySelector('.todo-list');

  this.setState = updatedTodoItems => {
    this.render(updatedTodoItems);
  };

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
    //TODO:토글만 할 뿐인데 왜 todoItemTemplate 형식으로 바뀌는걸까
    //TODO:토글하면 내용도 보여야 하는데 안보임. 또는 전에 입력했던적 있으면 그 텍스트가 뜸
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
