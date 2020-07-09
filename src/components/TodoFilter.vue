<template>
    <li>
        <a class="{ filterType.className }" :class="{ selected }" @click="changeFilter">{{ filterType.content }}</a>
    </li>
</template>

<script>
export default {
    props: {
        filterType: Object,
    },
    computed: {
        selected() {
            return this.$store.state.filter.className === this.filterType.className;
        },
    },
    methods: {
        changeFilter() {
            this.$store.commit('CHANGE_FILTER', this.filterType);
        },
    },
};
</script>
