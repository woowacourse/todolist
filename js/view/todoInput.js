import {api} from "../api/index.js";

export function TodoInput({update, openEdit, saveEdit, abortEdit, setFilter}) {
    this.onAdd = async event => {
        const $newTodoItem = event.target;

        if (event.key === "Enter" && $newTodoItem.value) {
            await api.todoList.add($newTodoItem.value).then();
            await update();
            $newTodoItem.value = "";
        }
    };

    this.onComplete = async event => {
        const $target = event.target;

        if ($target.classList.contains("toggle")) {
            const id = $target.closest("li").dataset.id;
            await api.todoList.toggle(id).then();
            await update();
        }
    };

    this.onEdit = event => {
        const $target = event.target;

        if ($target.classList.contains("label")) {
            const id = $target.closest("li").dataset.id;
            openEdit(id);
        }
    };

    this.onEndEdit = event => {
        const $target = event.target;

        if (event.type === "keydown" && event.key !== "Enter" && event.key !== "Escape") {
            return;
        }

        if (event.key === "Escape") {
            $target.value = "";
        }

        if ($target.classList.contains("edit")) {
            const id = $target.closest("li").dataset.id;
            const title = $target.value;
            title ? saveEdit(id, title) : abortEdit();
        }
    };

    this.onDelete = async event => {
        const $target = event.target;

        if ($target.classList.contains("destroy")) {
            const id = $target.closest("li").dataset.id;
            await api.todoList.delete(id).then();
            await update();
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
