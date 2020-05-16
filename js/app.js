function TodoItem(content, status) {
  this.content = content;
  this.status = status;
  this.reverseStatus = () => {
    if (this.status === "completed") {
      this.status = "ready";
    } else if (this.status === "ready") {
      this.status = "completed";
    }
  };
  this.changeEditingMode = () => {
    this.status = "editing";
  };
  this.changeContents = (newContent) => {
    this.content = newContent;
    this.status = "ready";
  };
  this.rollbackStatus = () => {
    this.status = "ready";
  };
}

function TodoApp() {
  this.items = [];

  this.setState = updatedItem => {
    this.items = updatedItem;
    this.todoList.render(this.items);
  };

  const onToggle = (event, index) => {
    const selectedItem = this.items[index];
    selectedItem.reverseStatus();
    this.items[index] = selectedItem;
    this.setState(this.items);
  }

  const onDelete = (event, index) => {
    this.items.splice(index, 1);
    this.setState(this.items);
  }

  const onDoubleClick = (event, index) => {
    const selectedItem = this.items[index];
    selectedItem.changeEditingMode();
    this.items[index] = selectedItem;
    this.setState(this.items);
  }

  const onInputContents = (contents) => {
    const newItem = new TodoItem(contents, "ready");
    this.items.push(newItem);
    this.setState(this.items);
  }

  const onUpdateContents = (index, event) => {
    const selectedItem = this.items[index];
    selectedItem.changeContents(event.target.value);
    this.items[index] = selectedItem;
    this.setState(this.items);
  }

  const onUpdateRollBack = (index, event) => {
    const selectedItem = this.items[index];
    selectedItem.rollbackStatus();
    this.items[index] = selectedItem;
    this.setState(this.items);
  }

  this.todoList = new TodoList(onToggle,
    onDelete,
    onDoubleClick,
    onUpdateContents,
    onUpdateRollBack);
  this.todoInput = new TodoInput(onInputContents)
}

function TodoInput(onInputContents) {
  const $todoInput = document.querySelector("#new-todo-title");
  $todoInput.addEventListener("keyup", (event) => this.addItem(event));

  this.addItem = event => {
    const $target = event.target;
    if (this.isValid(event, $target.value)) {
      onInputContents($target.value);
      $target.value = "";
    }
  }
  this.isValid = (event, value) => {
    return event.key === "Enter" && value.trim().length !== 0;
  }
}

function TodoList(onToggle, onDelete, onDoubleClick, onUpdateContent, onRollback) {
  this.$todoList = document.querySelector("#todo-list");
  this.$todoList.addEventListener("click", (event) => this.click(event));
  this.$todoList.addEventListener("dblclick", (event) => this.doubleClick(event));
  this.$todoList.addEventListener("keyup", event => this.onUpdatedByEnter(event));
  this.$todoList.addEventListener("keyup", event => this.onCancelByEsc(event));

  this.click = event => {
    const $target = event.target;
    if ($target.classList.contains("toggle")) {
      const index = findIndex(event, $target);
      onToggle(event, index);
    } else if ($target.classList.contains("destroy")) {
      const index = findIndex(event, $target);
      onDelete(event, index);
    }
  };
  this.doubleClick = event => {
    const $target = event.target;
    if ($target.classList.contains("label")) {
      const index = findIndex(event, $target);
      onDoubleClick(event, index);
    }
  }
  this.onUpdatedByEnter = (event) => {
    if (event.key === "Enter" && event.target.classList.contains("edit")) {
      const $target = event.target;
      const index = findIndex(event, $target)
      onUpdateContent(index, event);
    }
  }
  this.onCancelByEsc = (event) => {
    if (event.key === "Escape" && event.target.classList.contains("edit")) {
      const $target = event.target;
      const index = findIndex(event, $target)
      onRollback(index, event);
    }
  }

  this.render = items => {
    this.$todoList.innerHTML = items.map(todoItemTemplate).join("");
  }
}

function todoItemTemplate(todoItem) {
  if (todoItem.status === "completed") {
    return `<li class="${todoItem.status}">
          <div class="view">
            <input class="toggle" type="checkbox" checked>
            <label class="label">${todoItem.content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${todoItem.content}">
        </li>`;
  } else {
    return `<li class="${todoItem.status}">
          <div class="view">
            <input class="toggle" type="checkbox">
            <label class="label">${todoItem.content}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${todoItem.content}">
        </li>`;
  }
}

function findIndex(event, $target) {
  const $itemList = $target.closest("ul");
  const $item = $target.closest("li");
  for (let i = 0; i < $itemList.childNodes.length; i++) {
    if ($item === $itemList.childNodes[i]) {
      return i;
    }
  }
}

new TodoApp();