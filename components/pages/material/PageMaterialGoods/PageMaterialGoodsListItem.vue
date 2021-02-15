<template>
  <li class="PageMaterialGoodsListItem float-wrap">
    <div>{{ data.id }}</div>
    <div>{{ JSON.stringify(data.query) }}</div>
  </li>
</template>

<script>
  export default {
    props: {
      data: Object
    },
  }
</script>

<style lang="scss">
.PageMaterialGoodsListItem {
  box-sizing: border-box;
  padding: 30px 20px;
  .col {
    height: 100px;
    line-height: 100px;
  }
  .col + .col {
    margin-left: 30px;
  }
  border-bottom: 1px dashed $borderColorLight;
  .col-img {
    width: 147px;
    border-radius: $borderRadius;
  }
  .col-info.col {
    margin-left: 20px;
    width: 370px;
    line-height: 34px;
    .line-name {
      a {
        font-size: $fontSizeOdd;
        font-weight: bold;
      }
    }
  }
  .col-area {
    width: 370px;
  }
  .col-price {
    width: 160px;
    font-size: $fontSize2XL;
    color: $colorGreen;
  }
}
</style>
