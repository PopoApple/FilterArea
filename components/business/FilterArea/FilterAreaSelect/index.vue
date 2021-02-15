<template>
<component :is="comp" :dict="dict" :dictTop="dictTop" :styleType="styleType" :isBtn="isBtn" :clearable="clearable" />
  <!-- <component :is="comp" :dict="dict" :value="value" :placeholder="placeholder" style="width: 100%" :size="size" :clearable="clearable" @input="handleInput" @change="handleChange" /> -->
</template>

<script>
import FilterAreaSelectM from './FilterAreaSelectM'
import FilterAreaMultiSelectM from './FilterAreaMultiSelectM'
import FilterAreaSelectPc from './FilterAreaSelectPc'
import FilterAreaDropdownSelectPc from './FilterAreaDropdownSelectPc'

export default {
  props: {
    dict: Array,
    dictTop: Array,
    styleType: Number,
    isBtn: Boolean,
    clearable: Boolean,
    multiple: Boolean,
    type: String,  //  空或者'dropdown'
    // value: String | Number,
    // placeholder: String,
    // size: String,
    // clearable: Boolean,
  },
  computed: {
    comp() {
      return this.$isMobile ? (this.multiple ? FilterAreaMultiSelectM : FilterAreaSelectM) : (this.type === 'dropdown' ? FilterAreaDropdownSelectPc: FilterAreaSelectPc)
    },
  },
  // methods: {
  //   handleInput(e) {
  //     this.$emit('input', e)
  //   },
  //   handleChange(e) {
  //     this.$emit('change', e)
  //   }
  // },
}
</script>

