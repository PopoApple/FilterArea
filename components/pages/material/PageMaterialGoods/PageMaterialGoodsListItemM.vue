<template>
  <li class="PageMaterialGoodsListItemM">
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
.PageMaterialGoodsListItemM {
  a {
    display: flex;
    padding: 10px 10px;
    margin-bottom: 10px;
    &:active {
      background: $bgColorGray;
      color: initial;
    }
  }
  .col-img {
    border-radius: $borderRadius;
  }
  .col-info {
    width: 420px;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 300px;
  }
  .name-type {
    width: 420px;
    height: 118px;
  }
  .name {
    max-width: 420px;
    color: $fontColorDark;
    font-size: $fontSizeXL;
  }
  .type {
    color: $fontColorLight;
    font-size: $fontSize;
  }
  .type span{
    background: $bgColorGray;
    border-radius: $borderRadius;
    padding: 3px 3px;
  }
  .price {
    color: $colorGreen;
    text-align: right;
    width: 420px;
    font-size: $fontSizeXL;
  }
  .line-base {
    color: $fontColorXLight;
    font-size: $fontSizeS;
  }
  .line-area {
    color: $fontColorXLight;
    font-size: $fontSize;
  }
}
</style>
