import { TodoInput } from './TodoInput.js';
import { TodoList } from './TodoList.js';
import { TodoItem } from './TodoItem.js';
import { TodoCount } from './TodoCount.js';

function TodoApp() {
  this.todoItems = [];

  this.setState = updatedItems => {
    this.todoItems = updatedItems; // todo: 이 코드 필요한가?
    todoList.setState(this.todoItems);
    todoCount.render(this.todoItems.length);
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
}

const todoApp = new TodoApp();
