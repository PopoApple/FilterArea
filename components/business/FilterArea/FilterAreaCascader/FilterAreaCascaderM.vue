<template>
  <div class="FilterAreaCascaderM" @click.stop="handleClick">
    <CascaderM
      :key="refresh"
      :options="dict"
      :props="props"
      clearable
      size="small"
      v-model="value"
      @change="handleChange"
      @finish="handleFinish"
      :type="2"
      placeholder="不限"
      ref="cascader"
    />
  </div>
</template>


<script>
  import { pxtorem } from '~/utils'
  export default {
    props: {
      dict: Array,
      initVal: String,
      props: Object
    },
    computed: {},
    data() {
      return {
        value: this.initVal,
        refresh: 0
      }
    },
    methods: {
      handleClick() {
        this.$refs.cascader.onSelectClick()
      },
      handleSelect() {
        this.value = []
      },
      handleChange(e, selectedOptions) {
        this.$emit('queryChange', e,)
      },
      handleFinish(e, selectedOptions) {
        // console.log(111, e, selectedOptions)
        // if (e) {
        //   this.$router.push(selectedOptions.pop().route)
        // }
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
.FilterAreaCascaderM {
  // .field-wrap {
  //   position: relative;
  //   display: flex;
  //   .value-text {
  //     flex: 1;
  //     text-align: center;
  //     color: $fontColorXLight;
  //   }
    .CascaderM .field-wrap .value-text {
      display: block;
      width: 100%;
      text-align: left;
      padding: 0 15px;
    }
    i.el-icon-arrow-right{
      display: none;
    }
  // }
}
</style>