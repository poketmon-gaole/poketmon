<template>
  <div class="contents">
    <h1 style="color: white; padding: 25px 0 0 0;">{{ msg }}</h1>
    <p>
      <!-- 포캣몬 가오레 5성과 4성의 상성 관계를 알아보자 -->
    </p>
    <h3>5성 포캣몬스터</h3>
    <ul>
      <li v-for="item in data" :key="item.id">
          <div class="type-box" @click="doClose">
            <div class="type-box-left">
              <span class="poketmon-name">{{ item.name }} {{ getType(item.type, 0) }}</span>
              <img :src="getImageUrl(item.id)">
            </div>
            <div class="type-box-right">
              <span>{{ getType(item.atk, 1) }}</span>
              <span>{{ getType(item.str, 2) }}</span>
              <span>{{ getType(item.vit, 3) }}</span>
              <span>{{ getType(item.def, 4) }}</span>
              <span>{{ getType(item.skill, 5) }}</span>
              <span>{{ getType(item.zSkillYn, 6) }}</span>
            </div>
            <div class="type-box-bottom">
                <span>{{ getType(item.recommend, 7) }}</span>
            </div>
            <div class="type-box-bottom">
              <span>{{ getType(item.notRecommend, 8) }}</span>
              <!-- <button class="btn" @click="doClose">포캣몬 공략</button> -->
            </div>
          </div>
      </li>
      <li><img src="../assets/r1_05_02.png"></li>
      <li><img src="../assets/r1_05_03.png"></li>
      <li><img src="../assets/r1_05_04.png"></li>
      <li><img src="../assets/r1_05_05.png"></li>
      <li><img src="../assets/r1_05_06.png"></li>
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
  <div class="modal" v-show="visible">
      <div class="overlay"></div>
      <div class="modal-card">
        <h5>뷰하!</h5>
        <p>v-if와 v-show로 모달창을 띄워봅시다.</p>
        <ul style="display: inline-block">
          <li>
              <div><img src="../assets/r1_05_02.png" width="150"></div>
          </li>
          <li><img src="../assets/r1_05_03.png" width="150"></li>
          <li><img src="../assets/r1_05_04.png" width="150"></li>
          <li><img src="../assets/r1_05_05.png" width="150"></li>
          <li><img src="../assets/r1_05_06.png" width="150"></li>
        </ul>
        <span>
          <button @click="doClose" type="button">
              닫기
          </button>
        </span>
      </div>
      <slot/>
  </div>  
</template>

<script>
import data from "./data.json";

export default {
  name: 'PocktmonMain',
  components: {
  },
  props: {
    msg: String
  },
  data() {
    return {
      visible: false,
      data: data
    }
  },
  methods: {
    doClose() {
      this.visible = !this.visible;
    },
    getImageUrl(id) {
      const images = require.context('../assets/img/')
      //return images('./' + id + ".png")
      console.log(images('./' + id + ".png"));
      //return '../assets/img/' + id + '.png';
    },
    getType(item, index) {
      let name;
      switch (index) {
      case 0:
        name = '(' + item + ')'
        break
      case 1:
        name = '공격:' + item
        break
      case 2:
        name = '특수공격:' + item
        break;
      case 3:
        name = '방어:' + item
        break;
      case 4:
        name = '특수방어:' + item
        break;
      case 5:
        name = '기술:' + item
        break;
      case 6:
        name = 'Z기술 여부:' + item
        break;
      case 7:
        name = '추천:' + item
        break;
      case 8:
        name = '비추천:' + item
        break; 
      }
      return name;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  display: inline-block;
  color: white;
  font-size: 25px;
  background-color: black;
  border-radius: 20px;
  padding: 15px 0 15px 0;
  width: 100%;
  margin: 25px 0 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 0 5px 0px;
  float: left;
}
a {
  color: #42b983;
}
img {
  vertical-align: bottom;
}
.contents {
  background: #4c3c27;
  border-radius: 28px;
  height: 100px;
}
.type-box {
  background: #2b0046;
  border-radius: 15px;
}
.type-box-left {
  float: left;
  width: 65%;
}
.type-box-left img {
  width: 240px;
}
.type-box-right {
  float: left;
  width: 33%;
  margin: 50px 0 0 0;
  border-left: thick solid #d8b6f7;
  height: 112px;
}
.type-box-right span {
  float: left;
  margin: 0 0 0 5px;
  font-family: emoji;
  color: white;  
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
    color: white;
    font-weight: bold;
}
.poketmon-name {
    font-weight: bolder;
    color: white;
    font-size: large;
    display: inline-block;
    padding: 5px 0 5px 0;
}
.btn {
    float: right;
    background: #4c3c27;
    color: white;
    margin: -19px 23px 0 0;
    width: 160px;
    height: 40px;
    border: 0;
    border-radius: 10px;
    font-size: larger;
}
.modal,
.overlay{
  width: 100%;
  height: 100%;
  position: fixed;
  left:0;
  top:0;
}
.overlay{
  opacity:0.5;
  background-color:black;
}
.modal-card{
  position:relative;
  max-width: 80%;
  margin:auto;
  margin-top:30px;
  padding:20px;
  background-color:white;
  min-height:500px;
  z-index:10;
  opacity:1;
}
</style>
