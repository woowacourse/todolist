// 부모 컴포넌트
import {EVENT_TYPE, KEY_TYPE} from "./constants.js";
import {TodoList} from "./TodoList.js";
import {TodoInput} from "./TodoInput.js";
import {TodoComplete} from "./TodoComplete.js";
import {TodoDelete} from "./TodoDelete.js";
import {TodoEdit} from "./TodoEdit.js";

function TodoApp() {
    this.todoItems = [];

    this.setState = updatedItems => {
        const todoList = new TodoList();
        this.todoItems = updatedItems;
        todoList.setState(this.todoItems);
    };

    new TodoInput({
        onAdd: item => {
            const newTodoItem = new TodoItem(this.todoItems.length, item,false, "");
            this.todoItems.push(newTodoItem);
            this.setState(this.todoItems);
        }
    });

    new TodoComplete({
        onComplete: itemId => {
            this.todoItems[itemId].completed = !this.todoItems[itemId].completed;
            this.todoItems[itemId].state = this.todoItems[itemId].completed ? "completed" : "";
            this.setState(this.todoItems);
        }
    });

    new TodoDelete({
       onDelete: itemId => {
            this.todoItems.splice(itemId,1);
            for(let i = itemId; i < this.todoItems.length; i++) {
                this.todoItems[i].id = i;
            }
           this.setState(this.todoItems);
       }
    });

    new TodoEdit({
       onEdit: (itemId) => {
               this.todoItems[itemId].state = "editing";
               this.setState(this.todoItems);
       },
       onView: (itemId, item, itemState) => {
           this.todoItems[itemId].state = itemState;
           this.todoItems[itemId].title = item;
           this.setState(this.todoItems);
       }
    });
}


function TodoItem(id, item, completed, state) {
    this.id = id;
    this.title = item;
    this.completed = completed;
    this.state = state;
}

const todoApp = new TodoApp();