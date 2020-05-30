import TodoList from "./views/todo/component/list/TodoList.js";
import TodoCount from "./views/todo/component/count/TodoCount.js";
import TodoInput from "./views/todo/component/input/TodoInput.js";
import api from "./api/index.js";

import {USER_NAME} from "./utils/constants.js";

function TodoApp() {
    let todoItems = [];
    let todoFilterCondition;

    const setState = (updatedItems, updatedListCondition) => {
        todoItems = updatedItems;
        todoFilterCondition = updatedListCondition;
        todoList.setState(todoItems, todoFilterCondition);
        todoCount.setState(todoItems, todoFilterCondition);
    };

    const initData = async (todoFilterCondition) => {
        const allTodoItems = await api.todoList.get(USER_NAME.DONGLE);
        setState(allTodoItems, todoFilterCondition);
    }

    const todoList = new TodoList({
        onDelete: async targetId => {
            await api.todoList.delete(USER_NAME.DONGLE, targetId);
            const remainedItems = todoItems.filter(todoItem => todoItem._id !== targetId);
            setState(remainedItems, todoFilterCondition);
        },
        onEdit: async todoItem => {
            api.todoList.edit(USER_NAME.DONGLE, todoItem);
            await initData(todoFilterCondition);
        },
        onToggle: async toggledId => {
            await api.todoList.toggle(USER_NAME.DONGLE, toggledId);
            await initData(todoFilterCondition);
        }
    });

    const todoCount = new TodoCount({
        onFilter: filterCondition => {
            todoFilterCondition = filterCondition;
            setState(todoItems, todoFilterCondition);
        }
    });

    new TodoInput({
        onPost: async newTodoItem => {
            await api.todoList.create(USER_NAME.DONGLE, newTodoItem);
            await initData(todoFilterCondition);
        }
    });

    const init = (async () => {
        await initData(todoCount.getFilterCondition())
    })()
}

new TodoApp();