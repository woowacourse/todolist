import {TodoInput} from './TodoInput.js'
import {TodoList} from './TodoList.js'
import {TodoItem} from './TodoItem.js'
import {TodoCount} from './TodoCount.js'

function TodoApp() {
  this.todoItems = [new TodoItem(1, '글쓰기 미션', false),
    new TodoItem(2, '스터디 준비', false),
    new TodoItem(3, '프론트 미션', false)];

  let autoIncrementingId = 3;

  const editByIdAndValue = (id, value) => {
    for (const todoItem of this.todoItems) {
      if (todoItem.id == id) {
        todoItem.changeTitle(value);
        return;
      }
    }
  }

  const toggleById = id => {
    for (const todoItem of this.todoItems) {
      if (todoItem.id == id) {
        todoItem.toggle();
        return;
      }
    }
  }

  const deleteById = id => {
    const itemToFind = this.todoItems.find(item => item.id == id);
    const index = this.todoItems.indexOf(itemToFind);
    this.todoItems.splice(index, 1);
  }

  const todoList = new TodoList({
    onEdit: (id, value) => {
      editByIdAndValue(id, value);
      this.setState(this.todoItems);
    },
    onToggle: id => {
      toggleById(id);
      this.setState(this.todoItems);
    },
    onDelete: id => {
      deleteById(id);
      this.setState(this.todoItems);
    }
  });

  new TodoInput({
    onAdd: contents => { //추가하는 메서드를 부모 컴포넌트에서 관리
      const newTodoItem = new TodoItem(++autoIncrementingId, contents, false);
      this.todoItems.push(newTodoItem);
      this.setState(this.todoItems);
    }
  });

  new TodoCount();

  this.setState = updatedItems => { //업데이트된 목록들로 정보를 갱신하고 리스트에 적용.
    this.todoItems = updatedItems;
    todoList.setState(this.todoItems);
  };

  this.init = () => {
    this.setState(this.todoItems);
  }
}

const todoApp = new TodoApp();
todoApp.init();