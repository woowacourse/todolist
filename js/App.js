import TodoList from "./views/todo/component/TodoList.js";
import TodoCount from "./views/todo/component/TodoCount.js";
import TodoInput from "./views/todo/component/TodoInput.js";
import api from "./api/index.js";

function TodoApp() {
    let todoItems = [];
    let activeListCondition;

    const setState = (updatedItems, updatedListCondition) => {
        todoItems = updatedItems;
        activeListCondition = updatedListCondition;
        todoList.setState(todoItems, activeListCondition);
        todoCount.setState(todoItems, activeListCondition);
    };

    const todoList = new TodoList({
        onToggle: toggledId => {
            api.todoList.toggle(toggledId);
            initData(activeListCondition);
        },
        onEdit: todoItem => {
            api.todoList.edit(todoItem);
            initData(activeListCondition);
        },
        onDelete: deletedId => {
            api.todoList.delete(deletedId);
            initData(activeListCondition);
        },

    });

    const todoCount = new TodoCount({
        onActive: contents => {
            activeListCondition = contents;
            setState(todoItems, activeListCondition);
        }
    });

    const todoInput = new TodoInput({
        onPost: newTodoItem => {
            api.todoList.create(newTodoItem);
            initData(activeListCondition);
        }
    });

    const initData = (activeListCondition) => {
        const allTodoItems = api.todoList.get();
        setState(allTodoItems, activeListCondition);
    }

    const init = () => {
        todoList.init();
        todoCount.init();
        todoInput.init();
        initData(val => val);
    }

    return {
        init
    }
}

const todoApp = new TodoApp();
todoApp.init();