<template>
  <div class="dock-wrap">
    <ul class="nav-list">
      <li
        :class="$route.params.id
      ?($route.params.id==item.path
        ?'nav-item active':'nav-item')
      :(index==0?'nav-item active':'nav-item')"
        v-for="(item,index) in list"
        :key="index"
        @click="addActive"
      >
        <router-link :to="'/boiling/'+item.path">{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { title: '推荐', path: 'recommend' },
        { title: '热门', path: 'hot' },
        { title: '关注', path: 'follow' },
        { title: '开源推荐', path: '5c09ea2b092dcb42c740fe73' },
        { title: '内推招聘', path: 'follow' },
        { title: '掘金相亲', path: 'follow' },
        { title: '上班摸鱼', path: 'follow' },
        { title: '应用安利', path: 'follow' },
        { title: '开发工具', path: 'follow' },
        { title: 'New资讯', path: 'follow' }
      ]
    };
  },
  mounted() {},
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
  background-color: #fff;
  border-radius: 4px;
  .nav-list {
    padding: 16px 12px;
    .nav-item {
      padding: 0 12px;
      margin-top: 10px;
      height: 30px;
      line-height: 30px;
      border-radius: 4px;
      position: relative;
      text-align: center;
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
      &:nth-child(3):after {
        position: absolute;
        width: 88px;
        height: 1px;
        left: 0;
        bottom: -5px;
        content: '';
        background: rgba(92, 96, 102, 0.1);
      }
    }
  }
}
</style>
