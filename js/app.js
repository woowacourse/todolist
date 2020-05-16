function TodoApp() {
  this.todoItems = [];

  this.createdCount = 0;

  this.setState = (updatedItems, updatedItemCount) => {

    this.todoItems = updatedItems;
    this.createdCount = updatedItemCount;
    this.todoList.render(updatedItems);
    this.todoCount.render(updatedItemCount + 1);
  };

  const onToggle = (event, id) => {
    const index = this.todoItems.findIndex(item => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === "completed") {
      todoItem.status = "default";
    } else if (todoItem.status === "default") {
      todoItem.status = "completed";
    }
    this.todoItems[index] = todoItem;
    this.setState(this.todoItems, this.createdCount);
  };

  const onDelete = (event, id) => {
    const index = this.todoItems.findIndex(item => item.id === id);
    this.todoItems.splice(index, 1)
    this.setState(this.todoItems, this.createdCount);
  }

  const onDblClick = (event, id) => {
    const index = this.todoItems.findIndex(item => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === "default") {
      todoItem.status = "editing";
    }
    this.todoItems[index] = todoItem;
    this.setState(this.todoItems, this.createdCount);
  };

  const onRollback = (event, id) => {
    const index = this.todoItems.findIndex(item => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === "editing") {
      todoItem.status = "default";
      this.todoItems[index] = todoItem;
      this.setState(this.todoItems, this.createdCount);
    }
  }
  const onCommit = (event, id, content) => {
    const index = this.todoItems.findIndex(item => item.id === id);
    const todoItem = this.todoItems[index];
    if (todoItem.status === "editing") {
      todoItem.content = content;
      todoItem.status = "default";
      this.todoItems[index] = todoItem;
      this.setState(this.todoItems, this.createdCount);
    }
  }

  const onAdd = (contents) => {
    const newTodoItem = new TodoItem(++this.createdCount, contents, "default");
    this.todoItems.push(newTodoItem);
    this.setState(this.todoItems, this.createdCount);
  };

  this.todoList = new TodoList(onToggle, onDelete, onDblClick, onRollback, onCommit);

  this.todoCount = new TodoCount();

  new TodoInput(onAdd);

  new TodoCount(this.createdCount);
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

function TodoCount() {

  this.$todoCount = document.querySelector(".count-container");

  this.render = (count) => {
    this.$todoCount.innerHTML = `총 <strong>${count}</strong> 개`;
  }

}

new TodoApp();
