<template>
  <div class="login-wrap">
    <div class="box1">
      <span class="icon"></span>
      <span class="heima">黑马面面</span>
      <span class="line"></span>
    </div>
    <img src="./images/login_banner_ele.png" alt />
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
  justify-content: space-around;
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
    padding-left: 48px;
    overflow: hidden;

    .icon {
      display: inline-block;
      width: 22px;
      height: 17px;
      margin-top: 50px;
      // background-color: #f00;
      background-image: url("./images/login-icon9.png");
      background-repeat: no-repeat;
    }
    .heima {
      width: 94px;
      height: 22px;
      font-size: 24px;
      margin-left: 16px;
    }
    .line {
      display: inline-block;
      width: 1px;
      height: 28px;
      color: #ccc;
      background-color: #ccc;
      margin-left: 16px;
      margin-top: 44px;
    }
  }
  // 登录页图片
}
</style>