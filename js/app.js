import {renderTodo} from "./templete.js"

function TodoApp() {
  this.todoItems = [];
  this.filter = "all";
  this.todoList = new TodoList({
    onRemove: contents => {
      const index = this.todoItems.findIndex(it => JSON.stringify(it) === JSON.stringify(contents));
      this.todoItems.splice(index, 1);
      this.setState(this.todoItems);
    },
    onUpdate: (contents, update) => {
      const item = this.todoItems.find(it => JSON.stringify(it) === JSON.stringify(contents));
      item.state = update.state;
      item.value = update.value;
      this.setState(this.todoItems);
    }
  });
  this.todoCount = new TodoCount({
    onSelectFilter: filter => {
      this.filter = filter;
      this.setState(this.todoItems);
    }
  });

  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    this.todoList.setState(display(this.filter));
    this.todoCount.setState(display(this.filter));
  };

  const display = filter => this.todoItems.filter(item => {
    if (filter === "active") {
      return item.state === "undo";
    } else if (filter === "completed") {
      return item.state === "completed";
    } else {
      return true;
    }
  });

  new TodoInput({
    onAdd: contents => {
      this.todoItems.push(new TodoItem("undo", contents));
      this.setState(this.todoItems);
    }
  })
}

function TodoInput({onAdd}) {
  const $todoInput = document.querySelector("#new-todo-title");
  const addItem = event => {
    const $target = event.target;
    if (event.key === "Enter" && $target.value !== "") {
      onAdd($todoInput.value);
      $todoInput.value = "";
    }
  };

  $todoInput.addEventListener("keydown", addItem);
}

function TodoList({onRemove, onUpdate}) {
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
    if ($target.classList.contains("destroy") && confirm("정말 삭제하시겠습니까?")) {
      const $todoItem = $target.closest("li");
      onRemove(new TodoItem($todoItem.className, $todoItem.querySelector(".label").innerText));
    }
  };
  const editItem = event => {
    const $target = event.target;
    if ($target.classList.contains("label") && !document.querySelector(".editing")) {
      const $todoItem = $target.closest("li");
      $todoItem.classList.toggle("editing");
    }
  };
  const updateItem = event => {
    const $target = event.target;
    if (event.key === "Enter") {
      const updatedValue = $target.value;
      const $todoItem = $target.closest("li");
      $todoItem.classList.toggle("editing");
      onUpdate(new TodoItem($todoItem.className, $todoItem.querySelector(".label").innerText),
        new TodoItem($todoItem.className, updatedValue));
    }
  };
  const updateState = event => {
    const $target = event.target;
    if ($target.classList.contains("toggle")) {
      const $todoItem = $target.closest("li");
      const className = $todoItem.className;
      $todoItem.classList.toggle("undo");
      $todoItem.classList.toggle("completed");
      onUpdate(new TodoItem(className, $todoItem.querySelector(".label").innerText),
        new TodoItem($todoItem.className, $todoItem.querySelector(".label").innerText));
    }
  };
  const cancelUpdate = event => {
    const $target = event.target;
    if (event.key === "Escape") {
      const $todoItem = $target.closest("li");
      $todoItem.querySelector(".edit").value = $todoItem.querySelector("label").innerText;
      $todoItem.classList.toggle("editing");
    }
  };
  $todoList.addEventListener("click", removeItem);
  $todoList.addEventListener("click", updateState);
  $todoList.addEventListener("dblclick", editItem);
  $todoList.addEventListener("keydown", updateItem);
  $todoList.addEventListener("keydown", cancelUpdate);
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

  $filterList.addEventListener("click", selectFilter);
}

function TodoItem(state, value) {
  this.state = state;
  this.value = value;
}

new TodoApp();