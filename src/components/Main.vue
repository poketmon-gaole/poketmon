<template>
  <div class="contents">
    <h1 style="color: white; padding: 25px 0 0 0;">{{ msg }}</h1>
    <p>
      <!-- 포캣몬 가오레 5성과 4성의 상성 관계를 알아보자 -->
    </p>
    <h3>5성 포캣몬스터</h3>
    <ul>
      <li>
          <div style="background: #2b0046; border-radius: 15px">
            <div class="type-box-left">
              <span class="poketmon-name">프리져 (얼음/비행)</span>
              <img alt="포캣몬 가오레" src="../assets/r1_05_01.png">
            </div>
            <div class="type-box-right">
              <span>공격: 135</span>
              <span>특수공격: 135</span>
              <span>방어: 135</span>
              <span>기술: 눈보라</span>
              <span>Z기술 여부: X</span>
              <span></span>
            </div>
            <div class="type-box-bottom">
                <span style="margin: 7px 0 0 0">추천 : </span>
                <span>(얼음<img alt="포캣몬 가오레" src="../assets/t15.png" width="25" height="25">/비행<img alt="포캣몬 가오레" src="../assets/t03.png" width="25" height="25">)</span>
            </div>
            <div class="type-box-bottom">
              <span style="margin: 7px 0 0 0">비추천 : </span>
              <span>(땅 <img alt="포캣몬 가오레" src="../assets/t05.png" width="25" height="25">)</span>
              <button class="btn" @click="openModal">포캣몬 공략</button>
              <template>
                <div class="example-modal-window">
                  <!-- 컴포넌트 MyModal -->
                  <MyModal @close="closeModal">
                    <!-- default 슬롯 콘텐츠 -->
                    <p>Vue.js Modal Window!</p>
                    <div><input v-model="message"></div>
                    <!-- /default -->
                    <!-- footer 슬롯 콘텐츠 -->
                    <template v-slot:footer>
                      <button @click="doSend">제출</button>
                    </template>
                    <!-- /footer -->
                  </MyModal>
                </div>
              </template>
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
import PocktmonModal from './PocktmonModal.vue'

export default {
  name: 'PocktmonMain',
  components: PocktmonModal,
  props: {
    msg: String
  },
  data() {
    return {
      modal: false,
      message: ''
    }
  },
  methods: {
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    doSend() {
      if (this.message.length > 0) {
        alert(this.message)
        this.message = ''
        this.closeModal()
      } else {
        alert('메시지를 입력해주세요.')
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
.contents {
  background: #4c3c27;
  border-radius: 28px;
  height: 100px;
}
.type-box-left {
  float: left;
  width: 65%;
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
</style>
