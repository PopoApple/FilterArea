<template>
  <div class="CascaderM" :class="{'CascaderM-pop-show': valueCascaderPopup}">
    <div class="field-wrap">
      <div class="field-mask" @click="onSelectClick"></div>
      <i class="el-icon-arrow-down down" v-if="type === 0"></i>
      <Input v-model="valueLabel" :placeholder="placeholder" v-if="type === 0"></Input>
      <span
        class="value-text ellipsis"
        :style="{ width: textWidthRem }"
        v-if="type === 2"
      >{{valueLabel ? valueLabel : placeholder }}</span>
      <i class="el-icon-arrow-right right" v-if="type === 2"></i>
    </div>
    <van-popup v-model="valueCascaderPopup" round position="bottom" get-container="body">
      <van-cascader
        :options="options"
        :field-names="{text:labelKey,value:valueKey}"
        v-model="cascaderValue"
        @close="valueCascaderPopup = false"
        @finish="onCascaderPopupConfirm"
        @change="onCascaderChange"
      >
        <div slot="title" class="title-slot">
          <div @click="handleClear">清除</div>
          <div v-if="isCheckStrictly" @click="handleConfirm">确认</div>
        </div>
      </van-cascader>
    </van-popup>
  </div>
</template>

<script>
  import { Popup, Cascader } from 'vant'
  import { validatenull } from '@/utils/validate'
  import { pxtorem } from '~/utils'

  export default {
    components: {
      VanPopup: Popup,
      VanCascader: Cascader
    },
    props: {
      options: Array,
      props: Object,
      value: String | Number,
      placeholder: {
        type: String,
        default: '请选择',
      },
      initializeValue: String,
      type: Number
    },
    computed: {
      valueKey() {
        return this.props && this.props.value ? this.props.value : 'value'
      },
      labelKey() {
        return this.props && this.props.label ? this.props.label : 'label'
      },
      isCheckStrictly() {
        //是否选至最后一项
        return this.props && this.props.checkStrictly ? this.props.checkStrictly : false
      },
      textWidthRem() {
        return pxtorem(750 - this.labelWidth - 80)
      }
    },
    data() {
      return {
        valueCascaderPopup: false,
        valueLabel: '',
        cascaderValue: this.value || ''
      }
    },
    methods: {
      onCascaderPopupConfirm({ selectedOptions, value }) {
        this.$emit('input', value)
        this.valueCascaderPopup = false
        this.cascaderValue = value
        this.valueLabel = selectedOptions.map(option => option[this.labelKey]).join('/')
      },
      onSelectClick() {
        this.valueCascaderPopup = true
      },
      handleClear() {
        this.$emit('input', null)
        this.$emit('change', null)
        this.cascaderValue = null
        this.valueLabel = ''
        this.valueCascaderPopup = false
      },
      handleConfirm() {
        this.valueCascaderPopup = false
      },
      onCascaderChange(changeValue) {
        let { selectedOptions, value } = changeValue
        if (this.isCheckStrictly) {
          this.$emit('input', value)
          this.cascaderValue = value
          this.valueLabel = selectedOptions.map(option => option[this.labelKey]).join('/')
        }
        this.$emit('change', value)
      },
      changeLabelValue() {
        //定义初始值
        if (!this.valueLabel && this.value && !validatenull(this.options)) {
          this.cascaderValue = this.value

          const findPath = (leafId, nodes, path) => {
            path = path ? path : ''

            for (let i = 0; i < nodes.length; i++) {
              let tmpPath = path
              tmpPath = tmpPath + (tmpPath ? '/' : '') + nodes[i][this.labelKey]
              if (leafId == nodes[i][this.valueKey]) {
                return tmpPath
              }
              if (nodes[i].children) {
                let findResult = findPath(leafId, nodes[i].children, tmpPath)
                if (findResult) {
                  return findResult
                }
              }
            }
          }
          this.valueLabel = this.valueLabel
            ? this.valueLabel
            : this.initializeValue
            ? this.initializeValue
            : findPath(this.value, this.options)
        }
      }
    },
    watch: {
      options: {
        //防止options异步获取
        handler(val) {
          this.changeLabelValue()
        },
        immediate: true
      },
      value: {
        //防止value初始化时未赋值
        handler(val) {
          this.changeLabelValue()
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
.CascaderM {
  .title-slot{
    width: 360px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .field-wrap {
    position: relative;
    .value-text {
      flex: 1;
      // 设置宽度，移动端的内容太长，会超出屏幕，导致再次弹出的级联选项框很大
      width: 300px;
      text-align: center;
      color: $fontColorXLight;
    }
    .down {
      position: absolute;
      right: 10px;
      top: 26px;
      z-index: 1;
      color: $fontColorXLight;
      transition: transform 0.3s;
    }
    .right{
      width: 20px;
      text-align: right;
      line-height: 74px;
    }
  }
  &.CascaderM-pop-show {
    .field-wrap i {
      transform: rotate(180deg);
    }
  }
  .field-mask {
    position: absolute; left: 0; top: 0; right: 0; bottom: 0; cursor: pointer; z-index: 1;
  }
}
</style>