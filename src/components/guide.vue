<template>
<div class="container">
  <ins class="kakao_ad_area" style="display:none;"
  data-ad-unit    = "DAN-JmBLn3xLcFAbSPpo"
  data-ad-width   = "320"
  data-ad-height  = "50"></ins>
  <div class="contents">
    <h1>{{ setTitle() }}</h1>
    <div class="filter">
      <div class="search-toggle">
        <Toggle v-model="value" @change="changeToggle()"/>
        <label style="margin:0 5px 0 0">{{ getSearchRecommendTitle() }}</label>
      </div>
      <div class="search" v-if="value">
        <div class="form-check-first">
          <input type="radio" v-model="status" @click="changeType()" id="radioGuide1" name="status" value="1">
          <label for="radioGuide1">추천</label>
        </div>
        <div class="form-check-second">
          <input type="radio" v-model="status" @click="changeType()" id="radioGuide2" name="status" value="2">
          <label for="radioGuide2">비추천</label>
        </div>
      </div>
      <div class="search" v-else>
        <div class="form-check-first">
          <input type="radio" v-model="status" @click="changeType()" id="radioGuide1" name="status" value="1">
          <label for="radioGuide1">방어속성</label>
        </div>
        <div class="form-check-second">
          <input type="radio" v-model="status" @click="changeType()" id="radioGuide2" name="status" value="2">
          <label for="radioGuide2">공격속성</label>
        </div>
      </div>      
      <b-form-select 
        id="sboxType" 
        v-model="selected" 
        :options="getType"
        @change="changeType()"
        >
      </b-form-select>      
    </div>
    <template v-for="grade in gradeList" :key="grade">
      <!--
      <ins v-if="gradeList.length > 1 && grade == 4" class="kakao_ad_area" style="display:none;"
        data-ad-unit    = "DAN-jNUH2Cqc0qk39RrA"
        data-ad-width   = "320"
        data-ad-height  = "100"></ins>
      -->
      <h3>GRADE {{ grade }} {{ getCount(grade) }}</h3>
      <ul>
        <template v-for="(item, index) in data" :key="index">
          <li v-if="item.grade == grade">
            <div class="type-box" :style="[grade == 4? 'background: #838383' : '']">
              <div class="type-box-container">
                <label class="type-box-top" @click="doModal(item)">{{ item.name }} [{{ item.type }}]</label>
                <div class="type-box-left" @click="doModal(item)">
                  <img :src="require(`@/assets/img/disk/${item.imageName}`)">
                </div>
                <div class="type-box-right" @click="doModal(item)">
                  <span v-if="item.hp !== undefined" :class="[grade == 4? 'text' : '']">HP: {{ item.hp }}</span>
                  <span v-if="item.atc !== undefined" :class="[grade == 4? 'text' : '']">공격: {{ item.atc }}</span>
                  <span v-if="item.spclAtck !== undefined" :class="[grade == 4? 'text' : '']">특수공격: {{ item.spclAtck }}</span>
                  <span v-if="item.def !== undefined" :class="[grade == 4? 'text' : '']">방어: {{ item.def }}</span>
                  <span v-if="item.spclDfns !== undefined" :class="[grade == 4? 'text' : '']">특수방어: {{ item.spclDfns }}</span>
                  <span v-if="item.speed !== undefined" :class="[grade == 4? 'text' : '']">스피드: {{ item.speed }}</span>
                  <span v-if="item.skill !== undefined" :class="[grade == 4? 'text' : '']">{{ item.skill }}</span>
                </div>
                <div class="type-box-bottom">
                    <div class="solution" @click="doModal(item)">
                      <span>{{ getSolution(item.type, true) }}</span>
                      <span>{{ getSolution(item.type, false) }}</span>
                    </div>
                    <div style="display: inline-block;">
                      <b-button id="show-btn" :style="[grade == 4? 'background: #565656' : '']" pill variant="info" @click="show(item)">서포트 포켓몬</b-button>
                      <template>
                        <div>
                          <viewer :options="options" 
                                  :images="support"
                                  @inited="inited"
                                  class="viewer" ref="viewer"
                                  >
                            <template #default="scope">
                              <img v-for="src in scope.images" :src="src" :key="src">
                              {{scope.options}}
                            </template>
                          </viewer>
                        </div>
                    </template>                     
                    </div>
                </div>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </template>
    <template v-if="gradeList.length === 0">
      <div class="not-data">
        <img src="../assets/img/document.png" style="width: 85px">
        <p style="margin:0; font-size:24px; font-weight:bolder;">
          해당 포켓몬이 없습니다.
        </p>
      </div>
    </template>
    <div class="footer">Copyright ⓒ By JW. All Rights Reserved.</div>
  </div>
  <left :type=selected ref="left"></left>
  <popup ref="popup" @close="doClose()"></popup>
</div>  
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
import Data from "@/components/data.json"
import Left from '@/components/left.vue'
import Popup from '@/components/popup.vue'
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from "v-viewer"
import Toggle from '@vueform/toggle'
import dataMixin from '@/mixins/dataMixin'

export default {
  name: 'Search',
  components: {
    Left,
    Viewer,
    Popup,
    Toggle
  },
  mixins: [dataMixin],
  data() {
    return {
      paramType: '',
      selected: '',
      value: false,
      list: Data,
      status: '1',
      data: [],
      gradeList: [],
      options: {
        loop: false,
        scalable: false,
        title: false,
        movable: true,
        initialViewIndex: 0
      },
      support: []
    }
  },
  watch: {
    $route(to, from) {
      this.setData()
    }
  },
  computed: {
    getType() {
      const retVal = []
      
      Object.entries(this.type).forEach(([key, value]) => {
        retVal.push({value: key, text: value})
      })
 
      return retVal
    }
  },
  mounted() {
    this.init()
    this.setData()
  },
  methods: { 
    init() {
      this.$refs.left.scrollAble()

      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', '//t1.daumcdn.net/kas/static/ba.min.js')
      document.head.appendChild(recaptchaScript)
    },
    inited (viewer) {
      this.$viewer = viewer
    },
    onSearch(index) {
      let type
      const selected = $('#sboxType').val()

      Object.entries(this.type).forEach(([key, value]) => {
        if (selected === key) {
          type = value
        }
      })

      if (this.value) {
          this.$router.push({
          name: "Guide",
          params: { type: type, option: this.value, status: index }
        })
      }
    },
    show(item) {
      this.support = this.getImages(item)

      if (this.support.length == 0) {
        this.$notify({
          group: "bottom",
          type: "warn",
          title: "[알림]",
          text: "추천 서포트 포켓몬이 없습니다."
        })
      } else {
        this.$viewer.view(this.options.initialViewIndex)
        this.$viewer.show()
      }
    },
    getCount(grade) {
      const list = _.filter(this.data, {'grade': grade})
      return '(' + list.length + 'EA)'
    },
    getImages(item) {
      let retVal = []
      let typeArr = []

      // 추천 타입
      const recommendArray = this.getDisk(item.type, true)

      // 추천 타입에 해당하는 코드
      recommendArray.forEach((recommend) => {
        Object.entries(this.type).forEach(([key, value]) => {
          if (recommend == value) {
            typeArr.push(key)
          }
        })
      })

      // 추천 코드에 해당하는 서포트 이미지
      _.forEach(this.images, function(value) {
        typeArr.forEach((type) => {
          if (value.substr(0, 3) == type) {
            const src = require("@/assets/img/support/" + value)
            retVal.push(src)
          }
        })
      })

      return retVal
    },
    changeToggle() {
      this.doRouter(1)
    },
    changeType() {
      const status = $("input[name='status']:checked").val()
      this.doRouter(status)
    },
    doRouter(status) {
      let type
      const selected = $('#sboxType').val()

      Object.entries(this.type).forEach(([key, value]) => {
        if (selected === key) {
          type = value
        }
      })

      this.$router.push({
        name: "Guide",
        params: { type: type, option: this.value, status: status }
      })      
    },
    setData() {
      this.gradeList = []
      let data = []
      const type = this.$route.params.type
      const option = this.$route.params.option
      const status = this.$route.params.status

      this.value = option === 'false' ? false : true
      this.status = status
      
      Object.entries(this.type).forEach(([key, value]) => {
        if (type === value) {
          this.selected = key
        }
      })

      this.list.forEach((item) => {
        // 행운디스크 제외
        if (item.id.substr(3, item.id.length) == '000') return

        // 포켓몬 타입
        if (option === 'false') {
          if (status === '1') {
            // 방어타입
            if (_.includes(item.type, type)) {
              data.push(item)
            }
          } else {
            // 공격타입
            if (_.includes(item.correlation, type)) {
              data.push(item)
            }
          }
        // 포켓몬 약점
        } else {
          if (status === '1') {
            // 추천
            const recommendArray = this.getDisk(item.type, true)
            recommendArray.forEach((recommend) => {
              if (recommend === type) {
                data.push(item)
              }
            })
          } else {
            // 비추천
            const notRecommendArray = this.getDisk(item.type, false)
            notRecommendArray.forEach((notRecommend) => {
              if (notRecommend === type) {
                data.push(item)
              }
            })
          }
        }
      })

      this.data = _.orderBy(data, ['id'], ['desc'])

      if (_.find(this.data, {'grade': 5}) !== undefined) {
        this.gradeList.push(5)
      }

      if (_.find(this.data, {'grade': 4}) !== undefined) {
        this.gradeList.push(4)
      }

      document.body.scrollTop = 0
    },
    getSearchRecommendTitle() {
      let title = "포켓몬 타입"

      if (this.value) {
        title = "포켓몬 약점"
      }
      
      return title
    },    
    setTitle() {
      return "포켓몬 타입"
    },
    getSeries(item, isSkill) {
      let retVal, skill

      const series = Number(item.id.substr(0, 2))

      skill = item.skill !== undefined? item.skill : ""

      if (!isSkill) skill = ''

      if (series < 5) {
        retVal = "가오레" + series + "탄 " + skill
      } else {
        retVal = "레전드" + (series-4) + "탄 " + skill
      }

      return retVal
    },
    doModal(item) {
      // 추천 속성을 배열로 변환 추가
      item.recommendArray = this.getDisk(item.type, true)
      item.notRecommendArray = this.getDisk(item.type, false)
      
      // 추천 상태 추가
      item.isRecommend = true
      
      this.$refs.popup.load(item)

      // 스크롤 이동 방지
      this.$refs.left.scrollDisable()      
    },
    doClose() {
      // 스크롤 이동 해제
      this.$refs.left.scrollAble()
    },    
    getSolution(type, isRecommend) {
      const result = this.getDisk(type, isRecommend)

      if (isRecommend) {
        return "추천: " + result
      } else {
        return result.length < 1 ? "" : "비추천: " + result
      }
    },
    getCorrelation(item) {
      const data = _.filter(this.list, {correlation: item})
      let retVal = _.orderBy(data, ['grade', "luckYn", 'skill', 'id'], ['desc', 'desc', 'asc', 'desc'])

      // 짝수로 안될경우 데이터 생성 후 감추기
      if (retVal.length % 2 !== 0) {
        let item = _.cloneDeep(retVal[retVal.length-1])
        item.visibility = true

        retVal.push(item)
      }

      return retVal
    }
  }
}
</script>
<style src="@vueform/toggle/themes/default.css"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    color: black;
    padding: 15px 0px 15px 0;
    font-weight: bold;
}
h3 {
    display: inline-block;
    color: black;
    font-size: 25px;
    padding: 0 0 15px 10px;
    width: 95%;
    margin: 25px 0 0 0;
    text-align: left;
}
ul {
    display: inline-block;
    width: 95%;
    list-style-type: none;
    padding: 0;
}
li {
    width: 100%;
    margin: 0 0 10px 0;
}
a {
    color: #42b983;
}
img {
    vertical-align: bottom;
}
strong {
  display: block;
}
input[type=radio]{
	width: 0;
  height: 0;
  position: absolute;
  left: -9999px;
}
input[type=radio] + label{
  margin: 0;
  width: 95px;
  padding: 7px 0 7px 0;
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  border: solid 1px #DDD;
  background-color: #FFF;
  line-height: 140%;
  text-align: center;
  box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  transition: border-color .15s ease-out,  color .25s ease-out,  background-color .15s ease-out, box-shadow .15s ease-out;
}
input[type=radio]:checked + label{
  background-color: #999999;
  color: #FFF;
}
.contents{
    text-align: center;
}
.type-box {
    width: 100%;
    background: #2b0046;
    border-radius: 15px;
    display: inline-block;    
}
.type-box-container {
  display:block;
  width: 391px;
}
.type-box-top {
    display: block;
    font-weight: bolder;
    color: white;
    font-size: large;
    padding: 5px 0 5px 0;
    text-align: left;
    text-indent: 20px;
}
.type-box-left {
    float: left;
}
.type-box-left img {
    width: 240px;
    margin-left: 10px;
}
.type-box-right {
    float: left;
    width: 28%;
    margin: 15px 0 10px 10px;
    height: 112px;
}
.type-box-right span {
    color: #fff;
    border-left: thick solid #d8b6f7;
    text-indent: 5px;
    font-size: small;
    display: block;
    text-align: left;
}
.type-box-right .text {
    border-left: thick solid #efefef
}
.type-box-bottom {
    float: left;
    width: 362px;
    text-align: start;
    margin: 15px 0 10px 7px;
    font-size: 15px;
    font-family: auto;
}
.type-box-bottom span {
    display: block;
    margin: 0 0 0 5px;
    color: white;
    font-weight: bold;
}
.type-box-bottom button {
  background: #4c2667;
  color: white;
  border: 1px solid #eee;
}
.footer {
    display: inline-block;
    margin: 10px 0px 20px 0;
    width: 100%;
}
.solution {
  width: 62.5%;
  display: inline-block;
}
.support {
  display: inline-block;
  color: #ffbc00;
  font-weight: bold;
  font-size: initial;
}
.filter {
  text-align: left;
  margin: 30px 0 0 5px;
}
.search-toggle {
  text-align:left;
  margin:0 0 13px 0;
  display:inline-block;
}
.search {
  display: inline-block;
  width: 241px;
}
.form-check-first {
  display: inline-block;
  margin: 0 0 0 20px;
}
.form-check-second {
  display: inline-block;
  margin: 0 0 0 5px;
}
.not-data {
  margin: 20px 0 20px 0px;
}
</style>