import { EVENT_TYPE, KEY_TYPE } from "../util/constants.js";

export function TodoInput({ onAdd }, todoInput) {
    todoInput.addEventListener(EVENT_TYPE.KEY_DOWN, event => this.addTodoItem(event));

    this.isValid = (event, value) => {
        return (event.key === KEY_TYPE.ENTER)
            && value.trim().length !== 0;
    }

    this.addTodoItem = event => {
        const $newTodoTarget = event.target;
        if (this.isValid(event, $newTodoTarget.value)) {
            event.preventDefault();
            onAdd($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    };
}