import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//首页
const home = () => import('views/home/home');

//测试
const test = () => import('views/test/test');

//404页面
const page404 = () => import('views/page404/page404');

//配置路由规则
const routes = [{
        path: '',
        redirect: '/home',
    },
    //首页
    {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
            title: '首页',
        },
    },
    //测试
    {
        path: '/test',
        name: 'test',
        component: test,
        meta: {
            title: '测试',
        },
    },
    //404页面
    {
        path: '*',
        name: 'page404',
        component: page404,
        meta: {
            title: '404',
        },
    },
];

export {
    routes
}
export default new VueRouter({
    routes
});