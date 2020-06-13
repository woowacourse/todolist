import { EVENT_TYPE, TODO_CLASS_NAME, TAG_NAME, TEXT_TYPE, TODO_ITEM_STATE, KEY_TYPE } from '../utils/Constants.js';

export default class TodoList {
    constructor(todoItems, { onToggleCompleted, onDelete, onToggleEditMode, onEdit }) {
        this.$todoList = document.querySelector('#todo-list');
        this.$todoList.addEventListener(EVENT_TYPE.CLICK, (event) => {
            this.toggleCompleted(event, onToggleCompleted);
            this.deleteItem(event, onDelete);
        });
        this.$todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, (event) => this.toggleEdit(event, onToggleEditMode));
        this.$todoList.addEventListener(EVENT_TYPE.KEY_DOWN, (event) => this.editItem(event, onEdit));
        this.render(todoItems);
    }

    toggleCompleted(event, onToggleCompleted) {
        const $target = event.target;
        if (!$target.classList.contains(TODO_CLASS_NAME.TOGGLE)) {
            return;
        }
        const $todoItem = $target.closest(TAG_NAME.LIST);
        onToggleCompleted($todoItem.dataset.id);
    }

    toggleEdit(event, onToggleEditMode) {
        const $target = event.target;
        const $todoItem = $target.closest(TAG_NAME.LIST);
        if ($todoItem.classList.contains(TODO_ITEM_STATE.EDITING)) {
            return;
        }
        onToggleEditMode($todoItem.dataset.id);
    }

    editItem(event, onEdit) {
        const $target = event.target;
        const $todoItem = $target.closest(TAG_NAME.LIST);
        if (Object.is(event.key, KEY_TYPE.ENTER)) {
            onEdit($todoItem.dataset.id, $target.value);
        } else if (Object.is(event.key, KEY_TYPE.ESCAPE)) {
            onEdit($todoItem.dataset.id, $todoItem.querySelector(TAG_NAME.LABEL).innerText);
        }
    }

    deleteItem(event, onDelete) {
        const $target = event.target;
        if (!$target.classList.contains(TODO_CLASS_NAME.DESTROY)) {
            return;
        }
        const $todoItem = $target.closest(TAG_NAME.LIST);
        onDelete($todoItem.dataset.id);
    }

    render(todoItems) {
        this.$todoList.innerHTML = todoItems.map((todoItem) => todoItem.render()).join(TEXT_TYPE.EMPTY);
    }
}
