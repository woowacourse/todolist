import {EVENT_TYPE} from "../utils/constans.js";
import {Validator} from "../utils/Validator.js";

export const TodoList = class {
  constructor({onComplete, onDelete, toggleEdit, onEdit}) {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoList.addEventListener(EVENT_TYPE.CLICK,
      event => this.completeTodo(onComplete, event));
    this.$todoList.addEventListener(EVENT_TYPE.CLICK,
      event => this.deleteTodo(onDelete, event));
    this.$todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK,
      event => this.toggleEditingTodo(toggleEdit, event));
    this.$todoList.addEventListener(EVENT_TYPE.KEY_DOWN,
      event => this.editTodo(onEdit, event));
    this.clickOthers = this.editTodo.bind(this, onEdit);
  }

  render(items) {
    const template = items.map(item => item.create());
    this.$todoList.innerHTML = template.join("");
  }

  completeTodo(onComplete, event) {
    const $target = event.target;
    const isComplete = $target.classList.contains("toggle");
    if (isComplete) {
      onComplete(this.getId($target));
    }
  }

  deleteTodo(onDelete, event) {
    const $target = event.target;
    const isDelete = $target.classList.contains("destroy");
    if (isDelete && confirm("정말 삭제하시겠습니까?")) {
      onDelete(this.getId($target));
    }
  }

  toggleEditingTodo(toggleEdit, event) {
    const $target = event.target;
    const isLabel = $target.classList.contains("label");
    if (isLabel) {
      toggleEdit(this.getId($target));
      window.addEventListener(EVENT_TYPE.CLICK, this.clickOthers);
    }
  }

  editTodo(onEdit, event) {
    const $target = event.target;
    const isEdit = $target.classList.contains("edit");
    if (isEdit && Validator.isEnter(event)) {
      onEdit(this.getId($target), $target.value);
      window.removeEventListener(EVENT_TYPE.CLICK, this.clickOthers);
    } else if (isEdit && Validator.isESC(event)) {
      onEdit(this.getId($target),
        $target.closest("li").querySelector("label").innerText);
      window.removeEventListener(EVENT_TYPE.CLICK, this.clickOthers);
    } else if (!isEdit) {
      const $editInput = document.querySelector(".editing .edit");
      onEdit(this.getId($editInput),
        $editInput.closest("li").querySelector("label").innerText);
      window.removeEventListener(EVENT_TYPE.CLICK, this.clickOthers);
    }
  }

  getId(target) {
    return target.closest("li").dataset.id;
  }
};