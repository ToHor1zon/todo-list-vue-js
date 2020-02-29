import Vue from 'vue';
import VueRouter from 'vue-router';
import TodoList from '@/components/todoList';
import About from '@/pages/About.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'TodoList',
        component: TodoList,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
