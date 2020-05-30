import TodoToggle from "./TodoToggle.js";
import TodoDelete from "./TodoDelete.js";
import TodoEdit from "./TodoEdit.js";

import {todoItemTemplate} from "../../../../utils/templates.js";

export default function TodoList({onDelete, onEdit, onToggle}) {
    const $todoList = document.querySelector('#todo-list');

    let todoItems = [];
    let todoFilterCondition;

    const setState = (updatedItems, updatedListCondition) => {
        todoItems = updatedItems;
        todoFilterCondition = updatedListCondition;
        render(todoItems, todoFilterCondition);
    }

    const render = (items, activeStatePage) => {
        const template = items.filter(activeStatePage).map(todoItemTemplate);
        $todoList.innerHTML = template.join("");
    }

    const init = (() => {
        new TodoToggle(onToggle);
        new TodoDelete(onDelete);
        new TodoEdit(onEdit);
    })()

    return {
        setState
    }
}