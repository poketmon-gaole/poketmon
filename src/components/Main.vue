<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      포캣몬가오레 5성과 4성의 상성 관계를 알아보자
    </p>
    <h3>5성</h3>
    <ul>
      <li><img alt="포맷몬 가오레" src="../assets/r1_05_01.png"></li>
      <li><img alt="포맷몬 가오레" src="../assets/r1_05_02.png"></li>
      <li><img alt="포맷몬 가오레" src="../assets/r1_05_03.png"></li>
      <li><img alt="포맷몬 가오레" src="../assets/r1_05_04.png"></li>
      <li><img alt="포맷몬 가오레" src="../assets/r1_05_05.png"></li>
      <li><img alt="포맷몬 가오레" src="../assets/r1_05_06.png"></li>
    </ul>
    <h3>4성</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PocktmonMain',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
