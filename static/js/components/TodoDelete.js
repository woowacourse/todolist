import {EVENT_TYPE, STATE} from "../utils/constants.js";

export function TodoDelete({onDelete}) {
    const $todo_list = document.querySelector("#todo-list");

    const onDeleteHandler = event => {
        if (event.target.className === "destroy") {
            event.target.parentElement.parentElement.className = STATE.COMPLETED;
            const index = event.target.parentElement.parentElement.getAttribute("data-index");
            onDelete(index);
        }
    };

    $todo_list.addEventListener(EVENT_TYPE.CLICK, onDeleteHandler);
}