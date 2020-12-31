<template>
  <div>
    <div  style="position: relative;">
      <img
       
        src="@/assets/img/404.png"
        style="width: 300px; margin: 105px auto 0px; display: block;"
      />
      <div  class="come-back">
        <p >Oops!sorry page does not found.</p>
        <a href="#/" class="router-link-active">
          COME BACK
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.come-back {
    position: absolute;
    bottom: 0.1rem;
    width: 100%;
}
.come-back p {
    color: #848484;
    text-align: center;
    font-size: 14px;
}
.come-back a{
    color: #242F38;
    width: 120px;
    height: 40px;
    background: #FFCF3D;
    border-radius: 5px;
    font-size: 14px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 20px auto;
}
</style>
