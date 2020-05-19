import {todoItemTemplate} from "../utils/Templates.js";
import {EVENT_TYPE, KEY_TYPE} from "../utils/Constants.js";

function TodoList(onToggleItemHandler, onDeleteItemHandler, onEditItemHandler, onSubmitItemHandler) {
    const $todoList = document.querySelector("#todo-list");
    $todoList.addEventListener(EVENT_TYPE.CLICK, event => this.toggle(event))
    $todoList.addEventListener(EVENT_TYPE.CLICK, event => this.delete(event))
    $todoList.addEventListener(EVENT_TYPE.DOUBLE_CLICK, event => this.edit(event))
    $todoList.addEventListener(EVENT_TYPE.KEY_DOWN, event => this.submit(event))

    this.setState = updatedItems => {
        this.render(updatedItems)
    }

    this.render = items => {
        const template = items.map(todoItemTemplate)
        $todoList.innerHTML = template.join("");
    }

    this.toggle = event => {
        const classNames = event.target.className;
        const $parent = event.target.closest("li")
        if (event.target && classNames.indexOf("toggle") !== -1) {
            onToggleItemHandler($parent.dataset.id)
        }
    }

    this.delete = event => {
        const classNames = event.target.className;
        const $parent = event.target.closest("li")
        if (event.target && classNames.indexOf("destroy") !== -1) {
            onDeleteItemHandler($parent.dataset.id)
        }
    }
    this.edit = event => {
        const classNames = event.target.className;
        const $parent = event.target.closest("li")
        if (event.target && classNames.indexOf("label") !== -1) {
            onEditItemHandler($parent.dataset.id);
        }
    }

    this.submit = event => {
        const $parent = event.target.closest("li")
        if (event.target && event.key === KEY_TYPE.ENTER) {
            onSubmitItemHandler($parent.dataset.id, event.target.value)
        } else if (event.target && event.key === KEY_TYPE.ESC) {
            const unchangedInput = $parent.querySelector(".edit").getAttributeNode("value");
            onSubmitItemHandler($parent.dataset.id, unchangedInput.value);
        }
    }
}

export default TodoList;