<template>
  <div class="boiling-articles">
    <div class="follow-article-wrap" v-for="(item,index) in articles" :key="index">
      <div class="article-item" v-if="item.node.action!='FOLLOW_USER'">
        <div class="source-header" v-if="item.node.action.indexOf('LIKE')>-1">
          <span>你关注的</span>
          <span class="follower">{{item.node.actors[0].username}}</span>
          <span>赞了这篇{{item.node.action.indexOf('ARTICLE')>-1?'文章':'沸点'}}</span>
        </div>
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
        <router-link v-if="item.node.action.indexOf('ARTICLE')>-1" class="item-content" :to="item.node.targets['0'].originalUrl">
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
        <div v-else>
          <div class="pin-content">
            <div class="content">{{(item.node.targets[0].content.length>170 && item.node.targets[0].content.split('\n').length>6)
              ?item.node.targets[0].content.split('\n').slice(0,6).reduce((x,y)=>(x+'\n'+y))+'...'
              :item.node.targets[0].content}}</div>
            <div class="limit-box">
              <div
                class="limit-btn"
                v-show="item.node.targets[0].content.length>170&&item.node.targets[0].content.split('\n').length>5"
                @click="toggleContent(item.node.targets[0].content,$event)"
              >展开</div>
            </div>
          </div>
          <!--图片按比例显示，长图宽度小，多张问题，padding-top撑开高度-->
          <!-- <div class="pin-image" v-if="item.node.targets[0].pictures&&item.node.targets[0].pictures.length>0">
            <div
              :class="item.node.targets[0].pictures[0].split('w=')[1]>1000?'image long':'image'"
              :style="'background-image:url('+item.node.targets[0].pictures[0].split('?')[0]+'?imageView2/1/w/460/h/316/q/85/format/jpg/interlace/1)'"
            ></div>
          </div> -->
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
            <span>{{item.node.targets[0].commentsCount||item.node.targets[0].commentCount}}</span>
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
      if (e.currentTarget.className.indexOf('active') > -1) {
        e.currentTarget.className = 'action';
        e.currentTarget.children[1].innerText = Number(e.currentTarget.children[1].innerText) - 1;
      } else {
        e.currentTarget.className = 'action active';
        e.currentTarget.children[1].innerText = Number(e.currentTarget.children[1].innerText) + 1;
      }
    },
    toggleContent(content, e) {
      if (e.currentTarget.parentElement.previousElementSibling.innerHTML == content) {
        e.currentTarget.parentElement.previousElementSibling.innerHTML =
          content
            .split('\n')
            .slice(0, 6)
            .reduce((x, y) => x + '\n' + y) + '...';
        e.currentTarget.innerText = '展开';
      } else {
        e.currentTarget.parentElement.previousElementSibling.innerHTML = content;
        e.currentTarget.innerText = '收回';
      }
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent);
  }
};
</script>
<style lang="less" scoped>
.boiling-articles {
  .article-item,
  .follow-user {
    background: #fff;
    margin-bottom: 8px;
    .source-header {
      display: flex;
      align-items: center;
      height: 42px;
      padding: 0 20px;
      border-bottom: 1px solid #ebebeb;
      color: #8a9aa9;
      font-size: 13px;
      .follower {
        color: #17181a;
        font-weight: 500;
        margin: 0 4px;
      }
    }
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
            font-weight: 600;
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
    .pin-content {
      margin: 5px 48px 5px 78px;
      .content {
        font-size: 15px;
        color: #17181a;
        line-height: 24px;
        white-space: pre-wrap;
        overflow: hidden;
        // display: -webkit-box;
        // -webkit-line-clamp: 9;
        // -webkit-box-orient: vertical;
      }
      .limit-box {
        .limit-btn {
          margin-top: 5px;
          color: #007fff;
          cursor: pointer;
          user-select: none;
          font-size: 15px;
          line-height: 1.6;
        }
      }
    }
    .pin-image {
      display: flex;
      flex-wrap: wrap; //多张图片时
      margin: 5px 48px 5px 78px;
      .image {
        flex: 0 1 auto;
        position: relative;
        margin-top: 4px;
        max-width: 100%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        cursor: zoom-in;
        width: 200px;
        &.long {
          width: 148px;
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
