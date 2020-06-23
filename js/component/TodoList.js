import {EVENT_TYPE} from "../utils/constans.js";
import {Validator} from "../utils/Validator.js";

export const TodoList = class {
  constructor({onComplete, onDelete, toggleEdit, onEdit}) {
    this.$todoList = document.querySelector("#todo-list");
    this.completeTodoHandler = onComplete;
    this.deleteTodoHandler = onDelete;
    this.toggleEditingTodoHandler = toggleEdit;
    this.editTodoHandler = onEdit;
    this.editTodo = this.editTodo.bind(this);
    this.initEventListeners();
  }

  initEventListeners() {
    this.$todoList.addEventListener(EVENT_TYPE.CLICK,
      this.completeTodo.bind(this));
    this.$todoList.addEventListener(EVENT_TYPE.CLICK,
      this.deleteTodo.bind(this));
    this.$todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK,
      this.toggleEditingTodo.bind(this));
    this.$todoList.addEventListener(EVENT_TYPE.KEY_DOWN,
      this.editTodo.bind(this));
  }

  render(items) {
    const template = items.map(item => item.create());
    this.$todoList.innerHTML = template.join("");
  }

  completeTodo(event) {
    const $target = event.target;
    const isComplete = $target.classList.contains("toggle");
    if (isComplete) {
      this.completeTodoHandler(this.getId($target));
    }
  }

  deleteTodo(event) {
    const $target = event.target;
    const isDelete = $target.classList.contains("destroy");
    if (isDelete && confirm("정말 삭제하시겠습니까?")) {
      this.deleteTodoHandler(this.getId($target));
    }
  }

  toggleEditingTodo(event) {
    const $target = event.target;
    const isLabel = $target.classList.contains("label");
    if (isLabel) {
      this.toggleEditingTodoHandler(this.getId($target));
      window.addEventListener(EVENT_TYPE.CLICK, this.editTodo);
    }
  }

  editTodo(event) {
    const $target = event.target;
    const isEdit = $target.classList.contains("edit");
    if (isEdit && Validator.isEnter(event)) {
      this.editTodoHandler(this.getId($target), $target.value);
      window.removeEventListener(EVENT_TYPE.CLICK, this.editTodo);
    } else if (isEdit && Validator.isESC(event)) {
      this.editTodoHandler(this.getId($target),
        $target.closest("li").querySelector("label").innerText);
      window.removeEventListener(EVENT_TYPE.CLICK, this.editTodo);
    } else if (!isEdit) {
      const $editInput = document.querySelector(".editing .edit");
      this.editTodoHandler(this.getId($editInput),
        $editInput.closest("li").querySelector("label").innerText);
      window.removeEventListener(EVENT_TYPE.CLICK, this.editTodo);
    }
  }

  getId(target) {
    return Number(target.closest("li").dataset.id);
  }
};