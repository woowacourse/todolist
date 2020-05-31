import {newTodoTemplate} from "./templates.js";

function TodoList() {
    const $todoList = document.querySelector('#todo-list');
    const $newTodoTitle = document.querySelector('#new-todo-title');
    let savedTodoContent = '';

    const addNewTodo = event => {
        if (event.key === 'Enter') {
            const newTodo = event.target.value;
            const newItem = newTodoTemplate(newTodo);
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

    const editTodoStart = event => {
        const $target = event.target;
        const $listToEdit = $target.closest('li');
        if (!$listToEdit.classList.contains('editing')) {
            $listToEdit.classList.add('editing');
            savedTodoContent = $target.innerText;
        }
    }

    const editTodoEnd = event => {
        const $target = event.target;
        const $listToEdit = $target.closest('li');
        if (event.key === 'Enter') {
            const newTodo = event.target.value;
            $listToEdit.querySelector('.label').innerText = newTodo;
            $listToEdit.classList.remove('editing');
        }
        if (event.key === 'Escape') {
            $listToEdit.querySelector('.label').innerText = savedTodoContent;
            savedTodoContent = '';
            $listToEdit.classList.remove('editing');
        }
    }

    this.init = () => {
        $newTodoTitle.addEventListener('keypress', addNewTodo);
        $todoList.addEventListener('click', toggleComplete);
        $todoList.addEventListener('click', removeTodo);
        $todoList.addEventListener('dblclick', editTodoStart);
        $todoList.addEventListener('keyup', editTodoEnd);
    }
}

const todoList = new TodoList()
todoList.init()
