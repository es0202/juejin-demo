<template>
  <div class="main">
    <div class="header">
      <ul class="list-header">
        <!--路由query切换article类型-->
        <li :class="type[1].indexOf($route.query.sort)>-1 ? 'list-item active' : 'list-item'" v-for="(type,index) in types" :key="index">
          <router-link :to="{path:$route.path,query:{sort: type[1][0]}}" @click.native="addActive">{{type[0]}}</router-link>
          <el-select @change="changeType" v-model="selected" class="el-page" value="THREE_DAYS_HOTTEST" placeholder="3天内" v-if="index==2">
            <el-option value="THREE_DAYS_HOTTEST" label="3天内"></el-option>
            <el-option value="WEEKLY_HOTTEST" label="7天内"></el-option>
            <el-option value="MONTHLY_HOTTEST" label="30天内"></el-option>
            <el-option value="HOTTEST" label="全部"></el-option>
          </el-select>
        </li>
      </ul>
    </div>
    <div class="articles-wrap">
      <ul class="list-articles">
        <router-link to="item.node.originalUrl" v-for="item in articles" tag="li" :key="item.node.id" class="item-article">
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
  </div>
</template>

<script>
import config from '../../../config/http';
export default {
  data() {
    return {
      articles: [],
      date: new Date(),
      types: [
        ['热门', [undefined, 'POPULAR']], //没有query param显示热门
        ['最新', ['NEWEST']],
        ['热榜', ['THREE_DAYS_HOTTEST', 'WEEKLY_HOTTEST', 'MONTHLY_HOTTEST', 'HOTTEST']]
      ],
      selected: '', //el-select双向绑定值
      hasNextPage: '',
      endCursor: '',
      loadMore: false //防止持续请求数据
    };
  },
  mounted() {
    const that = this;
    this.initData();
    window.addEventListener('scroll', () => {
      if (window.scrollY + document.documentElement.clientHeight + 300 > document.documentElement.scrollHeight) {
        if (that.loadMore) {
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
      let article_type;
      if (this.$route.query.sort) {
        article_type = {
          variables: {
            order: this.$route.query.sort
          }
        };
      } else {
        article_type = {
          variables: {
            order: 'POPULAR'
          }
        };
      }
      if (isAppend && this.hasNextPage) {
        article_type.variables.after = this.endCursor;
      }
      let res = await axios.post(
        '/api/query',
        this.lodash.merge({}, config.param_recommend, article_type, config.param_common),
        config.header
      );
      if (res.data.data.articleFeed && res.data.data.articleFeed.items && res.data.data.articleFeed.items.edges) {
        if (isAppend && this.hasNextPage) {
          //push可触发数组更新检测
          this.articles.push(...res.data.data.articleFeed.items.edges);
        } else {
          this.articles = res.data.data.articleFeed.items.edges;
        }
        this.hasNextPage = res.data.data.articleFeed.items.pageInfo.hasNextPage;
        this.endCursor = res.data.data.articleFeed.items.pageInfo.endCursor;
      }
      else{
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
    addActive(e) {
      e.target.parentNode.parentNode.childNodes.forEach(e => {
        e.className = 'list-item';
      });
      e.target.parentNode.className += ' active';
    },
    changeType(data) {
      //路由跳转，但是只修改了query，页面不会刷新
      this.$router.push({
        path: '/home',
        query: { sort: data }
      });
    }
  },
  watch: {
    $route(to, from) {
      //监听路由改变
      this.initData();
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  background-color: #fff;
  width: 700px;
  .header {
    height: 46px;
    .list-header {
      padding: 15px 15px;
      display: flex;
      align-items: center;
      .list-item {
        font-size: 14px;
        line-height: 18px;
        height: 18px;
        padding: 0 12px;
        color: #909090;
        border-right: 1px solid hsla(0, 0%, 59.2%, 0.2);
        display: flex;
        align-items: center;
        &:last-child {
          border-right: none;
        }
        .el-page {
          display: none;
          margin-left: 14px;
          .type-text {
            font-size: 12px;
          }

          /deep/ .el-input {
            font-size: 12px;
            .el-input__inner {
              //elementUI box-sizing:border-box
              width: 72px;
              height: 18px;
              padding: 2px 10px;
              font-size: 12px;
              line-height: 12px;
            }
            .el-input__icon {
              line-height: 14px;
              width: 14px;
            }
          }
        }
        &.active {
          color: #007fff;
          .el-page {
            display: inline-block;
          }
        }
      }
    }
  }

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
}
</style>
