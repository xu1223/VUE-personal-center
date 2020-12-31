<template>
    <div :style="{ height:$route.path == '/' ? '100%': ($route.path == '/login'&& '100%'),
    background: $route.path == '/login'? '#fff':'',
    overflow: $route.path == '/login'? 'hidden':''
    }"  
    >
      <div  v-if="$route.path !== '/login' ">
         <Vivew/>
          <FooterBtn />
      </div>
      <div  v-if="$route.path == '/login' " >
         <Vivew/>
      </div>
    </div>
    
</template>

<script>
  import Vivew from './vivew'
  export default {
    name: 'layout',
    
    components: {
      Vivew
    }
  }
</script>

<style lang="less" scoped>

</style>