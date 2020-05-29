import { TodoCountTemplate } from './Template.js'
import { EVENT_TYPE, ACTION_TYPE } from "./constants.js";

export function TodoCount({selectedTodoItems}) {
    const $count = document.querySelector(".todo-count")
    const $all = document.querySelector(".all")
    const $active = document.querySelector(".active")
    const $completed = document.querySelector(".completed")

    this.list = []

    this.removeSelected =  () => {
        $all.classList.remove(ACTION_TYPE.SELECT)
        $active.classList.remove(ACTION_TYPE.SELECT)
        $completed.classList.remove(ACTION_TYPE.SELECT)
    }

    const showAllItems = event => {
        event.preventDefault()
        this.removeSelected()  // 이전 상태가 뭐였는지 모르기 때문에 전체적으로 초기화를 먼저 해준다.
        $all.classList.toggle(ACTION_TYPE.SELECT)
        this.render(this.list)
        selectedTodoItems(this.list)
    }

    const showActiveItems = event => {
        event.preventDefault()
        this.removeSelected()
        $active.classList.toggle(ACTION_TYPE.SELECT)
        const selected = [...this.list].filter(todoItem => !todoItem.completed)
        this.render(selected)
        selectedTodoItems(selected)
    }

    const showCompletedItems = event => {
        event.preventDefault()
        this.removeSelected()
        $completed.classList.toggle(ACTION_TYPE.SELECT)
        const selected = [...this.list].filter(todoItem => todoItem.completed)
        this.render(selected)
        selectedTodoItems(selected)
    }

    this.updateList = (updatedList) => {  // ???
        this.list = [...updatedList];
        this.render(this.list);
    }

    this.init = () => {
        $all.addEventListener(EVENT_TYPE.CLICK, showAllItems);
        $active.addEventListener(EVENT_TYPE.CLICK, showActiveItems);
        $completed.addEventListener(EVENT_TYPE.CLICK, showCompletedItems);
    };

    this.render = selectedList => {
        $count.innerHTML = TodoCountTemplate(selectedList);
    }

}