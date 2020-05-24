import {EVENT_TYPE, KEY_TYPE} from "../utils/constans.js";

export const TodoList = class {
  constructor({onComplete, onDelete, toggleEdit, onEdit}) {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoList.addEventListener(EVENT_TYPE.CLICK,
      this.completeTodo.bind(this));
    this.completeTodoHandler = onComplete;
    this.$todoList.addEventListener(EVENT_TYPE.CLICK,
      this.deleteTodo.bind(this));
    this.deleteTodoHandler = onDelete;
    this.$todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK,
      this.toggleEditingTodo.bind(this));
    this.toggleEditingTodoHandler = toggleEdit;
    this.$todoList.addEventListener(EVENT_TYPE.KEY_DOWN,
      this.editTodo.bind(this));
    this.editTodoHandler = onEdit;
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
    }
  }

  editTodo(event) {
    const $target = event.target;
    const isEdit = $target.classList.contains("edit");
    const isEnter = event.key === KEY_TYPE.ENTER;
    const isESC = event.key === KEY_TYPE.ESC;
    if (isEdit && isEnter) {
      this.editTodoHandler(this.getId($target), $target.value);
    }
    if (isEdit && isESC) {
      this.editTodoHandler(this.getId($target),
        $target.closest("li").querySelector("label").innerText);
    }
  }

  getId(target) {
    return target.closest("li").dataset.id;
  }
}