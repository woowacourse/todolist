<template>
    <ul id="todo-list" class="todo-list">
        <todo-item v-for="todo in todos" :key="todo._id" :todo="todo" />
    </ul>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
    components: {
        TodoItem,
    },
    created() {
        this.$store.commit('LOAD_TODOS');
    },
    computed: {
        todos() {
            return this.$store.getters.filteredTodos;
        },
    },
};
</script>
