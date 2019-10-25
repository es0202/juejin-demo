<template>
  <div class="pie-wrap">
    <!--头部作者信息-->
    <div class="pie-header">
      <div class="header-content">
        <div class="header-img">
          <img
            class="user-img"
            v-if="user.avatarLarge"
            :src="user.avatarLarge.split('?')[0]
              +'?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'"
          />
          <svg class="user-img" v-else>
            <use xlink:href="#user" />
          </svg>
        </div>
        <div class="header-info">
          <div class="author-name">{{user.username}}</div>
          <div class="author-info">
            <div class="info">
              {{user.jobTitle
              +(user.company ? ' @ '+user.company : '')}}
            </div>
            <div v-if="user.jobTitle||user.company" class="dot">·</div>
            <div class="time">{{date}}</div>
          </div>
        </div>
      </div>
      <div class="header-more">
        <div class="header-follow" v-show="!user.viewerIsFollowing">关注</div>
      </div>
    </div>
    <!---->
  </div>
</template>
<script>
export default {
  props: ['user', 'date'],
  mounted() {
    console.log(this.date);
  }
};
</script>
<style lang="less" scoped>
.pie-wrap {
  background: #fff;
  margin-bottom: 8px;
  .pie-header {
    padding: 16px 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-content {
      display: flex;
      align-items: center;
      .header-img {
        width: 46px;
        height: 46px;
        flex: 0 0 auto;
        .user-img {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          fill: #d8d8d8;
        }
      }
      .header-info {
        margin-left: 12px;
        max-width: 288;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .author-name {
          font-size: 15px;
          color: #2e3135;
          display: flex;
          align-items: center;
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
    .header-more {
      .header-follow {
        width: 55px;
        height: 26px;
        line-height: 26px;
        font-size: 13px;
        border-color: #6cbd45;
        color: #6cbd45;
        border: 1px solid #37c700;
        text-align: center;
        border-radius: 2px;
        opacity: 0.8;
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
  .pin-topic {
    margin: 8px 48px 16px 78px;
    .topic-title {
      font-size: 13px;
      line-height: 22px;
      padding: 0 12px;
      border: 1px solid #007fff;
      border-radius: 14px;
      color: #007fff;
      display: inline-block;
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
</style>
