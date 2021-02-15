<template>
  <li class="PageMaterialMerchantListItemM">
    <nuxt-link
      :to="{
        name: 'material-merchant-merchantDetail-id',
        params: { id: data.id},
      }"
    >
      <!-- <div class="col col-img bg-img" :style="{ backgroundImage: `url(${data.logoUrl})` }" /> -->
      <CcImage
        class="col col-img left bg-img"
        :src="data?data.logoUrl?data.logoUrl+SP147X100:'':''"
        :width="208"
        :height="142"
        :alt="data?data.merchantName?data.merchantName:'':''"
        :title="data?data.merchantName?data.merchantName:'':''"
      ></CcImage>
      <div class="col col-info">
        <div class="line line-title">
          <div class="name-type">
            <div class="name ellipsis">{{ data.merchantName }}</div>
          </div>
          <div class="name-icon">
            <i
              v-if="data.merchantAuthFlag"
              class="iconimg i-shangjiarenzheng-round small"
              title="商家认证"
            />
            <i v-if="data.popularShopFlag" class="iconimg i-renqishangpu-round small" title="人气商铺" />
            <i v-if="data.realFlag" class="iconimg i-shidirenzheng-round small" title="实地认证" />
          </div>
        </div>
        <div
          class="line line-base ellipsis"
        >{{data.merchantIntro?'商家简介：':'&nbsp;'}}{{ data.merchantIntro }}</div>
        <div class="line-footer">
          <div class="line-end line-area ellipsis">主营：{{ data.mainProductIntro }}</div>
          <div class="line-end line-area ellipsis">区域：{{ data.region }}</div>
        </div>
      </div>
    </nuxt-link>
  </li>
</template>

<script>

  export default {
    props: {
      data: Object
    },
    data() {
      return {
        SP147X100: '',
      }
    }
  }
</script>

<style lang="scss" >
.PageMaterialMerchantListItemM {
  a {
    display: flex;
    padding: 30px 30px;
    &:active {
      background: $bgColorGray;
      color: initial;
    }
  }
  .col-img {
    width: 208px;
    height: 142px;
    min-width: 208px;
    border-radius: $borderRadius;
  }
  .col-info {
    width: 460px;
    margin-left: 15px;
  }
  .line-title {
    display: flex;
  }
  .name-type {
    width: 330px;
  }
  .name {
    max-width: 280px;
    color: $fontColorDark;
    display: inline-block;
    vertical-align: middle;
  }
  .type {
    background: $bgColorGray;
    border-radius: $borderRadius;
    color: $fontColorDark;
    padding: 3px 10px;
    display: inline-block;
    font-size: $fontSizeS;
    vertical-align: middle;
  }
  .name-icon {
    text-align: right;
    width: 180px;
    margin-left: 15px;
  }
  .line-base {
    color: $fontColorXLight;
  }
  .line-area {
    color: $fontColorXLight;
    font-size: $fontSizeS;
  }

  .line-img{
    margin-left: 5px;
    width: 30px;
    height: 30px;
  }
  .line-footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .line-end{
    width: 210px;
  }
}
</style>
