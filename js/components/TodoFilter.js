import {EVENT_TYPE} from "../utils/Constants.js";
import {VIEW_TYPE} from "../domain/ViewType.js";

function TodoFilter(onChangeFilterHandler) {
    const $todoFilter = document.querySelector(".filters")
    $todoFilter.addEventListener(EVENT_TYPE.CLICK, event => this.changeFilter(event))

    this.clearSelected = () => {
        let children = [...$todoFilter.querySelectorAll("li")]
        children.map(it => it.querySelector("a"))
            .map(it => it.classList.remove("selected"))
    }

    this.changeFilter = event => {
        const $target = event.target;
        const classNames = $target.className;
        this.clearSelected();

        if (classNames.indexOf("all") !== -1) {
            onChangeFilterHandler(VIEW_TYPE.ALL)
        } else if (classNames.indexOf("active") !== -1) {
            onChangeFilterHandler(VIEW_TYPE.ACTIVE)
        } else if (classNames.indexOf("completed") !== -1) {
            onChangeFilterHandler(VIEW_TYPE.COMPLETED)
        }

        $target.classList.add("selected")
    }
}

export default TodoFilter;