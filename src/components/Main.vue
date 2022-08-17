<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <!-- 포캣몬 가오레 5성과 4성의 상성 관계를 알아보자 -->
    </p>
    <h3>5성</h3>
    <ul>
      <li>
          <div>
            <div class="type-box-left">
              <span>프리져</span>
              <img alt="포캣몬 가오레" src="../assets/r1_05_01.png">
            </div>
            <div class="type-box-right">
              <span>속성:(얼음/비행)</span>
              <span>공격: 135</span>
              <span>특수공격: 135</span>
              <span>방어: 135</span>
              <span>기술: 눈보라</span>
              <span></span>
            </div>
            <div class="type-box-bottom">
                <span>추천 : </span>
                <span>(얼음<img alt="포캣몬 가오레" src="../assets/t15.png" width="25" height="25">/비행<img alt="포캣몬 가오레" src="../assets/t03.png" width="25" height="25">)</span>
            </div>
            <div class="type-box-bottom">
              <span>비추천 : </span>
              <span>(땅 <img alt="포캣몬 가오레" src="../assets/t05.png" width="25" height="25">)</span>
            </div>
          </div>
      </li>
      <li><img alt="포캣몬 가오레" src="../assets/r1_05_02.png"></li>
      <li><img alt="포캣몬 가오레" src="../assets/r1_05_03.png"></li>
      <li><img alt="포캣몬 가오레" src="../assets/r1_05_04.png"></li>
      <li><img alt="포캣몬 가오레" src="../assets/r1_05_05.png"></li>
      <li><img alt="포캣몬 가오레" src="../assets/r1_05_06.png"></li>
    </ul>
    <!--
    <h3>4성</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    -->
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
  margin: 0 10px;
  float: left;
}
a {
  color: #42b983;
}
img {
  vertical-align: bottom;
}
.type-box-left {
  float: left;
  width: 64%;
}
.type-box-right {
  float: left;
  width: 36%;
  padding: 36px 0 0 0;
}
.type-box-right span {
  float: left;
  margin: 0 0 0 5px;
}
.type-box-bottom {
    display: inline-block;
    width: 100%;
    text-align: start;
    margin: 0 0 0 10px;
}
.type-box-bottom span {
  float: left;
  margin: 0 0 0 5px;
}
.type1 {
    font-weight: bold;
    color: chocolate;
    float: left;
    margin: 0 0 0 5px;
}
.type2 {
    margin: 10px 0 0 0;
    display: inline-block;
}
</style>
