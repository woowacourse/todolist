import {EVENT_TYPE} from "../utils/Constants.js";

function TodoItem(onToggleItemHandler) {
    const $todoList = document.querySelector("#todo-list");
    $todoList.addEventListener(EVENT_TYPE.KEY_DOWN, this.checkBoxToggle)

    this.checkBoxToggle = e => {
        if (this.valid(e)) {
            console.log(e.target);
            onToggleItemHandler()
        }
    }

    this.valid = (e) => e
}

export default TodoItem;