<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      포캣몬가오레 5성과 4성의 상성 관계를 알아보자
    </p>
    <h3>5성</h3>
    <ul>
      <li>
          <div>
            <div class="type-box-top">
              <img alt="포맷몬 가오레" src="../assets/r1_05_01.png">
            </div>
            <div class="type-box-bottom">
              <span class="type1">프리저(얼음/비행)</span>
              <span class="type2">방어/특수방어</span>
            </div>
          </div>
      </li>
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
.type-box-top {
  float: left;
  width: 64%;
}
.type-box-bottom {
  float: left;
  width: 36%;
}
.type-box-bottom .type1 {
    font-weight: bold;
    color: chocolate;
    float: left;
    margin: 0 0 0 5px;
}
.type-box-bottom .type2 {
    margin: 10px 0 0 0;
    display: inline-block;
}
</style>
