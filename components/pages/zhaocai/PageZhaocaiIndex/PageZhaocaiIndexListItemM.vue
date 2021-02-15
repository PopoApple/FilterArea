<template>
  <li class="PageZhaocaiIndexListItemM">
    <nuxt-link :to="`/zhaocai/${data.id}`" class="bidding-project">
      <div class="list-left">
        <div class="opening-time">
          <div class="month-day">{{monthAndDay(data.publishTime)}}</div>
          <div class="year">{{year(data.publishTime)}}</div>
        </div>
      </div>
      <div class="list-right">
        <div class="bidding-title ellipsis2 "><span v-html="data.bidTitle"></span></div>
        <div class="biding-msg">
          <div class="bidding-place">省份:<span v-html="data.region"></span></div>
          <div class="info-type"<span v-html="data.bidBusiness"></span></div>
        </div>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
 export default {
  props: {
    data: Object,
  },
  data() {
    return {
    }
  },
  methods: {
    // 校验传入的时间格式是否为yyyy-mm-dd
    IsDate(date) {  
      var reg = /^(\d{4})-(\d{2})-(\d{2})$/  
      if (date=="") return false
      if (!reg.test(date)) {
        // console.log('传入时间格式错误！')
        return false;
      }
      return true;
    },
    monthAndDay(date) {
      return this.IsDate(date) ? date.slice(5) : ''
    },
    year(date) {
      return this.IsDate(date) ? date.slice(0, 4) : ''
    }
  },
}
</script>

<style lang="scss" scoped>
.RootIsMobile {
  .bidding-project {
    display: flex;
    align-items: center;
    height: 130px;
    margin-top: 20px;
    padding: 20px 30px;
    background-color: $colorWhite;
  }
  .list-left {
    position: relative;
    width: 120px;
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 2px;
      height: 100px;
      background-color: #F0F3EF;
    }
    .opening-time {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: center;
      .month-day {
        font-size: $fontSizeXL;
        color: $fontColor;
      }
      .year {
        margin-top: 12px;
        font-size: $fontSize;
        color: $fontColorLight;
      }
    }
  }
  .list-right {
    width: 540px;
    margin-left: 30px;
    .bidding-title {
      font-size: $fontSize;
      font-weight: bold;
      color: $fontColorDark;
    }
    .biding-msg {
      display: flex;
      justify-content: space-between;
      margin-top: 6px;
      font-size: $fontSize;
      color: $fontColorXLight;
      .info-type {
        padding: 0 10px;
        color: $colorGreen;
        font-weight: bold;
        background-color: $bgColorGray;
        border-radius: $borderRadius;
      }
    }
  }
}
</style>