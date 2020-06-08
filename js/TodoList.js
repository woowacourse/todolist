import { EVENT_TYPE, INPUT_TYPE, KEY_TYPE } from "./constants.js";
import { todoItemTemplate } from "./templates.js";

function TodoList(onToggle, onDelete, onDblClick, onRollback, onCommit) {
  this.$todoList = document.querySelector("#todo-list");

  this.$todoList.addEventListener(EVENT_TYPE.CLICK, (event) =>
    this.onClick(event)
  );
  this.$todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, (event) =>
    this.startEdit(event)
  );
  this.$todoList.addEventListener(EVENT_TYPE.KEYUP, (event) =>
    this.finishEdit(event)
  );

  this.onClick = (event) => {
    const $target = event.target;
    const id = Number($target.closest("li").getAttribute("id"));
    if ($target.classList.contains(INPUT_TYPE.TOGGLE)) {
      onToggle(event, id);
    } else if ($target.classList.contains(INPUT_TYPE.DESTROY)) {
      onDelete(event, id);
    }
  };

  this.startEdit = (event) => {
    const $target = event.target;
    const id = Number($target.closest("li").getAttribute("id"));
    if ($target.classList.contains("label")) {
      onDblClick(event, id);
    }
  };

  this.finishEdit = (event) => {
    const $target = event.target;
    const id = Number($target.closest("li").getAttribute("id"));
    if ($target.classList.contains("edit")) {
      if (event.key === KEY_TYPE.ENTER) {
        onCommit(event, id, $target.value);
      } else if (event.key === KEY_TYPE.ESC) {
        onRollback(event, id);
      }
    }
  };

  this.render = (items) => {
    this.$todoList.innerHTML = items.map(todoItemTemplate).join("");
  };
}

export default TodoList;
