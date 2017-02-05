<template>
  <div>
    <style>
    body {
      font-size: 300%;
      text-align: center;
      word-break: break-word;
    }
    /* 如果支持flex布局 */
    /* 更优雅的水平/垂直居中方式 */
    html {
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }
    body {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    </style>
    <img v-if="image" :src="image">
    <h1 v-else v-text="text" :style="textStyle"></h1>
  </div>
</template>

<script>
export default {
  head () {
    return {
      // title: this.text
      title: '..'
    }
  },

  data ({ query }) {
    return {
      image: query.image || '',
      text: query.text || '',
      textSize: query.size || '1'
    }
  },

  computed: {
    textStyle () {
      return {
        'font-size': this.textSize + 'em'
      }
    }
  }
}
</script>

<style scoped>
h1 {
  margin: 40px;
}
img {
  display: block;
  max-width: 100%;
}
</style>
