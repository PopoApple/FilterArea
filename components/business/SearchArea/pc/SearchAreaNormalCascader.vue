<template>
  <div
    class="SearchAreaNormalCascader float-wrap"
    :class="{'SearchAreaPriceRange-styleType2': styleType === 2}"
  >
    <div class="left input-wrap float-wrap">
      <Cascader
        :options="options"
        :props="cascaderProps"
        clearable
        size="small"
        v-model="value"
        @change="handleChange"
      />
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      options: Array,
      initVal: String,
      styleType: Number,
      cascaderProps: Object
    },
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
    }
  }
</script>



<style lang="scss">
.SearchAreaNormalCascader {
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