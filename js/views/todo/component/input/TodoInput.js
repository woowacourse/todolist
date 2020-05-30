import {EVENT_TYPE, KEY_TYPE} from "../../../../utils/constants.js"

const TodoInput = ({onPost}) => {
    const $todoInput = document.querySelector("#new-todo-title");

    const addTodoItemHandler = event => {
        const $newTodoTarget = event.target;
        const isInvalid = !(event.key === KEY_TYPE.ENTER && $newTodoTarget.value);
        if (isInvalid) {
            return;
        }
        onPost($newTodoTarget.value);
        $newTodoTarget.value = "";
    };

    const init = (() => {
        $todoInput.addEventListener(EVENT_TYPE.KEY_DOWN, addTodoItemHandler);
    })();
};

export default TodoInput;