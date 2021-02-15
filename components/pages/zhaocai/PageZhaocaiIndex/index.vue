<template>
  <div class="PageZhaocaiIndex">
    <div class="search-area">
      <SearchArea :fields="searchAreaFields" :labelWidth="120" :styleType="2" />
      <!-- <PageZhaocaiIndexSearch/> -->
    </div>
    <div class="search-bar float-wrap">
      <div class="right search-input">
        <SearchInput v-model="data.keyWordValue" type="mini" @search="handleQueryChange('keyWord', data.keyWordValue)" />
      </div>
      <div class="left sort-button">
        <SortButton v-model="data.sortBtnTimeValue" @input="handleQueryChange('timeSort', data.sortBtnTimeValue)">招采时间</SortButton>
      </div>
    </div>
    <div class="list" v-if="data.zhaocaiList.length">
      <ul class="list-item-wrap">
        <template v-if="!$isMobile"><PageZhaocaiIndexListItem v-for="item in data.zhaocaiList" :key="item.id" :data="item" /></template>
        <template v-if="$isMobile"><PageZhaocaiIndexListItemM v-for="item in data.zhaocaiList" :key="item.id" :data="item" /></template>
      </ul>
      <div class="pagination" v-if="!$isMobile">
        <Pagination :total="data.total"  v-if="totalPage > 1"/>
      </div>
      <div class="LayoutLeftMain-loadMore" v-if="$isMobile && totalPage > 1" >
        <ScrollBottomLoadMore class="loadMore" :totalpage="totalPage" :loading="mListLoading" :transparentBg="true" @update="handleScrollBottomLoadMore" />
      </div>
    </div>
    <div class="empty" v-else>
      <Empty centerMiddle waringText="暂无数据!" />
    </div>
  </div>
</template>

<script>

  import { timeDict, dataSource, handleDataSource, handleAreaSource, handleBusiness, handleBusinessTypes, handleInformationTypes } from './dicts'
  import { getZhaocaiList, getCentralJsonData, getProvinceJsonData } from '~/api/zhaocai'

  import { handleJsonDataBeta } from './util'


  export default {

    props: {
      data: Object,
    },
    data() {
      return {
        mListPage: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        mListLoading: false,
      }
    },
    computed: {
      searchAreaFields() {
        let province = this.$store.state.data.provincePlatform
        let central = this.$store.state.data.centralPlatform
        let bidDict = handleJsonDataBeta( this.$route.query, province, central)
        let fields= [
          // 发布时间，数据来源，交易来源，业务类型，信息类型，行业
          { id: 'rangeOfDate', label: '发布时间', dict: bidDict.timeDict, iconClass: 'iconimg i-diqu', dictDefault: 'no' },
          { id: 'sourceType', label: '数据来源', dict: bidDict.dataSource, iconClass: 'iconimg i-diqu', dictDefault: 'no' },
          { id: 'sourcePlatformId', label: '交易来源', dict: bidDict.sourcePlatformDict, iconClass: 'iconimg i-diqu', type: 'newAreaCascader', dictDefault: 'no' },
          { id: 'businessId', label: '业务类型', dict: bidDict.businessDict, iconClass: 'iconimg i-diqu', dictDefault: 'no' },
          { id: 'businessTypeId', label: '信息类型', dict: bidDict.businessTypeDict, iconClass: 'iconimg i-diqu', dictDefault: 'no' },
        ]
        if (!!bidDict.tradeDict.length) { fields.push({ id: 'tradeCode', label: '行业', dict: bidDict.tradeDict, iconClass: 'iconimg i-diqu', dictDefault: 'no' })}
        return fields
      },
      totalPage() {
      return !!this.data.total ? Math.ceil(this.data.total / 10) : 0
      }
    },
    methods: {
      handleQueryChange(key, val) {
        this.$router.push({
          ...this.$route,
          query: { ...this.$route.query, [key]: val || undefined, page: undefined },
        })
      },
      // 无限下拉
      handleScrollBottomLoadMore() {
      if (this.mListLoading || this.mListPage >= this.totalPage) {
          return
        }
      this.mListLoading = true
      let page = this.mListPage + 1
      getZhaocaiList(this.$axiosClient, { ...this.$route.query, page: page})
        .then(
          res => {
            this.mListLoading = false
            if (res.code === 200) {
              this.data.zhaocaiList = [...this.data.zhaocaiList, ...res.data.list]
              this.mListPage = this.mListPage + 1
            }
          },
          e => {
            this.mListLoading = false
          }
        )
        .catch(e => {
          this.mListLoading = false
        })
    },
    },
  }
</script>

<style lang="scss">
.PageZhaocaiIndex {
  .search-bar {
    padding: 20px 0;
  }
  .pagination {
    padding: 30px 0;
  }
}
.empty {
    position:relative;
    margin: 15px 0;
    height: 400px;
    background-color: $colorWhite;
}

.RootIsMobile {
  .search-area {
    margin-top: 20px;
    background-color: $colorWhite;
  }
  .search-bar {
    height: 160px;
    padding: 0;
    background-color: $colorWhite;
    border-top: 1px solid $borderColor;
    .search-input {
      float: none;
      display: flex;
      align-items: center;
      height: 80px;
      padding-left: 60px;
      border-bottom: 1px solid #DDDDDD;
      input {
        width: 80vw;
        height: 24PX;
        border: 1px solid #999999;
        border-right: transparent;
        &:focus {
          border: 1px solid #999999;
          border-right: transparent;
        }
      }
      & /deep/ .el-input-group__append {
        border: 1px solid #999999;
      }
    }
    .sort-button{
      display: flex;
      align-items: center;
      height: 80px;
      padding-left: 30px;
    }
  }
}
</style>
