import {KEY_TYPE, EVENT_TYPE} from "../constant/event.js";
import {ITEM_CLASS} from "../constant/todoItem.js";
import {SELECTOR_TYPE} from "../constant/event.js";

export function TodoList(toggleComplete, deleteItem, toggleEdit, saveEdit) {
  const $todoList = document.querySelector("#todo-list");

  this.render = (todoItems, todoFilter) => {
    const itemsTemplate = todoItems.map(item => item.getTemplate(todoFilter)).join("");
    $todoList.innerHTML = itemsTemplate;
  };

  const hasClass = (target, className) => target.classList.contains(className);

  const findSelectedItemId = (target) => target.closest(SELECTOR_TYPE.CLASS + ITEM_CLASS.ITEM).dataset.itemId;

  this.completeToggleHandler = (event) => {
    const $target = event.target;
    if (!hasClass($target, ITEM_CLASS.COMPLETE_TOGGLE_BUTTON)) {
      return;
    }
    toggleComplete(findSelectedItemId($target));
  };

  this.deleteToggleHandler = (event) => {
    const $target = event.target;
    if (!hasClass($target, ITEM_CLASS.DELETE_BUTTON)) {
      return;
    }
    deleteItem(findSelectedItemId($target));
  };

  this.editToggleHandler = (event) => {
    const $target = event.target;
    if (!hasClass($target, ITEM_CLASS.CONTENT)) {
      return;
    }
    toggleEdit(findSelectedItemId($target));
  };

  this.saveEditHandler = (event) => {
    if (event.key !== KEY_TYPE.ENTER) {
      return;
    }
    const $target = event.target;
    if (!hasClass($target, ITEM_CLASS.EDIT)) {
      return;
    }
    const content = $target.value;
    saveEdit(findSelectedItemId($target), content);
  };

  this.cancelEditHandler = (event) => {
    if (event.key !== KEY_TYPE.ESCAPE) {
      return;
    }
    const $target = event.target;
    if (!hasClass($target, ITEM_CLASS.EDIT)) {
      return;
    }
    toggleEdit(findSelectedItemId($target));
  };

  $todoList.addEventListener(EVENT_TYPE.CLICK, this.completeToggleHandler);
  $todoList.addEventListener(EVENT_TYPE.CLICK, this.deleteToggleHandler);
  $todoList.addEventListener(EVENT_TYPE.DB_CLICK, this.editToggleHandler);
  $todoList.addEventListener(EVENT_TYPE.KEY_UP, this.saveEditHandler);
  $todoList.addEventListener(EVENT_TYPE.KEY_UP, this.cancelEditHandler);
}
