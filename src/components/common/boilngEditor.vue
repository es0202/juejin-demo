<template>
  <div class="editor-wrap empty">
    <div class="content" :placeholder="text" contenteditable="true" @blur="blur" @focus="focus" @input="input">{{val}}</div>
    <div class="bottom">
      <ul class="picker-list">
        <li class="picker-item">
          <svg class="icon">
            <use xlink:href="#emoji" />
          </svg>
          <span>表情</span>
        </li>
        <li class="picker-item">
          <svg class="icon">
            <use xlink:href="#picture" />
          </svg>
          <span>图片</span>
        </li>
        <li class="picker-item">
          <svg class="icon">
            <use xlink:href="#link" />
          </svg>
          <span>链接</span>
        </li>
        <li class="picker-item">
          <svg class="icon">
            <use xlink:href="#topic" />
          </svg>
          <span>话题</span>
        </li>
      </ul>
      <ul class="submit-list">
        <li class="submit-item">Ctrl or ⌘ + Enter</li>
        <li class="submit-item">
          <button>发布</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: '',
      val: ''
    };
  },
  mounted() {
    this.initText();
  },
  methods: {
    async initText() {
      let res = await axios.get('/api2/getNowPlaceholderGuide', { params: { src: 'web', source: 'web' } });
      if (res.data.s == 1 && res.data.d && res.data.d.data) {
        this.text = res.data.d.data;
      }
    },
    blur(e) {
      e.currentTarget.className = e.currentTarget.className.replace(/ active/g, '');
    },
    focus(e) {
      e.currentTarget.className += ' active';
    },
    input(e) {
      if (e.currentTarget.innerText != '') {
        e.currentTarget.parentNode.className = e.currentTarget.parentNode.className.replace(/ empty/g, '');
      } else {
        e.currentTarget.parentNode.className.indexOf('empty') == -1 ? (e.currentTarget.parentNode.className += ' empty') : '';
      }
    }
  }
};
</script>
<style lang="less" scoped>
.editor-wrap {
  padding: 16px 20px 10px 20px;
  background: #fff;
  margin-bottom: 8px;
  &.empty {
    .content:after {
      content: attr(placeholder);
      position: absolute;
      top: 8px;
      color: rgba(23, 24, 26, 0.4);
    }
    .content.active:after {
      opacity: 0.7;
    }
    .bottom{
      .submit-list{
        button{
          opacity: 0.2;
        }
      }
    }
  }
  .content {
    border: 1px solid hsla(0, 0%, 59.2%, 0.2);
    border-radius: 2px;
    position: relative;
    padding: 8px 10px;
    min-height: 75px;
    font-size: 15px;
    color: #17181a;
    &.active {
      border-color: #007fff;
    }
  }
  .bottom {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .picker-list {
      display: flex;
      align-items: center;
      .picker-item {
        margin-right: 18px;
        span {
          font-size: 13px;
          line-height: 16px;
          height: 16px;
          vertical-align: middle;
          color: #027fff;
          margin-left: 2px;
        }
        .icon {
          width: 16px;
          height: 16px;
          fill: #027fff;
          vertical-align: middle;
        }
      }
    }
    .submit-list {
      .submit-item {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        color: #c2c2c2;
        font-size: 15px;
        button {
          margin-left: 4px;
          width: 72px;
          height: 32px;
          background: #027fff;
          color: #fff;
          font-size: 15px;
          border-radius: 2px;
          border: none;
        }
      }
    }
  }
}
</style>
