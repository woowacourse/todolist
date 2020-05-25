import {EVENT_TYPE, STATE} from "../utils/constants.js";

export function TodoCheck({onCheck}) {
    const $todo_list = document.querySelector("#todo-list");

    const onCheckHandler = event => {
        // Todo : 좀 더 좋은 방식
        // Todo : node element의 차이? (parentNode, parentElement)
        if (event.target.className === "toggle") {
            const index = event.target.parentElement.parentElement.getAttribute("data-index");
            var checked = event.target.checked;
            if (event.target.checked) {
                onCheck(index, STATE.COMPLETED);
            } else{
                onCheck(index, STATE.VIEW);
            }
        }
    };

    $todo_list.addEventListener(EVENT_TYPE.CLICK, onCheckHandler);
}