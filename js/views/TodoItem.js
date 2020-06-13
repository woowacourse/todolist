import { TODO_ITEM_STATE } from '../utils/Constants.js';

export default class TodoItem {
    constructor(id, contents, state) {
        this.id = id;
        this.contents = contents;
        this.state = state;
    }

    toggle() {
        this.state = Object.is(this.state, TODO_ITEM_STATE.COMPLETED)
            ? TODO_ITEM_STATE.DOING
            : TODO_ITEM_STATE.COMPLETED;
    }

    isSameId(id) {
        return Object.is(this.id, id);
    }

    isNotSameId(id) {
        return !Object.is(this.id, id);
    }

    isCompleted() {
        return Object.is(this.state, TODO_ITEM_STATE.COMPLETED);
    }

    isNotCompleted() {
        return Object.is(this.state, TODO_ITEM_STATE.DOING);
    }
}
