import { TodoInput } from './component/TodoInput.js';
import { TodoList } from './component/TodoList.js';
import { TodoItem } from './component/TodoItem.js';
import { TodoCount } from './component/TodoCount.js';
import { TodoFilter } from './component/TodoFilter.js';
import { getAll } from '../api/api.js';

function TodoApp(username) {
  this.todoItems = [];
  this.filter = "all";

  this.setState = updatedItems => {
    this.todoItems = updatedItems; // todo: 이 코드 필요한가?
    let filteredItems = this.todoItems;
    if (this.filter === "active") {
      filteredItems = this.todoItems.filter(item => item.status === "");
    } else if (this.filter === "completed") {
      filteredItems = this.todoItems.filter(item => item.status === "completed");
    }
    todoList.setState(filteredItems);
    todoCount.render(filteredItems.length);
    todoFilter.render(this.filter);
  };

  new TodoInput({
    onAdd: contents => {
      const todoCount = this.todoItems.length;
      const newTodoItem = new TodoItem(todoCount + 1, contents);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    }
  });

  const todoList = new TodoList({
    onToggleComplete: id => {
      const targetItem = this.todoItems.find(item => item.id === Number.parseInt(id));
      targetItem.toggleCompleteStatus();
      this.setState(this.todoItems);
    },
    onDelete: id => {
      const targetItem = this.todoItems.find(item => item.id === Number.parseInt(id));
      this.todoItems.splice(this.todoItems.indexOf(targetItem), 1);
      this.setState(this.todoItems);
    },
    onToggleEdit: id => {
      const targetItem = this.todoItems.find(item => item.id === Number.parseInt(id));
      targetItem.toggleEditStatus();
      this.setState(this.todoItems);
    },
    onEdit: (id, contents) => {
      const targetItem = this.todoItems.find(item => item.id === Number.parseInt(id));
      targetItem.contents = contents;
      targetItem.toggleEditStatus();
      this.setState(this.todoItems);
    }
  });

  const todoCount = new TodoCount();

  const todoFilter = new TodoFilter(this.filter, {
    onChangeFilter: (filter) => {
      this.filter = filter;
      this.setState(this.todoItems);
    }
  });

  this.init = () => {
    getAll(username)
    .then(data => {
      this.todoItems = data.map(item => new TodoItem(item.id, item.content));
      this.setState(this.todoItems);
    })
    .catch(error => {
      console.log(error)
    });
  }
}

const todoApp = new TodoApp("chomily");
todoApp.init();
