<template>
  <div class="main-wrap">
    <tag></tag>
    <div class="container">
      <articles></articles>
      <div class="aside">
        <authors></authors>
      </div>
    </div>
  </div>
</template>
<script>
import tag from '../header/tag';
import articles from '../common/articles';
import authors from '../common/authors';
export default {
  name: 'App',
  mounted() {
    let beforeScroll = window.scrollY;
    window.addEventListener('scroll', function() {
      let afterScroll = window.scrollY;
      if (window.scrollY > 150 && afterScroll - beforeScroll > 150) {
        //下滚
        beforeScroll = afterScroll;
        document.getElementsByClassName('header-wrap')[0].firstChild.className = 'container hide';
        document.getElementsByClassName('tag-wrap')[0].className = 'tag-wrap top';
        document.getElementsByClassName('sticky-block')[0].className = 'sticky-block top';
      } else if (beforeScroll - afterScroll > 100) {
        beforeScroll = afterScroll;
        document.getElementsByClassName('header-wrap')[0].firstChild.className = 'container';
        document.getElementsByClassName('tag-wrap')[0].className = 'tag-wrap';
        document.getElementsByClassName('sticky-block')[0].className = 'sticky-block';
      }
    });
  },
  components: {
    tag,
    articles,
    authors
  }
};
</script>
<style lang="less" scoped>
.main-wrap {
  padding-top: 60px;
  width: 100%;
  background-color: #f4f5f5;
  .container {
    max-width: 960px;
    margin: 0 auto;
    position: relative;
    .aside {
      position: absolute;
      top: 0;
      right: 0;
      width: 240px;
      [class$='-wrap'] {
        background: #fff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        border-radius: 2px;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
