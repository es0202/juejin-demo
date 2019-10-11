<template>
  <div class="suspension-panel">
    <el-button icon="el-icon-caret-top" @click.native="scrollTop(0,500)"></el-button>
  </div>
</template>
<script>
export default {
  methods: {
    scrollTop(number = 0, time) {
      //scrollTop不能用箭头函数,this会指向window
      //平滑滚动至顶部
      // if (!time) {
      //   document.body.scrollTop = document.documentElement.scrollTop = number;
      //   return number;
      // }
      // const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
      // let spacingInex = time / spacingTime; // 计算循环的次数
      // let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
      // let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
      // let scrollTimer = setInterval(() => {
      //   if (spacingInex > 0) {
      //     spacingInex--;
      //     this.scrollTop((nowTop += everTop));
      //   } else {
      //     clearInterval(scrollTimer); // 清除计时器
      //   }
      // }, spacingTime);

      //一次到位
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>
<style lang="less" scoped>
.suspension-panel {
  position: fixed;
  right: 24px;
  bottom: 24px;
  /deep/ .el-button {
    border-radius: 50%;
    padding: 12px;
  }
}
</style>
