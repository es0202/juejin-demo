<template>
  <div class="articles-wrap">
    <ul class="list-articles">
      <router-link :to="item.node.originalUrl" v-for="item in articles" tag="li" :key="item.node.id" class="item-article">
        <div class="content-box">
          <div class="info-row">
            <ul class="list-info">
              <li class="item-info red" v-if="item.node.hotIndex>2000">
                <a href>热</a>
              </li>
              <li class="item-info red" v-if="item.node.hot">
                <a href>荐</a>
              </li>
              <li class="item-info purple" v-if="item.node.type=='post'">
                <a href>专栏</a>
              </li>
              <li class="item-info">
                <a href>{{item.node.user.username}}</a>
              </li>
              <li class="item-info">
                <a href>{{calDate(item.node.createdAt)}}</a>
              </li>
              <li class="item-info">
                <a href>
                  {{item.node.tags.reduce((a,b,i)=>{
                  if(i==0){return b.title}
                  else{ return a+'/'+b.title }
                  },'')}}
                </a>
              </li>
            </ul>
          </div>
          <p class="title-row">{{item.node.title}}</p>
          <div class="action-row">
            <ul class="list-action">
              <li class="item-action">
                <svg class="like-icon">
                  <use xlink:href="#like" />
                </svg>
                <span class="count">{{item.node.likeCount}}</span>
              </li>
              <li class="item-action">
                <svg class="comment-icon">
                  <use xlink:href="#comment" />
                </svg>
                <span class="count">{{item.node.commentsCount}}</span>
              </li>
            </ul>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import config from '../../../config/http'
export default {
  data() {
    return {
      articles: [],
      date: new Date()
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let res = await axios.post(
        '/api/query',this.lodash.merge(config.param_articles,config.param_common),config.header
      );
      if (res.data.data.articleFeed && res.data.data.articleFeed.items && res.data.data.articleFeed.items.edges) {
        this.articles = res.data.data.articleFeed.items.edges;
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
.articles-wrap {
  width: 100%;
  .list-articles {
    .item-article {
      border-top: 1px solid hsla(0, 0%, 59.2%, 0.1);
      padding: 18px 24px;
      .content-box {
        .info-row {
          font-size: 12px;
          line-height: 12px;
          height: 15px;
          .list-info {
            display: flex;
            color: #b2bac2;
            .item-info {
              &.purple {
                color: #b71ed7;
              }
              &.red {
                color: #f70;
              }
            }
            .item-info:not(:last-child):after {
              content: '·';
              color: #b2bac2;
              margin: 4px;
            }
          }
        }
        .title-row {
          color: #2e3135;
          font-size: 16px;
          line-height: 20px;
          height: 20px;
          padding: 6px 0 12px 0;
          font-weight: 600;
        }
        .action-row {
          .list-action {
            display: flex;
            height: 26px;
            .item-action {
              border: 1px solid #edeeef;
              display: flex;
              align-items: center;
              padding: 0 10px;
              &:not(:first-child) {
                border-left: none;
              }
              .like-icon {
                width: 14px;
                height: 14px;
                fill: #b2bac2;
              }
              .comment-icon {
                width: 16px;
                fill: #b2bac2;
                height: 12px;
              }
              .count {
                padding-left: 4px;
                font-size: 12px;
                color: #b2bac2;
              }
            }
          }
        }
      }
    }
  }
}
</style>
