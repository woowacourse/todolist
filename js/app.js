import {renderTodo} from "./templete.js"
import api from "./api.js"
import {ALERT_MESSAGE, EVENT_TYPE, KEY_TYPE, FILTER} from "./Constant.js";

function TodoApp() {
  this.todoItems = [];
  this.filter = "all";
  this.todoList = new TodoList({
    onRemove: async id => {
      await api.app.delete(id);
      this.setState();
    },
    onToggle: async (id) => {
      await api.app.toggle(id);
      this.setState();
    }
  });
  this.todoCount = new TodoCount({
    onSelectFilter: filter => {
      this.filter = filter;
      this.setState();
    }
  });

  this.setState = async () => {
    this.todoItems = await api.app.get();
    this.todoList.setState(display(this.filter));
    this.todoCount.setState(display(this.filter));
  };

  const display = filter => this.todoItems.filter(item => {
    for (let f in FILTER) {
      let filterElement = FILTER[f];
      if (filter === filterElement.name) {
        return filterElement.filtering(item);
      }
    }
  });

  this.setState();

  new TodoInput({
    onAdd: async contents => {
      const newData = {
        content: contents,
      };
      await api.app.create(newData);
      this.setState(await api.app.get());
    }
  });
}

function TodoInput({onAdd}) {
  const $todoInput = document.querySelector("#new-todo-title");
  const addItem = event => {
    const $target = event.target;
    if (event.key === KEY_TYPE.ENTER && $target.value !== "") {
      onAdd($todoInput.value);
      $todoInput.value = "";
    }
  };

  $todoInput.addEventListener(EVENT_TYPE.KEYDOWN, addItem);
}

function TodoList({onRemove, onToggle}) {
  const $todoList = document.querySelector("#todo-list");
  const render = updatedItems => {
    const renderedItems = updatedItems.map(renderTodo);
    return renderedItems.join("");
  };

  this.setState = updatedItems => {
    $todoList.innerHTML = render(updatedItems);
  };

  const removeItem = event => {
    const $target = event.target;
    if ($target.classList.contains("destroy") && confirm(ALERT_MESSAGE.CONFIRM)) {
      const $todoItem = $target.closest("li");
      onRemove($todoItem.dataset.id);
    }
  };
  const updateState = event => {
    const $target = event.target;
    if ($target.classList.contains("toggle")) {
      const $todoItem = $target.closest("li");
      onToggle($todoItem.dataset.id);
    }
  };
  $todoList.addEventListener(EVENT_TYPE.CLICK, removeItem);
  $todoList.addEventListener(EVENT_TYPE.CLICK, updateState);
}

function TodoCount({onSelectFilter}) {
  const $todoCount = document.querySelector(".todo-count");
  const $filterList = document.querySelector(".filters");

  this.setState = updatedItems => {
    $todoCount.querySelector("strong").innerText = updatedItems.length;
  };

  const selectFilter = event => {
    const $target = event.target;
    if ($target.nodeName === "A") {
      const $preSelected = $filterList.querySelector(".selected");
      $preSelected.classList.toggle("selected");
      $target.classList.toggle("selected");
      onSelectFilter($target.classList[0]);
    }
  };

  $filterList.addEventListener(EVENT_TYPE.CLICK, selectFilter);
}

new TodoApp();