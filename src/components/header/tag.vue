<template>
  <div class="tag-wrap">
    <ul class="nav-list">
      <li v-for="item in tags" class="nav-item">
        <a :href="'/home/'+item.title">{{item.name}}</a>
      </li>
      <li class="nav-item right">
        <a href>标签管理</a>
      </li>
    </ul>
  </div>
</template>
<script>
import config from '../../../config/http';
export default {
  data() {
    return {
      tags: [{ name: '推荐', title: 'recommend' }, { name: '关注', title: 'follow' }]
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let res = await axios.get('/v1/categories', config.header1);
      if (res.data.s == 1 && res.data.d.categoryList) {
        this.tags.push(...res.data.d.categoryList);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.tag-wrap {
  z-index: 100;
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  background: #fff;
  transition: all 0.2s;
  transform: translateZ(0);
  &.top {
    transform: translate3d(0, -60px, 0);
  }
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
