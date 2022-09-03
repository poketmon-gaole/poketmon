<template>
  <div class="contents">
    <h1>{{ setTitle(msg, series) }}</h1>
    <template v-for="grade in gradeList" :key="grade">
      <h3>GRADE {{ grade }}</h3>
      <ul>
        <template v-for="item in getData()" :key="item.id">
          <li v-if="item.grade == grade">
              <div class="type-box" :style="[grade == 4? 'background: #838383' : '']" @click="doModal(item)">
                <label class="poketmon-name">{{ item.name }} [{{ item.type }}]</label>
                <div class="type-box-left">
                  <img :src="require(`@/assets/img/disk/${item.imageName}`)">
                </div>
                <div class="type-box-right">
                  <span v-if="item.hp !== undefined" :class="[grade == 4? 'text' : '']">HP: {{ item.hp }}</span>
                  <span v-if="item.atc !== undefined" :class="[grade == 4? 'text' : '']">공격: {{ item.atc }}</span>
                  <span v-if="item.spclAtck !== undefined" :class="[grade == 4? 'text' : '']">특수공격: {{ item.spclAtck }}</span>
                  <span v-if="item.def !== undefined" :class="[grade == 4? 'text' : '']">방어: {{ item.def }}</span>
                  <span v-if="item.spclDfns !== undefined" :class="[grade == 4? 'text' : '']">특수방어: {{ item.spclDfns }}</span>
                  <span v-if="item.speed !== undefined" :class="[grade == 4? 'text' : '']">스피드: {{ item.speed }}</span>
                  <span v-if="item.skill !== undefined" :class="[grade == 4? 'text' : '']">{{ item.skill }}</span>
                </div>
                <div class="type-box-bottom">
                    <span>{{ getSolution(item.type, true) }}</span>
                    <span>{{ getSolution(item.type, false) }}</span>
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
          <img src="../assets/img/x.png" width="16" @click="doModal">
        </template>
        <template #body>
          <strong :ref="top">{{ info.name }} [{{ info.type }}]</strong>
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
            <ul style="width:100%">
              <template v-for="item in getSort()" :key="item.id">
                <li class="summary" v-if="recommend === getCorrelation(item)">
                    <div class="summary-type">
                      <span style="text-align: center">
                        {{ item.name }}
                      </span>
                      <img :src="require(`@/assets/img/disk/${item.imageName}`)" width="145">
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
          <button @click="doModal" type="button">닫기</button>
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

export default {
  name: 'PocktmonMain',
  components: {
    Modal,
    Left
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
  methods: { 
    getData() {
      let retVal = []

      this.data.forEach((item) => {
        // 시리즈별 조회
        if (item.id.substr(0, 2) == this.series) {
          retVal.push(item)
        }
      })

      return retVal;
    },
    getRecommendData() {
      if (this.info.isRecommend) {
        return this.info.recommendArray
      } else {
        return this.info.notRecommendArray
      }
    },
    getSort() {
      const retVal = _.orderBy(this.data, ['grade', 'skill', 'id'], ['desc', 'asc', 'asc'])
      return retVal;
    },
    setTitle(msg, series) {
      if (series < 5) {
        return msg + " 가오레 " + Number(series) + "탄";
      } else {
        return msg + " 레전드 " + Number(series-4) + "탄";
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
    setSeries(series) {
      this.series = series
      window.scrollTo(0, 0)
      this.getData()
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

        // 좌측메뉴 닫기
        this.$refs.left.leave();
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
      if (typeof item.correlation === 'undefined') {
        return item.type
      } else {
        return item.correlation
      }
    },
    getDisk(type, isRecommend) {
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

        return _.uniq(arr)
      } else {
        return _.uniq(notRecommendArr)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    color: white;
    padding: 15px 0px 15px 0;
    background: #4c3c27;
    width: 95%;
    display: inline-block;
    font-weight: bold;
}
h3 {
    display: inline-block;
    color: black;
    font-size: 25px;
    padding: 15px 0 15px 10px;
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
button {
    border: 1px solid #c3c3c3;
    font-family: 'Gmarket Sans TTF';
    background: #ffffff;
    border-radius: 10px;
    font-size: 17px;
    width: 128px;
    height: 40px;
    font-weight: bolder;
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
.type-box .poketmon-name {
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
    display: inline-block;
    width: 100%;
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
.poketmon-img {
    width: 290px;
    margin: 15px 0 20px 0;  
}
.summary-box {
    display: inline;
}
.summary {
    display: inline-block;
    width: 50%;
    margin: 5px 0 10px 0;
}
.summary-type {
    width: 142px;
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
</style>
