<template>
  <div id="app">
    <headers></headers>
    <router-view></router-view>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import headers from './components/header/header';
import svgIcon from './components/common/svg';
export default {
  name: 'App',
  mounted() {
    let beforeScroll = window.scrollY;
    window.addEventListener('scroll', function() {
      let afterScroll = window.scrollY;
      if (window.scrollY > 150 && afterScroll - beforeScroll > 150) {
        //下滚
        beforeScroll = afterScroll;
        document.getElementsByClassName('header-wrap')[0].firstChild.className = 'container hide';
        document.getElementsByClassName('tag-wrap')[0].className = 'tag-wrap top';
        document.getElementsByClassName('sticky-block')[0].className = 'sticky-block top';
      } else if (beforeScroll - afterScroll > 100) {
        beforeScroll = afterScroll;
        document.getElementsByClassName('header-wrap')[0].firstChild.className = 'container';
        document.getElementsByClassName('tag-wrap')[0].className = 'tag-wrap';
        document.getElementsByClassName('sticky-block')[0].className = 'sticky-block';
      }
    });
  },
  components: {
    headers,
    svgIcon
  }
};
</script>

<style lang='less'>
@import '../static/css/reset.less';
</style>
