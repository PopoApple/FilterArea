<template>
  <component :is="comp" :label="label" :styleType="styleType" :labelWidth="labelWidth">
    <slot />
  </component>
</template>

<script>
import FieldM from './FieldM'
import FieldPc from './FieldPc'

export default {
  props: {
    styleType: Number,
    label: String,
    labelWidth: Number,
  },
  computed: {
    comp() {
      return this.$isMobile ? FieldM : FieldPc
    },
  },
}
</script>

