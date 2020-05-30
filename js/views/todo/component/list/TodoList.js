import TodoToggle from "./TodoToggle.js";
import TodoDelete from "./TodoDelete.js";
import TodoEdit from "./TodoEdit.js";

import {todoItemTemplate} from "../../../../utils/templates.js";

const TodoList = ({onDelete, onEdit, onToggle}) => {
    const $todoList = document.querySelector('#todo-list');

    let todoItems = [];
    let todoFilterCondition;

    const setState = (updatedItems, updatedListCondition) => {
        todoItems = updatedItems;
        todoFilterCondition = updatedListCondition;
        render(todoItems, todoFilterCondition);
    };

    const render = (items, activeStatePage) => {
        const template = items.filter(activeStatePage).map(todoItemTemplate);
        $todoList.innerHTML = template.join("");
    };

    const init = (() => {
        TodoToggle(onToggle);
        TodoDelete(onDelete);
        TodoEdit(onEdit);
    })();

    return {
        setState
    };
};

export default TodoList;