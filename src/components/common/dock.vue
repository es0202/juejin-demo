<template>
  <div class="dock-wrap">
    <ul class="nav-list">
      <li class="nav-item" @click="addActive">
        <router-link to>推荐</router-link>
      </li>
      <li class="nav-item" @click="addActive">
        <router-link to>热门</router-link>
      </li>
      <li class="nav-item" @click="addActive">
        <router-link to>关注</router-link>
      </li>
      <li class="nav-item" @click="addActive">
        <router-link to>开源推荐</router-link>
      </li>
      <li class="nav-item" @click="addActive">
        <router-link to>内推招聘</router-link>
      </li>
      <li class="nav-item" @click="addActive">
        <router-link to>掘金相亲</router-link>
      </li>
      <li class="nav-item" @click="addActive">
        <router-link to>上班摸鱼</router-link>
      </li>
      <li class="nav-item" @click="addActive">
        <router-link to>应用安利</router-link>
      </li>
      <li class="nav-item" @click="addActive">
        <router-link to>开发工具</router-link>
      </li>
      <li class="nav-item" @click="addActive">
        <router-link to>New资讯</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  methods: {
    addActive: function(e) {
      let lists = e.currentTarget.parentNode.children;
      for (let i = 0; i < lists.length; i++) {
        lists[i].className = 'nav-item';
      }
      e.currentTarget.className = 'nav-item active';
    }
  }
};
</script>
<style lang="less" scoped>
.dock-wrap {
  width: 112px;
  margin-right: 15px;
  background-color: #fff;
  .nav-list {
    padding: 16px 12px;
    .nav-item {
      padding: 0 12px;
      margin-top: 10px;
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      &:first-child {
        margin-top: 0;
      }
      &.active {
        background-color: #007fff;
        a {
          color: #fff;
        }
      }
      a {
        font-size: 14px;
        color: #909090;
      }
    }
  }
}
</style>
