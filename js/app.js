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

function TodoCount(onAll, onActive, onCompleted) {
  const $todoCount = document.querySelector(".todo-count");
  const $allTodoButton = document.querySelector(".all");
  const $activeButton = document.querySelector(".active-button");
  const $completedButton = document.querySelector(".completed-button");

  const render = todoItems => {
    $todoCount.innerHTML = todoCount(todoItems.length);
  }

  $allTodoButton.addEventListener(EVENT_TYPE.CLICK, () => {
    onAll();
    $allTodoButton.classList.add("selected")
    $activeButton.classList.remove("selected")
    $completedButton.classList.remove("selected")
  })

  $activeButton.addEventListener(EVENT_TYPE.CLICK, () => {
    onActive();
    $allTodoButton.classList.remove("selected")
    $activeButton.classList.add("selected")
    $completedButton.classList.remove("selected")
  })

  $completedButton.addEventListener(EVENT_TYPE.CLICK, () => {
    onCompleted();
    $allTodoButton.classList.remove("selected")
    $activeButton.classList.remove("selected")
    $completedButton.classList.add("selected")
  })

  return {
    render
  };
}

function TodoApp() {
  let todoItems = [];

  const onAddTodoItemHandler = (todoValue) => {
    setState(
      todoItems.concat({
        id: nanoid(),
        title: todoValue,
        state: false
      }));
  }

  const onClickAllItemsButtonHandler = () => {
    setState(todoItems)
  }

  const onClickWillDoItemsButtonHandler = () => {
    setStateWithoutStorage(todoItems.filter(todoItems => !todoItems.state))
  }

  const onClickDoneItemsButtonHandler = () => {
    setStateWithoutStorage(todoItems.filter(todoItems => todoItems.state))
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

  const setStateWithoutStorage = newTodoItems => {
    todoList.render(newTodoItems);
    todoCount.render(newTodoItems);
  }

  const init = () => {
    initItemList();
  }

  new TodoInput(onAddTodoItemHandler);
  const todoList = new TodoList(onDeleteTotoItemHandler, onToggleTodoItemHandler, onEditTodoItemHandler);
  const todoCount = new TodoCount(onClickAllItemsButtonHandler, onClickWillDoItemsButtonHandler, onClickDoneItemsButtonHandler);

  return {
    init
  };
}

const todoApp = new TodoApp();
todoApp.init();