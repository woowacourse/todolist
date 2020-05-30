import {EVENT_TYPE, KEY_TYPE} from "../../../../utils/constants.js";

import TodoItem from "../../entity/TodoItem.js";

export default function TodoEdit(onEdit) {
    const $todoList = document.querySelector('#todo-list');

    const onCancelEdieHandler = event => {
        const $target = event.target;
        const isCancel = event.key === KEY_TYPE.ESC && $target.classList.contains('edit');
        if (isCancel) {
            $target.closest('li').classList.remove('editing')
            $target.value = $target.closest('li').innerText
        }
    }

    const onEditHandler = event => {
        const $target = event.target;
        const isNotEditContentMode = !(event.key === KEY_TYPE.ENTER && $target.classList.contains('edit'));
        if (isNotEditContentMode) {
            return;
        }
        const content = $target.value;
        const editedId = $target.closest('li').dataset.todoId;
        const isCompleted = $target.closest('li').querySelector('.toggle').checked
        onEdit(new TodoItem(content, editedId, isCompleted));   //API 적용 안함
    }

    const onEditModeHandler = event => {
        const $target = event.target;
        const isNotEditTarget = !$target.classList.contains('label');
        if (isNotEditTarget) {
            return;
        }
        $target.closest("li").classList.add('editing');
    }

    const init = (() => {
        $todoList.addEventListener(EVENT_TYPE.KEY_DOWN, onCancelEdieHandler);
        $todoList.addEventListener(EVENT_TYPE.KEY_DOWN, onEditHandler);
        $todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, onEditModeHandler);
    })()
}