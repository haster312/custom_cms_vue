import BlogPage from "../pages/BlogPage";
import Dashboard from "../pages/Dashboard";
import BlogDetail from "../components/blog/BlogDetail";
import BlogList from "../components/blog/BlogList";

// Define multiple routers with components
let routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard
    },
    {
        path: "/blog",
        component: BlogPage,
        children: [
            {
                path: "",
                name: "Blog",
                component: BlogList,
                meta: {
                    auth: false,
                    title: 'Blog'
                },
            },
            {
                path: "detail",
                name: "NewBlog",
                component: BlogDetail
            },
            {
                path: "detail/:id",
                name: "UpdateBlog",
                component: BlogDetail
            }
        ]
    }
];

export default routes;

