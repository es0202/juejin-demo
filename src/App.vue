<template>
  <div id="app">
    <headers></headers>
    <router-view></router-view>
    <svg-icon></svg-icon>
    <auth v-if="!logined"></auth>
    <suspension v-show="isShow"></suspension>
  </div>
</template>

<script>
import headers from './components/header/header';
import svgIcon from './components/common/svg';
import suspension from './components/common/suspension';
import auth from './components/auth/auth';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'App',
  components: {
    headers,
    svgIcon,
    suspension,
    auth
  },
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    ...mapState(['logined'])
  },
  mounted() {
    const that = this;
    let beforeScroll = window.scrollY;
    if (window.scrollY > document.documentElement.clientHeight) {
      that.isShow = true;
    } else {
      that.isShow = false;
    }
    //???????????????
    window.addEventListener('scroll', function() {
      let afterScroll = window.scrollY;
      if (window.scrollY > 150 && afterScroll - beforeScroll > 150) {
        //下滚
        beforeScroll = afterScroll;
        document.getElementsByClassName('header-wrap')[0].firstChild.className = 'container hide';
      } else if (beforeScroll - afterScroll > 100) {
        beforeScroll = afterScroll;
        document.getElementsByClassName('header-wrap')[0].firstChild.className = 'container';
      }
      if (window.scrollY > document.documentElement.clientHeight) {
        that.isShow = true;
      } else {
        that.isShow = false;
      }
    });
  }
};
</script>

<style lang='less'>
@import '../static/css/reset.less';
#app {
  background-color: #f4f5f5;
}
</style>
