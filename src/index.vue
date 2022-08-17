<template>
  <img alt="포맷몬 가오레 로고" src="./assets/poketmon.png" height="170">
  <PoketmonMain msg="포맷몬 가오레 레전드 1탄"/>
</template>

<script>
import PoketmonMain from './components/Main.vue'

export default {
  name: 'App',
  components: {
    PoketmonMain
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
}
</style>
