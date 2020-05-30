import {EVENT_TYPE} from "../../../../utils/constants.js";

const TodoDelete = (onDelete) => {
    const $todoList = document.querySelector('#todo-list');

    const onDeleteHandler = event => {
        const $target = event.target;
        const isNotDeleteButton = !$target.classList.contains('destroy');
        if (isNotDeleteButton) {
            return;
        }
        const deletedId = $target.closest('li').dataset.todoId;
        onDelete(deletedId);
    };

    const init = (() => $todoList.addEventListener(EVENT_TYPE.CLICK, onDeleteHandler))();
};

export default TodoDelete;