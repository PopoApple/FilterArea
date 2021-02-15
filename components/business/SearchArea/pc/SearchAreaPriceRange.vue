<template>
  <div class="SearchAreaPriceRange float-wrap" :class="{'SearchAreaPriceRange-styleType2': styleType === 2}">
    <div class="left">
      <SearchAreaSelect :dict="dict" :styleType="styleType" @select="handleSelect" />
    </div>
    <div class="left input-wrap float-wrap">
      <Input size="small" class="input left" v-model="inputValue[0]" placeholder="自定义价格">
        <span slot="prefix" class="money-icon">￥</span>
      </Input>
      <div class="split left">-</div>
      <Input size="small" class="input left" v-model="inputValue[1]" placeholder="自定义价格">
        <span slot="prefix" class="money-icon">￥</span>
      </Input>
      <Button size="small" class="btn left" type="primary" @click="handleBtnClick">确定</Button>
    </div>
  </div>
</template>

<script>
import {getPriceRangeInputValue} from '../utils'

export default {
  props: {
    dict: Array,
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
.SearchAreaPriceRange {
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
