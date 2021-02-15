<template>
  <div :class="{'SearchAreaPriceRange-styleType2': styleType === 2}">
    <div class="left input-wrap float-wrap">
      <!-- :key是特别加的，如果去掉，当省平台，比如说江西赣州赣州市公共交易中心，然后切到央企招标平台，就报level错误 -->
      <Cascader
        :key="refresh"
        :options="options"
        :props="{ checkStrictly: true, 'value': valueName, 'label': labelName, emitPath: false }"
        clearable
        size="small"
        v-model="value"
        @change="handleChange"
        @cascaderlabel ='handleCascaderLabel'
      />
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      options: Array,
      initVal: String,
      styleType: Number
    },
    created() {
      this.value = this.initVal
    },
    data() {
      return {
        value: '',
        valueName: 'id',
        labelName: 'regionName',
        refresh: 0
      }
    },
    methods: {
      handleChange(e) {
        this.$emit('queryChange', e)
      },
      handleCascaderLabel(e) {
        // 已经可以获取到label值了，但是可能存在  handleChange 和 handleCascaderLabel  因为没有没有先后顺序产生的冲突
        // console.log({ label: e, value: this.value })
      }
    },
    watch: {
      options: {
        handler() {
          ++this.refresh
        }
      },
      initVal: {
        handler(newVal) {
          if(newVal === null) { this.value = ''}
        }
      }
    }
  }
</script>



<style lang="scss">
.SearchAreaPriceRange-styleType2 {
  .input-wrap {
    margin-left: 20px;
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