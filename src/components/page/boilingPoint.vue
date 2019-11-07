<template>
  <div class="main-wrap">
    <dock></dock>
    <div class="content">
      <editor></editor>
      <router-view></router-view>
    </div>
    <sidebar></sidebar>
  </div>
</template>
<script>
import sidebar from '../common/sidebar';
import dock from '../common/dock';
import config from '../../../config/http';
import editor from '../common/boilngEditor';
export default {
  components: {
    sidebar,
    dock,
    editor
  },
  mounted() {
// debugger;
  },
};
</script>
<style lang="less" scoped>
.main-wrap {
  width: 100%;
  background-color: #f4f5f5;
  max-width: 960px;
  margin: 0 auto;
  position: relative;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .content{
    width: 570px;
  }
}
</style>
