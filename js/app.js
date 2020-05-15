function TodoApp() {
  this.todoItems = [];

  this.todoList = new TodoList(event => {
    const $completeTarget = event.target;
    if ($completeTarget.classList.contains("toggle")) {
      $completeTarget.closest("li").classList.toggle("completed");
    }
    if ($completeTarget.classList.contains("destroy")) {
      const child = $completeTarget.closest("li");
      child.parentNode.removeChild(child);
    }
  }, event => {
    const $editTarget = event.target;
    $editTarget.closest("li").classList.toggle("editing", true);
  }, event => {
    if (event.key === "Escape") {
      const $editTarget = event.target.closest("li");
      if ($editTarget.classList.contains("editing")) {
        $editTarget.classList.toggle("editing", false);
      }
    }
  });

  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    this.todoList.setState(this.todoItems);
  };

  new TodoInput(contents => {
    const newTodoItem = new TodoItem(contents);
    this.todoItems.push(newTodoItem);
    this.setState(this.todoItems);
  });
}

function TodoInput(onAdd) {
  const $todoInput = document.querySelector("#new-todo-title");

  $todoInput.addEventListener("keyup", event => this.addTodoItem(event));

  this.addTodoItem = event => {
    const $newTodoTarget = event.target;
    if (this.isValid(event, $newTodoTarget.value)) {
      onAdd($newTodoTarget.value);
      $newTodoTarget.value = "";
    }
  };

  this.isValid = function (event, s) {
    return !!(event.key === "Enter" && s);
  };
}

function TodoList(handler, editHandler, editCompleteHandler) {
  this.$todoList = document.querySelector("#todo-list");

  this.$todoList.addEventListener('click', event => handler(event));
  this.$todoList.addEventListener('dblclick', event => editHandler(event));
  this.$todoList.addEventListener('keyup', event => editCompleteHandler(event))

  this.setState = updatedTodoItems => {
    this.todoItems = updatedTodoItems;
    this.render(this.todoItems);
  };

  this.render = items => {
    const template = items.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join("");
  };
}

function TodoItem(contents) {
  this.content = contents;
}

function todoItemTemplate(todoItem) {
  return `<li>
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${todoItem.content}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀">
      </li>`
}


new TodoApp();
