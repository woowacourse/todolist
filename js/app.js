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

    const toggleComplete = event => {
        if (event.target.classList.contains('toggle')) {
            const $listToToggle = event.target.closest('li');
            if ($listToToggle.classList.contains('completed')) {
                $listToToggle.classList.remove('completed');
                return;
            }
            $listToToggle.classList.add('completed');
        }
    }

    this.init = () => {
        $newTodoTitle.addEventListener('keypress', addNewTodo);
        $todoList.addEventListener('click', toggleComplete);
    }
}

const todoList = new TodoList()
todoList.init()
