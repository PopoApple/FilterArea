<script>
  import { Button } from 'element-ui'
  const comp = Button
  export default comp
</script>

<style lang="scss">
.RootNotMobile, .RootIsMobile {
  .el-button {
    border-color: $borderColor;
    border-radius: $borderRadius;
    &.el-button--text {
      border-color: transparent;
    }
  }
  .el-button + .el-button {
    margin-left: 17px;
  }
  .el-button--success.is-plain {
    color: $colorBlue;
    background: $bgColorBlue;
    &:hover {
      background: $colorBlue;
      color: #fff;
    }
  }
  .el-button--small {
    border-radius: $borderRadius;
    font-size: $fontSize;
    padding: 0 15px;
    height: 32px;
    line-height: 32px;
  }
  .el-button--primary.is-plain {
    border-color: $bgColorGreen;
  }
  .el-button--warning.is-plain {
    border-color: $bgColorYellow;
  }
  .el-button--success.is-plain {
    border-color: $bgColorBlue;
  }
  .el-button--danger.is-plain {
    border-color: $bgColorRed;
  }
  .el-button--info.is-plain {
    border-color: $bgColorGray;
  }
}

.RootNotMobile {
  .el-button.Button30 {
    padding: 0 10px;
    height: 30PX;
    line-height: 30PX;
  }
  .el-button.is-round {
    padding: 0 23px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
  }
}

.RootIsMobile {
  .el-button.Button30 {
    padding: 0 16px;
    height: 46px;
    line-height: 46px;
  }
  .el-button.Button30 + .el-button.Button30 {
    margin-left: 17px;
  }
  .el-button--medium {
    padding: 22px 30px;
  }
  .el-button--small {
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
  }
  .el-button {
    border-radius: $borderRadius;
  }
  .el-button.is-round {
    padding: 0 23px;
    height: 60px;
    line-height: 55px;
    border-radius: 30px;
  }
}
</style>
