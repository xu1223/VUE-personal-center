<template>
    <BaseSkeleton class="list-skeleton" :options="listOption">
        <slot></slot>
    </BaseSkeleton>
</template>

<script>
    import BaseSkeleton from './IndexSkeleton'
    export default {
        name: "ListSkeleton",
        props: {
            row: {
                type: Number,
                default: 10
            },
            ske_show: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                listOption: {
                    row: this.row,
                    ske_show: this.ske_show
                }
            }
        },
        components: {
            BaseSkeleton
        }
    }
</script>

<style lang="less" scoped>
.list-skeleton /deep/ .van-skeleton__content {

}
.list-skeleton /deep/ .van-skeleton__content .van-skeleton__row {

}
</style>