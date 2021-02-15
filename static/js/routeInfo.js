export const titleSufix = '-广新纳-建筑信息交流平台'
const keywordsSufix = '，广新纳'
const descriptionSufix = '-广新纳作为国内领先的建筑信息交流平台，专业的本地、真实、高效服务平台，找建材，找招采信息，找服务，找工作，找建筑规范，建筑资讯，广新纳一站解决！充分满足您查看/发布信息的需求。'

//功能页、列表页
const aPictureTitle = '一张图读懂广新纳'
const descriptionTitle = '版权说明与免责声明'
const jobTitle = '找工作'
const materialTitle = '建材信息'
const materialGoodsTitle = '商品供应'
const materialMerchantTitle = '全部商家'
const merchantCenterTitle = '商家中心'
const merchantCenterCaTitle = '商户认证'
const merchantCenterInfoTitle = '企业信息'
const merchantCenterMyPublishTitle = '我的发布'
const merchantCenterWantPublishTitle = '我要发布'
const needTitle = '我需要'
const provideTitle = '我提供'
const publishGoodsTitle = '发布商品信息'
const publishJobTitle = '发布招聘信息'
const publishNeedTitle = '发布需求信息'
const publishProvideTitle = '发布供应信息'
const recordsTitle = '浏览记录'
const searchResultTitle = '搜索结果'
const userCenterTitle = '个人中心'
const userCenterMyCollectionTitle = '我的收藏'
const userCenterMyCommentTitle = '我的评论'
const userCenterMyFocusTitle = '我的关注'
const userCenterMyInfoTitle = '个人信息'
const userCenterMyMessageTitle = '我的消息'
const userCenterMyPublishTitle = '我的发布'
const userCenterWantGetTitle = '我的意向承接'
const userCenterWantPublishTitle = '我要发布'
const zhaocaiTitle = '招采信息'
const goodsPreviewTitle = '商品发布预览'

//详情页
const materialGoodsDetailTitle = '商品详情'
const materialGoodsCommentsTitle = '商品评论'

const materialMerchantDetailTitle = '商家详情'
const materialMerchantGoodsTitle = '商品信息'
const materialMerchantJobTitle = '招聘信息'
const materialMerchantProvidesTitle = '供应信息'

//type：1、功能页、列表页  2、...
let rInfo = [
  {
    path: '/aPicture',
    title: aPictureTitle,
    type: 1,
  },
  {
    path: '/description',
    title: descriptionTitle,
    type: 1,
  },
  {
    path: '/job',
    title: jobTitle,
    type: 1,
  },
  {
    path: '/material',
    title: materialTitle,
    type: 1,
  },
  {
    path: '/material/goods',
    title: materialGoodsTitle,
    type: 1,
  },
  {
    path: '/material/goods/goodsDetail/:id?',
    title: materialGoodsDetailTitle,
  },
  {
    path: '/material/goods/goodsDetail/:id?/comments',
    title: materialGoodsCommentsTitle,
    hideNav: true,
  },
  {
    path: '/material/goods/goodsDetail/:id?/detail',
    title: materialGoodsDetailTitle,
    hideNav: true,
  },
  {
    path: '/material/merchant',
    title: materialMerchantTitle,
    type: 1,
  },
  {
    path: '/material/merchant/merchantDetail/:id?',
    title: materialMerchantDetailTitle,
  },
  {
    path: '/material/merchant/merchantDetail/:id?/goods',
    title: materialMerchantGoodsTitle,
    hideNav: true,
  },
  {
    path: '/material/merchant/merchantDetail/:id?/job',
    title: materialMerchantJobTitle,
    hideNav: true,
  },
  {
    path: '/material/merchant/merchantDetail/:id?/main',
    title: materialMerchantDetailTitle,
    hideNav: true,
  },
  {
    path: '/material/merchant/merchantDetail/:id?/provides',
    title: materialMerchantProvidesTitle,
    hideNav: true,
  },
  {
    path: '/merchantCenter',
    title: merchantCenterTitle,
    type: 1,
  },
  {
    path: '/merchantCenter/ca',
    title: merchantCenterCaTitle,
    type: 1,
  },
  {
    path: '/merchantCenter/info',
    title: merchantCenterInfoTitle,
    type: 1,
  },
  {
    path: '/merchantCenter/myPublish',
    title: merchantCenterMyPublishTitle,
    type: 1,
  },
  {
    path: '/merchantCenter/wantPublish',
    title: merchantCenterWantPublishTitle,
    type: 1,
  },
  {
    path: '/need',
    title: needTitle,
    type: 1,
  },
  {
    path: '/provide',
    title: provideTitle,
    type: 1,
  },
  {
    path: '/publishGoods',
    title: publishGoodsTitle,
    type: 1,
  },
  {
    path: '/publishJob',
    title: publishJobTitle,
    type: 1,
  },
  {
    path: '/publishNeed',
    title: publishNeedTitle,
    type: 1,
  },
  {
    path: '/publishProvide',
    title: publishProvideTitle,
    type: 1,
  },
  {
    path: '/records',
    title: recordsTitle,
    type: 1,
  },
  {
    path: '/searchResult',
    title: searchResultTitle,
    type: 1,
  },
  {
    path: '/userCenter',
    title: userCenterTitle,
    type: 1,
  },
  {
    path: '/userCenter/myCollection',
    title: userCenterMyCollectionTitle,
    type: 1,
  },
  {
    path: '/userCenter/myComment',
    title: userCenterMyCommentTitle,
    type: 1,
  },
  {
    path: '/userCenter/myFocus',
    title: userCenterMyFocusTitle,
    type: 1,
  },
  {
    path: '/userCenter/myInfo',
    title: userCenterMyInfoTitle,
    type: 1,
  },
  {
    path: '/userCenter/myMessage',
    title: userCenterMyMessageTitle,
    type: 1,
  },
  {
    path: '/userCenter/myPublish',
    title: userCenterMyPublishTitle,
    type: 1,
  },
  {
    path: '/userCenter/wantGet',
    title: userCenterWantPublishTitle,
    type: 1,
  },
  {
    path: '/userCenter/wantPublish',
    title: userCenterWantGetTitle,
    type: 1,
  },
  {
    path: '/zhaocai',
    title: zhaocaiTitle,
    type: 1,
  },
  {
    path: '/article/:id?',
    title: '文章正文',
  },
  {
    path: '/goodsPreview/:id?',
    title: goodsPreviewTitle,
    type: 1,
  },
  {
    path: '/job/:id?',
    title: '职位详情',
  },
  {
    path: '/need/:id?',
    title: '需求信息详情',
  },
  {
    path: '/provide/:id?',
    title: '供应信息详情',
  },
  {
    path: '/zhaocai/:id',
    title: '招采详情',
  },
  {
    path: '/',
    title: '首页',
  },
]

rInfo.forEach(d => {
  if (d.type === 1) {
    d['seoTitle'] = d.title + titleSufix
    d['keywords'] = d.title + keywordsSufix
    d['description'] = d.title + descriptionSufix
  }
})

const iterator = (list) => {
  for (let item in list) {
    for (const m in rInfo) {
      let info = rInfo[m]
      let infoName = info.path.replace(/:id\?/, 'id').slice(1).replace(/\//g, '-')
      if (list[item].name === infoName) {
        list[item].meta = {
          title: info.title,
          keywords: info.keywords,
          description: info.description,
        }
      }
    }
    if (list[item].children && list[item].children.length > 0) {
      iterator(list[item].children)
    }
  }
}

export const extendRoutes = (routes, resolve) => {
  routes = iterator(routes)
}

export const routeInfo = rInfo