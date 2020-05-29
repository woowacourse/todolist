import TodoItem from "../views/todo/entity/TodoItem.js";

export const mockData = (() => {
    let dataSet = [
        {
            _id: "3dd",
            content: '해커스',
            isCompleted: false
        },
        {
            _id: "5ld",
            content: '영단',
            isCompleted: false
        },
        {
            _id: "8xd",
            content: '명동역 놀러가기',
            isCompleted: true
        },
        {
            _id: "008u",
            content: '낙원상가 악기구경',
            isCompleted: false
        },
        {
            _id: "88765d",
            content: '유튜브',
            isCompleted: true
        }
    ]

    const getAll = () => {
        return dataSet;
    }

    const createTodo = (content) => {
        dataSet = [... dataSet, new TodoItem(content)]
        return {
            content: content,
            isCompleted: false
        }
    }

    const toggleItemBy = (id) => {
        const index = dataSet.findIndex(data => data._id === id);
        dataSet[index]["isCompleted"] = !dataSet[index]["isCompleted"];
    }

    const edit = (todoItem) => {
        const index = dataSet.findIndex(data => data._id === todoItem._id);
        dataSet.splice(index, 1, todoItem);
    }

    const deleteById = (id) => {
        const index = dataSet.findIndex(data => data._id === id);
        dataSet.splice(index, 1);
    }

    return {
        getAll,
        createTodo,
        toggleItemBy,
        edit,
        deleteById
    }
})()