<template>
<div class="follow-article-wrap">

</div>
</template>
<script>
import config from '../../../config/http';
export default{
  data(){
    return{}
  },
  mounted(){

  },
  methods:{
    async initData(){
      let res = await axios.post(
        '/api/query',
        this.lodash.merge({}, config.param_recommend, article_type, config.param_common),
        config.header
      );
    }
  }
}
</script>
<style lang="less" scoped>

</style>
