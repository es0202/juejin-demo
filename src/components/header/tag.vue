<template>
  <div class="tag-wrap">
    <ul class="nav-list">
      <li
        v-for="(item,index) in tags"
        :key="index"
        :class="$route.path.split('/home/')[1] ?
          $route.path.split('/home/')[1]==item.title?'nav-item active':'nav-item'
          : index==0?'nav-item active':'nav-item'"
        :data-id="item.id"
      >
        <!-- <a :href="'/home/'+item.title">{{item.name}}</a> -->
        <!-- a标签切换路径不能复用其他组件 -->
        <router-link :to="'/home/'+item.title">{{item.name}}</router-link>
      </li>
      <li class="nav-item right">
        <a href>标签管理</a>
      </li>
    </ul>
  </div>
</template>
<script>
import config from '../../../config/http';
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      tags: [{ name: '推荐', title: 'recommend', id: '' }, { name: '关注', title: 'follow', id: '' }],
      beforeScroll: ''
    };
  },
  computed: {
    ...mapState(['categoryId'])
  },
  mounted() {
    this.initData();
    this.beforeScroll = window.scrollY;
    window.addEventListener('scroll', this.scrollEvent);
  },
  methods: {
    ...mapActions(['changeCategory']),
    scrollEvent() {
      //方便切换路由销毁事件
      let afterScroll = window.scrollY;
      if (window.scrollY > 150 && afterScroll - this.beforeScroll > 150) {
        this.beforeScroll = afterScroll;
        document.getElementsByClassName('tag-wrap')[0].className = 'tag-wrap top';
      } else if (this.beforeScroll - afterScroll > 100) {
        this.beforeScroll = afterScroll;
        document.getElementsByClassName('tag-wrap')[0].className = 'tag-wrap';
      }
    },
    async initData() {
      let res = await axios.get('/v1/categories', config.header1);
      if (res.data.s == 1 && res.data.d.categoryList) {
        this.tags.push(...res.data.d.categoryList);
        //存在嵌套路由
        if (this.$route.path.split('/home/')[1]) {
          for (let i = 0; i < this.tags.length; ++i) {
            if (this.tags[i].title == this.$route.path.split('/home/')[1]) {
              this.changeCategory(this.tags[i].id);
            }
          }
        } else {
          this.changeCategory('');
        }
      }
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent);
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
      &.active {
        color: #007fff;
      }
    }
  }
}
</style>
