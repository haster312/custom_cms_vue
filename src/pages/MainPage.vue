<template>
    <section>
        <sidebar/>
        <div class="main-content" id="panel">
            <navbar/>
            <div class="content">
                <router-view />
            </div>
            <footer/>
        </div>
    </section>
</template>

<script>
    import Sidebar from "../components/layout/Sidebar";
    import Navbar from "../components/layout/Navbar";
    import Footer from "../components/layout/Footer";

    export default {
        name: "MainPage",
        components: {
            Sidebar, Navbar, Footer
        }
    }
</script>

<style scoped>

</style>
