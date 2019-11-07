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
                <div class="info">{{authorInfo(item.node.targets[0].user.jobTitle,item.node.targets[0].user.company,item.node.targets[0].createdAt)}}</div>
                <div v-if="item.node.targets[0].user.jobTitle||item.node.targets[0].user.company" class="dot">·</div>
                <div class="time">{{calDate(item.node.targets[0].createdAt)}}</div>
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
          <div
            class="article-content"
          >{{item.node.targets['0'].content.slice(0,-54)?item.node.targets['0'].content.slice(0,-54)+'...':item.node.targets['0'].content}}</div>
        </router-link>
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
    </div>
  </div>
</template>
<script>
import config from '../../../config/http';
import mixin from '../common/mixin';
export default {
  mixins: [mixin],
  data() {
    return {
      followArticles: [],
      hasNextPage: '',
      endCursor: '',
      date: new Date(),
      loadMore: false, //防止持续请求数据
    };
  },
  mounted() {
    this.initData();
    window.addEventListener('scroll', this.scrollEvent);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent);
  },
  methods: {
    scrollEvent() {
      if (window.scrollY + document.documentElement.clientHeight + 300 > document.documentElement.scrollHeight) {
        if (this.loadMore) {
          this.initData('true');
        }
      } else {
        this.loadMore = true;
      }
    },
    async initData(isAppend) {
      this.loadMore = false;
      let param_follow = config.param_follow;
      if (isAppend && this.hasNextPage) {
        param_follow.variables.after = this.endCursor;
      }
      let res = await axios.post('/api/query', this.lodash.merge({}, param_follow, config.param_common), config.header);
      if (res.data.data.followingArticleFeed && res.data.data.followingArticleFeed.items) {
        if (isAppend && this.hasNextPage) {
          //push可触发数组更新检测
          this.followArticles.push(...res.data.data.followingArticleFeed.items.edges);
        } else {
          this.followArticles = res.data.data.followingArticleFeed.items.edges;
        }
        this.hasNextPage = res.data.data.followingArticleFeed.items.pageInfo.hasNextPage;
        this.endCursor = res.data.data.followingArticleFeed.items.pageInfo.endCursor;
      }
    }
  }
};
</script>
<style lang="less" src="../../../static/css/action.less" scoped />
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
          font-weight: 600;
        }
        .author-info {
          font-size: 13px;
          color: #8a9aa9;
          margin-top: 2px;
          display: flex;
          align-items: center;
          .info {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 288px;
          }
          .dot {
            margin: 0 6px;
          }
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
      font-size: 15px;
      margin: 4px 16px 0 0;
      line-height: 1.53;
      color: #5c6066;
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
  }
}
</style>
