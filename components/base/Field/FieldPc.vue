<template>
  <div class="FieldPc" :class="`FieldPc-${styleType}`">
    <div class="field-label" :style="{ width: $pxtorem(labelWidth) }">
      {{ label }}
    </div>
    <div class="field-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    styleType: {  //样式：1|2
      type: Number,
      default: 1,
    },
    label: String,
    labelWidth: {
      type: Number,
      default: 128,
    },
  },
}
</script>

<style lang="scss">
.FieldPc {
  line-height: 48px;
  display: flex;
  .field-label {
    padding-left: 32px;
  }
  .field-content {
    flex: 1;
  }

  
  &.FieldPc-1 {
    .field-label {
      background: $bgColorGray;
    }
  }

  &.FieldPc-2 {
    background: $bgColorGray;
  }
  &.FieldPc-2 + &.FieldPc-2 {
    border-top: 1px dashed $borderColor; 
  }

}
</style>
