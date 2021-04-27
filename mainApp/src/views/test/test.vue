<template>
    <div class="test">
        测试乾坤框架
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {
        async confirm() {
            let res = await this.isConfirm('是否确定？');
            if (!res) return;

            console.log('确定');
        },
        async getList() {
            let res = await this.$services.testAxios({ pageIndex: 1, pageSize: 10 });

            console.log(res);
        },
    },

    components: {

    },
}
</script>
<style lang="scss" scoped>
@import '~css/public.scss';

.test {
    .text {
        display: flex;
        border-top: 1px solid #ddd;
        border-bottom: 2px solid #ddd;
    }
}
</style>