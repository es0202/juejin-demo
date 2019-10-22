<template>
  <div id="app">
    <headers></headers>
    <router-view></router-view>
    <svg-icon></svg-icon>
    <suspension v-show="isShow"></suspension>
  </div>
</template>

<script>
import headers from './components/header/header';
import svgIcon from './components/common/svg';
import suspension from './components/common/suspension';
export default {
  name: 'App',
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    const that = this;
    let beforeScroll = window.scrollY;
    if (window.scrollY > document.documentElement.clientHeight) {
      that.isShow = true;
    } else {
      that.isShow = false;
    }
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
  },
  components: {
    headers,
    svgIcon,
    suspension
  }
};
</script>

<style lang='less'>
@import '../static/css/reset.less';
#app {
  background-color: #f4f5f5;
}
</style>
