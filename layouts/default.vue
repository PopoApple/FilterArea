<template>
  <div class="app-container">
    <div class="gxn-container">
      <Header />
      <div class="body-container">
        <div class="main-container">
          <Breadcrumb v-if="$route.path !== '/' && $route.path !== '/m/' && $route.path !== '/material/'  && $route.path !== '/m/material/'" />
        </div>
        <div class="page-container" :class="{'main-container': pageHasMainContainer}">
          <Nuxt />
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      pageHasMainContainer() {
        let path = this.$nuxt.$route.path
        if (path === '/aPicture/') {
          return false
        }
        return true
      }
    }
  }
</script>


