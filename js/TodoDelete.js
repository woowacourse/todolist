import {EVENT_TYPE} from "./constants.js";

export function TodoDelete({onDelete}) {
    const $todoList = document.querySelector("#todo-list");
    $todoList.addEventListener(EVENT_TYPE.CLICK, event => this.onDeleteItem(event));

    this.onDeleteItem = event => {
        const $target = event.target;
        const isDeleteButton = $target.classList.contains("destroy");
        if(!isDeleteButton){
            return;
        }
        const itemId = $target.closest("li").dataset.id;
        onDelete(itemId);
    }
}