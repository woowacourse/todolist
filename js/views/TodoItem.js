import { TODO_ITEM_STATE } from '../utils/Constants.js';

class TodoItem {
    constructor(id, contents, state) {
        this.id = id;
        this.contents = contents;
        this.state = state;
    }

    toggleCompleted() {
        this.state = this.state === TODO_ITEM_STATE.COMPLETED ? TODO_ITEM_STATE.DOING : TODO_ITEM_STATE.COMPLETED;
    }

    isEditing() {
        return this.state === TODO_ITEM_STATE.EDITING;
    }

    isCompleted() {
        return this.state === TODO_ITEM_STATE.COMPLETED;
    }
}

export default TodoItem;
