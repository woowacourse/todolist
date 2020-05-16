function TodoApp() {
  this.items = [];

  this.setState = updatedItem => {
    this.items = updatedItem;
    const todoList = new TodoList();
    todoList.setState(this.items);
  };
  new todoItem({
    onAdd: contents => {
      const newItems = new TodoItem(contents, "ready");
      this.items.push(newItems);
      this.setState(this.items);
    }
  });
}

function TodoItem(content, status) {
  this.content = content;
  this.status = status;
}

function todoItem({ onAdd }) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener("keyup", event => this.addItemListener(event));

  this.addItemListener = event => {
    const $newTodoTarget = event.target;
    if (this.isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };

  this.isValid = (eventType, value) => {
    return !!(eventType.key === "Enter" && value.trim());
  };
}

function TodoList() {
  this.setState = updatedItem => {
    this.items = updatedItem;
    this.render(this.items);
  }
  this.render = items => {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoList.innerHTML = items.map(todoItemTemplate).join("");
  };
}

function todoItemTemplate(item) {
  return `<li class="${item.status}">
    <div class="view">
    <input class="toggle" type="checkbox">
    <label class="label">${item.content}</label>
    <button class="destroy"></button>
    </div>
    <input class="edit" value="새로운 타이틀">
    </li>`
}

new TodoApp();
