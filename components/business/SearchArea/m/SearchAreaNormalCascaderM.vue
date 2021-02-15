<template>
  <div class="SearchAreaNormalCascaderM">
    <Cascader
      :key="refresh"
      :options="options"
      :props="cascaderProps"
      clearable
      size="small"
      v-model="value"
      @change="handleChange"
      :type="2"
    />
  </div>
</template>


<script>
  import { pxtorem } from '~/utils'
  export default {
    props: {
      options: Array,
      initVal: String,
      styleType: Number,
      cascaderProps: Object
    },
    computed: {},
    data() {
      return {
        value: this.initVal,
        refresh: 0
      }
    },
    methods: {
      handleSelect() {
        this.value = []
      },
      handleChange(e) {
        this.$emit('queryChange', e)
      }
    },
    watch: {
      // 给级联选择器添加key，在切换招采中数据来源时候，才不会保留原来的数据
      options: {
        handler(newVal) {
          ++this.refresh
        }
      }
    }
  }
</script>



<style lang="scss">
.SearchAreaNormalCascaderM {
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