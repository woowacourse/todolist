import {itemTemplate, totalCountTemplate} from '../utils/templates.js'

function TodoList() {
    const $newTodoTitle = document.querySelector("#new-todo-title");
    const $todoList = document.querySelector("#todo-list");
    const $todoCount = document.querySelector(".todo-count");
    const $filters = document.querySelector(".filters");

    const insertTodo = event => {
        if (event.key !== 'Enter' || $newTodoTitle.value === "") {
            return;
        }
        $todoList.insertAdjacentHTML("afterbegin", itemTemplate($newTodoTitle.value));
        updateTodoCount();
    }

    const makeCompleted = event => {
        if (event.target && event.target.classList.contains("toggle")) {
            event.target.closest("li").classList.toggle("completed");
        }
    }

    const deleteTodo = event => {
        if (event.target && event.target.nodeName === "BUTTON") {
            $todoList.removeChild(event.target.closest("li"));
        }
        updateTodoCount();
    }

    const editTodo = event => {
        if (event.target && event.target.nodeName === "LABEL") {
            event.target.closest("li").classList.add("editing");
        }
    }

    const finishEditTodo = event => {
        if (event.key !== 'Enter' && event.key !== 'Escape') {
            return;
        }
        if (event.key === 'Enter') {
            console.log(event.target.querySelector("label"))
            event.target.parentNode.querySelector("label").innerHTML = event.target.value;
        }
        event.target.closest("li").classList.remove("editing");
    }

    const updateTodoCount = () => {
        $todoCount.innerHTML = totalCountTemplate($todoList.childElementCount);
    }

    this.init = () => {
        $newTodoTitle.addEventListener('keypress', insertTodo);
        $todoList.addEventListener('click', makeCompleted);
        $todoList.addEventListener('click', deleteTodo);
        $todoList.addEventListener('dblclick', editTodo);
        $todoList.addEventListener('keydown', finishEditTodo);
        updateTodoCount();
    }

}

const todolist = new TodoList();
todolist.init();
