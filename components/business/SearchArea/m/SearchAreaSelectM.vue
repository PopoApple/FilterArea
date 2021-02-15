<template>
  <div class="SearchAreaSelectM">
    <div class="field-wrap" @click="onSelectClick">
      <span class="value-text ellipsis" :style="{ width: textWidthRem }">{{valueLabel}}</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <van-popup v-model="valueSelectPopup" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="valueSelectPopup = false"
        @confirm="onSelectPopupConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Popup, Picker  } from 'vant'
import { pxtorem } from '~/utils'

export default {
  components: {
    VanPopup: Popup,
    VanPicker: Picker,
  },
  props: {
    dict: Array,
    labelWidth: Number,
  },
  computed: {
    columns() {
      return this.dict.map(d => d.label)
    },
    valueLabel() {
      let opt = this.dict.find(d => d.isActive)
      return opt ? opt.label : ''
    },
    textWidthRem() {
      return pxtorem(750 - this.labelWidth - 80)
    },
  },
  data() {
    return {
      valueSelectPopup: false,
    }
  },
  methods: {
    onSelectPopupConfirm(value, index) {
      this.$emit('queryChange', this.dict[index].value)
      this.valueSelectPopup = false
    },
    onSelectClick() {
      this.valueSelectPopup = true
    },
  },
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
}
</style>