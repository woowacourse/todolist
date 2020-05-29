import {EVENT_TYPE, FILTER_TYPE} from "./constants.js";

export function TodoFilter({onFilter}) {
    const $todoFilter = document.querySelector(".filters");

    $todoFilter.addEventListener(EVENT_TYPE.CLICK, event => onFilterHandler(event));

    const onFilterHandler = event => {
        const $target = event.target;
        if($target.className === FILTER_TYPE.ACTIVE) {
            onFilter(FILTER_TYPE.ACTIVE);
            return;
        }
        if($target.className === FILTER_TYPE.COMPLETED) {
            onFilter(FILTER_TYPE.COMPLETED);
            return;
        }
        onFilter(FILTER_TYPE.ALL);
    }
}