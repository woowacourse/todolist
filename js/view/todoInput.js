export function TodoInput({addItem, switchComplete, openEdit, deleteItem, setFilter}) {
    this.onAdd = event => {
        const $newTodoItem = event.target;

        if (event.key === "Enter" && $newTodoItem.value) {
            addItem({
                id: "#" + Math.random(),
                title: $newTodoItem.value,
                complete: false,
                edit: false
            });

            $newTodoItem.value = "";
        }
    };

    this.onComplete = event => {
        const $target = event.target;

        if ($target.classList.contains("toggle")) {
            const id = $target.closest("li").dataset.id;
            switchComplete(id);
        }
    };

    this.onEdit = event => {
        const $target = event.target;

        if ($target.classList.contains("label")) {
            const id = $target.closest("li").dataset.id;
            openEdit(id);
        }
    };

    this.onDelete = event => {
        const $target = event.target;

        if ($target.classList.contains("destroy")) {
            const id = $target.closest("li").dataset.id;
            deleteItem(id);
        }
    };

    this.onFilter = event => {
        const $target = event.target;
        const $ul = event.target.closest("ul");
        const $filters = Array.from($ul.getElementsByTagName("li"))
            .map(li => li.querySelector("a"));

        $filters.map(filter => filter.classList.remove("selected"));
        $target.classList.add("selected");
        setFilter($target.dataset.filter);
    };
}
