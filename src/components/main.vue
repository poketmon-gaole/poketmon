<template>
  <div class="contents">
    <h1>{{ msg }}</h1>
    <template v-for="grade in gradeList" :key="grade">
      <h3>GRADE {{ grade }}</h3>
      <ul>
        <template v-for="item in getData(data)" :key="item.id">
          <li v-if="item.grade == grade">
              <div class="type-box" :style="[grade == 4? 'background: #838383' : '']" @click="doModal(item)">
                <div class="type-box-left">
                  <span class="poketmon-name">{{ item.name }} ({{ item.type }})</span>
                  <img :src="require(`@/assets/img/${item.imageName}`)">
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
  <template>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <modal :show="visible" @close="visible = false">
        <template #header>
          <img src="../assets/img/x.png" width="16" @click="doModal">
        </template>
        <template #body>
          <strong :ref="top">{{ info.name }} ({{ info.type }})</strong>
          <img class="poketmon-img" :src="require(`@/assets/img/${info.imageName}`)">
          <div style="display:inline" v-for="recommend in info.recommendArray" :key="recommend">
            <p>{{ recommend }}</p>
            <div style="border-bottom: 8px solid #ededed; margin: 14px 0 0 0px;"></div>
            <ul>
              <template v-for="item in getSort(data)" :key="item.id">
                <li class="summary" v-if="recommend === getCorrelation(item)">
                    <div class="summary-type">
                      <span style="text-align: center">
                        {{ item.name }}
                      </span>
                      <img :src="require(`@/assets/img/${item.imageName}`)" width="145">
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
import Data from "./data.json"
import Modal from "./modal.vue"
import _ from 'lodash'

export default {
  name: 'PocktmonMain',
  components: {
    Modal
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
    getData(data) {
      let retVal = []

      data.forEach((item) => {
        // 레전트 1탄 '05' 조회
        if (item.id.substr(0, 2) == '05') {
          retVal.push(item)
        }
      })

      return retVal;
    },
    getSort(data) {
      let retVal = []

      data.forEach((item) => {
        // 정렬을 위해 5성이면 앞에, 4성이면 뒤에 추가
        if (item.grade === 5) {
          retVal.unshift(item) 
        } else {
          retVal.push(item)
        }
      })

      return retVal;
    },
    getSeries(item) {
      const series = Number(item.id.substr(0, 2))
      let retVal;

      if (series < 5) {
        retVal = series + "탄 " + item.skill
      } else {
        retVal = item.skill
      }

      if (item.skill === undefined) {
        if (series < 5) {
          retVal = "가오레" + series + "탄"
        } else {
          retVal = "레전드" + (series-4) + "탄"
        }
      }

      return retVal;
    },
    doModal(item) {
      this.visible = !this.visible

      if (this.visible) {
        this.info = item

        // 추천 속성을 배열로 변환 추가
        const recommendArray = this.getDisk(item.type, true)
        this.info.recommendArray = recommendArray
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
    padding: 25px 0 25px 0;
    background: #4c3c27;
    border-radius: 10px;
    font-size: 25px;
    width: 95%;
    display: inline-block;
}
h3 {
    display: inline-block;
    color: black;
    font-size: 25px;
    padding: 15px 0 15px 10px;
    width: 100%;
    margin: 25px 0 0 0;
    text-align: left;
}
ul {
    width: 100%;
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
    width: 95%;
    background: #2b0046;
    border-radius: 15px;
    display: inline-block;    
}
.type-box-left {
    float: left;
}
.type-box-left .poketmon-name {
    display: block;
    font-weight: bolder;
    color: white;
    font-size: large;
    padding: 5px 0 5px 0;
}
.type-box-left img {
    width: 240px;
    margin-left: 10px;
}
.type-box-right {
    float: left;
    width: 28%;
    margin: 55px 0 10px 10px;
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
.summary {
    display: inline-block;
    width: 50%;  
}
.summary-type {
    width: 142px;
}
.summary-type span {
    display: block;
    margin: 3px 0 0 0;
}
.summary-type .sub-title {
    text-align: left;
    color: #919191;
    padding-left: 20px;
    font-size: small;
}
.summary-type .skill {
    text-align: left;
    color: #db1919;
    padding-left: 20px;
    font-size: small;
}
.footer {
    display: inline-block;
    margin: 10px 0px 20px 0;
    width: 100%;
}
</style>
