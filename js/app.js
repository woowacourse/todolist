import {itemTemplate, totalCountTemplate} from '../utils/templates.js'
import {EVENT_TYPE, KEY_TYPE} from "../utils/Constants.js";

function TodoList() {
    const $newTodoTitle = document.querySelector("#new-todo-title");
    const $todoList = document.querySelector("#todo-list");
    const $todoCount = document.querySelector(".todo-count");
    const $filters = document.querySelector(".filters");

    const insertTodo = event => {
        if (!isEnterKey(event) || $newTodoTitle.value === "") {
            return;
        }
        $todoList.insertAdjacentHTML("afterbegin", itemTemplate($newTodoTitle.value));
        $newTodoTitle.value = "";
        updateTodoCount();
    }

    const makeCompleted = event => {
        if (event.target && event.target.classList.contains("toggle")) {
            event.target.closest("li").classList.toggle("completed");
        }
    }

    const deleteTodo = event => {
        if (event.target && event.target.classList.contains("destroy")) {
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
        if (!isEnterKey(event) && event.key !== KEY_TYPE.ESC) {
            return;
        }
        if (isEnterKey(event)) {
            event.target.parentNode.querySelector("label").innerHTML = event.target.value;
        }
        event.target.closest("li").classList.remove("editing");
    }

    const updateTodoCount = () => {
        let todoCount = 0;
        $todoList.childNodes.forEach(todo => {
            console.log(todo);
            if (todo.classList && !todo.classList.contains("hidden")) {
                todoCount++;
            }
        });
        $todoCount.innerHTML = totalCountTemplate(todoCount);
    }

    const changeFilter = event => {
        if (event.target.nodeName === 'A') {
            $filters.querySelector(".selected").classList.remove("selected");
            event.target.classList.add("selected");
        }
        if (event.target.classList.contains('all')) {
            $todoList.querySelectorAll('li').forEach(li => li.classList.remove('hidden'));
        } else if (event.target.classList.contains('active')) {
            $todoList.querySelectorAll('li').forEach(li => {
                if (li.classList.contains('completed')) {
                    li.classList.add('hidden');
                } else {
                    li.classList.remove('hidden');
                }
            });
        } else if (event.target.classList.contains('completed')) {
            $todoList.querySelectorAll('li').forEach(li => {
                if (li.classList.contains('completed')) {
                    li.classList.remove('hidden');
                } else {
                    li.classList.add('hidden');
                }
            });
        }
        updateTodoCount();
    }

    const isEnterKey = event => {
        return event.key === KEY_TYPE.ENTER;
    }

    this.init = () => {
        $newTodoTitle.addEventListener(EVENT_TYPE.KEY_DOWN, insertTodo);
        $todoList.addEventListener(EVENT_TYPE.CLICK, makeCompleted);
        $todoList.addEventListener(EVENT_TYPE.CLICK, deleteTodo);
        $todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, editTodo);
        $todoList.addEventListener(EVENT_TYPE.KEY_DOWN, finishEditTodo);
        $filters.addEventListener(EVENT_TYPE.CLICK, changeFilter);
        updateTodoCount();
    }

}

const todolist = new TodoList();
todolist.init();
