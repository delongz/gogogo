<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button @click="$emit('getPageNo',1)" v-show="pageNo>3" :class="{active:pageNo == 1}">1</button>
    <button v-show="pageNo>4">...</button>

    <!-- 中间部分 -->
    <span v-for="(page,index) in startNumAndEndNum.end" :key="index" @click="$emit('getPageNo',page)">
      <button v-if="page>=startNumAndEndNum.start" :class="{active:pageNo == page}">{{page}}</button>
    </span>    

    <button v-show="startNumAndEndNum.end<totalPage-1">...</button>
    <button v-show="startNumAndEndNum.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo == totalPage}">{{totalPage}}</button>
    <button @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "IsPagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总页数
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续的页码的起始位置和结束位置
    startNumAndEndNum() {
      const { pageNo, continues, totalPage } = this;
      // 先定义两个变量储藏初始值和结束值
      let start = 0,
        end = 0;
      // 不正常现象（页面在初始值的位置）
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        // 正常现象，但是continues不固定
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
      }
      // 当初识值在1时，左侧的数值要向右侧移
      if (start < 1) {
        start = 1;
        end = continues;
      }
      // 如果页面在最后时，页面右侧的值要向左侧移
      if (end > totalPage) {
        end = totalPage;
        start = totalPage - continues + 1;
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  .backColor{
  background: skyblue;
}
}
</style>
