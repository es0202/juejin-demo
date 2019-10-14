<template>
  <div class="header-wrap">
    <div class="container">
      <div class="fix-wrap">
        <svg class="logo-icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#logo" />
        </svg>
        <div class="title">掘金</div>
        <!--宽度>980px显示-->
        <ul class="nav-list">
          <li :class="$route.matched[0].path=='/home'?'nav-item active':'nav-item'">
            <router-link to="/home">首页</router-link>
          </li>
          <li :class="$route.matched[0].path=='/boiling'?'nav-item active':'nav-item'">
            <router-link to="/boiling">沸点</router-link>
          </li>
          <li class="nav-item">
            <a href>话题</a>
          </li>
          <li class="nav-item">
            <a href>小册</a>
          </li>
          <li class="nav-item">
            <a href>活动</a>
          </li>
          <li class="nav-item">
            <a href>一键搬家</a>
          </li>
        </ul>
        <div class="search">
          <form action class="search-form">
            <input type="search" placeholder="搜索掘金" class="search-input" maxlength="32" />
            <svg class="search-icon">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search" />
            </svg>
          </form>
        </div>
        <div class="add">
          <el-button type="primary">写文章</el-button>
          <el-button type="primary">
            <i class="el-icon-caret-bottom"></i>
          </el-button>
        </div>
        <svg class="tip-icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tip" />
        </svg>
        <svg class="user-icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user" />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
// export default {
//   data() {
//     return{};
//   },
// };
</script>
<style lang="less" scoped>
.wh(@width,@height) {
  width: @width;
  height: @height;
}
.logo-icon {
  .wh(45px, 38px);
}
.tip-icon {
  .wh(20px, 24px);
  padding: 0 10px;
  fill: #71777c;
}
.user-icon {
  .wh(36px, 36px);
  padding-left: 10px;
  fill: #d8d8d8;
}
.header-wrap {
  z-index: 200;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  background: #fff; //随滚动上移，不能覆盖住滚动层
  position: relative;
  height: 60px;
  .container {
    transition: all 0.2s;
    transform: translateZ(0); //过渡效果使用
    width: 100%;
    background: #fff; //fixed元素占宽100%有背景才可盖住滚动层
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    &.hide {
      transform: translate3d(0, -100%, 0);
    }
    .fix-wrap {
      max-width: 960px;
      margin: 0 auto;
      height: 60px;
      display: flex;
      align-items: center;
      .title {
        font-size: 34px;
        line-height: 34px;
        color: #007fff;
        padding-left: 10px;
      }
      .nav-list {
        flex: 1;
        display: flex;
        padding-left: 10px;
        .nav-item {
          font-size: 16px;
          padding: 0 18px;
          color: #71777c;
          &.active {
            color: #007fff;
          }
        }
      }
      .search-form {
        border: 1px solid hsla(0, 0%, 59.2%, 0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .search-input {
          width: 120px;
          height: 30px;
          padding: 7px 12px;
          font-size: 14px;
          outline: none;
          border: none;
          border-radius: 2px;
        }
        .search-icon {
          .wh(20px, 20px);
          fill: #babec3;
          padding: 0 6px;
        }
      }
      .add {
        padding: 0 14px 0 28px;
        .el-button {
          line-height: 32px;
          height: 32px;
          background-color: #007fff;
          padding: 0;
          border-radius: 0;
          &:nth-child(1) {
            padding: 0 10px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }
          &:nth-child(2) {
            margin: 0;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            border-left: none;
          }
          .el-icon-caret-bottom {
            padding: 0 2px;
            font-size: 6px;
          }
        }
      }
    }
  }

  &.visible {
    transform: translate(0);
  }
}
//placeholder颜色
::-moz-placeholder {
  color: #babec3;
}
::-webkit-input-placeholder {
  color: #babec3;
}
:-ms-input-placeholder {
  color: #babec3;
}
</style>
