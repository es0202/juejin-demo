<template>
  <div class="boiling-articles">
    <ul class="article-list">
      <router-link to class="list-item" tag="li">
        <div class="item-header"></div>
        <div class="item-content"></div>
        <div class="action-box"></div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import config from '../../../config/http';
import { type } from 'os';
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
  mounted() {
    const that = this;
    if (this.$route.params.id && ['recommend'].indexOf(this.$route.params.id) == -1) {
      this.type = 1;
    }
    this.initData();
    window.addEventListener('scroll', () => {
      if (window.scrollY + document.documentElement.clientHeight + 300 > document.documentElement.scrollHeight) {
        if (that.loadMore) {
          that.page++;
          that.initData('true');
        }
      } else {
        that.loadMore = true;
      }
    });
  },
  methods: {
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
        }
      } else {
        url = '/api/query';
        header = config.header;
        param = this.lodash.merge(
          {},
          config.param_boiling_common,
          config[this.$route.params.id ? 'param_boiling_' + this.$route.params.id : 'param_boiling_recommend']
        );
        res = await axios.post(url, param, header);
      }

      // if (isAppend && this.hasNextPage) {
      //   article_type.variables.after = this.endCursor;
      // }

      // if (res.data.data.articleFeed && res.data.data.articleFeed.items && res.data.data.articleFeed.items.edges) {
      //   if (isAppend && this.hasNextPage) {
      //     //push可触发数组更新检测
      //     this.articles.push(...res.data.data.articleFeed.items.edges);
      //   } else {
      //     this.articles = res.data.data.articleFeed.items.edges;
      //   }
      //   this.hasNextPage = res.data.data.articleFeed.items.pageInfo.hasNextPage;
      //   this.endCursor = res.data.data.articleFeed.items.pageInfo.endCursor;
      // } else {
      //   //200 return error message
      // }
    },
    calDate(date) {
      let _date = new Date(date);
      let _year = this.date.getFullYear() - _date.getFullYear();
      let _month = this.date.getMonth() - _date.getMonth();
      let _day = this.date.getDate() - _date.getDate();
      let _hour = this.date.getHours() - _date.getHours();
      let _minutes = this.date.getMinutes() - _date.getMinutes();
      let _second = this.date.getSeconds() - _date.getSeconds();
      if (_year > 0) {
        return _year + '年前';
      }
      if (_month > 0) {
        return _month + '月前';
      }
      if (_day > 0) {
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
  }
};
</script>
