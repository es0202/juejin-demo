<template>
  <div class="boiling-articles">
    <child :date="date"></child>
    <articlePie v-for="(item,index) in articles" :key="index" v-bind="param(item)"></articlePie>
  </div>
</template>
<script>
import config from '../../../config/http';
import articlePie from '../common/articlePie';
import mixin from '../common/mixin'
import Vue from 'vue'
Vue.component("child", {
    template: "<div>child</div>",
    inheritAttrs:false,
    mounted(){
      // console.log(this.$attrs)
    }
});
export default {
  components: {
    articlePie
  },
  mixins:[mixin],
  data() {
    return {
      articles: [],
      date: new Date(),
      hasNextPage: '',
      endCursor: '',
      loadMore: false, //防止持续请求数据
      type: 0, //dock前三个类别
      page: 0,
    };
  },
  created() {
    if (this.$route.params.id && !['recommend', 'hot'].includes(this.$route.params.id)) {
      this.type = 1;
    }
    this.initData();
    window.addEventListener('scroll', this.scrollEvent);
  },
  mounted() {
    // this.$forceUpdate()
  },
  updated(){
    //强制刷新才可访问到$children
    // console.table(this.$children);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent);
  },
  watch: {
    $route(to, from) {
      //防止切换路由使用前一次的articles渲染articlePie组件
      this.articles = [];
      if (this.$route.params.id && !['recommend', 'hot'].includes(this.$route.params.id)) {
        this.type = 1;
      }
      this.initData();
    }
  },
  methods: {
    scrollEvent() {
      if (window.scrollY + document.documentElement.clientHeight + 300 > document.documentElement.scrollHeight) {
        if (this.loadMore) {
          this.page++;
          this.initData('true');
        }
      } else {
        this.loadMore = true;
      }
    },
    async initData(isAppend) {
      this.loadMore = false;
      let url, header, param;
      let res;
      if (this.type) {
        url = '/api3/pinList/topic';
        param = this.lodash.merge(
          {
            topicId: this.$route.params.id,
            page: this.page
          },
          config.param_topic
        );
        res = await axios.get(url, { params: param });
        if (res.data.d && res.data.d.list) {
          if (this.page > 0) {
            this.articles.push(...res.data.d.list);
          } else {
            this.articles = res.data.d.list;
          }
        } else {
        }
      } else {
        url = '/api/query';
        header = config.header;
        param = this.lodash.merge(
          {},
          config.param_common,
          config[this.$route.params.id ? 'param_boiling_' + this.$route.params.id : 'param_boiling_recommend']
        );
        if (isAppend && this.hasNextPage) {
          param = this.lodash.merge(param, { variables: { after: this.endCursor } });
        }
        res = await axios.post(url, param, header);
        if (res.data.data && (res.data.data.popularPinList || res.data.data.recommendedActivityFeed)) {
          let data = res.data.data.popularPinList || res.data.data.recommendedActivityFeed;
          if (isAppend && this.hasNextPage) {
            //push可触发数组更新检测
            this.articles.push(...data.items.edges);
          } else {
            this.articles = data.items.edges;
          }
          this.hasNextPage = data.items.pageInfo.hasNextPage;
          this.endCursor = data.items.pageInfo.endCursor;
        } else {
        }
      }
    },
    param(item) {
      //传prop
      let user, date, viewerHasLiked, likeCount, commentsCount, topic, content;
      if (this.$route.params.id && this.$route.params.id == 'recommend') {
        user = item.node.targets[0].user;
        date = this.calDate(item.node.targets[0].createdAt);
        viewerHasLiked = item.node.targets[0].viewerHasLiked;
        likeCount = item.node.targets[0].likeCount;
        commentsCount = item.node.targets[0].commentCount;
        topic = item.node.targets[0].topic;
        content = item.node.targets[0].content;
      } else if (this.$route.params.id && this.$route.params.id == 'hot') {
        user = item.node.user;
        date = this.calDate(item.node.createdAt);
        viewerHasLiked = item.node.viewerHasLiked;
        likeCount = item.node.likeCount;
        commentsCount = item.node.commentCount;
        topic = item.node.topic;
        content = item.node.content;
      } else {
        user = item.user;
        date = this.calDate(item.createdAt);
        viewerHasLiked = item.isLiked;
        likeCount = item.likedCount;
        commentsCount = item.commentCount;
        topic = item.topic;
        content = item.content;
      }
      return { user, date, viewerHasLiked, likeCount, commentsCount, topic, content };
    }
  },
};
</script>
