import {EVENT_TYPE, KEY_TYPE} from "../utils/Constants.js";

function TodoInput(onAdd) {
    const $todoInput = document.querySelector("#new-todo-title");
    $todoInput.addEventListener(EVENT_TYPE.KEY_DOWN, event => this.addTodoItem(event));

    this.addTodoItem = event => {
        const $newTodoTarget = event.target;
        if (this.isValid(event, $newTodoTarget.value)) {
            onAdd($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    };

    this.isValid = function (event, value) {
        return (event && event.key === KEY_TYPE.ENTER) && (value !== '')
    }
}

export default TodoInput;