<template>
  <li class="PageMaterialMerchantListItem float-wrap">
    <nuxt-link
      class="col col-img left bg-img"
      :to="{
            name: 'material-merchant-merchantDetail-id',
            params: { id: data.id },
          }"
    >
      <CcImage
        :src="data?data.logoUrl?data.logoUrl+SP147X100:'':''"
        :width="147"
        :height="100"
        :alt="data?data.merchantName?data.merchantName:'':''"
        :title="data?data.merchantName?data.merchantName:'':''"
      ></CcImage>
    </nuxt-link>
    <div class="col col-info left">
      <div class="line-name">
        <nuxt-link
          :title="data.merchantName"
          class="line-link ellipsis"
          :to="{
            name: 'material-merchant-merchantDetail-id',
            params: { id: data.id },
          }"
        >{{ data.merchantName }}</nuxt-link>&nbsp;&nbsp;
        <i
          v-if="data.merchantAuthFlag"
          class="iconimg i-shangjiarenzheng-round"
          title="商家认证"
        />
        <i v-if="data.popularShopFlag" class="iconimg i-renqishangpu-round" title="人气商铺" />
        <i v-if="data.realFlag" class="iconimg i-shidirenzheng-round" title="实地认证" />
      </div>
      <div
        class="ellipsis2 merchant-intro"
      >{{data.merchantIntro?'商家简介：':''}}{{ data.merchantIntro }}</div>
    </div>
    <div class="col col-area">
      <div
        class="line line-info ellipsis"
        :title="data.mainProductIntro"
      >主营产品：{{ data.mainProductIntro }}</div>
      <div>|</div>
      <div class="line line-info ellipsis" :title="data.region">所在区域：{{ data.region }}</div>
    </div>
  </li>
</template>

<script>

  export default {
    props: {
      data: Object
    },
    data() {
      return {
        SP147X100: ''
      }
    }
  }
</script>

<style lang="scss" >
.PageMaterialMerchantListItem {
  box-sizing: border-box;
  padding: 30px 20px;
  .col {
    height: 100px;
    line-height: 100px;
  }
  .col + .col {
    margin-left: 45px;
  }
  border-bottom: 1px dashed $borderColorLight;
  .col-img {
    width: 147px;
    border-radius: $borderRadius;
  }
  .col-info.col {
    width: 414px;
    line-height: 34px;
    .line-name {
      display: flex;
      justify-content: left;
      align-items: center;
      a {
        font-size: $fontSizeOdd;
        font-weight: bold;
      }
    }
  }
  .col-area {
    float:right;
    margin-right: 45px;
    width: 424px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .line{
    width:200px;
  }
  .line-img{
    margin-left: 10px;
    width: 30px;
    height: 30px;
  }
  .line-link {
    max-width: 288px;
  }
  .merchant-intro{
    word-break: break-all;
  }
}
</style>
