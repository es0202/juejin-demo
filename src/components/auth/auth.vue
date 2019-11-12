<template>
  <div class="auth-wrapper">
    <form action="#" class="auth-form">
      <div class="panel">
        <svg class="close" @click="closePanel">
          <use xlink:href="#close" />
        </svg>
        <div class="title">登录</div>
        <div class="input-group">
          <div class="input-box">
            <input class="input" type="text" v-model="username" maxlength="64" placeholder="请输入手机号或邮箱" />
          </div>
          <div class="input-box">
            <input class="input" type="text" v-model="passpord" maxlength="64" placeholder="请输入密码" />
          </div>
        </div>
        <button class="btn" @click="login">登录</button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      username: '',
      passpord: ''
    };
  },
  computed: {
    ...mapState(['logined'])
  },
  methods: {
    login() {
      if (this.username == '111' && this.passpord == '222') {
        this.$store.commit('SAVE_USERINFO', { username: '111', id: '1',avatarLarge:'https://user-gold-cdn.xitu.io/2019/10/9/16daf19226ac3077' });
        //加cookie
      }
    },
    closePanel(e) {
      this.$el.style.display = 'none';
      this.passpord = '';
      this.username = '';
    }
  }
};
</script>
<style lang="less" scoped>
.auth-wrapper {
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 500;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  //form水平垂直居中
  display: flex;
  align-items: center;
  justify-content: center;
  .auth-form {
    width: 318px;
    height: 234px;
    box-sizing: border-box;
    padding: 24px;
    background: #fff;
    .panel {
      position: relative;
      .close {
        width: 10px;
        height: 10px;
        fill: #adadad;
        position: absolute;
        top: 0;
        right: 0;
      }
      .title {
        font-size: 18px;
        color: #333;
        font-weight: bold;
        margin-bottom: 24px;
      }
      .input-group {
        margin-bottom: 6px;
        overflow: hidden; //BFC
        .input-box {
          margin-bottom: 10px;
          .input {
            width: 100%;
            padding: 10px;
            border: 1px solid #e9e9e9;
            border-radius: 2px;
            outline: none;
            box-sizing: border-box;
          }
        }
      }
      .btn {
        width: 100%;
        height: 40px;
        color: #fff;
        background-color: #007fff;
        border-radius: 2px;
        outline: none;
        box-sizing: border-box;
        cursor: pointer;
        border: none;
        padding: 6px 16px;
      }
    }
  }
}
</style>
