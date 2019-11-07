<template>
  <div class="dock-wrap">
    <div class="dock-fixed">
      <ul class="nav-list">
        <!--follow不是以param.id传的-->
        <li
          :class="$route.params.id
      ?($route.params.id==item.path
        ?'nav-item active':'nav-item')
      :(index==2?'nav-item active':'nav-item')"
          v-for="(item,index) in list"
          :key="index"
          @click="addActive"
        >
          <router-link :to="'/boiling/'+item.path">{{item.title}}</router-link>
        </li>
      </ul>
    </div>
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
        { title: '内推招聘', path: '5abb61e1092dcb4620ca3322' },
        { title: '掘金相亲', path: '5abcaa67092dcb4620ca335c' },
        { title: '上班摸鱼', path: '5c106be9092dcb2cc5de7257' },
        { title: '应用安利', path: '5b514af1092dcb61bd72800d' },
        { title: '开发工具', path: '5abb67d2092dcb4620ca3324' },
        { title: 'New资讯', path: '5c46a17f092dcb4737217152' }
      ],
      beforeScroll: ''
    };
  },
  mounted() {
    this.beforeScroll = window.scrollY;
    window.addEventListener('scroll', this.scrollEvent);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent);
  },
  methods: {
    scrollEvent() {
      //header显示sticky-block margin-top加60px
      let afterScroll = window.scrollY;
      if (window.scrollY > 150 && afterScroll - this.beforeScroll > 150) {
        this.beforeScroll = afterScroll;
        document.getElementsByClassName('dock-fixed')[0].className = 'dock-fixed top';
      } else if (this.beforeScroll - afterScroll > 100) {
        this.beforeScroll = afterScroll;
        document.getElementsByClassName('dock-fixed')[0].className = 'dock-fixed';
      }
    },
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
  .dock-fixed {
    position: fixed;
    background-color: #fff;
    border-radius: 4px;
    width: 112px;
    transition: all 0.2s linear;
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
    &.top {
      top: 6px;
    }
  }
}
</style>
