<template>
  <div class="FilterAreaDropdownSelectPc float-wrap">
    <div class="left">
      <FilterAreaOptions :dict="dictTop" :styleType="styleType" @select="handleSelect" />
    </div>
    <div class="left input-wrap float-wrap">
      <Select :dict="dict" size="small" />
    </div>
  </div>
</template>

<script>
import {getPriceRangeInputValue} from '../utils'
// dict: Array,
//     value: String | Number,
//     placeholder: String,
//     size: String,
//     clearable: Boolean,
export default {
  props: {
    dict: Array,
    dictTop: Array,
    initInputVal: Array,
    styleType: Number,
  },
  data() {
    return {
      inputValue: this.initInputVal || [],
    }
  },
  methods: {
    handleSelect() {
      this.inputValue = []
    },
    handleBtnClick() {
      this.$emit('queryChange', getPriceRangeInputValue(this.inputValue))
    },
  },
}
</script>
<style lang="scss">
.FilterAreaDropdownSelectPc {
  .input-wrap {
    border: 1px solid transparent;
    .btn {
      display: none;
    }
    &:hover {
      border-color: $borderColor;
      .btn {
        display: block;
      }
    }
    box-sizing: border-box;
    height: 47px;
    padding: 7px 7px;
    border-radius: $borderRadius;
    .input {
      width: 140px;
    }
    .left + .left {
      margin-left: 10px;
    }
    .el-input__inner {
      display: block;
    }
    .split {
      height: 32px;
      line-height: 32px;
    }
  }
  .el-input--prefix .el-input__inner {
    padding-left: 20px;
  }
  .el-input__prefix {
    color: $fontColor;
    top: 1PX;
    line-height: 32px;
  }
  .el-input--small .el-input__inner {
    background: transparent;
  }
}
</style>
