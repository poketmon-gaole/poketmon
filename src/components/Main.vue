<template>
  <div class="contents">
    <h1 style="color: white; padding: 25px 0 0 0;">{{ msg }}</h1>
    <p>
      <!-- 포캣몬 가오레 5성과 4성의 상성 관계를 알아보자 -->
    </p>
    <h3>5성 포캣몬스터</h3>
    <ul>
      <template v-for="item in data" :key="item.id">
        <li v-if="item.grade === '5'">
            <div class="type-box" @click="doModal(item)">
              <div class="type-box-left">
                <span class="poketmon-name">{{ item.name }} {{ getType(item.type, 0) }}</span>
                <img :src="require(`@/assets/img/${item.imageName}`)">
              </div>
              <div class="type-box-right">
                <span>{{ getType(item.atk, 1) }}</span>
                <span>{{ getType(item.str, 2) }}</span>
                <span>{{ getType(item.vit, 3) }}</span>
                <span>{{ getType(item.def, 4) }}</span>
                <span>{{ getType(item.skill, 5) }}</span>
              </div>
              <div class="type-box-bottom">
                  <span>{{ getSolution(item.type, true) }}</span>
                  <span>{{ getSolution(item.type, false) }}</span>
              </div>
            </div>
        </li>
      </template>
    </ul>
    <h3>4성 포캣몬스터</h3>
    <ul>
      <template v-for="item in data" :key="item.id">
        <li v-if="item.grade === '4'">
            <div class="type-box" @click="doModal(item)">
              <div class="type-box-left">
                <span class="poketmon-name">{{ item.name }} {{ getType(item.type, 0) }}</span>
                <img :src="require(`@/assets/img/${item.imageName}`)"> 
              </div>
              <div class="type-box-right">
                <span>{{ getType(item.atk, 1) }}</span>
                <span>{{ getType(item.str, 2) }}</span>
                <span>{{ getType(item.vit, 3) }}</span>
                <span>{{ getType(item.def, 4) }}</span>
                <span>{{ getType(item.skill, 5) }}</span>
              </div>
              <div class="type-box-bottom">
                  <span>{{ getSolution(item.type, true) }}</span>
                  <span>{{ getSolution(item.type, false) }}</span>
              </div>
            </div>
        </li>
      </template>
    </ul>
    <div class="footer">Copyright ⓒ By JW. All Rights Reserved.</div> 
  </div>
  <div class="modal" v-show="visible">
      <div class="overlay"></div>data
      <div class="modal-card">
        <img src="../assets/img/x.png" width="35px">
        <h3 :class="{'grade4': info.grade === '4'}">{{ info.name }} {{ getType(info.type, 0) }}</h3>
        <img class="poketmon-img" :src="require(`@/assets/img/${info.imageName}`)">        
        <div v-for="recommend in info.recommendArray" :key="recommend">
          <p>{{ recommend }}</p>
          <div style="border-bottom: 8px solid #ededed; margin: 14px 0 0 0px;"></div>
          <ul style="float: left;">
            <template v-for="item in data" :key="item.id">
              <li v-if="recommend === item.type.split('/')[0]">
                  <div class="modal-type">
                    <img :src="require(`@/assets/img/${item.imageName}`)" width="150"> 
                    <span>{{ item.name }}</span>
                  </div>
              </li>
            </template>
          </ul>
        </div>
        <span>
          <button @click="doModal" type="button">닫기</button>
        </span>
      </div>
      <slot/>
  </div>  
</template>

<script>
import data from "./data.json"

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
      data: data,
      info: data[0],
      type: {
        t01 : "노말",
        t02 : "격투",
        t03 : "독",
        t04 : "땅",
        t05 : "비행",
        t06 : "벌레",
        t07 : "바위",
        t08 : "고스트",
        t09 : "강철",
        t10 : "불꽃",
        t11 : "물",
        t12 : "전기",
        t13 : "풀",
        t14 : "얼음",
        t15 : "에스프",
        t16 : "드래곤",
        t17 : "악",
        t18 : "페어리",
      }      
    }
  },
  methods: {
    doModal(item) {
      this.visible = !this.visible;

      if (this.visible) {
        this.info = item;

        // 추천 속성을 배열로 변환 추가
        const recommendArray = item.recommend.split("/");
        this.info.recommendArray = recommendArray;
      }
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
        name = 'Z기술 여부:' + item
        break;
      }
      return name;
    },
    getSolution(type, isRecommend) {
      let recommendArr = []
      let notRecommendArr = []

      type.split("/").forEach((value) => {
        switch (value) {
        case this.type.t01:
          // 추천
          recommendArr.push(this.type.t02)

          // 비추천
          notRecommendArr.push(this.type.t08)
          break
        case this.type.t02:
          // 추천
          recommendArr.push(this.type.t05)
          recommendArr.push(this.type.t15)
          break
        case this.type.t03:
          // 추천
          recommendArr.push(this.type.t04)
          recommendArr.push(this.type.t15)
          break
        case this.type.t04:
          // 추천
          recommendArr.push(this.type.t11)
          recommendArr.push(this.type.t13)
          recommendArr.push(this.type.t14)
          break
        case this.type.t05:
          // 추천
          recommendArr.push(this.type.t07)
          recommendArr.push(this.type.t12)
          recommendArr.push(this.type.t14)
          break
        case this.type.t06:
          // 추천
          recommendArr.push(this.type.t05)
          recommendArr.push(this.type.t07)
          recommendArr.push(this.type.t10)
          break
        case this.type.t07:
          // 추천
          recommendArr.push(this.type.t02)
          recommendArr.push(this.type.t04)
          recommendArr.push(this.type.t09)
          recommendArr.push(this.type.t11)
          recommendArr.push(this.type.t13)
          break
        case this.type.t08:
          // 추천
          recommendArr.push(this.type.t08)
          recommendArr.push(this.type.t17)

          // 비추천
          notRecommendArr.push(this.type.t01)
          notRecommendArr.push(this.type.t02)
          break
        case this.type.t09:
          // 추천
          recommendArr.push(this.type.t02)
          recommendArr.push(this.type.t04)
          recommendArr.push(this.type.t10)
          break
        case this.type.t10:
          // 추천
          recommendArr.push(this.type.t04)
          recommendArr.push(this.type.t07)
          recommendArr.push(this.type.t11)
          break
        case this.type.t11:
          // 추천
          recommendArr.push(this.type.t12)
          recommendArr.push(this.type.t13)
          break
        case this.type.t12:
          // 추천
          recommendArr.push(this.type.t04)
          break
        case this.type.t13:
          // 추천
          recommendArr.push(this.type.t03)
          recommendArr.push(this.type.t05)
          recommendArr.push(this.type.t06)
          recommendArr.push(this.type.t10)
          recommendArr.push(this.type.t14)
          break
        case this.type.t14:
          // 추천
          recommendArr.push(this.type.t02)
          recommendArr.push(this.type.t07)
          recommendArr.push(this.type.t09)
          recommendArr.push(this.type.t10)
          break
        case this.type.t15:
          // 추천
          recommendArr.push(this.type.t06)
          recommendArr.push(this.type.t07)
          recommendArr.push(this.type.t17)
          break
        case this.type.t16:
          // 추천
          recommendArr.push(this.type.t14)
          recommendArr.push(this.type.t16)
          recommendArr.push(this.type.t18)
          break
        case this.type.t17:
          // 추천
          recommendArr.push(this.type.t02)
          recommendArr.push(this.type.t06)
          recommendArr.push(this.type.t18)

          // 비추천
          notRecommendArr.push(this.type.t15)
          break
        case this.type.t18:
          //추천
          recommendArr.push(this.type.t03)
          recommendArr.push(this.type.t09)

          // 비추천
          notRecommendArr.push(this.type.t16)
          break                                                                                                                                                 
        }
      })
      
      let result;

      if (isRecommend) {
        result = recommendArr.reduce((accu, curr) => { 
          accu[curr] = (accu[curr] || 0)+1; 
          return accu;
        }, {});

        return "추천: " + Object.keys(result);
      } else {
        result = notRecommendArr.reduce((accu, curr) => { 
          accu[curr] = (accu[curr] || 0)+1; 
          return accu;
        }, {});

        return Object.keys(result).length < 1 ? "" : "비추천: " + Object.keys(result);
      }
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
button {
  border: 1px solid #c3c3c3;
  font-family: 'Gmarket Sans TTF';
  background: #efefef;
  border-radius: 10px;
  font-size: 21px;
  width: 173px;
  height: 48px;
  font-weight: bolder;  
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
    margin: 15px 0 10px 7px;
    font-size: 15px;
    font-family: auto;
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
  min-height:500px;
  z-index:10;
  opacity:1;
  border-radius: 15px;
  background: white;
  font-weight: bold;
  font-size: larger;
  font-family: monospace;  
}
.modal-card .poketmon-img {
  width: 328px;
  margin: 15px 0 20px 0;  
}
.modal-card h3 {
  font-family: 'Gmarket Sans TTF';
  font-weight: bold;
  background: #79258f;
  color: white;
  border-radius: unset;  
}
.modal-card .grade4 {
  background: #b7b5b1;
}
.modal-card span {
  text-align: center;
  display: block;
  margin: 2px 0 0 0;
}
.modal-card p {
  font-family: 'Gmarket Sans TTF';
  color: black;
  text-align: left;
  margin: 20px 0 0 3px;  
}
.modal-type {
  padding: 0 10px 10px 10px;
  width: 142px;
}
.footer {
  display: inline-block;
  margin: 10px 0px 20px 0;
  width: 100%;  
}
</style>
