import { itemTemplate } from '../template/template.js';
import { EVENT_TYPE, KEY_TYPE } from '../utils/constants.js';

export default function TodoList(todoListMethods) {
  const $todoList = document.querySelector('#todo-list');
  $todoList.addEventListener(EVENT_TYPE.CLICK, e => this.onClickItem(e))
  $todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, e => this.onDoubleClickItem(e))
  $todoList.addEventListener(EVENT_TYPE.KEYUP, e => this.onPressKey(e))

  this.setState = updatedTodoItems => {
    this.render(updatedTodoItems);
  }

  this.render = items => {
    const template = items.map(itemTemplate);
    $todoList.innerHTML = template.join("");
  }

  this.onClickItem = e => {
    const $target = e.target;
    if (isCheckBox($target)) {
      onClickCheckBox($target);
    }
    if (isDeleteBtn($target)) {
      onClickDeleteBtn($target);
    }
  }

  this.onDoubleClickItem = e => {
    const $target = e.target;

    if (isLabel($target)) {
      $target.closest('li').classList.add('editing');
    }
  }

  this.onPressKey = e => {
    const $target = e.target;
    const beforeContents = $target.previousElementSibling.querySelector('label').innerText;
    const afterContents = $target.value;

    if (isInput($target) && isEnter(e.key)) {
      onPressEnter(beforeContents, afterContents, $target);
    }
    if (isInput($target) && isEscape(e.key)) {
      onPressEsc($target, beforeContents);
    }
  }

  const isLabel = $target => {
    return $target && $target.nodeName === 'LABEL';
  }

  const isCheckBox = $target => {
    return $target && $target.nodeName === 'INPUT' && $target.className === 'toggle';
  }

  const onClickCheckBox = $target => {
    const classList = $target.closest('li').classList;
    const isCompleted = classList.contains('completed');

    if (!isCompleted) {
      classList.add('completed');
    } else {
      classList.remove('completed');
    }
  }

  const isDeleteBtn = $target => {
    return $target && $target.nodeName === 'BUTTON';
  }

  const onClickDeleteBtn = $target => {
    const contents = $target.previousElementSibling.innerText;
    todoListMethods.onDeleteItem(contents);
  }

  const isInput = $target => {
    return $target && $target.nodeName === 'INPUT';
  }

  const isEnter = $key => {
    return $key && $key === KEY_TYPE.ENTER;
  }

  const isEscape = $key => {
    return $key && $key === KEY_TYPE.ESC;
  }

  const onPressEnter = (beforeContents, afterContents, $target) => {
    todoListMethods.onUpdateItem(beforeContents, afterContents);
    $target.closest('li').classList.remove('editing');
  }

  const onPressEsc = ($target, beforeContents) => {
    $target.value = beforeContents;
    $target.closest('li').classList.remove('editing');
  }
}