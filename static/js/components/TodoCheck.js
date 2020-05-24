import {EVENT_TYPE, STATE} from "../utils/constants.js";

export function TodoCheck() {
    const $todo_list = document.querySelector("#todo-list");

    const onCheckHandler = event => {
        // Todo : 좀 더 좋은 방식
        // Todo : node element의 차이? (parentNode, parentElement)
        if (event.target.className === "toggle") {
            if (event.target.checked) {
                event.target.parentElement.parentElement.className = STATE.COMPLETED;
            } else{
                event.target.parentElement.parentElement.className = STATE.VIEW;
            }
        }
    };

    $todo_list.addEventListener(EVENT_TYPE.CLICK, onCheckHandler);
}