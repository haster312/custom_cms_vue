<template>
    <section>
        <div class="header bg-primary pb-6">
            <div class="container-fluid">
                <div class="header-body">
                    <div class="row align-items-center py-4">
                        <div class="col-lg-6 col-7">
                            <h6 class="h2 text-white d-inline-block mb-0">{{ isNew ? 'Add' : 'Update'}} Blog</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid mt--6">
            <div class="row">
                <div class="col">
                    <div class="card-wrapper">
                        <div class="card mb-4">
                            <!-- Card body -->
                            <div class="card-body">
                                <!-- Form groups used in grid -->
                                <form id="blog_detail" class="needs-validation">
                                    <div class="row">
                                        <div class="col-md-7">
                                            <div class="form-group">
                                                <label class="form-control-label" for="title">Title</label>
                                                <input type="text" class="form-control" id="title" v-model="model.title" required>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-control-label" for="slug">Slug</label>
                                                <input type="text" class="form-control" id="slug" v-model="model.slug" required>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-control-label" for="description">Description</label>
                                                <textarea class="form-control" id="description" v-model="model.description" required>
                                                    {{ model.description}}
                                                </textarea>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-control-label" for="status">Status</label>
                                                <br/>
                                                <label class="custom-toggle">
                                                    <input type="checkbox" id="status" v-model="model.status" :checked="model.status == 1">
                                                    <span class="custom-toggle-slider rounded-circle" data-label-off="No" data-label-on="Yes" />
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-5">
                                            <div class="form-group">
                                                <label class="form-control-label" for="category">Category</label>
                                                <select class="form-control" v-model="model.category" id="category" required>
                                                    <option v-for="category in categories" v-model="model.category" :value="category.id">
                                                        {{ category.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <button class="btn btn-primary float-right" v-on:click="modifyBlog">{{ isNew ? 'Add' : 'Update'}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import API from "../../ultis/api";
    import Validation from '../../helper/validation';
    import StringHelper from "../../helper/string_helper";

    export default {
        name: "BlogDetail",
        data() {
            return {
                modelId: null,
                errors: [],
                model: {},
                columns: {},
                categories: [],
                isNew: true,
                stringHelper: StringHelper
            }
        },
        watch: {
            model: {
                handler(val) {
                    if (val.title && val.title.length > 3) {
                        val.slug = StringHelper.stringToSlug(val.title);
                    }
                },
                deep: true
            }
        },
        async beforeMount() {

            if (this.$route.params != undefined && this.$route.params.id) {
                this.modelId = this.$route.params.id;
                this.isNew = false;
            }

            await API.getAPI(API.URLs.Blog.Category.List, this, (context, res, error) => {
                if (res) {
                    context.categories = res.data.data;
                }
            });

            if (this.isNew) {
                await API.getAPI(API.URLs.Blog.Model, this, (context, res, error) => {
                    if (res) {
                        context.model = res.data.data;
                    }
                });
            } else {
                await API.getAPI(API.URLs.Blog.Detail + `/${this.modelId}`, this, (context, res, error) => {
                    if (res) {
                        context.model = res.data.data;
                    }
                });
            }
        },
        methods: {
            async modifyBlog() {
                await Validation.validateForm(this.model, {
                    title: 'required',
                    slug: 'required',
                    description: 'required',
                    category: 'required'
                });

                if (Validation.isError) {
                    Validation.renderValidate('blog_detail', Validation.errors);
                } else {
                    if (this.isNew) {
                        API.postAPI(API.URLs.Blog.List, this.model, this, (context, res, error) => {
                            if (res) {
                                context.$router.push({name: 'Blog'})
                            }
                        })
                    } else {
                        API.putAPI(API.URLs.Blog.List + '/' + this.modelId, this.model, this, (context, res, error) => {
                            if (res) {
                                context.$router.push({name: 'Blog'})
                            }
                        })
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
