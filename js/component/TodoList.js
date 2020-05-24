import {EVENT_TYPE} from "../utils/constans.js";

export const TodoList = class {
  constructor({onComplete, onDelete}) {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoList.addEventListener(EVENT_TYPE.CLICK, this.completeTodo.bind(this));
    this.completeTodoHandler = onComplete;
    this.$todoList.addEventListener(EVENT_TYPE.CLICK, this.deleteTodo.bind(this));
    this.deleteTodoHandler = onDelete;
  }

  render(items) {
    const template = items.map(item => item.create());
    this.$todoList.innerHTML = template.join("");
  };

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

  getId(target) {
    return target.closest("li").dataset.id;
  }
}