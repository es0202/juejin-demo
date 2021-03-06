<template>
  <div class="main">
    <div class="header">
      <ul class="list-header">
        <!--路由query切换article类型-->
        <li :class="type[1].includes($route.query.sort) ? 'list-item active' : 'list-item'" v-for="(type,index) in types" :key="index">
          <router-link :to="{path:$route.path,query:{sort: type[1][0]}}" @click.native="addActive">{{type[0]}}</router-link>
          <el-select @change="changeType" v-model="selected" class="el-page" :value="$route.query.sort" v-if="index==2">
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
        <a :href="item.node.originalUrl" v-for="item in articles" target="_blank" class="item-article">
          <!--不是同一域名，没法切换路由-->
          <!-- <router-link to="item.node.originalUrl" v-for="item in articles" tag="li" :key="item.node.id" class="item-article"> -->
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
                <li :class="item.node.viewerHasLiked?'action active':'action'" @click.prevent="hasLiked(item.node.id,$event)">
                  <svg class="like-icon">
                    <use xlink:href="#like" />
                  </svg>
                  <span class="count">{{item.node.likeCount}}</span>
                </li>
                <li class="action">
                  <svg class="comment-icon">
                    <use xlink:href="#comment" />
                  </svg>
                  <span class="count">{{item.node.commentsCount}}</span>
                </li>
              </ul>
            </div>
          </div>
          <img
            class="screenshot"
            v-if="item.node.screenshot"
            :src="item.node.screenshot.split('?')[0]+'?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'"
          />
          <!--不用v-show判断-->
          <!-- </router-link> -->
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
import config from '../../../config/http';
import { mapState, mapActions } from 'vuex';
import mixin from '../common/mixin'
export default {
  mixins:[mixin],
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
  computed: {
    ...mapState(['categoryId'])
  },
  mounted() {
    this.selected = this.$route.query.sort;
    //刷新页面也要记录当前categoryId，否则会显示推荐类别的文章
    //父组件中先判断categoryId是否存在再渲染当前组件
    this.initData();
    window.addEventListener('scroll', this.scrollEvent);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent);
  },
  methods: {
    ...mapActions(['changeCategory']),
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
      //标签id
      let category = {
        variables: {
          category: this.categoryId,
          tags: []
        }
      };
      if (isAppend && this.hasNextPage) {
        article_type.variables.after = this.endCursor;
      }
      let res = await axios.post(
        '/api/query',
        this.lodash.merge(
          {},
          config.param_common,
          config[
            this.$route.path.split('/home/')[1] == 'recommend' || !this.$route.path.split('/home/')[1]
              ? 'param_recommend'
              : 'param_others'
          ],
          article_type,
          category
        ),
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
      } else {
        //200 return error message
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
    },
    changeTag() {
      for (let i = 0; i < document.querySelector('.tag-wrap').children[0].children.length; ++i) {
        let item = document.querySelector('.tag-wrap').children[0].children[i];
        if (item.className.includes('active')) {
          this.changeCategory(item.getAttribute('data-id'));
        }
      }
    }
  },
  watch: {
    $route(to, from) {
      this.changeTag();
      this.selected = to.query.sort;
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
        display: flex;
        align-items: center;
        justify-content: space-between; //两端对齐
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
              .action {
                border: 1px solid #edeeef;
                display: flex;
                align-items: center;
                padding: 0 10px;
                &:not(:first-child) {
                  border-left: none;
                }

                &.active {
                  .like-icon {
                    fill: #6cbd45;
                  }
                  .count {
                    color: #6cbd45;
                  }
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
        .screenshot {
          width: 60px;
          height: 60px;
          flex: 0 0 auto;
        }
      }
    }
  }
}
</style>
