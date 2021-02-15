<template>
  <div class="FilterAreaSelectM" @click.stop="handleClick">
    <SelectM :dict="dict" :value="value" placeholder="不限" :clearable="clearable" @input="handleInput" ref="select" />
  </div>
</template>

<script>

export default {
  props: {
    dict: Array,
    clearable: Boolean,
  },
  computed: {
    value() {
      let activeOpt = this.dict ? this.dict.find(d => d.isActive) : null
      return activeOpt ? activeOpt.value : null
    },
  },
  methods: {
    handleClick() {
      this.$refs.select.onSelectClick()
    },
    handleInput(value, opt) {
      opt.route && this.$router.push(opt.route)
    }
  },
}
</script>
<style lang="scss">
.FilterAreaSelectM {
  .el-icon-arrow-down {
    display: none;
  }
  .el-input__inner {
    border: none;
    background: transparent;
  }
}
</style>
