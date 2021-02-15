<template>
  <div class="SearchAreaSelectM">
    <div class="field-wrap" @click="onSelectClick">
      <span class="value-text">{{ valueLabel }}</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <van-popup v-model="valueSelectPopup" round position="bottom">
      <div class="van-picker__toolbar">
        <button type="button" class="van-picker__cancel" @click="handleCancelBtnclick">取消</button>
        <button type="button" class="van-picker__confirm" @click="handleConfirmBtnclick">确认</button>
      </div>
      <div class="options" v-if="dict && dict.length > 0">
        <div
          class="option clickable"
          v-for="item in dict"
          :key="item.value"
          @click="handleOptionClick(item.value)"
        >{{item.label}}</div>
      </div>
      <div class="left input-wrap float-wrap">
        <Input class="input left" v-model="inputValue[0]" placeholder="自定义价格">
          <span slot="prefix" class="money-icon">￥</span>
        </Input>
        <div class="split left">-</div>
        <Input class="input left" v-model="inputValue[1]" placeholder="自定义价格">
          <span slot="prefix" class="money-icon">￥</span>
        </Input>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { Popup } from 'vant'
  import { Input } from 'element-ui'
  import { getPriceRangeInputValue } from '../utils'

  export default {
    components: {
      VanPopup: Popup,
      ElInput: Input
    },
    props: {
      dict: Array,
      fieldId: String | Number
    },
    computed: {
      columns() {
        return this.dict.map(d => d.label)
      },
      valueLabel() {
        let val = this.$route.query[this.fieldId]
        if (val) {
          let arry = val.split('-')
          if (arry[0] === '') {
            return `面议`
          } else if (arry[1] === '') {
            return `大于等于${arry[0]}元`
          } else {
            return val + '元'
          }
        }
        return '不限'
      }
    },
    data() {
      return {
        valueSelectPopup: false,
        inputValue: []
      }
    },
    methods: {
      handleOptionClick(value) {
        this.$emit('queryChange', value)
        this.valueSelectPopup = false
      },
      handleCancelBtnclick() {
        this.valueSelectPopup = false
      },
      handleConfirmBtnclick() {
        this.$emit('queryChange', getPriceRangeInputValue(this.inputValue))
        this.valueSelectPopup = false
      },
      onSelectClick() {
        this.valueSelectPopup = true
      }
    }
  }
</script>

<style lang="scss">
.SearchAreaSelectM {
  .field-wrap {
    position: relative;
    display: flex;
    .value-text {
      flex: 1;
      text-align: center;
      color: $fontColorXLight;
    }
    i{
      width: 20px;
      text-align: right;
      line-height: 74px;
    }
  }
  .options {
    display: flex;
    //flex-wrap: wrap;
    margin: 20px 20px 0;
    .option {
      flex: 1;
      height: 80px;
      line-height: 80px;
      background: $bgColorGray;
      margin: 10px;
      text-align: center;
      border-radius: $borderRadius;
    }
  }
  .input-wrap {
    display: flex;
    margin: 20px 30px 80px;
  }
  .split {
    margin: 0 20px;
  }
  .van-picker__toolbar {
    height: 80px;
  }
  .el-input--prefix .el-input__inner {
    height: 80px;
    line-height: 80px;
    padding-left: 40px;
  }
  .el-input__prefix {
    color: $fontColor;
    line-height: 40PX;
    left: 12px;
  }
}
</style>