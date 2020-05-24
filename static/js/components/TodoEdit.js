import {EVENT_TYPE, KEY_CODE, STATE} from "../utils/constants.js";

export function TodoEdit({onEdit}) { // Todo : 왜 {onEdit} -> onEdit 하면 에러??
    const $todo_list = document.querySelector("#todo-list");

    const onEditHandler = event => {
        if (event.target.className === "label" && event.type === EVENT_TYPE.DOUBLE_CLICK) {
            event.target.parentElement.parentElement.className = STATE.EDITING;
        }

        if (event.target.className === "edit"
            && event.target.parentElement.className === STATE.EDITING
            && event.key === KEY_CODE.ESC) {
            event.target.parentElement.className = STATE.VIEW;
        }

        if (event.target.className === "edit"
            && event.target.parentElement.className === STATE.EDITING
            && event.key === KEY_CODE.ENTER) {
            event.target.parentElement.className = STATE.VIEW;
            const index = event.target.parentElement.getAttribute("data-index");
            // this.todo_items[index] = event.target.value;
            onEdit(index, event.target.value);
        }
    };

    $todo_list.addEventListener(EVENT_TYPE.DOUBLE_CLICK, onEditHandler);
    $todo_list.addEventListener(EVENT_TYPE.KEY_DOWN, onEditHandler);
}