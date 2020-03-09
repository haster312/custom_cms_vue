// Load important modules
import '@babel/polyfill';
import Vue from "vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import Notifications from 'vue-notification'
import MainApp from "./pages/MainPage";
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);

// Load plugin
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Notifications);

// Load config
import PathConfig from "./config/path";

Vue.mixin({
    data: function() {
        return {
            pathConfig: PathConfig
        }
    }
});

// Define routes
import Routes from "./router";
const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    base: '/',
    routes: Routes
});

export default Vue;

let app = new Vue({
    el: '#cms',
    router: router,
    render: h => h(MainApp),
    watch: {
        '$route' (to, from) {
            document.title = to.meta.title || 'Will CMS'
        }
    }
});

Vue.config.devtools = true;