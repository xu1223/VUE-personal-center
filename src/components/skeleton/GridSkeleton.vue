<template>
    <BaseSkeleton class="grid-skeleton" :options="gridOption">
        <slot></slot>
    </BaseSkeleton>
</template>

<script>
    import BaseSkeleton from './IndexSkeleton'
    export default {
        name: "GridSkeleton",
        props: {
            row: {
                type: Number,
                default: 6
            },
            ske_show: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                gridOption: {
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
.grid-skeleton /deep/ .van-skeleton__content {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 相当于 1fr 1fr 1fr */
    grid-template-rows: repeat(2, 1fr); /* fr单位可以将容器分为几等份 */
    grid-gap: 1%; /* grid-column-gap 和 grid-row-gap的简写 */
    grid-auto-flow: row;
}
.grid-skeleton /deep/ .van-skeleton__content .van-skeleton__row {
    width: 1.6rem !important;
    height: 1.6rem;
    margin: 0.2rem auto;
    text-align: center;
}
</style>