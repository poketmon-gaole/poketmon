<template>
  <router-view />
  <notifications group="top" position="top" width="100%"/>
  <notifications group="bottom" position="bottom right" width="280"/>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
html {
  height: 100%;
}
body {
  width:100%;
  height:100%;
  margin:0;
  padding:0;
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
