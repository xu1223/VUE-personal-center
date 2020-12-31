<template>
    <div id="app">
        <Layout/>
        
        <!--<Footer/>-->
    </div>
</template>
<script>
    import Layout from '@/views/Layout/Index';
    import Footer from './components/Footer'
    export default {
        components: {
            Layout,
            Footer,
        },
        created() {
            if (!this.$Storage.getSessionId()) {
                this.$Storage.setSessionId()
            }
        },
    }
</script>
<style lang="less">

</style>