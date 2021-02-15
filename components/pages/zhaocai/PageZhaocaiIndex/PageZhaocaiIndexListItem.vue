<template>
  <li class="PageZhaocaiIndexListItem">
    <nuxt-link :to="`/zhaocai/${data.id}`" class="bidding-project">
      <div class="list-left">
        <div class="opening-time">
          <div class="month-day">{{monthAndDay(data.publishTime)}}</div>
          <div class="year">{{year(data.publishTime)}}</div>
        </div>
      </div>
      <div class="list-middle">
        <div class="bidding-title ellipsis "><span v-html="data.bidTitle"></span></div>
        <div class="biding-msg">
          <div><span>省份：</span><span v-html="data.region"></span></div>
          <div class="source-platform ellipsis"><span>来源平台：</span><span v-html="data.sourcePlatform"></span></div>
          <div><span>业务类型：</span><span v-html="data.bidBusiness"></span></div>
          <div><span>信息类型：</span><span v-html="data.bidBusinessType"></span></div>
          <div><span>行业：</span> <span v-html="data.trade"></span></div>
        </div>
      </div>
      <div class="info-type"><span v-html="data.bidBusiness"></span></div>
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
.PageZhaocaiIndexListItem {
  border: 1px solid $borderColorLight;
  padding: 20px 30px;
}

.PageZhaocaiIndexListItem + .PageZhaocaiIndexListItem {
  margin-top: 10px;
}
.bidding-project {
  display: flex;
  align-items: center;
  height: 44px;
  .list-left {
    position: relative;
    width: 86px;
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 1px;
      height: 40px;
      background-color: #F0F3EF;
    }
    .opening-time {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 50px;
      text-align: center;
      .month-day {
        font-size: $fontSizeXL;
        color: $fontColor;
      }
      .year {
        font-size: $fontSize;
        color: $fontColorLight;
      }
    }
  }
  .list-middle {
    margin: 0 auto 0 30px;
    .bidding-title {
      // 配合.ellipsis  标题过长时隐藏
      max-width: 880px;
      width: 80vw;
      margin-bottom: 6px;
      font-size: $fontSizeL;
      font-weight: bold;
      color: $fontColor;
      &:hover {
        color: $colorGreen;
      }
    }
    .biding-msg{
      display: flex;
      font-size: $fontSize;
      color: $colorGreen;
      div {
        margin-right: 20px;
        span {
          color: $fontColorLight;
        }
      }
      .source-platform {
        max-width: 300px;
      }
    }
  }
  .info-type {
    width: 90px;
    height: 32px;
    text-align: center;
    color: $colorGreen;
    font-weight: bold;
    line-height: 32px;
    background-color: $bgColorGray;
    border-radius: $borderRadius;
  }
}
</style>

