<template>
  <div class="SearchAreaSelect" :class="{'SearchAreaSelect-styleType1': styleType !== 2, 'SearchAreaSelect-styleType2': styleType === 2}">
    <div class="option" v-for="opt in dict" :key="opt.value">
      <span :class="{active: opt.isActive}" @click="opt.isLink ? $emit('select', opt) : null">
        <span v-if="!opt.isLink">{{opt.label}}</span>
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
  },
}
</script>
<style lang="scss">
.SearchAreaSelect {
  .option {
    display: inline-block;
    padding: 0 20px;
  }
  &.SearchAreaSelect-styleType1 {
    .option {
      .active {
        color: $colorGreen;
        a {
          color: $colorGreen;
        }
      }
    }
  }
  &.SearchAreaSelect-styleType2 {
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