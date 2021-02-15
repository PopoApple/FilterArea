<template>
  <PageProvideIndex :data="data" />
</template>

<script>
  import asyncData from '~/components/pages/provide/PageProvideIndex/asyncData'

  export default {
    asyncData(ctx) {
      return asyncData(ctx).then((data) => {
        return { data }
      })
    },
    watchQuery: true,
  }
</script>