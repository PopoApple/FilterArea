<template>
  <el-select :value="value" :placeholder="placeholder" :size="size" :clearable="clearable" @input="handleInput" @change="handleChange">
    <el-option
      v-for="item in dict"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import { Select, Option } from 'element-ui'

export default {
  components: {
    ElSelect: Select,
    ElOption: Option,
  },
  props: {
    dict: Array,
    value: String | Number,
    placeholder: String,
    size: String,
    clearable: Boolean,
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