<template>
  <div class="sidebar-wrap">
    <!--已登录显示-->
    <div class="profile-box">
      <div class="profile">
        <img src alt class="avater" />
        <span class="user-name">薤露</span>
      </div>
      <ul class="stat-list">
        <li class="list-item">
          <span class="item-title">沸点</span>
          <span class="item-num"></span>
        </li>
        <li class="list-item">
          <span class="item-title">关注</span>
          <span class="item-num"></span>
        </li>
        <li class="list-item">
          <span class="item-title">关注者</span>
          <span class="item-num"></span>
        </li>
      </ul>
    </div>
    <div class="recommend-boiling">
      <div class="title">推荐沸点</div>
      <ul class="recommend-list">
        <li class="list-item" v-for="item in recommends">
          <div class="content-box">
            <div class="content">{{item.content}}</div>
            <div class="action">
              <span class="like">{{item.likedCount}}赞</span>
              ·
              <span class="comment">{{item.commentCount}}评论</span>
            </div>
          </div>
          <!--有多张图片，但是sidebar里只显示一张-->
          <img :src="item.pictures[0]" v-show="item.pictures[0]" alt class="screenshot" />
        </li>
      </ul>
    </div>
    <a class="guide-link" href="https://juejin.im/book/5c90640c5188252d7941f5bb/section/5c90673ee51d452a0748c424" target="_blank" rel="noopener noreferrer">
      <img class="icon" src="https://b-gold-cdn.xitu.io/v3/static/img/guide-icon.6c1b9a0.svg" alt />
      <span class="text">如何玩转沸点</span>
    </a>
    <div class="sticky-box">
      <a class="guide-link" href="https://juejin.im/book/5c90640c5188252d7941f5bb/section/5c90673ee51d452a0748c424" target="_blank" rel="noopener noreferrer">
        <img class="icon" src="https://b-gold-cdn.xitu.io/v3/static/img/guide-icon.6c1b9a0.svg" alt />
        <span class="text">如何玩转沸点</span>
      </a>
    </div>
  </div>
</template>
<script>
import config from '../../../config/http';
export default {
  data() {
    return {
      recommends: []
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
      if (window.scrollY > document.querySelector('.sidebar-wrap').clientHeight) {
        document.getElementsByClassName('sticky-box')[0].style.opacity = 1;
      } else {
        document.getElementsByClassName('sticky-box')[0].style.opacity = 0;
      }
    },
    async initData() {
      var res = await axios.get('/api3/getHotRecommendList', {
        params: {
          uid: '585fa5c561ff4b00581cd431',
          device_id: '1571020402280',
          token:
            'eyJhY2Nlc3NfdG9rZW4iOiI4UGxmblhQWnMxTlZHaDJsIiwicmVmcmVzaF90b2tlbiI6IktMcnluOGpsQUJ6RXJDeHMiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
          src: 'web'
        }
      });
      if (res.data.m && res.data.d.list) {
        this.recommends = res.data.d.list.slice(0, 3);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.sidebar-wrap {
  width: 248px;
  .profile-box {
    margin-bottom: 8px;
    border-radius: 4px;
    padding: 16px;
    display: none;
    background-color: #fff;
  }
  .recommend-boiling {
    margin-bottom: 8px;
    background-color: #fff;
    .title {
      font-size: 15px;
      padding: 13px 16px;
      border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
    }
    .recommend-list {
      padding: 0 16px;
      .list-item {
        padding: 12px 0;
        display: flex;
        align-items: center;
        &:not(:last-child) {
          border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
        }
        .content-box {
          flex: 1;
          .content {
            // white-space: nowrap;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            max-height: 36px;
            line-height: 18px;
            //显示两行数据，超出省略号显示
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
            color: #2e3135;
          }
          .action {
            font-size: 12px;
            color: #76797e;
            margin-top: 16px;
          }
        }
        .screenshot {
          width: 68px;
          height: 68px;
          flex: 0 0 auto;
          margin-left: 12px;
          border-radius: 4px;
        }
      }
    }
  }
  .guide-link {
    padding: 16px;
    background-color: #fff;
    display: flex;
    align-items: center;
    .icon {
      width: 36px;
      height: 36px;
      margin-right: 10px;
    }
    .text {
      font-size: 14px;
      color: #2e3135;
    }
  }
  .sticky-box {
    position: fixed;
    top: 8px;
    width: 248px;
    z-index: 5;
    opacity: 0;
    transition: all 0.2s;
  }
}
</style>
