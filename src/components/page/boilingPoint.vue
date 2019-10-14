<template>
  <div class="main-wrap">
    <dock></dock>
    <div></div>
    <sidebar></sidebar>
  </div>
</template>
<script>
import sidebar from '../common/sidebar';
import dock from '../common/dock';
import config from '../../../config/http';
export default {
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      var res = await axios.post(
        '/api/query',
        this.lodash.merge({}, config.param_boiling_common, config.param_boiling_recommend),
        config.header
      );
    }
  },
  components: {
    sidebar,
    dock
  }
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
}
</style>
