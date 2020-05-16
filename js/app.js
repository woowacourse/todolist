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

  this.renderGroup = (items, type) => {
    this.group.render(items, type);
  }

  const onToggle = (event, index) => {
    const selectedItem = this.items[index];
    selectedItem.reverseStatus();
    this.items[index] = selectedItem;
    this.setState(this.items);
  }

  const onDelete = (event, index) => {
    this.items.splice(index, 1);
    this.setState(this.items);
    this.renderGroup(this.items);
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
    this.renderGroup(this.items, "all");
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

  const onGroupingAll = (event) => {
    this.todoList.render(this.items);
    this.renderGroup(this.items, "all");
  }

  const onGroupingActive = (event) => {
    let activeItems = this.items.filter(item => item.status === "ready");
    this.todoList.render(activeItems);
    this.renderGroup(activeItems, "active");
  }

  const onGroupingCompleted = (event) => {
    let completedItems = this.items.filter(item => item.status === "completed");
    this.todoList.render(completedItems);
    this.renderGroup(completedItems, "completed");
  }

  this.todoList = new TodoList(onToggle,
    onDelete,
    onDoubleClick,
    onUpdateContents,
    onUpdateRollBack);
  new TodoInput(onInputContents)
  this.group = new TodoGrouping(onGroupingAll, onGroupingActive, onGroupingCompleted);
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

function TodoGrouping(onGroupingAll, onGroupingActive, onGroupingCompleted) {
  this.$todoContainer = document.querySelector(".count-container");
  this.$todoContainer.addEventListener("click", event => this.showTodosByGrouping(event));

  this.showTodosByGrouping = (event) => {
    const $targetClass = event.target.classList;
    if ($targetClass.contains("all")) {
      onGroupingAll(event);
    } else if ($targetClass.contains("active")) {
      onGroupingActive(event);
    } else if ($targetClass.contains("completed")) {
      onGroupingCompleted(event);
    }
  }
  this.render = (items, type) => {
    if (type === "all") {
      this.$todoContainer.innerHTML = groupingTemplate(items);
    } else if (type === "active") {
      this.$todoContainer.innerHTML = groupingByActiveTemplate(items);
    } else if (type === "completed") {
      this.$todoContainer.innerHTML = groupingByCompletedTemplate(items);
    }
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

function findIndex(event, $target) {
  const $itemList = $target.closest("ul");
  const $item = $target.closest("li");
  for (let i = 0; i < $itemList.childNodes.length; i++) {
    if ($item === $itemList.childNodes[i]) {
      return i;
    }
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

function groupingTemplate(items) {
  return `<div class="count-container">
    <span class="todo-count">총 <strong>${items.length}</strong> 개</span>
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
    </ul>
  </div>`;
}

function groupingByActiveTemplate(items) {
  return `<div class="count-container">
    <span class="todo-count">총 <strong>${items.length}</strong> 개</span>
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
    </ul>
  </div>`;
}

function groupingByCompletedTemplate(items) {
  return `<div class="count-container">
    <span class="todo-count">총 <strong>${items.length}</strong> 개</span>
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
    </ul>
  </div>`;
}

const todoApp = new TodoApp();
