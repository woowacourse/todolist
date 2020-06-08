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
      todoList.render(selectedTodoItems);
    }
  });

  this.setState = updatedItems => {
    this.todoItems = [...updatedItems];
    todoListCount.setState(this.todoItems);
    todoList.render(this.todoItems);
  };

  new TodoInput({
    onAdd: newTodoName => {
      const newTodoItem = new TodoItem(id++, newTodoName, false);
      const updatedList = [...this.todoItems];
      updatedList.push(newTodoItem);
      this.setState(updatedList);
    }
  });

  new TodoDelete({
    onDelete: id => {
      const deletedList = [...this.todoItems].filter(todoItem => todoItem.id !== id);
      this.setState(deletedList);
    }
  })

  new TodoListCheckBox({
    onCheck: checkedListId => {
      const listId = parseInt(checkedListId);
      const updatedTodoList = this.todoItems.map(todoItem => {
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
    if (event.key !== 'Escape') {
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
    todoListCount.setState(this.todoItems);
    todoList.render(this.todoItems);
  };
}

const app = new TodoApp();
app.init();
