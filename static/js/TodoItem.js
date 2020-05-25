import {STATE} from "./utils/constants.js";

export class TodoItem {
    constructor(index, id, content, isCompleted) {
        this.index = index;
        this.id = id;
        this.content = content;
        this.state = isCompleted ? STATE.COMPLETED : STATE.VIEW;
    }
}