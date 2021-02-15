<template>
  <div class="SearchAreaAreaCascader float-wrap" :class="{'SearchAreaPriceRange-styleType2': styleType === 2}">
    <div class="left">
      <SearchAreaSelect :dict="dict" :styleType="styleType" @select="handleSelect" />
    </div>
    <div class="left input-wrap float-wrap">
      <Cascader
        :options="chinatree"
        :props="{ checkStrictly: true, value: 'code', label: 'name' }"
        clearable 
        size="small"
        :value="value"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script>
import { checkNumber } from '~/utils'

export default {
  props: {
    dict: Array,
    initVal: String,
    styleType: Number,
    chinatree: Array,
  },
  created() {
    let val = this.initVal || ''
    let provinceCode = val.slice(0, 2)
    let provinceValue = provinceCode.length === 2 ? provinceCode : null
    let cityCode = val.slice(0, 4)
    let cityValue = cityCode.length === 4 ? cityCode : null
    let areaCode = val.slice(0, 6)
    let areaValue = areaCode.length === 6 ? areaCode : null
    let value = []
    if (provinceValue) {
      value.push(provinceValue)
    }
    if (cityValue) {
      value.push(cityValue)
    }
    if (areaValue) {
      value.push(areaValue)
    }
    this.value = value
  },
  data() {
    return {
      value: [],
    }
  },
  methods: {
    handleSelect() {
      this.value = []
    },
    handleChange(e) {
      let val 
      if (e && e.length > 0) {
        val = e[e.length - 1]
      } else {
        val = null
      }
      this.$emit('queryChange', val)
    },
  },
}
</script>
<style lang="scss">
.SearchAreaAreaCascader {
  .input-wrap {
    .input {
      width: 140px !important;
    }
    .left + .left {
      margin-left: 10px;
    }
    .el-select .el-input .el-select__caret {
      height: 30px;
      line-height: 30px;
    }
    .el-input--small .el-input__inner {
      background: transparent;
    }
  }
}
</style>
