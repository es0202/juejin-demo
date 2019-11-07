<template>
  <div class="authors-wrap">
    <div class="sticky-block">
      <p class="title">🎖️作者榜</p>
      <ul class="list-authors">
        <a :href="'https://juejin.im/user/'+item.id" class="item-author" v-for="item in authors" tag="li">
          <!-- <i class="avatar" :style="'background-image:url('+item.author.avatarLarge.split('?')[0]+'?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1)'"></i> -->
          <!--background-image还是会带referrer请求图片-->
          <img :src="item.author.avatarLarge.split('?')[0]+'?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'" alt class="avatar" />
          <div class="author-info">
            <p class="author-name">
              <span>{{item.author.username}}</span>
              <svg :class="'level-icon'+item.author.level">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#lv'+item.author.level" />
              </svg>
            </p>
            <p
              class="author-job"
            >{{item.author.jobTitle&&item.author.company?item.author.jobTitle+' @ '+item.author.company:item.author.jobTitle+item.author.company}}</p>
            <p class="author-des">{{item.description}}</p>
          </div>
        </a>
      </ul>
      <router-link to="/" class="full-author">
        完整榜单
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
    <div class="user-block">
      <p class="title">🎖️作者榜</p>
      <ul class="list-authors">
        <a :href="'https://juejin.im/user/'+item.id" class="item-author" v-for="item in authors" tag="li">
          <i class="avatar" :style="'background-image:url('+item.author.avatarLarge.split('?')[0]+'?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1)'"></i>
          <div class="author-info">
            <p class="author-name">
              <span>{{item.author.username}}</span>
              <svg :class="'level-icon'+item.author.level">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#lv'+item.author.level" />
              </svg>
            </p>
            <p
              class="author-job"
            >{{item.author.jobTitle&&item.author.company?item.author.jobTitle+' @ '+item.author.company:item.author.jobTitle+item.author.company}}</p>
            <p class="author-des">{{item.description}}</p>
          </div>
        </a>
      </ul>
      <router-link to="/" class="full-author">
        完整榜单
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import config from '../../../config/http';
export default {
  data() {
    return {
      authors: [],
      beforeScroll: ''
    };
  },
  mounted() {
    this.initData();
    this.beforeScroll = window.scrollY;
    window.addEventListener('scroll', this.scrollEvent);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent);
  },
  methods: {
    scrollEvent() {
      //滚动超过header+tag+author高度，sticky-block显示
      if (window.scrollY > 600) {
        document.getElementsByClassName('sticky-block')[0].style.opacity = 1;
      } else {
        document.getElementsByClassName('sticky-block')[0].style.opacity = 0;
      }
      //header显示sticky-block margin-top加60px
      let afterScroll = window.scrollY;
      if (window.scrollY > 150 && afterScroll - this.beforeScroll > 150) {
        this.beforeScroll = afterScroll;
        document.getElementsByClassName('sticky-block')[0].className = 'sticky-block top';
      } else if (this.beforeScroll - afterScroll > 100) {
        this.beforeScroll = afterScroll;
        document.getElementsByClassName('sticky-block')[0].className = 'sticky-block';
      }
    },
    async initData() {
      let res = await axios.post('/api/query', this.lodash.merge(config.param_authors, config.param_common), config.header);
      if (res.data.data && res.data.data.recommendationCard && res.data.data.recommendationCard.items) {
        let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        arr.sort(function() {
          return 0.5 - Math.random();
        }); //随机打乱数组
        this.authors.push(res.data.data.recommendationCard.items[arr[0]]);
        this.authors.push(res.data.data.recommendationCard.items[arr[1]]);
        this.authors.push(res.data.data.recommendationCard.items[arr[2]]);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.authors-wrap {
  .sticky-block {
    position: fixed;
    top: 127px;
    width: 240px;
    background: #fff;
    z-index: 5;
    opacity: 0;
    transition: all 0.2s;
  }
  .sticky-block.top {
    top: 60px;
  }
  .sticky-block,
  .user-block {
    .title {
      padding: 12px 16px;
      font-size: 14px;
      line-height: 16px;
      color: #333;
    }
    .list-authors {
      border-top: 1px solid hsla(0, 0%, 59.2%, 0.1);
      border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
      .item-author {
        padding: 12px 16px;
        display: flex;
        align-items: center;
        .avatar {
          width: 46px;
          height: 46px;
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          margin-right: 10px;
          flex: 0 0 auto; //不分配多余空间
          border-radius: 50%;
        }
        .author-info {
          overflow: hidden;
          .author-name {
            font-size: 14px;
            line-height: 18px;
            color: #333;
            display: flex;
            align-items: center;
            span {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              padding-right: 28px;
            }
            [class*='level-icon'] {
              width: 24px;
              height: 14px;
              padding: 0 2px;
              fill: #fff;
              margin-left: -24px;
            }
            .level-icon {
              &1 {
                background: #8cdbf4;
              }
              &2 {
                background: #6eceff;
              }
              &3 {
                background: #599dff;
              }
              &4 {
                background: #34d19b;
              }
              &5 {
                background: #ffa000;
              }
              &6 {
                background: #f36262;
              }
              //lv7、8颜色未知
              &7 {
                background: #f36262;
              }
              &8 {
                background: #f36262;
              }
            }
          }
          .author-job,
          .author-des {
            color: #909090;
            font-size: 12px;
            line-height: 18px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .full-author {
      text-align: center;
      height: 18px;
      font-size: 14px;
      color: #007fff;
      line-height: 18px;
      padding: 18px 0;
      display: inline-block;
      width: 100%;
    }
  }
}
</style>
