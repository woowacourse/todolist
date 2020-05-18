import {EVENT_TYPE} from "../util/constants.js";

export function TodoCount(showItems) {
    this.number = document.querySelector("div.count-container > span > strong");
    this.allTodoItems = document.querySelector("div.count-container > ul > li:nth-child(1) > a");
    this.todoItems = document.querySelector("div.count-container > ul > li:nth-child(2) > a");
    this.doneItems = document.querySelector("div.count-container > ul > li:nth-child(3) > a");

    this.initEventListener = () => {
        this.allTodoItems.addEventListener(EVENT_TYPE.CLICK, showItems);
        this.todoItems.addEventListener(EVENT_TYPE.CLICK, showItems);
        this.doneItems.addEventListener(EVENT_TYPE.CLICK, showItems);
    }

    return this.initEventListener();
}