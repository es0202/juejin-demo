<template>
  <div class="main-wrap">
    <tag></tag>
    <div class="container">
      <!--tag组件中数据请求完成categoryId赋值,为null显示recommand文章-->
      <router-view></router-view>
      <div class="aside">
        <authors></authors>
      </div>
    </div>
  </div>
</template>

<script>
import tag from '../header/tag';
import authors from '../common/authors';
import { mapState } from 'vuex';
export default {
  components: {
    tag,
    authors
  },
  computed: {
    ...mapState(['categoryId'])
  },
};
</script>
<style lang="less" scoped>
.main-wrap {
  padding-top: 60px;
  width: 100%;
  background-color: #f4f5f5;
  .container {
    max-width: 960px;
    margin: 0 auto;
    position: relative;
    .aside {
      position: absolute;
      top: 0;
      right: 0;
      width: 240px;
      [class$='-wrap'] {
        background: #fff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        border-radius: 2px;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
