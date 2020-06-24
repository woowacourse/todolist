import { todoListRender } from "../utils/Templates.js";
import {
  CLASS_TYPE,
  EVENT_TYPE,
  GUIDE_MESSAGE,
  KEY_CODE,
  TAG_TYPE,
} from "../utils/Constracts.js";
import { validateBlank, validateHasClass } from "../utils/Validator.js";

export class TodoList {
  constructor(onToggle, onDelete, onEdit, onCancelEdit) {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoList.addEventListener(EVENT_TYPE.CLICK, (event) => {
      this.onToggleHandler(event, onToggle);
      this.onDeleteHandler(event, onDelete);
    });
    this.$todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, (event) => {
      this.onEditHandler(event, onEdit);
    });
    this.$todoList.addEventListener(EVENT_TYPE.KEY_DOWN, (event) => {
      this.onEditHandler(event, onEdit, onCancelEdit);
    });
  }

  onToggleHandler(event, onToggle) {
    if (!validateHasClass(event.target, CLASS_TYPE.TOGGLE)) {
      return;
    }
    onToggle(event.target.closest(TAG_TYPE.LI).dataset.id);
  }

  onDeleteHandler(event, OnDelete) {
    if (!validateHasClass(event.target, CLASS_TYPE.DESTROY)) {
      return;
    }
    if (!confirm(GUIDE_MESSAGE.DELETE)) {
      return;
    }
    OnDelete(event.target.closest(TAG_TYPE.LI).dataset.id);
  }

  onEditHandler(event, onEdit, onCancelEdit) {
    if (
      !validateHasClass(event.target, CLASS_TYPE.LABEL) &&
      event.type !== EVENT_TYPE.KEY_DOWN
    ) {
      return;
    }
    event.target.closest(TAG_TYPE.LI).classList.add(CLASS_TYPE.EDITING);
    if (event.code === KEY_CODE.ESC) {
      event.target.closest(TAG_TYPE.LI).classList.remove(CLASS_TYPE.EDITING);
      onCancelEdit();
    }
    if (event.code === KEY_CODE.ENTER) {
      try {
        validateBlank(event.target.value);
        onEdit(
          event.target.value,
          event.target.closest(TAG_TYPE.LI).dataset.id
        );
      } catch (e) {
        alert(e.message);
      }
    }
  }

  render(todoItems) {
    this.$todoList.innerHTML = todoItems
      .map((todoItem) => todoListRender(todoItem))
      .join("");
  }
}
