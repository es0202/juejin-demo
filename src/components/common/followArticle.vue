<template>
  <div>
    <div class="follow-article-wrap" v-for="item in followArticles">
      <div class="article-item">
        <div class="item-header">
          <ul class="header-content">
            <li
              class="header-img"
              :style="'background-image:url('+item.node.targets['0'].user.avatarLarge.split('?')[0]+'?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1)'"
            ></li>
            <li class="header-info">
              <div class="author-name">{{item.node.targets['0'].user.username}}</div>
              <!--TODO calDate前面的字段过长省略号显示-->
              <div class="author-info">
                {{(item.node.targets['0'].user.jobTitle&&item.node.targets['0'].user.company?
                item.node.targets['0'].user.jobTitle+'@'+item.node.targets['0'].user.company :
                item.node.targets['0'].user.jobTitle+item.node.targets['0'].user.company)+' · '+calDate(item.node.targets['0'].createdAt)}}
              </div>
            </li>
          </ul>
        </div>
        <router-link class="item-content" :to="item.node.targets['0'].originalUrl">
          <div class="article-title">
            <span class="type" v-if="item.node.targets['0'].type=='post'">专栏</span>
            <span class="type" v-if="item.node.targets['0'].type=='article'">分享</span>
            <h3>{{item.node.targets['0'].title}}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import config from '../../../config/http';
export default {
  data() {
    return {
      followArticles: [],
      hasNextPage: '',
      endCursor: '',
      date: new Date()
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let res = await axios.post('/api/query', this.lodash.merge({}, config.param_follow, config.param_common), config.header);
      if (res.data.data.followingArticleFeed && res.data.data.followingArticleFeed.items) {
        this.followArticles = res.data.data.followingArticleFeed.items.edges;
        this.hasNextPage = res.data.data.followingArticleFeed.items.pageInfo.hasNextPage;
        this.endCursor = res.data.data.followingArticleFeed.items.pageInfo.endCursor;
      }
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
  }
};
</script>
<style lang="less" scoped>
.article-item {
  background: #fff;
  margin-bottom: 8px;
  width: 700px;
  .item-header {
    padding: 16px 20px 0;
    .header-content {
      display: flex;
      align-items: center;
      .header-img {
        width: 46px;
        height: 46px;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        flex: 0 0 auto; //
        border-radius: 50%;
      }
      .header-info {
        margin-left: 12px;
        .author-name {
          font-size: 15px;
          color: #17181a;
        }
        .author-info {
          font-size: 13px;
          color: #8a9aa9;
          margin-top: 2px;
        }
      }
    }
  }
  .item-content {
    margin-left: 56px;
    padding: 6px 20px 10px;
    display: block;
    .article-title {
      .type {
        font-size: 13px;
        font-weight: 500;
        color: #007fff;
        background-color: #e5f2ff;
        border-radius: 2px;
        margin-right: 10px;
        padding: 3px 6px;
        display: inline-block;
        vertical-align: middle;
      }
      h3 {
        font-size: 17px;
        color: #17181a;
        line-height: 1.5;
        vertical-align: middle;
        display: inline;
      }
    }
  }
}
</style>
