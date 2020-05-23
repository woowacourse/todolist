import { TodoInput } from './TodoInput.js';
import { TodoDelete } from './TodoDelete.js';
import { TodoList } from './TodoList.js';
import { TodoItem } from './TodoItem.js';
import { TodoListCount } from './TodoListCount.js';
import { TodoListCheckBox } from './TodoListCheckBox.js';

function TodoApp() {
  const $todoList = document.querySelector("#todo-list");

  let id = 3;

  this.todoItems = [
    new TodoItem(1, "운동", false),
    new TodoItem(2, "공부", false)
  ];

  const todoList = new TodoList();

  const todoListCount = new TodoListCount({
    selectedTodoItems: selectedTodoItems => {
      todoList.setState(selectedTodoItems);
    }
  });

  this.setState = updatedItems => {
    this.todoItems = [...updatedItems];
    todoListCount.updateList(this.todoItems);
    todoList.setState(this.todoItems);
  };

  new TodoInput({
    onAdd: newTodoName => {
      const newTodoItem = new TodoItem(id++, newTodoName, false);
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
    onCheck: checkedListId => {
      const listId = parseInt(checkedListId);
      const updatedTodoList = [...this.todoItems].map(todoItem => {
        if (todoItem._id === listId) {
          return new TodoItem(listId, todoItem.content, !todoItem.isCompleted);
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

  const initEventListener = () => {
    $todoList.addEventListener('dblclick', switchToEditMode);
    $todoList.addEventListener('keyup', switchToViewMode);
  };

  this.init = () => {
    initEventListener();
    todoListCount.init();
    todoListCount.updateList(this.todoItems);
    todoList.setState(this.todoItems);
  };
}

const app = new TodoApp();
app.init();
