import {EVENT_TYPE} from "./constants.js";

export function TodoComplete({onComplete}) {
    const $todoList = document.querySelector("#todo-list");
    $todoList.addEventListener(EVENT_TYPE.CLICK, event => this.onToggleCompleteItem(event));

    this.onToggleCompleteItem = event => {
        const $target = event.target;
        const isCompleteButton = $target.classList.contains("toggle");
        if(!isCompleteButton){
            return;
        }
        $target.closest("li").classList.toggle("completed");
        const itemId = $target.closest("li").dataset.id;
        onComplete(itemId);
    };
}