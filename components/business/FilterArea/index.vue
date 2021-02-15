<template>
  <div class="FilterArea">
    <Field v-for="item in fieldsComputed" :key="item.id" :label="item.label" :styleType="styleType" :labelWidth="labelWidth">
      <FilterAreaCascader v-if="item.type === 'cascader'" :dict="item.dict" :value="item.value" :isBtn="item.isBtn" :styleType="styleType" :clearable="item.clearable" :props="item.props" />
      <FilterAreaPriceRange v-else-if="item.type==='priceRange'" :dict="item.dict" :isBtn="item.isBtn" :styleType="styleType" :clearable="item.clearable" />
      <FilterAreaSelect v-else-if="item.type==='dropdownSelect'" :dict="item.dict" :isBtn="item.isBtn" :styleType="styleType" :clearable="item.clearable" :multiple="item.multiple" type="dropdown" :dictTop="item.dictTop" />
      <FilterAreaSelect v-else :dict="item.dict" :isBtn="item.isBtn" :styleType="styleType" :clearable="item.clearable" :multiple="item.multiple" />
    </Field>
    <Field v-if="!$isMobile" label="">
      <div class="tags">
        <Tag
          :key="tag.field.id"
          v-for="tag in tags"
          :closable="tag.field.clearable === false ? false : true"
          :disable-transitions="true"
          @close="handleClose(tag)"
        >
          {{tag.label}}
        </Tag>
      </div>
    </Field>
  </div>
</template>

<script>

  const getDictKeys = props => {
    let valueKey = props && props.value ? props.value : 'value'
    let labelKey = props && props.label ? props.label : 'label'
    let childrenKey = props && props.children ? props.children : 'children'
    return { valueKey, labelKey, childrenKey }
  }

  export default {
    props: {
      fields: Array,
      styleType: Number,
      labelWidth: Number,
      queryModifyRules: Array,
      routeName: String,
      query: Object,
    },
    computed: {
      tags() {
        let tags = []
        this.fieldsComputed.forEach(field => {
          let label
          if (field.type === 'priceRange') {
            //label = value === '-1' ? '面议' : value
          } else if (field.type === 'cascader') {
            let { labelKey } = getDictKeys(field.props)
            if (field.valueArray && field.valueArray.length > 0) {
              label = field.valueArray.map(a => a[labelKey]).join('/')
            }
          } else {
            let valueArray = field.dict.filter(a => a.value && a.isActive)
            if (valueArray && valueArray.length > 0) {
              label = valueArray.map(a => a.label).join(',')
            }
          }
          if (label) {
            tags.push({ field, label })
          }
        })
        return tags
      },
      fieldsComputed() {
        return this.fields.map(field => {
          let newField
          let type = field.type
          if (type === 'cascader') {
            newField = this.getFieldCascader(field)
          } else {
            newField = this.getFieldSelect(field)
          }
          return newField
        })
      }
    },
    methods: {
      getFieldCascader(field) {
        let value = null
        let queryValue = this.query[field.id] || null
        if (queryValue) {
          //value = getCascaderValue(field.dict, queryValue)
          value = queryValue
        }
        let { dict, cascaderValueArray } = this.addInfoToDict(field.dict, field)
        return { ...field, dict, value, valueArray: cascaderValueArray }
      },
      getFieldSelect(field) {
        let { dict } = this.addInfoToDict(field.dict, field)
        return { ...field, dict }
      },
      getDictOptionRoute(field, optValue, isActive) {
        let queryValue = this.query[field.id] || null
        let queryValueArray = queryValue ? queryValue.split(',') : []
        let route
        let queryModify
        if (field.multiple) {
          if (isActive) {
            queryModify = optValue ? { [field.id]: queryValueArray.filter(d => d !== optValue).join(',') || undefined } : null
          } else {
            queryModify = optValue ? { [field.id]: [...queryValueArray, optValue].join(',') } : { [field.id]: undefined }
          }
        } else {
          if (!isActive) {
            queryModify = { [field.id]: optValue || undefined }
          }
        }
        if (queryModify) {
          if (this.queryModifyRules) {
            this.queryModifyRules.forEach(rule => {
              if (rule.fieldId === field.id && (!rule.value || rule.value === optValue)) {
                let ruleQueryModify
                if (typeof rule.queryModify === 'function') {
                  ruleQueryModify = rule.queryModify(this.query[field.id], queryModify[field.id])
                } else {
                  ruleQueryModify = rule.queryModify
                }
                queryModify = { ...queryModify, ...ruleQueryModify }
              }
            })
          }
          route = { name: this.routeName, query: { ...this.query, ...queryModify } }
        }
        return route
      },
      addInfoToDict(originDict, field) {
        let queryValue = this.query[field.id] || null
        let queryValueArray = queryValue ? queryValue.split(',') : []
        let clearable = field.clearable === false ? false : true
        let { valueKey, labelKey, childrenKey } = getDictKeys(field.props)
        let cascaderValueArray
        let cascaderValuePath = []
        const _addInfoToDict = (_originDict, level) => {
          let dict = _originDict
          if (clearable && !this.$isMobile) {
            dict = [{ [valueKey]: null, [labelKey]: '不限' }, ...dict]
          }
          dict = dict.map(opt => {
            if (!cascaderValueArray && opt[valueKey]) {
              cascaderValuePath[level] = opt
            }
            let isActive = queryValue === opt[valueKey] || queryValueArray.indexOf(opt[valueKey]) >= 0
            let route = this.getDictOptionRoute(field, opt[valueKey], isActive) 
            if (isActive) {
              cascaderValueArray = cascaderValuePath.slice(0, level + 1)
            }
            let children = opt[childrenKey]
            if (children) {
              children = _addInfoToDict(children, level + 1)
            }
            return { ...opt, isActive, route, children: children || undefined }
          })
          return dict
        }
        let dict = _addInfoToDict(originDict, 0)
        return { dict, cascaderValueArray }
      },
      handleClose(tag) {
        let route = this.getDictOptionRoute(tag.field, null, false) 
        this.$router.push(route)
      },
      /*
      getFieldCascader(field, query, queryValue) {
        let value = null
        if (queryValue) {
          //value = getCascaderValue(field.dict, queryValue)
          value = queryValue
        }
        let dict = field.dict
        let clearable = field.clearable === false ? false : true
        let valueKey = field.props && field.props.value ? field.props.value : 'value'
        let labelKey = field.props && field.props.label ? field.props.label : 'label'
        let childrenKey = field.props && field.props.children ? field.props.children : 'children'
        const addInfoToDict = originDict => {
          let dict = [...originDict]
          if (clearable) {
            dict = [{ [valueKey]: null, [labelKey]: '不限' }, ...dict]
          }
          dict = dict.map(opt => {
            let children = opt[childrenKey]
            if (children) {
              children = addInfoToDict(children)
            }
            let isActive = queryValue === opt[valueKey]
            let queryModify
            if (!isActive) {
              queryModify = { [field.id]: opt[valueKey] || undefined }
            }
            let route
            if (queryModify) {
              route = { name: this.routeName, query: { ...query, ...queryModify } }
            }
            return { ...opt, children: children || undefined, isActive, route }
          })
          return dict
        }
        dict = addInfoToDict(dict)
        return { ...field, dict, value }
      },
      getFieldSelect(field, query, queryValue) {
        let dict = field.dict
        let clearable = field.clearable === false ? false : true
        if (clearable) {
          dict = [{ value: null, label: '不限' }, ...dict]
        }
        dict = dict.map(opt => {
          let queryValueArray = queryValue ? queryValue.split(',') : []
          let isActive = queryValue === opt.value || queryValueArray.indexOf(opt.value) >= 0
          let queryModify
          if (field.multiple) {
            if (isActive) {
              queryModify = opt.value ? { [field.id]: queryValueArray.filter(d => d !== opt.value).join(',') || undefined } : null
            } else {
              queryModify = opt.value ? { [field.id]: [...queryValueArray, opt.value].join(',') } : { [field.id]: undefined }
            }
          } else {
            if (!isActive) {
              queryModify = { [field.id]: opt.value || undefined }
            }
          }
          let route
          if (queryModify) {
            if (this.queryModifyRules) {
              this.queryModifyRules.forEach(rule => {
                if (rule.fieldId === field.id && (!rule.value || rule.value === opt.value)) {
                  let ruleQueryModify
                  if (typeof rule.queryModify === 'function') {
                    ruleQueryModify = rule.queryModify(query[field.id], queryModify[field.id])
                  } else {
                    ruleQueryModify = rule.queryModify
                  }
                  queryModify = { ...queryModify, ...ruleQueryModify }
                }
              })
            }
            route = { name: this.routeName, query: { ...query, ...queryModify } }
          }
          return { ...opt, isActive, route }
        })
        return { ...field, dict }
      },
      */
    }
  }
</script>

<style lang="scss">
.FilterArea {
  .tags {
    padding: 0 10px 0 20px;
  }
  .el-tag {
    margin: 0 10px 10px 0;
  }
}
</style>
