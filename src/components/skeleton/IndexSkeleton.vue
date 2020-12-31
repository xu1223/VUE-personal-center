<template>
    <van-skeleton
            :title="title"
            :title-width="title_w"
            :avatar="avatar"
            :avatar-size="avatar_w"
            :avatar-shape="avatar_shape"
            :row="row"
            :row-width="row_w"
            :animate="animate"
            :loading="ske_show"
    >
        <slot></slot>
    </van-skeleton>
</template>

<script>
    export default {
        name: "IndexSkeleton",
        props: ['options'],
        data () {
            return {
                title: false,
                title_w: '40%',
                avatar: false,
                avatar_w: '32px',
                avatar_shape: 'round',
                row: 0,
                row_w: '100%',
                animate: true,
                ske_show: true
            }
        },
        created () {
            let styles = this.options || {};
            for (let key in styles) {
                this[key] = styles[key];
            }
        }
    }
</script>

<style lang="less" scoped>
</style>