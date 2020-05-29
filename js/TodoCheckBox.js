import { EVENT_TYPE } from "./constants.js";

export function TodoCheckBox({onCheck}) {
    const $todoList = document.querySelector('#todo-list')

    $todoList.addEventListener(EVENT_TYPE.CLICK, event => this.clickCheckbox(event))

    this.clickCheckbox = event => {
        const $target = event.target
        if ($target.type !== "checkbox") {
            return;
        }
        onCheck($target.closest('li').id)
    }
}