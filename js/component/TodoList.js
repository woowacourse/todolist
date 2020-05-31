import { todoItemTemplate } from '../../util/template.js';
import { CLASSNAME, EVENT_TYPE, KEY, TAG } from '../../util/constants.js';

export function TodoList({ onToggleComplete, onDelete, onToggleEdit, onEdit }) {
  this.$todoList = document.querySelector("#todo-list"); // todo: const로 선언해야하려나?

  this.$todoList.addEventListener(EVENT_TYPE.CLICK, event => {
    const $target = event.target;
    if ($target.classList.contains(CLASSNAME.TOGGLE)) {
      const $todoItem = $target.closest(TAG.LI);
      onToggleComplete($todoItem.dataset._id);
    }
  });

  this.$todoList.addEventListener(EVENT_TYPE.CLICK, event => {
    const $target = event.target;
    if ($target.classList.contains(CLASSNAME.DESTROY)) {
      const $todoItem = $target.closest(TAG.LI);
      onDelete($todoItem.dataset._id);
    }
  });

  this.$todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, event => {
    const $target = event.target;
    if ($target.classList.contains(TAG.LABEL)) {
      const $todoItem = $target.closest(TAG.LI);
      onToggleEdit($todoItem.dataset._id);
    }
  });

  this.$todoList.addEventListener(EVENT_TYPE.KEYDOWN, event => {
    const $target = event.target;
    if ($target.classList.contains(CLASSNAME.EDIT) && event.key === KEY.ENTER) {
      const $todoItem = $target.closest(TAG.LI);
      onEdit($todoItem.dataset._id, $target.value);
    } else if ($target.classList.contains(CLASSNAME.EDIT) && event.key === KEY.ESCAPE) {
      const $todoItem = $target.closest(TAG.LI);
      onToggleEdit($todoItem.dataset._id);
    }
  });

  this.render = items => {
    const template = items.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join("");
  };
}
