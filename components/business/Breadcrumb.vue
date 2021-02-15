<template>
  <div>
    <div class="box Breadcrumb">
      <span class="text-item">当前位置：</span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>
          <nuxt-link to="/">
            <i class="iconimg i-home" /> 首页
          </nuxt-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in routes" :key="item.path">
          <nuxt-link :to="item.path" v-if="item.path">
            {{ item.name }}
          </nuxt-link>
          <template v-else>
            {{ item.name }}
          </template>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
import { routeInfo } from '~/static/js/routeInfo'

export default {
  components: {
    ElBreadcrumb: Breadcrumb,
    ElBreadcrumbItem: BreadcrumbItem,
  },
  // created() {
  //   console.log(123, this.$route)
  // },
  computed: {
    routes() {
      let matched = this.$route.matched
      let routes = matched.map(d => {
        let path = d.path
        let info = routeInfo.find(c => this.$isMobile ? c.path === path.replace(/^\/m\//, '/') : c.path === path)
        let name = info ? info.title : null
        if (info && info.redirect) {
          path = info.redirect
        } else {
          if (path.slice(-4) === ':id?') {
            path = path.slice(0, -4) + this.$route.params.id
          }
        }
        return { path, name, hideNav: (info && info.hideNav ) || !name }
      }).filter(d => !d.hideNav)
      routes = routes.map((d, i) => {
        return { path: routes.length - 1 === i ? null : d.path, name: d.name }
      })
      return routes
    }
  }
}
</script>

<style lang="scss">
.Breadcrumb {
  margin: 20px 0 10px 0; 
  .el-breadcrumb {
    font-size: $fontSizeOddS;
    display: inline-block;
    vertical-align: middle;
    .el-breadcrumb__inner {
      color: $colorGreen;
      &:hover {
        color: $colorGreen;
      }
      a {
        color: $fontColorXLight;
        font-weight: normal;
        &:hover {
          color: $colorGreen;
        }
      }
    }
  }
  .i-home {
    background-image: url('~static/img/m/menu/home.png');
    width: 12PX;
    height: 12PX;
    top: 1PX;
    margin-right: 3px;
  }
  .text-item {
    font-size: $fontSizeOddS;
    vertical-align: middle;
    color: $fontColorXLight;
  }
}

.RootIsMobile {
  .Breadcrumb {
    margin: 20px 30px 20px 30px; 
    .el-breadcrumb {
      font-size: $fontSize;
    }
  }
}
</style>
