<template>
    <div class="home">
        <div>主应用</div>
        <el-button type="primary" @click="showButtonOfMicroApp">显示隐藏微应用按钮</el-button>
    </div>
</template>
<script>
import actions from 'src/registerMicroApps';

export default {
    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {
        showButtonOfMicroApp() {
            let { showButton = false } = window.globalState || {};

            console.log('showButtonOfMicroApp', window.globalState);
            actions.setGlobalState({
                showButton: !showButton,
            });
        },
    },

    components: {

    },
}
</script>
<style lang="scss" scoped>
@import '~css/public.scss';

.home {}
</style>