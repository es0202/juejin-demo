<template>
  <div class="main-wrap">
    <tag></tag>
    <div class="container">
      <div class="main">
        <div class="header">
          <ul class="list-header">
            <li class="list-item">
              <a href>热门</a>
            </li>
            <li class="list-item">
              <a href>最新</a>
            </li>
            <li class="list-item">
              <a href>热榜</a>
            </li>
          </ul>
        </div>
        <articles></articles>
      </div>
      <div class="aside"></div>
    </div>
  </div>
</template>
<script>
import tag from '../header/tag';
import articles from '../common/articles';
export default {
  name: 'App',
  components: {
    tag,
    articles
  }
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
    .main {
      background-color: #fff;
      width: 700px;
      .header {
        height: 46px;
        .list-header {
          padding: 15px 15px;
          display: flex;
      align-items: center;
          .list-item {
            font-size: 14px;
            line-height: 14px;
            padding: 0 14px;
            color: #909090;
            & + .list-item {
              border-right: 1px solid hsla(0, 0%, 59.2%, 0.2);
            }
          }
        }
      }
    }
    .aside {
      position: absolute;
      top: 0;
      right: 0;
      width: 240px;
    }
  }
}
</style>
