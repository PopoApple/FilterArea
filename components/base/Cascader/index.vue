<template>
  <component
    :is="comp"
    :options="options"
    :props="props"
    :value="value"
    :placeholder="placeholder"
    :size="size"
    :clearable="clearable"
    :initializeValue="initializeValue"
    :type="type"
    style="width: 100%"
    @input="handleInput"
    @change="handleChange"
    ref = 'basecascader'
  />
</template>

<script>
  import CascaderM from '~/components/base/Cascader/CascaderM'
  import CascaderPc from '~/components/base/Cascader/CascaderPc'

  export default {
    props: {
      options: Array,
      props: Object,
      value: String | Number,
      placeholder: String,
      size: String,
      clearable: Boolean,
      initializeValue: {
        type: String,
        default: ''
      },
      type: {
        type: Number,
        default: 0
      }
    },
    computed: {
      comp() {
        return this.$isMobile ? CascaderM : CascaderPc
      }
    },
    methods: {
      handleInput(e) {
        this.$emit('input', e)
      },
      handleChange(e) {
        if(!this.$isMobile && !!e) {
          // 只有这个组件使用ref才能调用element ui中getCheckedNodes方法， 才能获取到他的整的label，再外层就拿不到了。输出结果：江西省/赣州市/赣州公共资源交易平台
          // 如果值为null，会报错。该情况在清空选项时发生，所以判断e 是否为空
          this.$emit('cascaderlabel', this.$refs.basecascader.getCheckedNodes()[0].pathLabels.join('/'))
        }
        this.$emit('change', e)
      }
    }
  }
</script>

