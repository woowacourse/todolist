import {EVENT_TYPE} from "../../../../utils/constants.js";

const TodoToggle = onToggle => {
    const $todoList = document.querySelector('#todo-list');

    const onToggleHandler = event => {
        const $target = event.target;
        const isNotToggle = !$target.classList.contains('toggle');
        if (isNotToggle) {
            return;
        }
        const editedId = $target.closest('li').dataset.todoId;
        onToggle(editedId);
    };

    const init = (() => $todoList.addEventListener(EVENT_TYPE.CLICK, onToggleHandler))();
};

export default TodoToggle;