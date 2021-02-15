<template>
  <div class="SearchAreaCascaderM">
    <div class="field-wrap" @click="onCascaderClick">
      <span class="value-text ellipsis" :style="{ width: textWidthRem }">{{valueLabel}}</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <van-popup v-model="valueCascaderPopup" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        value-key="name"
        @cancel="valueCascaderPopup = false"
        @confirm="onCascaderPopupConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Popup, Picker  } from 'vant'
import { pxtorem } from '~/utils'
import { addNoSelectOption, getAreaCascaderLabel } from '../utils'

export default {
  components: {
    VanPopup: Popup,
    VanPicker: Picker,
  },
  props: {
    dict: Array,
    labelWidth: Number,
    initVal: String,
    chinatree: Array,
  },
  computed: {
    textWidthRem() {
      return pxtorem(750 - this.labelWidth - 80)
    },
    columns() {
      return addNoSelectOption(this.chinatree)
    }
  },
  created() {
    this.updateValueLabel(this.initVal)
  },
  data() {
    return {
      valueCascaderPopup: false,
      valueLabel: null,
    }
  },
  methods: {
    onCascaderPopupConfirm(val, index) {
      let value = null
      let province = this.columns[index[0]]
      if (province.code !== 'aa') {
        let city = province.children[index[1]]
        let area = city.children[index[2]]
        value = area.code
      }
      value = value ? value.replace(/aa/g, '') : value
      this.updateValueLabel(value)
      this.$emit('queryChange', value)
      this.valueCascaderPopup = false
    },
    onCascaderClick() {
      this.valueCascaderPopup = true
    },
    updateValueLabel(val) {
      this.valueLabel = getAreaCascaderLabel(this.chinatree, val) || '不限'
    }
  },
}
</script>

<style lang="scss">
.SearchAreaCascaderM {
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
}
</style>