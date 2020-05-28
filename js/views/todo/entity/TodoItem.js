export default function TodoItem(content, id = "" + num++, isCompleted = false) {
    return {
        id: id,
        content: content,
        isCompleted: isCompleted
    }
}
let num = 1;