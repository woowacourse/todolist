class TodoItem {
    constructor(id, contents, todoItemState) {
        this.id = id;
        this.contents = contents;
        this.isCompleted = todoItemState;
    }

    toggle() {
        this.isCompleted = !this.isCompleted;
    }
}

export default TodoItem;
