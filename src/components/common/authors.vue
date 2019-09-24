<template>
  <div class="authors-wrap">
    <p class="title"></p>
    <ul class="list-authors">
      <li class="item-author"></li>
    </ul>
  </div>
</template>

<script>
import config from '../../../config/http';
export default {
  data() {
    return {
      authors: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let res = await axios.get('/api/query',this.lodash.merge(config.param_authors,config.param_common), config.header);
      if (res.data.s == 1 && res.data.d.categoryList) {
        this.tags = res.data.d.categoryList;
      }
    }
  }
};
</script>
