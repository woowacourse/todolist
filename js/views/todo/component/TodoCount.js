import {EVENT_TYPE} from "../../../utils/constants.js";

export default function TodoCount({onActive}) {
    const $totalCount = document.querySelector('.todo-count strong');
    const $totalTodo = document.querySelector('.count-container .all');
    const $activeTodo = document.querySelector('.count-container .active');
    const $completedTodo = document.querySelector('.count-container .completed');

    let todoItems = [];
    let activeListCondition = '';

    const setState = (updatedItems, updatedListCondition) => {
        todoItems = updatedItems;
        activeListCondition = updatedListCondition;
        render(todoItems, activeListCondition);
    }

    const render = (items, updatedListCondition) => {
        $totalCount.innerText = items.filter(updatedListCondition).length;
    }

    const activeSelectLine = event => {
        [$totalTodo, $activeTodo, $completedTodo].forEach(node => node.classList.remove("selected"));
        event.target.classList.add("selected");
    }

    const filterAllHandler = event => {
        activeSelectLine(event);
        onActive(val => val)
    }

    const filterActiveHandler = event => {
        activeSelectLine(event);
        onActive(val => !val.isCompleted)
    }

    const filterCompleteHandler = event => {
        activeSelectLine(event);
        onActive(val => val.isCompleted)
    }

    const init = () => {
        $totalTodo.addEventListener(EVENT_TYPE.CLICK, filterAllHandler)
        $activeTodo.addEventListener(EVENT_TYPE.CLICK, filterActiveHandler)
        $completedTodo.addEventListener(EVENT_TYPE.CLICK, filterCompleteHandler)
    }

    return {
        init,
        setState
    }
}