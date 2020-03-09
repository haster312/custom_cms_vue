<template>
    <div class="container-fluid mt--6">
        <div class="row">
            <div class="col">
                <div class="card bg-default shadow">
                    <div class="card-header bg-transparent border-0">
                    </div>
                    <!-- Light table -->
                    <div class="table-responsive">
                        <table class="table align-items-center table-dark table-flush">
                            <thead class="thead-dark">
                                <tr>
                                    <th v-for="column in columns" scope="col">{{ stringHelper.titleParser(column) }}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in rows">
                                    <td v-for="column in columns">
                                        {{ (column == 'created_at' || column == 'updated_at') ? dateHelper.formatDate(row[column]) : row[column] }}
                                    </td>
                                    <td class="table-actions">
                                        <router-link :to="{ name: 'Update' + source, params: { id: row.id }}" class="table-action" data-toggle="tooltip" data-original-title="Edit product">
                                            <i class="fas fa-user-edit"></i>
                                        </router-link>
                                        <a href="#!" class="table-action table-action-delete" data-toggle="tooltip" data-original-title="Delete product" v-on:click="deleteModel(row.id)">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- Card footer -->
                    <div class="card-footer py-4 bg-default" v-if="pages > 1">
                        <nav aria-label="...">
                            <ul class="pagination justify-content-end mb-0">
                                <li class="page-item disabled" v-show="current > 1">
                                    <a class="page-link" href="#" tabindex="-1">
                                        <i class="fas fa-angle-left"></i>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li v-for="number in pages" :class="{'page-item': true, 'active' : number === current}">
                                    <a class="page-link" v-on:click="reloadData(number)">{{ number }}</a>
                                </li>
                                <li class="page-item" v-show="current < pages">
                                    <a class="page-link" href="#">
                                        <i class="fas fa-angle-right"></i>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import API from "../../ultis/api";
    import StringHelper from '../../helper/string_helper';
    import DateHelper from '../../helper/date_helper';

    export default {
        name: "Datatable",
        props: {
            columns: Array,
            sort: Array,
            source: String,
            url: String,
        },
        data() {
            return {
                rows: [],
                total: null,
                size: 10,
                pages: 1,
                current: 1,
                page: 1,
                stringHelper: StringHelper,
                dateHelper: DateHelper
            }
        },
        methods: {
            getData() {
                API.getAPI(this.url + `/paginate?page=${this.page}&size=${this.size}`, this, (context, res, error) => {
                    if (res) {
                        context.rows = res.data.data;
                        context.pages = res.data.total / context.size;
                        context.current = res.data.current;
                    }
                });
            },
            async reloadData(number) {
                this.page = number;
                this.current = number;
                await this.getData();
            },
            deleteModel(id) {
                if(confirm(`Do you really want to delete this ${this.source}?`)) {
                    API.deleteAPI(this.url + `/${id}`, this, (context, res, error) => {
                        if (res.data.success) {
                            context.reloadData(context.current);
                        }
                    })
                }
            }
        },
        async beforeMount() {
            await this.getData();
        },
    }
</script>

<style scoped>
    .table {
        margin-bottom: 10px;
    }
    .table-dark .table-action {
        color: #fff;
    }
</style>
