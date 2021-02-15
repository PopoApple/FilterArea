<template>
  <div class="CascaderMBack" :class="{'CascaderMBack-pop-show': valueCascaderPopup}">
    <div class="field-wrap">
      <div class="field-mask" @click="onSelectClick"></div>
      <i class="el-icon-arrow-down"></i>
      <Input v-model="valueLabel" :placeholder="placeholder"></Input>
    </div>
    <van-popup v-model="valueCascaderPopup" round position="bottom">
      <van-picker
        show-toolbar
        :columns="options"
        :value-key="labelKey"
        @cancel="valueCascaderPopup = false"
        @confirm="onCascaderPopupConfirm"
      >
        <div slot="title" @click="handleClear">清除</div>
      </van-picker>
    </van-popup>
  </div>
</template>

<script>
  import { Popup, Picker } from 'vant'

  export default {
    components: {
      VanPopup: Popup,
      VanPicker: Picker
    },
    props: {
      options: Array,
      props: Object,
      value: String | Number,
      placeholder: String,
      initializeValue: String
    },
    computed: {
      valueKey() {
        return this.props && this.props.value ? this.props.value : 'value'
      },
      labelKey() {
        return this.props && this.props.label ? this.props.label : 'label'
      }
    },
    data() {
      return {
        valueCascaderPopup: false,
        valueLabel: ''
      }
    },
    watch: {
      value: {
        handler(val) {
          if (val && val.length > 0 && this.options) {
            let values = [...val]
            let labels = []
            const pushLabel = options => {
              let i = values.shift()
              let opt = options.find(d => d[this.valueKey] === i)
              labels.push(opt[this.labelKey])
              if (values.length > 0) {
                pushLabel(opt.children)
              }
            }
            pushLabel(this.options)
            this.valueLabel = labels.join('/')
          } else {
            this.valueLabel = ''
          }
        },
        immediate: true
      }
    },
    methods: {
      onCascaderPopupConfirm(value, index) {
        const pushValue = options => {
          let i = index.shift()
          let opt = options[i]
          values.push(opt[this.valueKey])
          if (index.length > 0) {
            pushValue(opt.children)
          }
        }
        let values = []
        if (index.length > 0) {
          pushValue(this.options)
        }
        this.$emit('input', values)
        this.valueCascaderPopup = false
      },
      onSelectClick() {
        this.valueCascaderPopup = true
      },
      handleClear() {
        this.$emit('input', null)
        this.valueCascaderPopup = false
      }
    }
  }
</script>

<style lang="scss" scoped>
.CascaderMBack {
  .field-wrap {
    position: relative;
    i {
      position: absolute;
      right: 10px;
      top: 26px;
      z-index: 1;
      color: $fontColorXLight;
      transition: transform 0.3s;
    }
  }
  &.CascaderMBack-pop-show {
    .field-wrap i {
      transform: rotate(180deg);
    }
  }
  .field-mask {
    position: absolute; left: 0; top: 0; right: 0; bottom: 0; cursor: pointer; z-index: 1;
  }
}
</style>