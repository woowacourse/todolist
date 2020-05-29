import {todoCountTemplate} from "./templates.js";

export function TodoCount() {
    const $todoCount  = document.querySelector(".todo-count");

    this.setCount = count => {
        $todoCount.innerHTML = todoCountTemplate(count);
    }
}