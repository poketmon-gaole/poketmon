<template>
  <router-view />
  <notifications position="bottom right" width="280"/>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', '//t1.daumcdn.net/kas/static/ba.min.js')
    document.head.appendChild(recaptchaScript)
  }
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
