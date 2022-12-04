<template>
  <b-overlay :show="show" rounded="sm">
    <PoketmonMain msg="포캣몬" :aria-hidden="show" @start-loader="startLoader"/>
  </b-overlay>
</template>

<script>
import PoketmonMain from '@/components/main.vue'

export default {
  name: 'Home',
  components: {
    PoketmonMain
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    startLoader(value) {
      this.show = value
    }
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
