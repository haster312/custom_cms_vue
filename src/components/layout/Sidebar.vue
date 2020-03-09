<template>
    <!-- Sidenav -->
    <nav class="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
        <div class="scrollbar-inner">
            <!-- Brand -->
            <div class="sidenav-header  align-items-center">
                <a class="navbar-brand" href="javascript:void(0)">
                    <img :src="pathConfig.image + '/brand/blue.png'" class="navbar-brand-img" alt="...">
                </a>
            </div>
            <div class="navbar-inner">
                <!-- Collapse -->
                <div class="collapse navbar-collapse" id="sidenav-collapse-main">
                    <!-- Nav items -->
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'Dashboard' }">
                                <i class="ni ni-tv-2 text-primary"></i>
                                <span class="nav-link-text">Dashboard</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{ name: 'Blog' }" class="nav-link">
                                <i class="ni ni-books text-primary"></i>
                                <span class="nav-link-text">Blog</span>
                            </router-link>
                        </li>
                    </ul>
                    <!--                    &lt;!&ndash; Divider &ndash;&gt;-->
                    <!--                    <hr class="my-3">-->
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Sidebar"
    }
</script>

<style scoped>

</style>
