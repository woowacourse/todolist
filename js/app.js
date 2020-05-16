function TodoApp() {
  this.todoItems = [];

  this.createdCount = 0;

  this.setState = (updatedItems) => {

    this.todoItems = updatedItems;
    this.todoList.render(updatedItems);
    this.todoCount.render(updatedItems.length);
  };

  const onToggle = (event, id) => {
    const index = this.todoItems.findIndex(item => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === "completed") {
      todoItem.status = "active";
    } else if (todoItem.status === "active") {
      todoItem.status = "completed";
    }
    this.todoItems[index] = todoItem;
    this.setState(this.todoItems);
  };

  const onDelete = (event, id) => {
    const index = this.todoItems.findIndex(item => item.id === id);
    this.todoItems.splice(index, 1)
    this.setState(this.todoItems);
  }

  const onDblClick = (event, id) => {
    const index = this.todoItems.findIndex(item => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === "active") {
      todoItem.status = "editing";
    }
    this.todoItems[index] = todoItem;
    this.setState(this.todoItems);
  };

  const onRollback = (event, id) => {
    const index = this.todoItems.findIndex(item => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === "editing") {
      todoItem.status = "active";
      this.todoItems[index] = todoItem;
      this.setState(this.todoItems);
    }
  }
  const onCommit = (event, id, content) => {
    const index = this.todoItems.findIndex(item => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === "editing") {
      todoItem.content = content;
      todoItem.status = "active";
      this.todoItems[index] = todoItem;
      this.setState(this.todoItems);
    }
  }

  const onAdd = (contents) => {
    const newTodoItem = new TodoItem(++this.createdCount, contents, "active");
    this.todoItems.push(newTodoItem);
    this.setState(this.todoItems);
  };

  const groupBy = (event, type) => {
    const $target = event.target;
    if ($target.classList.contains(type)) {
      let items;
      if (type === "all") {
        items = this.todoItems;
      } else {
        items = this.todoItems.filter(item => item.status === type);
      }
      this.todoList.render(items);
      this.todoCount.render(items.length, type);
    }
  }

  this.todoList = new TodoList(onToggle, onDelete, onDblClick, onRollback, onCommit);

  this.todoCount = new TodoCount(groupBy);

  new TodoInput(onAdd);
}

function TodoInput(onAdd) {
  const $todoInput = document.querySelector("#new-todo-title");
  $todoInput.addEventListener("keyup", (event) => this.addTodoItem(event));
  this.addTodoItem = (event) => {
    const $newTodoTarget = event.target;
    if (this.isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };

  this.isValid = function (event, s) {
    return !!(event.key === "Enter" && s.trim());
  };
}

function TodoList(onToggle, onDelete, onDblClick, onRollback, onCommit) {
  this.$todoList = document.querySelector("#todo-list");

  this.$todoList.addEventListener("click", (event) => this.click(event));

  this.$todoList.addEventListener("dblclick", (event) => this.startEdit(event));

  this.$todoList.addEventListener("keyup", (event) => this.finishEdit(event));

  this.click = (event) => {
    const $target = event.target;
    const id = Number($target.closest("li").getAttribute("id"));
    if ($target.classList.contains("toggle")) {
      onToggle(event, id);
    } else if ($target.classList.contains("destroy")) {
      onDelete(event, id);
    }
  };

  this.startEdit = (event) => {
    const $target = event.target;
    const id = Number($target.closest("li").getAttribute("id"));
    if ($target.classList.contains("label")) {
      onDblClick(event, id);
    }
  }

  this.finishEdit = (event) => {
    const $target = event.target;
    const id = Number($target.closest("li").getAttribute("id"));
    if ($target.classList.contains("edit")) {
      if (event.key === "Enter") {
        onCommit(event, id, $target.value);
      } else if (event.key === "Escape") {
        onRollback(event, id);
      }
    }
  }

  this.render = (items) => {
    this.$todoList.innerHTML = items.map(todoItemTemplate).join("");
  }
}

function TodoItem(id, content, status) {
  this.id = id;
  this.content = content;
  this.status = status;
}

function todoItemTemplate(todoItem) {
  if (todoItem.status === "completed") {
    return `<li class="${todoItem.status}" id="${todoItem.id}">
          <div class="view">
            <input class="toggle" type="checkbox" checked>
            <label class="label">${todoItem.content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${todoItem.content}">
        </li>`;
  } else {
    return `<li class="${todoItem.status}" id="${todoItem.id}">
          <div class="view">
            <input class="toggle" type="checkbox">
            <label class="label">${todoItem.content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${todoItem.content}">
        </li>`;
  }
}

function TodoCount(groupBy) {

  this.$todoCount = document.querySelector(".count-container");

  this.$todoCount.addEventListener('click', event => this.groupByStatus(event));

  this.groupByStatus = (event) => {
    if (event.target.classList.contains("active")) {
      groupBy(event, "active");
    } else if (event.target.classList.contains("completed")) {
      groupBy(event, "completed");
    } else if (event.target.classList.contains("all")) {
      groupBy(event, "all");
    }
  }

  this.render = (total, type) => {
    if (type === "all" || type === undefined) {
      this.$todoCount.innerHTML = `<span class="todo-count">총 <strong>${total}</strong> 개</span>
    <ul class="filters">
      <li>
        <a class="all selected" href="#/">전체보기</a>
      </li>
      <li>
        <a class="active" href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="completed" href="#/completed">완료한 일</a>
      </li>
    </ul>`;
    } else if (type === "active") {
      this.$todoCount.innerHTML = `<span class="todo-count">총 <strong>${total}</strong> 개</span>
    <ul class="filters">
      <li>
        <a class="all" href="#/">전체보기</a>
      </li>
      <li>
        <a class="active selected" href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="completed" href="#/completed">완료한 일</a>
      </li>
    </ul>`;
    } else if (type === "completed") {
      this.$todoCount.innerHTML = `<span class="todo-count">총 <strong>${total}</strong> 개</span>
    <ul class="filters">
      <li>
        <a class="all" href="#/">전체보기</a>
      </li>
      <li>
        <a class="active" href="#/active">해야할 일</a>
      </li>
      <li>
        <a class="completed selected" href="#/completed">완료한 일</a>
      </li>
    </ul>`;
    }
  }
}

new TodoApp();
