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
        const $target = event.target;
        if ($target.classList.contains('toggle')) {
            const $listToToggle = $target.closest('li');
            if ($listToToggle.classList.contains('completed')) {
                $listToToggle.classList.remove('completed');
                return;
            }
            $listToToggle.classList.add('completed');
        }
    }

    const removeTodo = event => {
        const $target = event.target;
        if ($target.classList.contains('destroy')) {
            const $listToRemove = $target.closest('li');
            $listToRemove.remove();
        }
    }

    this.init = () => {
        $newTodoTitle.addEventListener('keypress', addNewTodo);
        $todoList.addEventListener('click', toggleComplete);
        $todoList.addEventListener('click', removeTodo);
    }
}

const todoList = new TodoList()
todoList.init()
