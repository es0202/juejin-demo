<template>
  <div class="boiling-articles">
    <div class="follow-article-wrap" v-for="item in articles">
      <div class="article-item" v-if="item.node.action!='FOLLOW_USER'">
        <div class="item-header">
          <ul class="header-content">
            <li class="header-img">
              <img :src="item.node.targets['0'].user.avatarLarge.split('?')[0]
              +'?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'" />
            </li>
            <li class="header-info">
              <div class="author-name">{{item.node.targets[0].user.username}}</div>
              <!--TODO calDate前面的字段过长省略号显示-->
              <div class="author-info">
                {{item.node.targets[0].user.jobTitle
                +(item.node.targets[0].user.company ? ' @ '+item.node.targets[0].user.company : '')
                +(item.node.targets[0].user.jobTitle||item.node.targets[0].user.company ? ' · ' : '')
                +calDate(item.node.targets['0'].createdAt)}}
              </div>
            </li>
            <li class="header-btn">关注</li>
          </ul>
        </div>
        <!--文章可点击-->
        <router-link v-if="item.node.action.indexOf('ARTICLE')>0" class="item-content" :to="item.node.targets['0'].originalUrl">
          <div class="article-title">
            <span class="type" v-if="item.node.targets['0'].type=='post'">专栏</span>
            <span class="type" v-if="item.node.targets['0'].type=='article'">分享</span>
            <h3>{{item.node.targets['0'].title}}</h3>
          </div>
          <div class="article-content">
            <div class="text">{{item.node.targets['0'].content.slice(0,-54)?item.node.targets['0'].content.slice(0,-54)+'...':item.node.targets['0'].content}}</div>
            <img
              v-if="item.node.targets['0'].screenshot"
              :src="item.node.targets['0'].screenshot.split('?')[0]+'?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'"
            />
          </div>
        </router-link>
        <!--沸点不可点击-->
        <div class="pin-contnet" v-else>

        </div>

        <div class="action-box">
          <div :class="item.node.targets[0].viewerHasLiked?'action active':'action'" @click.prevent="hasLiked(item.node.targets[0].id,$event)">
            <svg class="like-icon">
              <use xlink:href="#like2" />
            </svg>
            <span>{{item.node.targets[0].likeCount}}</span>
          </div>
          <!--点过赞的才有active样式-->
          <div class="action">
            <svg class="like-icon">
              <use xlink:href="#comment2" />
            </svg>
            <span>{{item.node.targets[0].commentsCount}}</span>
          </div>
          <div class="action">
            <svg class="like-icon">
              <use xlink:href="#share" />
            </svg>
            <span>分享</span>
          </div>
        </div>
      </div>

      <div class="follow-user" v-else>
        <div class="item-header">
          <ul class="header-content">
            <li class="header-img">
              <img :src="item.node.actors[0].avatarLarge.split('?')[0]
              +'?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'" />
            </li>
            <li class="header-info">
              <div class="author-name">
                <a class="name">{{item.node.actors[0].username}}</a>
                <span>关注了</span>
                <a class="name">{{item.node.targets[0].username}}</a>
              </div>
              <!--TODO calDate前面的字段过长省略号显示-->
              <div class="author-info">
                {{item.node.actors[0].jobTitle
                +(item.node.actors[0].company ? ' @ '+item.node.actors[0].company : '')}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import config from '../../../config/http';

export default {
  data() {
    return {
      articles: [],
      date: new Date(),
      hasNextPage: '',
      endCursor: '',
      loadMore: false, //防止持续请求数据
      page: 0
    };
  },
  mounted() {
    const that = this;
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
      let param = this.lodash.merge({}, config.param_common, {
        variables: { since: new Date(this.date.getTime() - 8 * 60 * 60 * 1000), type: 'MAIN' }
      });
      if (isAppend && this.hasNextPage) {
        param = this.lodash.merge(param, { variables: { after: this.endCursor } });
      }
      var res = await axios.post('/api/query', this.lodash.merge({}, param, config.param_boiling_follow), config.header);

      if (
        res.data.data.followingActivityFeed &&
        res.data.data.followingActivityFeed.items &&
        res.data.data.followingActivityFeed.items.edges
      ) {
        if (isAppend && this.hasNextPage) {
          //push可触发数组更新检测
          this.articles.push(...res.data.data.followingActivityFeed.items.edges);
        } else {
          this.articles = res.data.data.followingActivityFeed.items.edges;
        }
        this.hasNextPage = res.data.data.followingActivityFeed.items.pageInfo.hasNextPage;
        this.endCursor = res.data.data.followingActivityFeed.items.pageInfo.endCursor;
      } else {
        //200 return error message
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
    },
    hasLiked(id, e) {
      if (e.currentTarget.className.indexOf('active') > 0) {
        e.currentTarget.className = 'action';
        e.currentTarget.children[1].innerText = Number(e.currentTarget.children[1].innerText) - 1;
      } else {
        e.currentTarget.className = 'action active';
        e.currentTarget.children[1].innerText = Number(e.currentTarget.children[1].innerText) + 1;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.boiling-articles {
  .article-item,
  .follow-user {
    background: #fff;
    margin-bottom: 8px;
    .item-header {
      padding: 16px 20px 0;
      .header-content {
        display: flex;
        align-items: center;
        .header-img {
          width: 46px;
          height: 46px;
          flex: 0 0 auto;
          img {
            width: 46px;
            height: 46px;
            border-radius: 50%;
          }
        }
        .header-info {
          margin-left: 12px;
          .author-name {
            font-size: 15px;
            color: #2e3135;
            display: flex;
            align-items: center;
            span {
              color: #8a9aa9;
              margin: 0 4px;
            }
            .name {
              color: #17181a;
            }
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
      .article-content {
        display: flex;
        align-items: center;
        .text {
          font-size: 15px;
          margin: 4px 16px 0 0;
          line-height: 1.53;
          color: #5c6066;
        }
        img {
          width: 65px;
          height: 65px;
          flex: 0 0 auto;
        }
      }
    }
    .action-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      border-top: 1px solid #ebebeb;
      margin-top: 2px;
      height: 34px;
      .action {
        flex: 1;
        position: relative;
        text-align: center;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .like-icon {
          width: 18px;
          height: 18px;
          fill: none;
          stroke: #8a93a0;
        }
        span {
          font-size: 13px;
          color: #8a93a0;
          line-height: 18px;
          margin-left: 4px;
        }
        &:not(:last-child):after {
          content: '';
          position: absolute;
          top: 50%;
          right: 0;
          margin-top: -12px;
          width: 1px;
          height: 24px;
          background-color: #ebebeb;
        }
        &.active {
          span {
            color: #37c700;
          }
          .like-icon {
            stroke: #37c700;
            fill: #37c700;
          }
        }
      }
    }
  }
  .follow-user {
    .item-header {
      padding: 16px 20px;
    }
  }
}
</style>
