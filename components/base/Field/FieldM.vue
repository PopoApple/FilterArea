<template>
  <div class="FieldM" @click="handleClick">
    <div class="field-label" :style="{ width: $pxtorem(labelWidth) }">
      {{ label }}
    </div>
    <div class="field-content">
      <slot />
    </div>
    <i class="el-icon-arrow-right field-icon"></i>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    labelWidth: {
      type: Number,
      default: 128,
    },
  },
  methods: {
    handleClick() {
      this.$slots.default[0].elm.click()
    }
  },
}
</script>

<style lang="scss">
.FieldM {
  line-height: 74px;
  padding: 0 30px;
  display: flex;
  &:active {
    background: $bgColorGray;
  }
  .field-label {
    padding-left: 20px;
  }
  .field-content {
    flex: 1;
  }
  .field-icon {
    width: 20px;
    text-align: right;
    line-height: 74px;
  }
}
.FieldM + .FieldM {
  border-top: 1px solid $borderColor;
}
</style>
