<template>
  <div id="container">
    <h1>{{ initData }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initData: 'Vue 开发环境运行ahah'
    }
  } 
}
</script>

<style>
#container {
  color: yellow;
  display: flex;
}
</style>