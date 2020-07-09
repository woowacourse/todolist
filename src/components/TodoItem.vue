<template>
    <li :class="{ editing: isEditing, completed: todo.isCompleted }">
        <div class="view" @dblclick="onEditMode">
            <input class="toggle" type="checkbox" @click="toggleTodo" v-model="todo.isCompleted" />
            <label class="label">{{ todo.content }}</label>
            <button class="destroy" @click="deleteTodo"></button>
        </div>
        <input
            class="edit"
            @keyup.enter="updateTodo"
            @keyup.esc="offEditMode"
            @dblclick="offEditMode"
            v-model="modifiedContent"
        />
    </li>
</template>

<script>
export default {
    data() {
        return {
            modifiedContent: '',
            isEditing: false,
        };
    },
    props: {
        todo: Object,
    },
    methods: {
        onEditMode() {
            this.modifiedContent = this.todo.content;
            this.isEditing = true;
        },
        offEditMode() {
            this.isEditing = false;
        },
        updateTodo() {
            console.log(this.modifiedContent);
            this.$store.commit('UPDATE_TODO', { id: this.todo._id, content: this.modifiedContent });
            this.isEditing = false;
        },
        deleteTodo() {
            this.$store.commit('DELETE_TODO', this.todo._id);
        },
        toggleTodo() {
            this.$store.commit('TOGGLE_TODO', this.todo._id);
        },
    },
};
</script>
