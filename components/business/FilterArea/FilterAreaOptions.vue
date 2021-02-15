<template>
  <div class="FilterAreaOptions" :class="{'FilterAreaOptions-1': styleType !== 2, 'FilterAreaOptions-2': styleType === 2}">
    <div class="option" v-for="opt in dict" :key="opt.value">
      <span :class="{active: opt.isActive}">
        <span v-if="!opt.route || isBtn" :class="{isBtn}" @click="opt.route && isBtn ? $router.push(opt.route) : null">{{opt.label}}</span>
        <nuxt-link v-else :to="opt.route">{{opt.label}}</nuxt-link>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    dict: Array,
    styleType: Number,
    isBtn: Boolean,
  },
}
</script>
<style lang="scss">
.FilterAreaOptions {
  .option {
    display: inline-block;
    padding: 0 20px;
    .isBtn {
      cursor: pointer;
    }
  }
  &.FilterAreaOptions-1 {
    .option {
      .active {
        color: $colorGreen;
        a {
          color: $colorGreen;
        }
      }
    }
  }
  &.FilterAreaOptions-2 {
    .option {
      .active {
        color: #fff;
        background: $colorGreen;
        padding: 9px 20px;
        border-radius: $borderRadius;
        a {
          color: #fff;
        }
      }
    }
  }
}
</style>