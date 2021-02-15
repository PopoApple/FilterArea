<template>
  <footer>
    <div class="footer">
      <div class="footer-desc">
       
      </div>
      <div v-if="$isMobile" class="moblie-footer">
        
      </div>
    </div>
  </footer>
</template>

<script>

</script>
<style lang="scss" scoped>
  .footer {
    border-top: 2px $borderColorDark solid;
    background-image: url(~static/img/pc/footer.png);
    box-shadow:$shadow
  }

  .footer a:hover {
    color: $colorGreen;
  }

  .footer-desc {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 1220px;
    margin: 0 auto;
  }

  .cs-title {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
  }

  .cs-phone {
    color: #fff;
    font-size: 24px;
    font-weight: 500;
    line-height: 33px;
    margin-top: 8px;
  }

  .footer-more {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer-more li:not(:last-child)::after {
    content: '|';
    margin: 0 13px;
  }

  .footer-more-end {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer-more-end a {
    font-size: $fontSizeS;
    color: $fontColorXLight;
  }

  .footer-more-end li:not(:last-child)::after {
    content: '|';
    margin: 0 13px;
    color: $fontColorXLight;
  }

  .footer-more-second {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer-more-second a {
    font-size: $fontSizeS;
    color: $fontColor;
  }

  .footer-more a{
    font-size: $fontSizeS;
    color: $fontColorXLight;
  }
  .footer-more-second li:not(:last-child)::after {
    content: ' ';
    margin: 0 8px;
  }

  .footer-msg-start{
    font-size: $fontSizeS;
    padding-right: 15px;
    font-weight: 501;
  }
  .footer-first {
    display: flex;
    align-items: center;
    padding-bottom: 29px;
    border-bottom: 1px $borderColor solid;
    width: 100%;
    margin-top: 22px;
  }

  .footer-first span {
    font-size: $fontSizeL;
    font-weight: 600;
  }

  .footer-second {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 99%;
    margin-top: 10px;
  }

  .footer-second a {
    font-size: $fontSizeS;
    color: $fontColorDark;
    font-weight: 501;
  }

  .footer-third {
    display: flex;
    justify-content: start;
    align-items: center;
    padding-bottom: 10PX;
    width: 99%;
  }

  .footer-third a {
    font-size: $fontSizeS;
    color: $fontColorXLight;
  }

  .footer-fourth {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 99%;
    padding-bottom: 30px;
   
  }


  .RootIsMobile {
    .footer {
      width: auto;
      background-image: url(~static/img/m/footer_moblie.png);
      border-top: 0;
      box-shadow: 0 0px 0px #ccc;
    }
    
    .footer-desc{
      width: auto;
    }

    .footer-first {
      width: 95%;
      margin-top: 11px;
      display: flex;
      justify-content: center;
      border-bottom:  1px  $borderColorGray solid;
    }

    .footer-first span {
      font-size: $fontSize;
      font-weight: 501;
    }

    .footer-first img{
      width: 200px;
    }

    .footer-second{
      width: 95%;
      justify-content: center;
      margin-top: 35px;
      border-bottom:  1px  $borderColorGray solid;
      padding-bottom: 35px;
    }

    .moblie-footer{
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction:column
    }
    .more {
      display: flex;
      width: 80%;
      margin-top: 35px;
      align-items: center;
      justify-content: space-between;
    }

    .more li a {
      font-weight: 400;
      font-size: $fontSizeS;
    }
    .item {
      margin-top: 35px;
      padding-bottom: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $fontSizeS;
      color: $fontColorXLight;
    }
    .item a{
       color: $fontColorXLight;
    }
  }
</style>
