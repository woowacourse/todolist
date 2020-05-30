const TodoItem = (content, id = (num++).toString(), isCompleted = false) => {
    return {
        _id: id,
        content: content,
        isCompleted: isCompleted
    }
}

let num = 1;

export default TodoItem;