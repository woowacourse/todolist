import { TODO_ITEM_STATE, TEXT_TYPE } from '../utils/Constants.js';

const todoItemTemplate = (todoItem) => `
<li data-id="${todoItem.id}" class="${todoItem.isCompleted() ? TODO_ITEM_STATE.COMPLETED : TODO_ITEM_STATE.DOING} ${
    todoItem.isEditMode() ? TODO_ITEM_STATE.EDITING : TODO_ITEM_STATE.DOING
}">
<div class="view">
  <input class="toggle" type="checkbox" ${todoItem.isCompleted() ? 'checked' : ''}>
  <label class="label">${todoItem.contents}</label>
  <button class="destroy"></button>
</div>
<input class="edit" value="${todoItem.contents}">
</li>
`;

export default class TodoItem {
    constructor(id, contents, completed, editMode) {
        this.validateContentLength(contents);
        this.id = id;
        this.contents = contents;
        this.completed = completed;
        this.editMode = editMode;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    toggleEditMode() {
        this.editMode = !this.editMode;
    }

    changeContents(contents) {
        this.validateContentLength(contents);
        this.contents = contents;
    }

    validateContentLength(contents) {
        if (contents.trim(TEXT_TYPE.BLANK).length === 0) {
            throw Error('빈 문자열은 입력할 수 없습니다.');
        }
    }

    isSameId(id) {
        return Object.is(this.id, id);
    }

    isNotSameId(id) {
        return !Object.is(this.id, id);
    }

    isCompleted() {
        return this.completed;
    }

    isNotCompleted() {
        return !this.completed;
    }

    isEditMode() {
        return this.editMode;
    }

    render() {
        return todoItemTemplate(this);
    }
}
