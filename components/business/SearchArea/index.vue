<template>
  <div class="SearchArea" :class="{'SearchArea-styleType2': styleType === 2}">
    <div class="row" v-for="item in fields" :key="item.id">
      <div class="col-label" :style="{ width: labelWidthRem, 'min-width':'60px' }">
        <i v-if="!$isMobile && item.iconClass" :class="item.iconClass" />
        <span>{{ item.label }}</span>
      </div>
      <div class="col-content">
        <component
          :is="CompSearchAreaPriceRange"
          v-if="item.type === 'priceRange'"
          :dict="getSelectDict(item)"
          :initInputVal="getInitInputVal(item)"
          :styleType="styleType"
          :fieldId="item.id"
          @queryChange="(e) => handleQueryChange(item.id, e)"
        />
        <component
          :is="CompSearchAreaAreaCascader"
          v-else-if="item.type === 'areaCascader'"
          :dict="getSelectDict(item)"
          :initVal="getInitAreaCascaderVal(item)"
          :styleType="styleType"
          :labelWidth="labelWidth"
          :chinatree="chinatree"
          @queryChange="(e) => handleQueryChange(item.id, e)"
        />

        <!-- 1、"暂时添加的组件": 新的级联选择器CompNewSearchAreaAreaCascader，用来适应 招采页面筛选栏中信息来源 的需求。
          2、区别上面写好的级联选择器（使用了ChinaTree作为数据源，数据源层级为省市区），该组件需要使用新的数据源，
        新的数据源各层级分别为 省，市，招采平台-->
        <component
          :is="CompNewSearchAreaAreaCascader"
          v-else-if="item.type === 'newAreaCascader'"
          :initVal="getInitAreaCascaderVal(item)"
          :styleType="styleType"
          :labelWidth="labelWidth"
          :options ="item.dict"
          :cascaderProps="{ checkStrictly: true, 'value': 'id', 'label': 'regionName' }"
          @queryChange="(e) => handleQueryChange(item.id, e)"
        />

        <component
          :is="CompSearchAreaNormalCascader"
          v-else-if="item.type === 'normalCascader'"
          :initVal="getInitAreaCascaderVal(item)"
          :styleType="styleType"
          :labelWidth="labelWidth"
          :options="item.options"
          :cascaderProps="item.props"
          @queryChange="(e) => handleQueryChange(item.id, e)"
        />

        <component
          :is="CompSearchAreaSelect"
          v-else
          :dict="getSelectDict(item)"
          :styleType="styleType"
          :labelWidth="labelWidth"
          @queryChange="(e) => handleQueryChange(item.id, e)"
        />
      </div>
    </div>
    <div class="row" v-if="!$isMobile">
      <div class="col-label" :style="{ width: labelWidthRem }"></div>
      <div class="col-content col-tags">
        <el-tag
          :key="`${tag.fieldId}-${tag.value}`"
          v-for="tag in tags"
          closable
          :disable-transitions="true"
          @close="handleClose(tag)"
        >{{tag.label}}</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchAreaPriceRangeM from './m/SearchAreaPriceRangeM'
  import SearchAreaPriceRangePc from './pc/SearchAreaPriceRange'
  import SearchAreaAreaCascaderM from './m/SearchAreaAreaCascaderM'
  import SearchAreaAreaCascaderPc from './pc/SearchAreaAreaCascader'
  import SearchAreaSelectM from './m/SearchAreaSelectM'
  import SearchAreaFoldSelectPc from './pc/SearchAreaFoldSelect'
  import SearchAreaNormalCascader from './pc/SearchAreaNormalCascader'
  import SearchAreaNormalCascaderM from './m/SearchAreaNormalCascaderM'
  import NewSearchAreaAreaCascader from './pc/NewSearchAreaAreaCascader'
  import { pxtorem } from '~/utils'
  import { getAreaCascaderLabel } from './utils'
  import { Tag } from 'element-ui'
  import { validatenull } from '@/utils/validate'
  import { handleZhaocaiRoute, closeZhaocaiTag, handleZhaocaiRouteMobile } from './zhaocaiRouter'
  export default {
    components: {
      ElTag: Tag
    },
    props: {
      fields: Array,
      labelWidth: {
        type: Number,
        default: 128
      },
      styleType: Number
    },
    computed: {
      CompSearchAreaPriceRange() {
        return this.$isMobile ? SearchAreaPriceRangeM : SearchAreaPriceRangePc
      },
      CompSearchAreaAreaCascader() {
        return this.$isMobile ? SearchAreaAreaCascaderM : SearchAreaAreaCascaderPc
      },
      CompSearchAreaSelect() {
        return this.$isMobile ? SearchAreaSelectM : SearchAreaFoldSelectPc
      },
      CompNewSearchAreaAreaCascader() {
        return  this.$isMobile ? SearchAreaNormalCascaderM : NewSearchAreaAreaCascader
      },
      CompSearchAreaNormalCascader() {
        return this.$isMobile ? SearchAreaNormalCascaderM : SearchAreaNormalCascader
      },
      labelWidthRem() {
        return pxtorem(this.labelWidth)
      },
      chinatree() {
        return this.$store.state.data.chinaTree
      },
      tags() {
        let query = this.$route.query
        let tags = []
        this.fields.forEach(d => {
          let value = query[d.id]
          if (value) {
            let label = ''
            if (d.type === 'priceRange') {
              //面议写死
              if (value === '-1') {
                label = '面议'
              } else {
                label = value
              }
            } else if (d.type === 'areaCascader') {
              label = getAreaCascaderLabel(chinatree, value)
            } else if ( d.type === 'newAreaCascader') {
              return 
            } else {
              let valueArry = value.split(',')
              if (d.dict) {
                let labelArry = []
                valueArry.forEach(b => {
                  let opt = d.dict.find(a => a.value === b)
                  if (opt) {
                    labelArry.push(opt.label)
                  }
                })
                label = labelArry.join(',')
              }
            }
              tags.push({ fieldId: d.id, value, label })
          }
        })
        return tags
      }
    },
    methods: {
      handleClose(tag) {
        // 招采pc端特殊跳转的参数
        let params =  closeZhaocaiTag(tag.fieldId, this.$route.path ) || {}
        this.handleQueryChange(tag.fieldId, null, params)
      },
      handleQueryChange(key, val, params) {
        let limit = {} // 该参数用来特殊的跳转,主要还是处理招采的pc端和移动端
        params ? limit = params  : limit = handleZhaocaiRouteMobile(key, this.$route.path)
        this.$router.push({
          ...this.$route,
          query: { ...this.$route.query, [key]: val || undefined, ...limit }
        })
      },
      getInitInputVal(item) {
        let value = this.$route.query[item.id]
        if (value) {
          if (!item.dict || item.dict.findIndex(d => d.value === value) < 0) {
            return value.split('-')
          }
        } else {
          return null
        }
      },
      getInitAreaCascaderVal(item) {
        return this.$route.query[item.id] || null
      },
      getSelectDict(item) {
        let allOpt
        let dict
        let currentPath = this.$route.path
        let currentQuery = this.$route.query
        let itemDict = !validatenull(item.dict)
          ? item.dict.filter(itemNew => {
              // 过滤掉格式为 { value: 1, lable:'好好吃', none: "true" } 的字典项
              if (validatenull(itemNew.none) || !itemNew.none) {
                return itemNew
              }
            })
          : []
        // 存在不需要“不限”字典项的情况
        if (item.dictDefault && item.dictDefault == 'no') {
          allOpt = null
          dict = [...itemDict]
        } else {
          allOpt = { value: null, label: '不限' }
          dict = [allOpt, ...itemDict]
        }
        return dict.map(d => {
          let urlValue = this.$route.query[item.id] || null
          let isActive
          if (urlValue && typeof urlValue != 'string') {
            console.error(item.id + '的类型需要是字符串')
          }
          if (urlValue === null) {
            isActive = null === d.value ? true : false
          } else {
            isActive = urlValue.split(',').indexOf(d.value) >= 0 ? true : false
          }
          let value = d.value || undefined
          let multiple = this.fields.find(b => b.id === item.id).multiple
          if (d.value && multiple) {
            let arry = urlValue ? urlValue.split(',') : []
            if (isActive) {
              arry = arry.filter(c => c !== d.value)
            } else {
              arry.push(d.value)
            }
            value = arry.join(',')
          }
          let query = { ...this.$route.query, page: undefined, [item.id]: value }
          // 对招采页面中每一栏的按钮路径进行处理
          if ( this.$route.path === '/zhaocai/') {
            let querybate = handleZhaocaiRoute( item.id, value, this.$route.query)
            query = querybate
          }
          return {
            ...d,
            isActive,
            isLink: multiple || !isActive,
            route: {
              name: this.$route.name,
              query
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss">
.SearchArea {
  .row {
    display: flex;
  }
  .col-label {
    i {
      margin-right: 2px;
    }
  }
  .col-content {
    flex: 1;
  }
  .col-tags {
    padding: 0 10px 0 20px;
  }
  .el-tag {
    font-size: $fontSize;
    margin: 0 10px 10px 0;
  }
}
.RootNotMobile .SearchArea {
  background: $bgColorGray;
  .row {
    display: flex;
    line-height: 48px;
    &:first-child {
      .col-label, .col-content {
        padding-top: 24px;
      }
    }
    &:last-child {
      .col-label, .col-content {
        padding-bottom: 24px;
      }
    }
  }
  .col-label {
    background: $bgColorGray;
    padding-left: 32px;
    box-sizing: border-box;
  }
  .col-content {
    background: #fff;
  }
  &.SearchArea-styleType2 {
    .row {
      padding: 12px 0;
    }
    .row + .row {
      border-top: 1px dashed $borderColor;
    }
    .col-content {
      background: $bgColorGray;
    }
    .col-content.col-tags {
      padding-bottom: 0;
    }
  }
}

.RootIsMobile .SearchArea {
  .row {
    line-height: 74px;
    padding: 0 30px;
    &:active {
      background: $bgColorGray;
    }
  }
  .row + .row {
    border-top: 1px solid $borderColor;
  }
}
</style>
