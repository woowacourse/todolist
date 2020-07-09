<template>
    <div id="app">
        <section class="todoapp">
            <div>
                <h1>TODOS</h1>
                <todo-input />
            </div>
            <div class="main">
                <todo-list />
            </div>
            <todo-count />
        </section>
    </div>
</template>

<script>
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoCount from './components/TodoCount.vue';

export default {
    components: {
        TodoInput,
        TodoList,
        TodoCount,
    },
};
</script>
