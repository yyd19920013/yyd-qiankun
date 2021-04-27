/* eslint-disable */

// import 'amfe-flexible';
import './public-path';
import 'core-js';
import 'components/vux';
import 'element-ui/lib/theme-chalk/index.css';
import 'components/element';

import App from 'src/App';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from './router';
import store from './store';

import fastclick from 'fastclick';
import * as filter from './filter';
import services from 'services';
import { htmlFontSize } from 'js/utils';

import commonMixinPlugin from './plugins/commonMixinPlugin';

Vue.use(commonMixinPlugin);

//处理点击延迟
let hostname = window.location.hostname;
let noNative = hostname != 'localhost' && hostname != '127.0.0.1' && hostname != '172.16.21.92';

if (noNative) {
    fastclick.attach(document.body);
}

//挂载过滤器
for (let attr in filter) {
    Vue.filter(attr, filter[attr]);
}

//挂载网络请求
Vue.prototype.$services = services;

let router = null;
let instance = null;

function render(props = {}) {
    const { container } = props;
    router = new VueRouter({
        base: window.__POWERED_BY_QIANKUN__ ? '/app1' : '/',
        routes,
    });

    //路由改变之前显示loading
    router.beforeEach((to, from, next) => {
        store.commit({
            type: 'UPDATE_LOADINGSTATUS',
            isLoading: true,
        });

        //根据meta值改变title
        if (to.meta && to.meta.title) document.title = to.meta.title;

        next();
    });

    //路由改变之后隐藏loading
    router.afterEach(() => {
        store.commit({
            type: 'UPDATE_LOADINGSTATUS',
            isLoading: false,
        });

        //关闭vux组件的遮罩
        instance.$vux.alert.hide();
        instance.$vux.confirm.hide();
    });

    instance = new Vue({
        router,
        store,
        render: (h) => h(App),
    }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

//用来发送事件的vue实例
const vmEvent = new Vue({
    router,
});

//rem根据屏幕变化
htmlFontSize();

export async function bootstrap() {
    console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
    console.log('[vue] props from main framework', props);
    props.onGlobalStateChange((state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        console.log('微应用1收到stateChange', state);
        window.globalState = state;
        vmEvent.$emit('onGlobalStateChange', state, prev);
    });
    setTimeout(() => {
        props.setGlobalState({
            microApp1Message: '我是微应用',
        });
    }, 5000);
    // props.setGlobalState(state);
    render(props);
}
export async function unmount() {
    instance.$destroy();
    instance.$el.innerHTML = '';
    instance = null;
    router = null;
}
console.log(instance);
export default vmEvent;
/* eslint-disable no-new */