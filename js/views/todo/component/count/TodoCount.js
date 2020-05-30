import {EVENT_TYPE, TODO_FILTER_CLASS_NAME} from "../../../../utils/constants.js";

const TodoCount = ({onFilter}) => {
    const $totalCount = document.querySelector('.todo-count strong');
    const $countContainer = document.querySelector('.count-container');
    const $todoFilterButtons = document.querySelectorAll('.count-container .filters a');

    const filterTypes = [
        {filterType: TODO_FILTER_CLASS_NAME.ALL, filterPredicate: val => val},
        {filterType: TODO_FILTER_CLASS_NAME.ACTIVE, filterPredicate: val => !val.isCompleted},
        {filterType: TODO_FILTER_CLASS_NAME.COMPLETED, filterPredicate: val => val.isCompleted}
    ];

    let todoItems = [];
    let todoFilterCondition = val => val;

    const getFilterCondition = () => todoFilterCondition;

    const setState = (updatedItems, updatedListCondition) => {
        todoItems = updatedItems;
        todoFilterCondition = updatedListCondition;
        render(todoItems, todoFilterCondition);
    };

    const render = (items, updatedListCondition) => $totalCount.innerText = items.filter(updatedListCondition).length;

    const onFilterHandler = event => {
        const $target = event.target;
        const isNotFilterButton = !Array.from($todoFilterButtons).find(filterButton => filterButton === $target);
        if (isNotFilterButton) {
            return;
        }
        const selectedFilterType = filterTypes.find(filterType => $target.classList.contains(filterType.filterType));
        onFilter(selectedFilterType.filterPredicate);
        drawSelectedFilter($target);
    };

    const drawSelectedFilter = target => {
        $todoFilterButtons.forEach(filterButton => filterButton.classList.remove("selected"));
        target.classList.add("selected");
    };

    const init = (() => {
        $countContainer.addEventListener(EVENT_TYPE.CLICK, onFilterHandler);
    })();

    return {
        setState,
        getFilterCondition
    };
};

export default TodoCount;