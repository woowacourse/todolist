import { TodoInput } from './TodoInput.js';
import { TodoDelete } from './TodoDelete.js';
import { TodoList } from './TodoList.js';
import { TodoItem } from './TodoItem.js';
import { TodoListCount } from './TodoListCount.js';
import { TodoListCheckBox } from './TodoListCheckBox.js';

function TodoApp() {
  const $todoList = document.querySelector("#todo-list");
  const $all = document.querySelector(".all");
  const $active = document.querySelector(".active");
  const $completed = document.querySelector(".completed");

  this.todoItems = [
    new TodoItem("0.1", "운동", false),
    new TodoItem("0.2", "공부", false)
  ];

  const todoList = new TodoList();
  const todoListCount = new TodoListCount();

  const showList = (list) => {
    todoList.setState(list);
    todoListCount.setState(list);
  }

  this.setState = updatedItems => {
    this.todoItems = updatedItems;
    showList(this.todoItems);
  };

  new TodoInput({
    onAdd: newTodoName => {
      const newTodoItem = new TodoItem(null, newTodoName, false);
      const updatedList = [...this.todoItems, newTodoItem];
      this.setState(updatedList);
    }
  });

  new TodoDelete({
    onDelete: id => {
      this.setState([...this.todoItems].filter(todoItem => todoItem._id !== id));
    }
  })

  new TodoListCheckBox({
    onCheck: id => {
      const updatedTodoList = [...this.todoItems].map(todoItem => {
        if (todoItem._id === id) {
          return new TodoItem(id, todoItem.content, !todoItem.isCompleted);
        }
        return todoItem;
      })
      this.setState(updatedTodoList);
    }
  })

  const switchToEditMode = event => {
    event.preventDefault();
    const $list = event.target.closest("li");
    $list.classList.toggle("editing");
  };

  const switchToViewMode = event => {
    if (event.keyCode !== 27) {
      return;
    }
    document.getSelection().anchorNode.classList.remove("editing");
  };

  const showAllItems = event => {
    event.preventDefault();
    $active.classList.remove("selected");
    $completed.classList.remove("selected");
    if (!$all.classList.contains("selected")) {
      $all.classList.toggle("selected");
    }
    showList(this.todoItems);
  }

  const showActiveItems = event => {
    event.preventDefault();
    $all.classList.remove("selected");
    $completed.classList.remove("selected");
    if (!$active.classList.contains("selected")) {
      $active.classList.toggle("selected");
    }
    const list = [...this.todoItems].filter(todoItem => !todoItem.isCompleted);
    showList(list);
  }

  const showCompletedItems = event => {
    event.preventDefault();
    $all.classList.remove("selected");
    $active.classList.remove("selected");
    if (!$completed.classList.contains("selected")) {
      $completed.classList.toggle("selected");
    }
    const list = [...this.todoItems].filter(todoItem => todoItem.isCompleted);
    showList(list);
  }

  const initEventListener = () => {
    $todoList.addEventListener('dblclick', switchToEditMode);
    $todoList.addEventListener('keyup', switchToViewMode);
    $all.addEventListener('click', showAllItems);
    $active.addEventListener('click', showActiveItems);
    $completed.addEventListener('click', showCompletedItems);
  };

  this.init = () => {
    initEventListener();
  };
}

const app = new TodoApp();
app.init();
