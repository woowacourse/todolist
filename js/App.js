import TodoList from "./views/todo/component/TodoList.js";
import TodoCount from "./views/todo/component/TodoCount.js";
import TodoInput from "./views/todo/component/TodoInput.js";

function TodoApp() {
    let todoItems = [];
    let activeListCondition = val => val;

    const setState = (updatedItems, updatedListCondition) => {
        todoItems = updatedItems;
        activeListCondition = updatedListCondition;
        todoList.setState(todoItems, activeListCondition);
        todoCount.setState(todoItems, activeListCondition);
    };

    const todoList = new TodoList({
        onEdit: todoItem => {
            todoItems.splice(todoItems.findIndex(item => item['_id'] === todoItem['_id']), 1, todoItem);
            setState(todoItems, activeListCondition);
        },
        onDelete: deletedId => {
            todoItems = todoItems.filter(item => item['_id'] !== deletedId);
            setState(todoItems, activeListCondition);
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
            todoItems.push(newTodoItem);
            setState(todoItems, activeListCondition);
        }
    });

    const init = () => {
        todoList.init();
        todoCount.init();
        todoInput.init();
    }

    return {
        init
    }
}

const todoApp = new TodoApp();
todoApp.init();