<script>
  import { Tag } from 'element-ui'
  const comp = Tag
  export default comp
</script>

<style lang="scss" >
.RootNotMobile, .RootIsMobile {
  .el-tag {
    border-radius: $borderRadius;
    font-weight: normal;
    &.el-tag--mini {
      font-size: $fontSizeS;
      line-height: 18px;
      border-radius: $borderRadiusS;
    }
  }
}
.RootNotMobile {
  .el-tag {
    font-size: $fontSize;
  }
}
.RootIsMobile {
  .el-tag {
    height: 64px;
    line-height: 64px;
    padding: 0 20px;
    &.el-tag--small {
      height: 33px;
      line-height: 33px;
      padding: 0 10px;
    }
    &.el-tag--mini {
      line-height: 30px;
      height: 32px;
      padding: 0 6px;
    }
  }
}
</style>
