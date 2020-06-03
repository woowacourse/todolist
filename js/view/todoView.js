import {
    completedItemTemplate,
    editingItemTemplate, todoCountTemplate,
    todoItemTemplate
} from "../templates/template.js";

export function TodoView({getFilter, $todoList, $todoCount}) {
    this.render = items => {
        if (getFilter() === "all") {
            this.renderAll(items);
            return;
        }
        if (getFilter() === "active") {
            this.renderActives(items);
            return;
        }
        if (getFilter() === "completed") {
            this.renderCompletes(items);
        }
    };

    this.renderAll = items => {
        const todoTemplate = items.filter(item => !item.complete).map(item => {
            if (item.edit) {
                return editingItemTemplate(item);
            }
            return todoItemTemplate(item);
        });
        const completedTemplate = items.filter(item => item.complete).map(completedItemTemplate);

        const templates = todoTemplate.concat(completedTemplate);
        $todoList.innerHTML = templates.join("");
        $todoCount.innerHTML = todoCountTemplate(templates.length);
    };

    this.renderActives = items => {
        const todoTemplate = items.filter(item => !item.complete).map(item => {
            if (item.edit) {
                return editingItemTemplate(item);
            }
            return todoItemTemplate(item);
        });
        $todoList.innerHTML = todoTemplate.join("");
        $todoCount.innerHTML = todoCountTemplate(todoTemplate.length);
    };

    this.renderCompletes = items => {
        const completedTemplate = items.filter(item => item.complete).map(completedItemTemplate);

        $todoList.innerHTML = completedTemplate.join("");
        $todoCount.innerHTML = todoCountTemplate(completedTemplate.length);
    }
}
