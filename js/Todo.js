import { todoItemTemplate, TodoItemCount } from "./templates/TodoTemplate.js";

export default function Todo() {
  this.todoListItem = [];
  this.todoListViewer = new TodoListViewer();

  this.setState = (updatedState, option="all") => {
    this.todoListItem = updatedState;
    this.todoListViewer.setState(this.todoListItem, option);
  };

  new EditText({
    inputToggle: (id) => {
      this.todoListItem
        .filter((todoItem) => todoItem.id == id)
        .map((todoItem) => todoItem.inputToggle());
      this.setState(this.todoListItem);
    },
    savedToggle: (id, content) => {
      this.todoListItem
        .filter((todoItem) => todoItem.id == id)
        .map((todoItem) => {
          todoItem.setState(content, todoItem.complete)
          todoItem.inputToggle()
        });
      this.setState(this.todoListItem);
    },
    unsavedToggle: id => {
      this.todoListItem
        .filter((todoItem) => todoItem.id == id)
        .map(todoItem => todoItem.inputToggle())
      this.setState(this.todoListItem);
    }
  }
  );

  new TodoDataInput({
    itemAdd: (contents) => {
      const newTodoItem = new TodoItem(this.todoListItem.length, contents);
      this.todoListItem.push(newTodoItem);
      this.setState(this.todoListItem);
    },
  });

  new checkButtonClick(
    {
      itemToggle: (id) => {
        this.todoListItem
          .filter((todoItem) => todoItem.id == id)
          .map((todoItem) =>
            todoItem.setState(todoItem.content, !todoItem.complete)
          );

        this.setState(this.todoListItem);
      },
    });

  new RemoveButtonClick({
    itemRemove: (id) => {
      const removedItems = this.todoListItem.filter(
        (todoItem) => todoItem.id != id
      );

      this.todoListItem = removedItems;
      this.setState(this.todoListItem);
    },
  });

  new ChangeViewClick({
    showAll: () => {
      this.setState(this.todoListItem);
    },
    todoAll: () => {
      this.setState(this.todoListItem, "todo");
    },
    completeAll: () => {
      this.setState(this.todoListItem, "complete");
    }
  })
}

function ChangeViewClick({ showAll, todoAll, completeAll }) {
  this.$filters = document.querySelector(".filters");

  this.$filters.addEventListener("click", (event) =>
    this.click(event)
  );

  this.clearSelected = () => {
    const tags = [...this.$filters.children]
    tags.map(x => x.querySelector("a").classList.remove("selected"));
  }

  this.click = event => {
    event.preventDefault();
    const $eventTarget = event.target;
    this.clearSelected()
    $eventTarget.classList.add("selected");
    if($eventTarget.className.indexOf("all") !== -1) {
      showAll()
    }
    if($eventTarget.className.indexOf("active") !== -1){
      todoAll()
    }
    if($eventTarget.className.indexOf("completed") !== -1){
      completeAll();
    }
  }

}

function EditText({ inputToggle, savedToggle, unsavedToggle }) {
  this.$todoList = document.querySelector("#todo-list");
  this.$todoList.addEventListener("click", (event) =>
    this.toggleInputItem(event)
  );

  this.$todoList.addEventListener("keydown", (event) =>
    this.EnterInput(event)
  );

  this.toggleInputItem = (event) => {
    const $labelButton = event.target;
    if ($labelButton.tagName !== "LABEL") {
      return;
    }
    const $parent = $labelButton.closest("li");
    inputToggle($parent.dataset.id);
  };

  this.EnterInput = (event) => {
    const $labelButton = event.target;
    if (event.key === "Enter") {
      const $parent = $labelButton.closest("li");
      const $editInput = $parent.querySelector(".edit");
      savedToggle($parent.dataset.id, $editInput.value);
    }
    else if (event.key === "Escape") {
      const $parent = $labelButton.closest("li");
      unsavedToggle($parent.dataset.id);
    }
  };
}

function RemoveButtonClick({ itemRemove }) {
  this.$todoList = document.querySelector("#todo-list");
  this.$todoList.addEventListener("click", (event) =>
    this.removeTodoItem(event)
  );

  this.removeTodoItem = (event) => {
    const $removeButton = event.target;
    if ($removeButton.className !== "destroy") {
      return;
    }
    const $parent = $removeButton.closest("li");
    itemRemove($parent.dataset.id);
  };
}

function checkButtonClick({ itemToggle }) {
  this.$todoList = document.querySelector("#todo-list");
  this.$todoList.addEventListener("click", (event) =>
    this.toggleTodoItem(event)
  );

  this.toggleTodoItem = (event) => {
    const $toggleButton = event.target;
    if ($toggleButton.className !== "toggle") {
      return;
    }
    const $parent = $toggleButton.closest("li");
    itemToggle($parent.dataset.id);
  };
}

function TodoItem(id, contents, complete = false) {
  this.id = id;
  this.content = contents;
  this.complete = complete;
  this.input = false;

  this.setState = (content, complete) => {
    this.content = content;
    this.complete = complete;
  };

  this.inputToggle = () => {
    this.input = !this.input;
  };
}

// 단순 추가한다. 이벤트 등록과 이벤트 발생시 상위 컴포넌트에게 받은 함수만 호출해준다.
function TodoDataInput({ itemAdd }) {
  this.$inputElement = document.querySelector("#new-todo-title");
  this.$inputElement.addEventListener("keypress", (event) =>
    this.addTodoItem(event)
  );

  this.addTodoItem = (event) => {
    const $inputElementTarget = event.target;
    if (event.key === "Enter" && event.target.id === "new-todo-title") {
      itemAdd(this.$inputElement.value);
      $inputElementTarget.value = "";
    }
  };
}

// 상위 컴포넌트에게 todoListItem을 받아서 화면에 보여주기만 한다.
function TodoListViewer() {
  this.$todoList = document.querySelector("#todo-list");
  this.$countContainer = document.querySelector(".todo-count");


  this.setState = (updatedTodoItem, option = "all") => {
    const todoItems = updatedTodoItem;
    this.render(todoItems, option);
  };

  this.render = (items, option) => {
    let template = null;
    if (option === "all") {
      template = items.map(todoItemTemplate);
    } else {
      const state = option === "complete" ? true : false;
      template = items.filter(item => item.complete === state)
        .map(todoItemTemplate);
    }
    const countTemplate = TodoItemCount(items.length)
    this.$todoList.innerHTML = template.join("");
    this.$countContainer.innerHTML = countTemplate;
  };
}
