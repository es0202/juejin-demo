export default {
  data() {
    return {
      // $_authorInfo: String
    }
  },
  methods: {
    authorInfo(jobTitle, company, createdAt) {
      //复杂表达式重构为计算属性
      return jobTitle + (company ? ' @ ' + company : '');
    },
    calDate(date) {
      let _date = this.date - new Date(date);
      let _year = Math.floor(_date / (365 * 24 * 60 * 60 * 1000));
      let _month = Math.floor(_date / (30 * 24 * 60 * 60 * 1000));
      let _day = Math.floor(_date / (24 * 60 * 60 * 1000));
      let _hour = Math.floor(_date / (60 * 60 * 1000));
      let _minutes = Math.floor(_date / (60 * 1000));
      let _second = Math.floor(_date / 1000);
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
      if (e.currentTarget.className.includes('active')) {
        //已经点赞
        //绕不过cros的预检
        // axios
        //   .delete('https://user-like-wrapper-ms.juejin.im/v1/user/like/entry/' + id, config.header1)
        //   .then(v => {
        e.currentTarget.className = 'action';
        e.currentTarget.children[1].innerText = Number(e.currentTarget.children[1].innerText) - 1;
        // })
        // .catch(err => {
        //   console.log(err);
        // });
      } else {
        // axios
        //   .put('https://user-like-wrapper-ms.juejin.im/v1/user/like/entry/' + id, config.header1)
        //   .then(v => {
        e.currentTarget.className = 'action active';
        e.currentTarget.children[1].innerText = Number(e.currentTarget.children[1].innerText) + 1;
        // })
        // .catch(err => {
        //   console.log(err);
        // });
      }
    },
    showContent(content) {
      return content.split('\n').length > 6 ?
        content.split('\n').slice(0, 5).reduce((x, y) => {
          if (y) {
            return (x + '\n' + y)
          } else {
            return (x + y)
          }
        }) + '...' :
        content
    }
  }
}
