function TodoApp() {
    this.todoItems = [];

    new TodoInput({
        onAdd: contents => {
            this.todoItems.push(contents);
            new TodoList(this.todoItems)
        }
    });
};

// 입력 받는 컴포넌트
function TodoInput({onAdd}) {
    const $todoInput = document.querySelector("#new-todo-title");

    $todoInput.addEventListener("keydown", event => this.addTodoItem(event));

    this.addTodoItem = event => {
        const $newTodoTarget = event.target;
        if (event.keyCode === 13) {
            onAdd($newTodoTarget.value);
            $newTodoTarget.value = "";
        }
    };
}

// todoList 보여주는 컴포넌트

function todoItemTemplate(items) {
    return `<li>
        <div class="view">
          <input class="toggle" type="checkbox">
          <label class="label">${items}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="새로운 타이틀">
      </li>`

}

function TodoList(items) {
    this.$todoList = document.querySelector("#todo-list");
    this.$todoCount = document.querySelector("#todo-count");

    this.render = items => {
        const template = items.map(item => todoItemTemplate(item));
        this.$todoList.innerHTML = template.join("");
        this.$todoCount.innerText = items.length;
    };

    this.render(items)
}

const index = new TodoApp();


