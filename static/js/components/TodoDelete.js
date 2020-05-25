import {EVENT_TYPE, STATE, MESSAGE} from "../utils/constants.js";

export function TodoDelete({onDelete}) {
    const $todo_list = document.querySelector("#todo-list");

    const onDeleteHandler = event => {
        if (event.target.className === "destroy") {
            if (confirm(MESSAGE.CONFIRM_DELETE)) {
                const id = event.target.parentElement.parentElement.getAttribute("data-id");
                onDelete(id);
            }
        }
    };

    $todo_list.addEventListener(EVENT_TYPE.CLICK, onDeleteHandler);
}