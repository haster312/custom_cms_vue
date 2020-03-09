<template>
    <section>
        <div class="header bg-primary pb-6">
            <div class="container-fluid">
                <div class="header-body">
                    <div class="row align-items-center py-4">
                        <div class="col-lg-6 col-7">
                            <h6 class="h2 text-white d-inline-block mb-0">Blog</h6>
                        </div>
                        <div class="col-lg-6 col-5 text-right">
                            <router-link class="btn btn-sm btn-neutral" :to="{ name: 'NewBlog' }">New</router-link>
                            <a class="btn btn-sm btn-neutral">Filters</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <datatable :columns="columns" :source="'Blog'" :url="API.URLs.Blog.List"/>
    </section>
</template>

<script>
    import Datatable from "../common/Datatable";
    import API from '../../ultis/api';

    export default {
        name: "BlogList",
        components: { Datatable },
        data() {
            return {
                url: 'blog',
                API: API,
                columns: ['title', 'slug', 'description', 'category', 'updated_at'],
            }
        }
    }
</script>

<style scoped>

</style>
