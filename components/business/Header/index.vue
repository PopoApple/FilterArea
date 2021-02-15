<template>
  <header class="Header">
    <div class="top-bar header-bg">
      
    </div>
    <div class="main-bar header-bg">
      
    </div>
  </header>
</template>

<script>

</script>
<style lang="scss">
.Header {
  .top-bar {
    height: 40px;
    line-height: 40px;
    background: $bgColorGray;
    color: $fontColorLight;
  }
  .welcome {
    margin-right: 30px;
  }
  .top-login-btn {
    display: inline-block;
    margin-left: 20px;
  }
  .userInfo {
    cursor: pointer;
    margin-top: 5px;
    .UserInfo .userName {
      position: relative;
      top: 1PX;
    }
  }
  .logo {
    display: block;
    width: 121px;
    height: 75px;
    cursor: pointer;
    position: relative;
    left: -8px;
  }
  .slogan {
    font-size: 16PX;
    font-weight: bold;
    color: $fontColorDark;
    height: 50px;
    line-height: 75px;
    padding: 0 0 0 30px;
    position: relative;
    &:before {
      content: '';
      width: 1px;
      height: 16px;
      background: $fontColorDark;
      position: absolute;
      top: 29px;
      left: 8px;
    }
  }
  .search-input {
    width: 440px;
  }
  .header-main-right {
    margin-top: 17px;
  }
  .phone {
    color: $colorYellow;
    font-size: $fontSizeXL;
    span {
      font-weight: bold;
      margin-left: 4px;
    }
  }
  .header-bottom {
    height: 40px;
    line-height: 40px;
    margin-top: 4px;
  }
  .top-nav {
    display: none;
  }
  .search-tab {
    display: none;
    text-align: left;
  }
  .mobile-right {
    display: none;
  }
}

/*------------------------- 仅PC端 -------------------------*/
.RootNotMobile {
  .Header {
    box-shadow: $shadow;
    .header-bell {
      margin-left: 5px;
    }
    .main-bar {
      height: 130px;
      padding-top: 4px;
      box-sizing: border-box;
    }
    .publish-btn {
      margin-left: 30px;
    }
  }
}
/*------------------------- 仅移动端 -------------------------*/
.RootIsMobile {
  .Header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99;
    height: 155px;
    background: #fff;
    .header-main {
      padding: 28px 30px;
    }
    .top-bar, .header-main-right, .slogan, .header-bottom {
      display: none;
    }
    .mobile-right {
      display: block;
    }
    .logo {
      width: 162px;
      height: 100px;
      left: -14px;
    }
    .van-popup--right {
      border-bottom-left-radius: 50px;
      border-top-left-radius: 50px;
      height: 100%;
      width: 540px;
    }
    .pop-wrap {
      padding: 50px 30px 80px;
    }
    .publish-btn {
      text-align: right;
    }
    .i-menu-btn {
      background-image: url('~static/img/m/menu-btn.png');
      width: 32px;
      height: 32px;
    }
    .header-search {
      margin: 18px 0 40px;
    }
    .exitLogin {
      font-size: 18PX;
      position: absolute;
      bottom: 100px;
      left: 80px;
      font-size: $fontSizeXL;
      i {
        margin-right: 12px;
      }
    }
    .i-exit {
      background-image: url('~static/img/m/exit.png');
      width: 18PX;
      height: 18PX;
      top: 3PX;
    }
    .mobile-header-records {
      margin-left: 46px;
      top: 20px;
      position: relative;
      opacity: 0.65;
    }
    .mobile-header-bell {
      margin-left: 34px;
      position: relative;
      top: 32px;
    }
    .mobile-menu {
      margin-left: 46px;
      position: relative;
      top: 28px;
    }
    .mobile-user-info {
      position: relative;
      top: 16px;
    }
  }
}
</style>
