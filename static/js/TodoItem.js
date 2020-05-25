import {STATE} from "./utils/constants.js";

export class TodoItem {
    constructor(id, content, isCompleted) {
        this.id = id;
        this.content = content;
        this.state = isCompleted ? STATE.COMPLETED : STATE.VIEW;
    }
}