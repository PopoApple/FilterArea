<template>
  <component :is="comp" :dict="dict" :styleType="styleType" :isBtn="isBtn" :clearable="clearable" />
</template>

<script>
import FilterAreaPriceRangeM from './FilterAreaPriceRangeM'
import FilterAreaPriceRangePc from './FilterAreaPriceRangePc'

export default {
  props: {
    dict: Array,
    styleType: Number,
    isBtn: Boolean,
    clearable: Boolean,
    multiple: Boolean,
  },
  computed: {
    comp() {
      return this.$isMobile ? FilterAreaPriceRangeM : FilterAreaPriceRangePc
    },
  },
}
</script>

