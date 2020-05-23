import {todoItem, todoCount} from "../utils/templates.js";
import {EVENT_TYPE, KEY_TYPE} from "../utils/constants.js";
import {nanoid} from "../lib/nanoid.js";

function TodoInput(addTodo) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener(EVENT_TYPE.KEY_UP, (event) => {
    if (event.key === KEY_TYPE.ENTER && $todoInput.value.trim() !== "") {
      addTodo($todoInput.value);
      $todoInput.value = "";
    }
  });
}

function TodoList(removeTodo, toggleTodo, editTodo) {
  const $todoList = document.querySelector("#todo-list");

  const render = todoItems => {
    $todoList.innerHTML = todoItems.map(todoItem).join("");
  }

  $todoList.addEventListener(EVENT_TYPE.CLICK, event => {
    const id = event.target.closest("li").dataset.todoId;
    if (event.target.classList.contains('destroy')) {
      removeTodo(id);
    }

    if (event.target.classList.contains('toggle')) {
      toggleTodo(id);
    }
  });

  $todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, event => {
    event.target.closest("li").classList.add("editing");
  })

  $todoList.addEventListener(EVENT_TYPE.KEY_DOWN, event => {
    const targetList = event.target.closest("li");
    const id = targetList.dataset.todoId;

    if (event.key === "Escape") {
      targetList.classList.remove("editing");
    }
    if (event.key === "Enter") {
      const data = event.target.closest(".edit").closest("input").value
      editTodo(id, data)
      targetList.classList.remove("editing");
    }
  })

  return {
    render
  };
}

function TodoCount() {
  const $todoCount = document.querySelector(".todo-count");
  const render = todoItems => {
    $todoCount.innerHTML = todoCount(todoItems.length);
  }

  return {
    render
  };
}

function TodoApp() {
  let todoItems = [];

  const onAddTodoItemHandler = (todoValue) => {setState(
    todoItems.concat({
      id: nanoid(),
      title: todoValue,
      state: false
    }));
  }

  const onDeleteTotoItemHandler = id => {
    setState(todoItems.filter(todoItem => todoItem.id !== id))
  }

  const onToggleTodoItemHandler = id => {
    setState(todoItems.map(todoItem => todoItem.id === id ? {...todoItem, state: !todoItem.state} : todoItem));
  }

  const onEditTodoItemHandler = (id, data) => {
    setState(todoItems.map(todoItem => todoItem.id === id ? {...todoItem, title: data} : todoItem));
  }


  const initItemList = () => {
    const todoItems = JSON.parse(localStorage.getItem("todos")) || [];

    setState(todoItems);
  }

  const setState = newTodoItems => {
    todoItems = [...newTodoItems];
    todoList.render(todoItems);
    todoCount.render(todoItems);
    localStorage.setItem("todos", JSON.stringify(todoItems));
  }

  const init = () => {
    initItemList();
  }

  new TodoInput(onAddTodoItemHandler);
  const todoList = new TodoList(onDeleteTotoItemHandler, onToggleTodoItemHandler, onEditTodoItemHandler);
  const todoCount = new TodoCount();

  return {
    init
  };
}

const todoApp = new TodoApp();
todoApp.init();