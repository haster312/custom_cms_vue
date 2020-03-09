<template>
    <router-view></router-view>
</template>

<script>
    export default {
        name: "BlogPage",
        data() {
            return {
                isNew: false
            }
        },
        methods: {
            addNew() {
                this.isNew = true;
            }
        }
    }
</script>

<style scoped>

</style>
