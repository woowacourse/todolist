import TodoItem from "../entity/TodoItem.js";

import {EVENT_TYPE, KEY_TYPE} from "../../../utils/constants.js"

export default function TodoInput({onPost}) {
    const $todoInput = document.querySelector("#new-todo-title");

    const addTodoItemHandler = event => {
        const $newTodoTarget = event.target;
        if (isValid(event, $newTodoTarget.value)) {
            onPost($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    };

    const isValid = (event, value) => {
        return event.key === KEY_TYPE.ENTER && value;
    }

    const init = () => {
        $todoInput.addEventListener(EVENT_TYPE.KEY_DOWN, addTodoItemHandler);
    }

    return {
        init
    }
}
