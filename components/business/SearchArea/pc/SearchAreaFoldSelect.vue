<template>
  <div class="SearchAreaFoldSelect" :class="{expand, 'SearchAreaFoldSelect-styleType2': styleType === 2}" >
    <div class="col-options" ref="colOptions">
      <div class="options-wrap" ref="optionsWrap">
        <SearchAreaSelect :dict="dict" :styleType="styleType" />
      </div>
    </div>
    <div v-if="hasExpandBtn" class="col-btn" @click="expand = !expand">
      <span>{{expand ? '收起' : '展开'}}</span>
      <i :class="`el-icon-arrow-${expand ? 'up' : 'down'}`" />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    dict: Array,
    styleType: Number,
  },
  data() {
    return {
      hasExpandBtn: false,
      expand: false
    }
  },
  mounted() {
    let { colOptions, optionsWrap } = this.$refs
    let colOptionsH = colOptions.offsetHeight
    let optionsWrapH = optionsWrap.offsetHeight
    this.hasExpandBtn = optionsWrapH > colOptionsH
  },
  // 适应字典项不断更新的情况
  updated() {
    let lineHeight = 48
    let { optionsWrap } = this.$refs
    let optionsWrapH = optionsWrap.offsetHeight
    this.hasExpandBtn = optionsWrapH > lineHeight
  },
  methods: {
    handleSelectInput(val) {
      this.$emit('input', val)
    }
  },
}
</script>
<style lang="scss">
.SearchAreaFoldSelect {
  display: flex;
  background: #fff;
  .col-options {
    flex: 1;
    height: 48px;
    overflow: hidden;
  }
  &.expand {
    .col-options {
      height: auto;
    }
  }
  .col-btn {
    color: $fontColorLight;
    cursor: pointer;
    width: 76px;
    // 添加文字不可被选中
    -moz-user-select:none;		/* 火狐 */
    -webkit-user-select:none;	/* 谷歌 */
    -ms-user-select:none;		/* IE */
    user-select:none;
  }
  &.SearchAreaFoldSelect-styleType2 {
    background: $bgColorGray;
  }
}
</style>
