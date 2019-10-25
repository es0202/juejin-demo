<template>
  <div class="boiling-articles">
    <articlePie
      v-for="(item,index) in articles"
      :key="index"
      :user="item.node.user||item.node.targets[0].user"
      :date="calDate(item.node.createdAt||item.node.targets[0].createdAt)"
    ></articlePie>
  </div>
</template>
<script>
import config from '../../../config/http';
import articlePie from '../common/articlePie';
export default {
  data() {
    return {
      articles: [],
      date: new Date(),
      hasNextPage: '',
      endCursor: '',
      loadMore: false, //防止持续请求数据
      type: 0, //dock前三个类别
      page: 0
    };
  },
  components: {
    articlePie
  },
  mounted() {
    if (this.$route.params.id && ['recommend', 'hot'].indexOf(this.$route.params.id) == -1) {
      this.type = 1;
    }
    this.initData();
    window.addEventListener('scroll', this.scrollEvent);
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
          this.articles = this.data.d.list;
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
        }
      }
    },
    calDate(date) {
      let _date = this.date - new Date(date);
      let _year = Math.floor(_date / (365 * 24 * 60 * 60 * 1000));
      let _month = Math.floor(_date / (30 * 24 * 60 * 60 * 1000));
      let _day = Math.floor(_date / (24 * 60 * 60 * 1000));
      let _hour = Math.floor(_date / (60 * 60 * 1000));
      let _minutes = Math.floor(_date / (60 * 1000));
      let _second = Math.floor(_date / 1000);
      if (_year > 0) {
        return _year + '年前';
      }
      if (_month > 0) {
        return _month + '月前';
      }
      if (_day >0) {
        return _day + '天前';
      }
      if (_hour > 0) {
        return _hour + '小时前';
      }
      if (_minutes > 0) {
        return _minutes + '分钟前';
      }
      if (_second > 0) {
        return _second + '秒前';
      }
    }
  },
  watch: {
    $route(to, from) {
      this.initData();
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent);
  }
};
</script>
