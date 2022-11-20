<template>
  <ins class="kakao_ad_area" style="display:none;"
  data-ad-unit    = "DAN-JmBLn3xLcFAbSPpo"
  data-ad-width   = "320"
  data-ad-height  = "50"></ins>
  <img alt="Logo" src="@/assets/img/poketmon.png" height="170"/>
  <div class="contents">   
    <h1>{{ setTitle(msg, series) }}</h1>
    <template v-for="grade in gradeList" :key="grade">
      <ins v-if="grade == 4" class="kakao_ad_area" style="display:none;"
        data-ad-unit    = "DAN-jNUH2Cqc0qk39RrA"
        data-ad-width   = "320"
        data-ad-height  = "100"></ins>
      <h3>GRADE {{ grade }}</h3>
      <ul>
        <template v-for="(item, index) in getData()" :key="index">
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
    <div class="footer">Copyright ⓒ By JW. All Rights Reserved.</div>
  </div>
  <left :series=series ref="left"></left>
  <template>
    <Teleport to="body">
      <modal :show="visible" @close="visible = false">
        <template #header>
          <div class="header">
            <div class="close close-btn" @click="doModal"></div>
          </div>
        </template>
        <template #body>
          <strong>{{ info.name }} [{{ info.type }}]</strong>
          <img class="poketmon-img" :src="require(`@/assets/img/disk/${info.imageName}`)">
          <div class="recommend-box" v-if="info.notRecommendArray.length > 0">
            <input type="radio" @click="info.isRecommend = !info.isRecommend" id="option1" name="test" value="option1" checked="checked">
            <label for="option1">추천</label>
            <input type="radio" @click="info.isRecommend = !info.isRecommend" id="option2" name="test" value="option2">
            <label for="option2" >비추천</label>       
          </div>
          <div class="summary-box" v-for="recommend in getRecommendData()" :key="recommend">
            <p>{{ recommend }}</p>
            <div style="border-bottom: 8px solid #ededed; margin: 14px 0 0 0px;"></div>
            <ul style="width:100%; text-align:center;">
              <template v-for="item in getCorrelation(recommend)" :key="item.id">
                <li class="summary" :style="[item.visibility !== undefined? 'visibility: hidden' : '']">
                    <div class="summary-type">
                      <span style="text-align: center">
                        {{ item.name }}
                      </span>
                       <img :src="require(`@/assets/img/disk/${item.imageName}`)">
                      <span :class="[item.skill === undefined? 'sub-title':'skill']">
                          {{ getSeries(item) }}
                        &nbsp;
                      </span>
                    </div>
                </li>
              </template>
            </ul>
          </div>
        </template>
        <template #footer>
          <b-button class="modal-close" pill @click="doModal" squared variant="outline-secondary">닫기</b-button>
        </template>
      </modal>
    </Teleport>
  </template>
</template>

<script>
import _ from 'lodash'
import Data from "@/components/data.json"
import Modal from "@/components/common/modal.vue"
import Left from '@/components/left.vue'
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from "v-viewer"

export default {
  name: 'PocktmonMain',
  components: {
    Modal,
    Left,
    Viewer
  },
  props: {
    msg: String
  },
  data() {
    return {
      visible: false,
      data: Data,
      info: Data[0],
      gradeList: [5, 4],
      images: [
        "t01-008.png",
        "t04-010.png",
        "t08-040.png",
        "t09-022.png",
        "t09-023.png",
        "t10-019.png",
        "t11-005.png",
        "t11-032.png",
        "t12-001.png",
        "t13-003.png",
        "t13-024.png",
        "t16-017.png",
        "t16-009.png"
      ],
      options: {
        loop: false,
        scalable: false,
        title: false,
        movable: true,
        initialViewIndex: 0
      },
      support: [],      
      series: "05",
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
        t15 : "에스퍼",
        t16 : "드래곤",
        t17 : "악",
        t18 : "페어리",
      }
    }
  },
  watch: {
    $route(to, from) {
      this.setSeries()
    }
  },  
  mounted() {
    this.init()  
  },
  methods: { 
    init() {
      const series = this.$route.params.series
      this.series = series !== undefined? series : '05'

      this.$refs.left.scrollAble()
      document.body.scrollTop = 0

      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', '//t1.daumcdn.net/kas/static/ba.min.js')
      document.head.appendChild(recaptchaScript)
    },
    inited (viewer) {
      this.$viewer = viewer
    },
    show(item) {
      this.support = this.getImages(item)

      if (this.support.length == 0) {
        this.$notify({
          group: "bottom",
          type: "warn",
          title: "[알림]",
          text: "추천 서포트 포켓몬이 없습니다."
        });
      } else {
        this.$viewer.view(this.options.initialViewIndex)
        this.$viewer.show()
      }
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
    getData() {
      let retVal = []

      this.data.forEach((item) => {
        // 시리즈별 조회
        if (item.id.substr(0, 2) == this.series) {
          // 행운디스크 제외
          if (item.id.substr(3, item.id.length) == '000') return
          retVal.push(item)
        }
      })

      return _.orderBy(retVal, ['id'], ['asc']);
    },
    getRecommendData() {
      let retVal;

      if (this.info.isRecommend) {
        retVal = this.info.recommendArray
      } else {
        retVal = this.info.notRecommendArray
      }

      return retVal
    },
    setTitle(msg, series) {
      if (series < 5) {
        return "제" + Number(series) + "탄";
      } else {
        return "레전드 " + Number(series-4) + "탄";
      }  
    },
    getSeries(item) {
      let retVal, skill

      const series = Number(item.id.substr(0, 2))
      skill = item.skill !== undefined? item.skill : ""

      if (series < 5) {
        retVal = "가오레" + series + "탄 " + skill
      } else {
        retVal = "레전드" + (series-4) + "탄 " + skill
      }

      return retVal;
    },
    setSeries() {
      this.series = this.$route.params.series
      this.getData()
      document.body.scrollTop = 0
    },
    doModal(item) {
      this.visible = !this.visible

      if (this.visible) {
        this.info = item

        // 추천 속성을 배열로 변환 추가
        this.info.recommendArray = this.getDisk(item.type, true)
        this.info.notRecommendArray = this.getDisk(item.type, false)

        // 추천 상태 추가
        this.info.isRecommend = true        

        // 스크롤 이동 방지
        this.$refs.left.scrollDisable()
      } else {
        // 스크롤 이동 해제
        this.$refs.left.scrollAble()
      }
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
      const data = _.filter(this.data, {correlation: item});
      let retVal = _.orderBy(data, ['grade', "luckYn", 'skill', 'id'], ['desc', 'desc', 'asc', 'asc'])

      // 짝수로 안될경우 데이터 생성 후 감추기
      if (retVal.length % 2 !== 0) {
        let item = _.cloneDeep(retVal[retVal.length-1])
        item.visibility = true

        retVal.push(item)
      }

      return retVal;
    },
    getDisk(type, isRecommend) {
      let retVal
      let recommendArr = [] // 추천
      let weakEffectArr = [] // 효과 약함
      let notRecommendArr = [] // 미추천

      type.split("/").forEach((value) => {
        switch (value) {
        case "노말":
          // 추천
          recommendArr.push("격투")

          // 비추천
          notRecommendArr.push("고스트")
          break
        case "격투":
          // 추천
          recommendArr.push("비행")
          recommendArr.push("에스퍼")
          recommendArr.push("페어리")

          // 효과 약함
          weakEffectArr.push('벌레')
          weakEffectArr.push('바위')
          weakEffectArr.push('악')
          break
        case "독":
          // 추천
          recommendArr.push("땅")
          recommendArr.push("에스퍼")

          // 효과 약함
          weakEffectArr.push('격투')
          weakEffectArr.push('독')
          weakEffectArr.push('벌레')
          weakEffectArr.push('풀')
          weakEffectArr.push('페어리')
          break
        case "땅":
          // 추천
          recommendArr.push("물")
          recommendArr.push("풀")
          recommendArr.push("얼음")

          // 효과 약함
          weakEffectArr.push('독')
          weakEffectArr.push('바위')

          // 비추천
          notRecommendArr.push('전기')
          break
        case "비행":
          // 추천
          recommendArr.push("바위")
          recommendArr.push("전기")
          recommendArr.push("얼음")

          // 효과 약함
          weakEffectArr.push('격투')
          weakEffectArr.push('벌레')
          weakEffectArr.push('풀')

          // 비추천
          notRecommendArr.push('땅')          
          break
        case "벌레":
          // 추천
          recommendArr.push("비행")
          recommendArr.push("바위")
          recommendArr.push("불꽃")

          // 효과 약함
          weakEffectArr.push('격투')
          weakEffectArr.push('땅')
          weakEffectArr.push('풀')
          break
        case "바위":
          // 추천
          recommendArr.push("격투")
          recommendArr.push("땅")
          recommendArr.push("강철")
          recommendArr.push("물")
          recommendArr.push("풀")

          // 효과 약함
          weakEffectArr.push('노말')
          weakEffectArr.push('독')
          weakEffectArr.push('비행')
          weakEffectArr.push('불꽃')
          break
        case "고스트":
          // 추천
          recommendArr.push("고스트")
          recommendArr.push("악")

          // 효과 약함
          weakEffectArr.push('독')
          weakEffectArr.push('벌레')

          // 비추천
          notRecommendArr.push("노말")
          notRecommendArr.push("격투")
          break
        case "강철":
          // 추천
          recommendArr.push("격투")
          recommendArr.push("땅")
          recommendArr.push("불꽃")

          // 효과 약함
          weakEffectArr.push('노말')
          weakEffectArr.push('비행')
          weakEffectArr.push('벌레')
          weakEffectArr.push('바위')
          weakEffectArr.push('강철')
          weakEffectArr.push('풀')
          weakEffectArr.push('얼음')
          weakEffectArr.push('에스퍼')
          weakEffectArr.push('드래곤')
          weakEffectArr.push('페어리')

          // 비추천
          notRecommendArr.push('독')          
          break
        case "불꽃":
          // 추천
          recommendArr.push("땅")
          recommendArr.push("바위")
          recommendArr.push("물")

          // 효과 약함
          weakEffectArr.push('벌레')
          weakEffectArr.push('강철')
          weakEffectArr.push('불꽃')
          weakEffectArr.push('풀')
          weakEffectArr.push('얼음')
          weakEffectArr.push('페어리')
          break
        case "물":
          // 추천
          recommendArr.push("전기")
          recommendArr.push("풀")

          // 효과 약함
          weakEffectArr.push('강철')
          weakEffectArr.push('불꽃')
          weakEffectArr.push('물')
          weakEffectArr.push('얼음')
          break
        case "전기":
          // 추천
          recommendArr.push("땅")

          // 효과 약함
          weakEffectArr.push('비행')
          weakEffectArr.push('강철')
          weakEffectArr.push('전기')
          break
        case "풀":
          // 추천
          recommendArr.push("독")
          recommendArr.push("비행")
          recommendArr.push("벌레")
          recommendArr.push("불꽃")
          recommendArr.push("얼음")

          // 효과 약함
          weakEffectArr.push('땅')
          weakEffectArr.push('물')
          weakEffectArr.push('전기')
          weakEffectArr.push('풀')
          break
        case "얼음":
          // 추천
          recommendArr.push("격투")
          recommendArr.push("바위")
          recommendArr.push("강철")
          recommendArr.push("불꽃")

          // 효과 약함
          weakEffectArr.push('얼음')
          break
        case "에스퍼":
          // 추천
          recommendArr.push("벌레")
          recommendArr.push("고스트")
          recommendArr.push("악")

          // 효과 약함
          weakEffectArr.push('격투')
          weakEffectArr.push('에스퍼')
          break
        case "드래곤":
          // 추천
          recommendArr.push("얼음")
          recommendArr.push("드래곤")
          recommendArr.push("페어리")

          // 효과 약함
          weakEffectArr.push('불꽃')
          weakEffectArr.push('물')
          weakEffectArr.push('전기')
          weakEffectArr.push('풀')
          break
        case "악":
          // 추천
          recommendArr.push("격투")
          recommendArr.push("벌레")
          recommendArr.push("페어리")

          // 효과 약함
          weakEffectArr.push('고스트')
          weakEffectArr.push('악')

          // 비추천
          notRecommendArr.push("에스퍼")
          break
        case "페어리":
          //추천
          recommendArr.push("독")
          recommendArr.push("강철")

          // 효과 약함
          weakEffectArr.push('격투')
          weakEffectArr.push('벌레')
          weakEffectArr.push('악')

          // 비추천
          notRecommendArr.push("드래곤")
          break                                                                                                                                                 
        }
      })
     
      if (isRecommend) {
        // 비추천 배열 합치기
        const tmpArr = _.concat(weakEffectArr, notRecommendArr);

        let arr = []
        // 추천배열에서 제외하여 반환
        _.forEach(recommendArr, function(value) {
          if (!_.includes(tmpArr, value)) {
            arr.push(value)
          }
        })

        retVal = _.uniq(arr)
        return _(retVal).sortBy().value()
      } else {
        retVal = _.uniq(notRecommendArr)
        return _(retVal).sortBy().value()
      }

    }
  }
}
</script>

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
.poketmon-img {
    width: 290px;
    margin: 15px 0 20px 0;  
}
.summary-box {
    display: inline;
}
.summary {
    display: inline-block;
    width: 145px;
    margin: 5px 0 10px 0;
    text-align: center;
}
.summary-type span {
    display: block;
    margin: 3px 0 0 0;
    font-size: 13px;
}
.summary-type .sub-title {
    text-align: center;
    color: #919191;
    font-size: small;
}
.summary-type .skill {
    text-align: left;
    color: #a51515;
    padding-left: 15px;
    font-size: small;
}
.summary-type img {
  width: 140px;
}
.footer {
    display: inline-block;
    margin: 10px 0px 20px 0;
    width: 100%;
}
input[type=radio]{
	width: 0;
  height: 0;
  position: absolute;
  left: -9999px;
}
input[type=radio] + label{
  margin: 0;
  width: 100px;
  padding: 10px 0 10px 0;
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
	background-color: #8f43c2;
  color: #FFF;
  box-shadow: 0 0 10px rgba(204, 102, 251, 0.5);
  border-color: #8f43c2;
  z-index: 1;
}
.recommend-box {
  text-align: center;
  padding-bottom: 20px;
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
.header {
  float: left;
}
.modal-close {
  width: 100px;
  border-color: #c8c8c8;
}
.close {
  display:inline-block;
  color: #b9b9b9;
}
.close-btn:after {
  content: "\00d7";
  font-size: 30pt;
  line-height: 30px;
}
</style>