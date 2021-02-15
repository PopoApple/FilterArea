<template>
  <div class="box PageMaterialMerchant">
    <div class="search-area card">
      <SearchArea :fields="searchAreaFields" :labelWidth="$isMobile? 132 : 128" />
    </div>
    <div class="list card">
      <ul class="list-item-wrap" v-if="data.list.length > 0">
        <template v-if="$isMobile">
          <PageMaterialMerchantListItemM
            v-for="(item,index) in data.list"
            :key="index"
            :data="item"
          />
        </template>
        <template v-else>
          <PageMaterialMerchantListItem
            v-for="(item,index) in data.list"
            :key="index"
            :data="item"
          />
        </template>
      </ul>
      <div class="empty" v-else>
        <Empty centerMiddle waringText="暂无数据!" />
      </div>
      <div v-if="!$isMobile" class="pagination">
        <Pagination :total="data.total" :circleBtn="true" />
      </div>
      <ScrollBottomLoadMore
        v-if="$isMobile && data.total > 1"
        :totalpage="data.totalPages"
        :loading="mListLoading"
        @update="handleScrollBottomLoadMore"
      />
    </div>
  </div>
</template>

<script>
  import { formatPrice, flatten } from '~/utils'
  import { validatenull } from '@/utils/validate'
  import { apiListPage, apiGetfilter } from '~/api/material/materialMerchant'


  export default {

    props: {
      data: Object
    },
    created() {
      //查询条件不需要服务端渲染
      apiGetfilter(this.$axiosClient)
        .then(res => {
          if (!validatenull(res.data) && !validatenull(res.data.regionList)) {
            this.regionDict = res.data.regionList
            this.regionFlatten = flatten(res.data.regionList)
          }
          if (!validatenull(res.data) && !validatenull(res.data.productTypeList)) {
            this.productTypeDict = res.data.productTypeList
            this.productTypeFlatten = flatten(res.data.productTypeList)
          }
        })
        .catch(e => {
          this.$toast.fail(e.message || '查询条件获取失败!')
        })
    },
    data() {
      return {
        mListPage: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        mListLoading: false,
        productTypeDict: [],
        productTypeFlatten: [],
        regionDict: [],
        regionFlatten: [],
        chooseProductType: [],
        chooseRegion: []
      }
    },
    computed: {
      searchAreaFields() {
        //处理查询条件--只适用于3层级
        let productType = []
        let region = []
        if (!this.$isMobile) {
          if (!validatenull(this.$route.query.productTypeId)) {
            //存在上一级类别,寻找级别是否存在children
            let dictMain = {}
            dictMain.none = true
            this.productTypeFlatten.filter(item => {
              if (item.id === this.$route.query.productTypeId) {
                dictMain.value = item.id
                if (!validatenull(item.children)) {
                  if (!validatenull(this.chooseProductType)) {
                    //非正常进入，忽略返回到第一层的情况,只保留第一层级
                    this.chooseProductType = this.chooseProductType.filter(
                      item => item.parentId === '-1'
                    )
                  }
                  item.children.map(itemNew => {
                    let dict = {}
                    dict.value = itemNew.id
                    dict.label = itemNew.productTypeName
                    productType.push(dict)
                  })
                } else {
                  let parentId = item.parentId
                  if (parentId != '-1') {
                    //第三层，若chooseMap存在，则可从choosemap中获取父类项目,若直接外部点入或id输入，则不存在chooseMap
                    if (!validatenull(this.chooseProductType)) {
                      let chooseArray = [...this.chooseProductType]
                      //去除之前的child元素
                      this.chooseProductType = this.chooseProductType.filter(item => !item.isChild)
                      chooseArray.filter(itemNew => {
                        if (itemNew.id === parentId) {
                          itemNew.children.map(itemChildren => {
                            let dict = {}
                            dict.value = itemChildren.id
                            dict.label = itemChildren.productTypeName
                            productType.push(dict)
                          })
                        }
                      })
                      if (validatenull(productType)) {
                        this.productTypeFlatten.filter(itemNew => {
                          if (itemNew.id === parentId) {
                            itemNew.children.map(itemChildren => {
                              let dict = {}
                              dict.value = itemChildren.id
                              dict.label = itemChildren.productTypeName
                              productType.push(dict)
                            })
                          }
                        })
                      }
                    } else {
                      this.productTypeFlatten.filter(itemNew => {
                        if (itemNew.id === parentId) {
                          itemNew.children.map(itemChildren => {
                            let dict = {}
                            dict.value = itemChildren.id
                            dict.label = itemChildren.productTypeName
                            productType.push(dict)
                          })
                        }
                      })
                    }
                    item.isChild = true
                  }
                }
                this.chooseProductType.push(item)
                //防止返回到第二层是，数组重复
                this.chooseProductType = [...new Set(this.chooseProductType)]
                //排列命名
                let totalName = ''
                this.chooseProductType.map(itemNew => {
                  totalName = totalName + (totalName ? '/' : '') + itemNew.productTypeName
                })
                dictMain.label = totalName
                productType.unshift(dictMain)
              }
            })
          }
          if (validatenull(productType)) {
            //不存在上一级类别
            this.chooseProductType = []
            this.productTypeDict.map(item => {
              let dict = {}
              dict.value = item.id
              dict.label = item.productTypeName
              productType.push(dict)
            })
          }

          if (!validatenull(this.$route.query.regionCode)) {
            //存在上一级类别,寻找级别是否存在children
            let dictMain = {}
            dictMain.none = true
            this.regionFlatten.filter(item => {
              if (item.code === this.$route.query.regionCode) {
                dictMain.value = item.code
                if (!validatenull(item.children)) {
                  if (!validatenull(this.chooseRegion)) {
                    //非正常进入，忽略返回到第一层的情况,只保留第一层级
                    this.chooseRegion = this.chooseRegion.filter(item => item.parentId === '-1')
                  }
                  item.children.map(itemNew => {
                    let dict = {}
                    dict.value = itemNew.code
                    dict.label = itemNew.name
                    region.push(dict)
                  })
                } else {
                  let parentId = item.parentId
                  if (parentId != '-1') {
                    if (!validatenull(this.chooseRegion)) {
                      let chooseArray = [...this.chooseRegion]
                      //去除之前的child元素
                      this.chooseRegion = this.chooseRegion.filter(item => !item.isChild)
                      chooseArray.filter(itemNew => {
                        if (itemNew.id === parentId) {
                          itemNew.children.map(itemChildren => {
                            let dict = {}
                            dict.value = itemChildren.code
                            dict.label = itemChildren.name
                            region.push(dict)
                          })
                        }
                      })
                    } else {
                      this.regionFlatten.filter(itemNew => {
                        if (itemNew.id === parentId) {
                          itemNew.children.map(itemChildren => {
                            let dict = {}
                            dict.value = itemChildren.code
                            dict.label = itemChildren.name
                            region.push(dict)
                          })
                        }
                      })
                    }
                    item.isChild = true
                  }
                }
                this.chooseRegion.push(item)
                //防止返回到第二层是，数组重复
                this.chooseRegion = [...new Set(this.chooseRegion)]
                //排列命名
                let totalName = ''
                this.chooseRegion.map(itemNew => {
                  totalName = totalName + (totalName ? '/' : '') + itemNew.name
                })
                dictMain.label = totalName
                region.unshift(dictMain)
              }
            })
          }
          if (validatenull(region)) {
            //不存在上一级类别
            this.chooseRegion = []
            this.regionDict.map(item => {
              let dict = {}
              dict.value = item.code
              dict.label = item.name
              region.push(dict)
            })
          }
        }
        return [
          {
            id: 'productTypeId',
            label: '选择类型',
            dict: productType,
            options: this.$isMobile ? this.productTypeDict : '',
            type: this.$isMobile ? 'normalCascader' : '',
            props: this.$isMobile
              ? { value: 'id', label: 'productTypeName', emitPath: false, checkStrictly: true }
              : {}
          },
          {
            id: 'regionCode',
            label: '地区选择',
            dict: region,
            options: this.$isMobile ? this.regionDict : '',
            type: this.$isMobile ? 'normalCascader' : '',
            props: this.$isMobile
              ? { value: 'code', label: 'name', emitPath: false, checkStrictly: true }
              : {}
          }
        ]
      }
    },
    methods: {
      handleScrollBottomLoadMore() {
        if (this.mListLoading || this.mListPage >= this.data.totalPages) {
          return
        }
        this.mListLoading = true
        let page = this.mListPage + 1
        apiListPage(this.$axiosClient, { ...this.$route.query, page })
          .then(
            res => {
              this.mListLoading = false
              if (res.code === 200) {
                this.data.list = [...this.data.list, ...res.data.records]
                this.mListPage = page
              }
            },
            e => {
              this.mListLoading = false
            }
          )
          .catch(e => {
            this.mListLoading = false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
.empty{
  position:relative;
  height: 680px;
}
.RootNotMobile {
  .PageMaterialMerchant {
    padding-bottom: 87px;
    .card {
      box-shadow: $shadow;
    }
    .list {
      margin-top: 30px;
    }
    .list-item-wrap {
      padding: 0 10px;
    }
    .pagination {
      padding: 30px 0;
    }
  }
}

.RootIsMobile {
  .PageMaterialMerchant {
    .card {
      background: #fff;
      padding: 0;
    }
    .search-area {
      padding: 30px 0;
    }
    .list {
      margin-top: 20px;
    }
    .list-item-wrap {
      padding: 20px 0 0;
    }
    .pagination {
      padding: 30px 0 60px;
    }
  }
}
</style>
