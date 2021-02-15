<template>
  <component
    :is="comp"
    :value="value"
    :dict="dict"
    :props="props"
    :isBtn="isBtn"
    :styleType="styleType"
    :clearable="clearable"
    :initVal="value"
  />
</template>

<script>
import FilterAreaCascaderM from './FilterAreaCascaderM'
import FilterAreaCascaderPc from './FilterAreaCascaderPc'

export default {
  props: {
    dict: Array,
    value: String,
    props: Object,
    isBtn: Boolean,
    styleType: Number,
    clearable: Boolean,
  },
  computed: {
    comp() {
      return this.$isMobile ? FilterAreaCascaderM : FilterAreaCascaderPc
    },
  },
}
</script>

