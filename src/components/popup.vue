<template>
  <div>
    <Teleport to="body">
      <modal :show="visible" @close="doClose">
        <template #header>
          <div class="header">
            <div class="close close-btn" @click="doClose()"></div>
          </div>
        </template>
        <template #body>
          <strong>{{ info.name }} [{{ info.type }}]</strong>
          <img class="poketmon-img" :src="require(`@/assets/img/disk/${info.imageName}`)">
          <div class="recommend-box" v-if="info.notRecommendArray.length > 0">
            <input type="radio" @click="info.isRecommend = true" id="radioPopup1" name="test" value="1" checked="checked">
            <label for="radioPopup1">추천</label>
            <input type="radio" @click="info.isRecommend = false" id="radioPopup2" name="test" value="2">
            <label for="radioPopup2" >비추천</label>
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
          <b-button class="modal-close" pill @click="doClose()" squared variant="outline-secondary">닫기</b-button>
        </template>
      </modal>
    </Teleport>
  </div>
</template>

<script>
import _ from 'lodash'
import Data from "@/components/data.json"
import Modal from "@/components/common/modal.vue"

export default {
  name: 'Popup',
  components: {
    Modal
  },
  data() {
    return {
      visible: false,
      data: Data,
      info: null
    }
  },
  methods: {
    load(item) {
      this.info = item
      this.visible = true
    },
    doClose() {
      this.visible = false
      this.$emit('close')
    },
    getCorrelation(item) {
      const data = _.filter(this.data, {correlation: item})
      let retVal = _.orderBy(data, ['grade', 'luckYn', 'skill', 'id'], ['desc', 'desc', 'asc', 'desc'])

      // 짝수로 안될경우 데이터 생성 후 감추기
      if (retVal.length % 2 !== 0) {
        let item = _.cloneDeep(retVal[retVal.length-1])
        item.visibility = true

        retVal.push(item)
      }

      return retVal
    },
    getRecommendData() {
      let retVal

      if (this.info.isRecommend) {
        retVal = this.info.recommendArray
      } else {
        retVal = this.info.notRecommendArray
      }

      return retVal
    },
    getSeries(item) {
      let retVal, skill

      const series = Number(item.id.substr(0, 2))
      skill = item.skill !== undefined? item.skill : ''

      if (series < 5) {
        retVal = "가오레" + series + "탄 " + skill
      } else {
        retVal = "레전드" + (series-4) + "탄 " + skill
      }

      return retVal;
    }    
  }
}
</script>
<style scoped>
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
.header {
  float: left;
}
.poketmon-img {
    width: 290px;
    margin: 15px 0 20px 0;  
}
.recommend-box {
  text-align: center;
  padding-bottom: 20px;
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