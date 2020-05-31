import {newTodoTemplate} from "./templates.js";

function TodoList() {
    const $todoList = document.querySelector('#todo-list');
    const $newTodoTitle = document.querySelector('#new-todo-title');

    const addNewTodo = event => {
        if (event.key === 'Enter') {
            const newItem = newTodoTemplate(event.target.value);
            $todoList.insertAdjacentHTML('beforeend', newItem);
            $newTodoTitle.value = '';
        }
    }

    this.init = () => {
        $newTodoTitle.addEventListener('keypress', addNewTodo);
    }
}

const todoList = new TodoList()
todoList.init()
