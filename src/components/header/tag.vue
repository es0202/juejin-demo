<template>
  <div class="tag-wrap">
    <ul class="nav-list">
      <li class="nav-item">
        <a href>推荐</a>
      </li>
      <li class="nav-item">
        <a href>关注</a>
      </li>
      <li class="nav-item">
        <a href>后端</a>
      </li>
      <li class="nav-item">
        <a href>前端</a>
      </li>
      <li class="nav-item">
        <a href>Android</a>
      </li>
      <li class="nav-item">
        <a href>iOS</a>
      </li>
      <li class="nav-item">
        <a href>人工智能</a>
      </li>
      <li class="nav-item">
        <a href>开发工具</a>
      </li>
      <li class="nav-item">
        <a href>代码人生</a>
      </li>
      <li class="nav-item">
        <a href>阅读</a>
      </li>
      <li class="nav-item right">
        <a href>标签管理</a>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.tag-wrap {
  z-index: 300;
  position: fixed;
  top: 60px;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
  .nav-list {
    max-width: 960px;
    margin: auto;
    height: 46px;
    display: flex;
    align-items: center;
    position: relative;
    .nav-item {
      font-size: 14px;
      color: #71777c;
      padding: 0 12px;
      &:nth-child(1) {
        padding-left: 0;
      }
      &:last-child {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
