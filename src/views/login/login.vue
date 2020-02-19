<template>
  <div class="login-wrap">
    <div class="box1"></div>
    <img src="./images/login_banner_ele.png" alt="">
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content:space-around;
  align-items: center;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
   // 登录盒子
  .box1 {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
  }
   // 登录页图片

}
</style>