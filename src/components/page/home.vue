<template>
  <div class="main-wrap">
    <tag></tag>
    <div class="container">
      <div class="main">
        <div class="header">
          <ul class="list-header">
            <li class="list-item active">
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
      <div class="aside">
        <authors></authors>
      </div>
    </div>
  </div>
</template>
<script>
import tag from '../header/tag';
import articles from '../common/articles';
import authors from '../common/authors';
export default {
  name: 'App',
  components: {
    tag,
    articles,
    authors
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
            &.active{
              color:#007fff;
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
      [class$='-wrap'] {
        background: #fff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        border-radius: 2px;
        padding-bottom: 16px;
      }
    }
  }
}
</style>
