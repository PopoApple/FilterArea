<template>
  <div class="wrap">
    <nuxt-child />
  </div>
</template>

<script>
const hideNavList = [
  '/material/goods/goodsDetail/',
  '/material/merchant/merchantDetail/',
  '/m/material/goods/goodsDetail/',
  '/m/material/merchant/merchantDetail/'
]

export default {
  computed: {
    showNav () {
      return !hideNavList.some(d => {
        return this.$route.path.indexOf(d) >= 0
      })
    },
  },
}
</script>

<style scoped>
.wrap {
  position: relative;
}
</style>
