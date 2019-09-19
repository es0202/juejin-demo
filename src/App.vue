<template>
  <div id="app">
    <headers></headers>
    <router-view />
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import headers from './components/header/header';
import svgIcon from './components/common/svg';
export default {
  name: 'App',
  components: {
    headers,
    svgIcon
  }
};
</script>

<style lang="less">
@import '../static/css/reset.less';
</style>
