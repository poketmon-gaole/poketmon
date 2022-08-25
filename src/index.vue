<template>
  <img alt="포캣몬 가오레 Logo" src="@/assets/img/poketmon.png" height="170">
  <PoketmonMain msg="포캣몬 가오레 레전드 1탄"/>
</template>

<script>
import PoketmonMain from '@/components/main.vue'

export default {
  name: 'App',
  components: {
    PoketmonMain
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  background-color: #ffd057 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
}
</style>
