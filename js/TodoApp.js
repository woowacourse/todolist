// 부모 컴포넌트
import {EVENT_TYPE, FILTER_TYPE, KEY_TYPE} from "./constants.js";
import {TodoList} from "./TodoList.js";
import {TodoInput} from "./TodoInput.js";
import {TodoComplete} from "./TodoComplete.js";
import {TodoDelete} from "./TodoDelete.js";
import {TodoEdit} from "./TodoEdit.js";
import {TodoItem} from "./TodoItem.js";
import {TodoCount} from "./TodoCount.js";
import {TodoFilter} from "./TodoFilter.js";
import api from "./index.js"

function TodoApp() {
    this.todoItems = [];

    this.setState = (updatedItems, filterType) => {
        const todoList = new TodoList();
        const todoCount = new TodoCount();
        if(filterType === FILTER_TYPE.ALL) {
            this.todoItems = updatedItems;
        }
        todoList.setState(updatedItems);
        todoCount.setCount(updatedItems.length)
    };

    new TodoInput({
        onAdd: item => {
            const newTodoItem = {
                content: `${item}`,
                isCompleted: false
            };
            api.todo.create(newTodoItem).then(this.render);

        }
    });

    new TodoComplete({
        onComplete: itemId => {
            api.todo.complete(itemId).then(this.render);
        }
    });

    new TodoDelete({
       onDelete: itemId => {
           api.todo
               .delete(itemId)
               .then(this.render);
       }
    });

    new TodoEdit({
       onEdit: (itemId) => {
               this.todoItems[itemId].state = "editing";
               this.setState(this.todoItems, FILTER_TYPE.ALL);
       },
       onView: (itemId, item, itemState) => {
           this.todoItems[itemId].state = itemState;
           this.todoItems[itemId].title = item;
           this.setState(this.todoItems, FILTER_TYPE.ALL);
       }
    });

    new TodoFilter({
        onFilter: (filter) => {
            let filteredItems;
            const todoItems = this.todoItems;
            if(filter === FILTER_TYPE.ACTIVE) {
                filteredItems = this.todoItems.filter(item => !item.isCompleted);
                this.setState(filteredItems, FILTER_TYPE.ACTIVE);
                return;
            }
            if(filter === FILTER_TYPE.COMPLETED) {
                filteredItems = this.todoItems.filter(item => item.isCompleted);
                this.setState(filteredItems, FILTER_TYPE.COMPLETED);
                return;
            }
            this.setState(todoItems, FILTER_TYPE.ALL);
        }
    });

    this.render = () => {
        this.todoItems = api.todo.get().then(responses => {
            this.todoItems = responses.map(response =>
                new TodoItem(response._id, response.content,
                    response.isCompleted, response.isCompleted ? "completed" : "active"));
            this.setState(this.todoItems, FILTER_TYPE.ALL);
        });
    }
}

const todoApp = new TodoApp();
todoApp.render();
