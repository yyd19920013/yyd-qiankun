import vmEvent from 'src/main';
import { registerMicroApps, start } from 'qiankun';
import { initGlobalState, MicroAppStateActions } from 'qiankun';

registerMicroApps([{
    name: 'app1',
    entry: '//localhost:8001',
    container: '#app1',
    activeRule: '/app1',
}]);

// 初始化 state
let state = {
    showButton: false,
    mainAppMessage: '',
    microApp1Message: '',
};
const actions = initGlobalState(state);
window.globalState = state;
actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('主应用收到stateChange', state);
    window.globalState = state;
    vmEvent.$emit('onGlobalStateChange', state, prev);
});

setTimeout(() => {
    actions.setGlobalState({
        mainAppMessage: '我是主应用',
    });
}, 1000);
// actions.setGlobalState(state);
// actions.offGlobalStateChange();
start();

export default actions;