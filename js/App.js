import TodoList from "./views/todo/component/list/TodoList.js";
import TodoCount from "./views/todo/component/count/TodoCount.js";
import TodoInput from "./views/todo/component/input/TodoInput.js";
import api from "./api/index.js";

function TodoApp() {
    let todoItems = [];
    let todoFilterCondition;

    const setState = (updatedItems, updatedListCondition) => {
        todoItems = updatedItems;
        todoFilterCondition = updatedListCondition;
        todoList.setState(todoItems, todoFilterCondition);
        todoCount.setState(todoItems, todoFilterCondition);
    };

    const todoList = new TodoList({
        onDelete: deletedId => {
            api.todoList.delete(deletedId);
            initData(todoFilterCondition);
        },
        onEdit: todoItem => {
            api.todoList.edit(todoItem);
            initData(todoFilterCondition);
        },
        onToggle: toggledId => {
            api.todoList.toggle(toggledId);
            initData(todoFilterCondition);
        }
    });

    const todoCount = new TodoCount({
        onFilter: filterCondition => {
            todoFilterCondition = filterCondition;
            setState(todoItems, todoFilterCondition);
        }
    });

    new TodoInput({
        onPost: newTodoItem => {
            api.todoList.create(newTodoItem);
            initData(todoFilterCondition);
        }
    });

    const initData = (todoFilterCondition) => {
        const allTodoItems = api.todoList.get();
        setState(allTodoItems, todoFilterCondition);
    }

    const init = (() => initData(todoCount.getFilterCondition()))()
}

new TodoApp();