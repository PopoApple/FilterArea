<template>
  <FilterAreaSelect :dict="currentDict" :isBtn="isBtn" :styleType="styleType" :clearable="clearable" />
</template>

<script>
const getChildren = (tree, parentId, { valueKey, childrenKey }) => {
  if (!parentId) {
    return { children: tree }
  }
  for (let i = 0; i < tree.length; i++) {
    let nodeI = tree[i]
    if (nodeI[valueKey] === parentId) {
      return { children: nodeI[childrenKey] || null, siblings: tree }
    } else if (nodeI[childrenKey]) {
      let findInSub =  getChildren(nodeI[childrenKey], parentId, { valueKey, childrenKey })
      if (findInSub.children) {
        return { children: findInSub.children, siblings: findInSub.siblings }
      } else if (findInSub.siblings) {
        return { children: null, siblings: findInSub.siblings }
      }
    }
  }
  return { children: null, siblings: null }
}
export default {
  props: {
    dict: Array,
    value: String,
    props: Object,
    isBtn: Boolean,
    styleType: Number,
    clearable: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    currentDict() {
      let { children, siblings } = getChildren(this.dict, this.value, { valueKey: this.valueKey, childrenKey: this.childrenKey })
      let dict = children || siblings || []
      if (this.props) {
        dict = dict.map(d => {
          return { ...d, value: d[this.valueKey], label: d[this.labelKey] }
        })
      }
      return dict
    },
    valueKey() {
      return this.props && this.props.value ? this.props.value : 'value'
    },
    labelKey() {
      return this.props && this.props.label ? this.props.label : 'label'
    },
    childrenKey() {
      return this.props && this.props.children ? this.props.children : 'children'
    },
  },
  methods: {

  },
}
</script>
<style lang="scss">
</style>
