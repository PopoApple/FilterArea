<template>
  <component :is="comp" :dict="dict" :value="value" :placeholder="placeholder" style="width: 100%" :size="size" :clearable="clearable" @input="handleInput" @change="handleChange" />
</template>

<script>
import SelectM from '~/components/base/Select/SelectM'
import SelectPc from '~/components/base/Select/SelectPc'

export default {
  props: {
    dict: Array,
    value: String | Number,
    placeholder: String,
    size: String,
    clearable: Boolean,
  },
  computed: {
    comp() {
      return this.$isMobile ? SelectM : SelectPc
    },
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e)
    },
    handleChange(e) {
      this.$emit('change', e)
    }
  },
}
</script>

