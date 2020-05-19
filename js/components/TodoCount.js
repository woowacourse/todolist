import {todoCountTemplate} from "../utils/Templates.js";

function TodoCount() {
    const $todoCount = document.querySelector(".todo-count")

    this.setState = count => {
        this.render(count)
    }

    this.render = data => {
        $todoCount.innerHTML = todoCountTemplate(data);
    }
}

export default TodoCount;