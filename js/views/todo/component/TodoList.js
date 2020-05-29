import TodoItem from "../entity/TodoItem.js";

import {EVENT_TYPE, KEY_TYPE} from "../../../utils/constants.js"
import {todoItemTemplate} from "../../../utils/templates.js";

export default function TodoList({onDelete, onEdit, onToggle}) {
    const $todoList = document.querySelector('#todo-list');

    let todoItems = [];
    let activeListCondition = '';

    const setState = (updatedItems, updatedListCondition) => {
        todoItems = updatedItems;
        activeListCondition = updatedListCondition;
        render(todoItems, activeListCondition);
    }
    const render = (items, activeStatePage) => {
        const template = items.filter(activeStatePage).map(todoItemTemplate);
        $todoList.innerHTML = template.join("");
    }

    const onDeleteHandler = event => {
        const $target = event.target;
        const isNotDeleteButton = !$target.classList.contains('destroy');
        if (isNotDeleteButton) {
            return;
        }
        const deletedId = $target.closest('li').dataset.todoId;
        onDelete(deletedId);
    }

    const onToggleHandler = event => {
        const $target = event.target;
        const isNotToggle = !$target.classList.contains('toggle');
        if (isNotToggle) {
            return;
        }
        const editedId = $target.closest('li').dataset.todoId;
        onToggle(editedId);
    }

    const onEditHandler = event => {
        const $target = event.target;
        const isCancel = event.key === KEY_TYPE.ESC && $target.classList.contains('edit');
        if (isCancel) {
            $target.closest('li').classList.remove('editing')
            $target.value = $target.closest('li').innerText
            return;
        }
        const isNotEditContentMode = !(event.key === KEY_TYPE.ENTER && $target.classList.contains('edit'));
        if (isNotEditContentMode) {
            return;
        }
        const content = $target.value;
        const editedId = $target.closest('li').dataset.todoId;
        const isCompleted = $target.closest('li').querySelector('.toggle').checked
        onEdit(new TodoItem(content, editedId, isCompleted));
    }

    const onEditModeHandler = event => {
        const $target = event.target;
        const isNotEditTarget = !$target.classList.contains('label');
        if (isNotEditTarget) {
            return;
        }
        $target.closest("li").classList.add('editing');
    }

    const init = () => {
        $todoList.addEventListener(EVENT_TYPE.CLICK, onDeleteHandler);
        $todoList.addEventListener(EVENT_TYPE.KEY_DOWN, onEditHandler);
        $todoList.addEventListener(EVENT_TYPE.CLICK, onToggleHandler);
        $todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, onEditModeHandler);
    }

    return {
        init,
        setState
    }
}