<template>
  <div class="PageProvideIndex">
    <div class="filter-area card">
      <FilterArea :fields="searchAreaFields" :labelWidth="$isMobile? 132 : 128" :queryModifyRules="queryModifyRules" :query="data.query" :routeName="data.routeName" />
    </div>
    <div class="list card">
      <ul class="list-item-wrap" v-if="data.list.length > 0">
        <PageProvideIndexListItem v-for="item in data.list" :key="item.id" :data="item" />
      </ul>
    </div>
    <!-- <div class="filter-area search-area-2">
      <FilterArea :fields="searchAreaFields" :labelWidth="$isMobile? 132 : 128" :styleType="2" />
    </div> -->
  </div>
</template>

<script>
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        queryModifyRules: [
          { fieldId: 'main', queryModify: { sub1: undefined, sub2: undefined } },
          // { fieldId: 'main', value: '1', queryModify: { sub1: undefined, sub2: undefined } },
          // { fieldId: 'main', value: '2', queryModify: { sub1: '2', sub2: undefined } },
          { fieldId: 'welfareType', 
            queryModify: (queryValue, nextQueryValue) => { 
              if (queryValue === '3,5' || queryValue === '5,3' || nextQueryValue === '3,5' || nextQueryValue === '5,3') {
                return { sub3: undefined, sub4: undefined }
              }
              return null
            } 
          },
          { fieldId: 'cascader', 
            queryModify: (queryValue, nextQueryValue) => { 
              if (
                ((!queryValue || queryValue.slice(0, 3) !== '1-1') && nextQueryValue && nextQueryValue.slice(0, 3) === '1-1') ||
                ((!nextQueryValue || nextQueryValue.slice(0, 3) !== '1-1') && queryValue && queryValue.slice(0, 3) === '1-1')
              ) {
                return { sub5: undefined, sub6: undefined }
              }
              return null
            } 
          },
        ],
      }
    },
    computed: {
      searchAreaFields() {
        let searchAreaFields = [
          { id: 'dropdownSelect', label: '下拉选框', dict: this.data.dictTestLong, dictTop: this.data.dictTestLong.slice(5, 8), type: 'dropdownSelect' },
          { id: 'price', label: '价格区间', dict: this.data.dictPrice, type: 'priceRange' },
          { id: 'main', label: '主条件', dict: this.data.dictMain, clearable: false },
        ]
        let query = this.data.query
        if (query.main === '1') {
          searchAreaFields = [
            ...searchAreaFields,
            { id: 'sub1', label: '联动1', dict: this.data.dictTest, isBtn: true },
            { id: 'sub2', label: '联动2', dict: this.data.dictTestLong, isBtn: true },
          ]
        } else if (query.main === '2') {
          searchAreaFields = [
            ...searchAreaFields,
            { id: 'sub1', label: '联动1', dict: this.data.dictTestLong2, isBtn: true },
          ]
        }
        searchAreaFields = [
          ...searchAreaFields,
          { id: 'welfareType', label: '福利待遇', dict: this.data.dictWelfareType, multiple: true },
        ]
        if (query.welfareType === '3,5' || query.welfareType === '5,3') {
          searchAreaFields = [
            ...searchAreaFields,
            { id: 'sub3', label: '联动3', dict: this.data.dictTest },
            { id: 'sub4', label: '联动4', dict: this.data.dictTestLong2 },
          ]
        } else {
          searchAreaFields = [
            ...searchAreaFields,
            { id: 'sub3', label: '联动3', dict: this.data.dictTestLong },
          ]
        }
        searchAreaFields = [
          ...searchAreaFields,
          { id: 'cascader', label: '级联选择', dict: this.data.dictCascader, type: 'cascader', props: { value: 'code', label: 'name' } },
        ]
        if (query.cascader && query.cascader.slice(0, 3) === '1-1') {
          searchAreaFields = [
            ...searchAreaFields,
            { id: 'sub5', label: '联动5', dict: this.data.dictTest },
            { id: 'sub6', label: '联动6', dict: this.data.dictTestLong2 },
          ]
        } else {
          searchAreaFields = [
            ...searchAreaFields,
            { id: 'sub5', label: '联动5', dict: this.data.dictTestLong },
          ]
        }
        return searchAreaFields 
      }
    },
  }
</script>

<style lang="scss">

.RootNotMobile {
  
  .PageProvideIndex {
    padding: 10px;
    .card {
      box-shadow: $shadow;
    }
    .card + .card {
      margin-top: 10px;
    }
    .search-area-2 {
      margin-top: 20px;
    }
    
  }

}

.RootIsMobile {

  .PageProvideIndex {
    .card {
      background: $colorWhite;
      padding: 0;
    }
    .search-area {
      padding-top: 30px;
    }
    .list {
      margin: 20px 0;
    }
  }

}
</style>
