<template>
    <div class="home">
        <div>微应用1</div>
        <el-button type="primary" v-if="showButton">微应用按钮</el-button>
    </div>
</template>
<script>
import vmEvent from 'src/main';

export default {
    data() {
        return {
            showButton: false,
        }
    },

    created() {
        vmEvent.$on('onGlobalStateChange', this.onGlobalStateChange);
    },

    beforeDestroy() {
        vmEvent.$off('onGlobalStateChange', this.onGlobalStateChange);
    },

    mounted() {

    },

    methods: {
        onGlobalStateChange(state) {
            console.log('onGlobalStateChange', state);
            let { showButton } = state;

            this.showButton = showButton;
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