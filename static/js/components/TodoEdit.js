import {EVENT_TYPE, KEY_CODE, STATE} from "../utils/constants.js";

export function TodoEdit({startEdit, cancelEdit, endEdit}) { // Todo : 왜 {onEdit} -> onEdit 하면 에러??
    const $todo_list = document.querySelector("#todo-list");

    const onEditHandler = event => {
        if (event.target.className === "label" && event.type === EVENT_TYPE.DOUBLE_CLICK) {
            const id = event.target.parentElement.parentElement.getAttribute("data-id");
            startEdit(id);
        }

        if (event.target.className === "edit"
            && event.target.parentElement.className === STATE.EDITING
            && event.key === KEY_CODE.ESC) {
            const id = event.target.parentElement.getAttribute("data-id");
            cancelEdit(id);
        }

        if (event.target.className === "edit"
            && event.target.parentElement.className === STATE.EDITING
            && event.key === KEY_CODE.ENTER) {
            const id = event.target.parentElement.getAttribute("data-id");
            endEdit(id, event.target.value, STATE.VIEW);
        }
    };

    $todo_list.addEventListener(EVENT_TYPE.DOUBLE_CLICK, onEditHandler);
    $todo_list.addEventListener(EVENT_TYPE.KEY_DOWN, onEditHandler);
}