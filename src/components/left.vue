<template>
  <div v-show="isShow" class="left-background" @click="leave()"></div>
  <div class="left">
      <div class="close-box">
        <span>Gaole Series</span>
        <div class="close close-btn" @click="leave()"></div>
      </div>
      <div>
        <ul>
          <li class="title">
            <div>▶ 포켓몬 레전드 시리즈</div>
          </li>
          <li v-for="item in seriesList" :key="item.series">
            <template v-if="Number(item.series) > 4">
              <div :style="[series == item.series? 'font-weight: bold' : '']" @click="doSeries(item.series)">- {{ item.content }}</div>
            </template>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li class="title">
            <div>▶ 포켓몬 가오레 시리즈</div>
          </li>
          <li v-for="item in seriesList" :key="item.series">
            <template v-if="Number(item.series) < 5">
              <div :style="[series == item.series? 'font-weight: bold' : '']" @click="doSeries(item.series)">- {{ item.content }}</div>
            </template>
          </li>
        </ul>
      </div>
      <div class="banner">
        <iframe src="https://ads-partners.coupang.com/widgets.html?id=606219&template=carousel&trackingCode=AF3681542&subId=&width=150&height=150" width="150" height="150" frameborder="0" scrolling="no" referrerpolicy="unsafe-url"></iframe>
      </div>
      <!--
      <div class="support">
        <span>
          <b-button variant="light" @click="onRedirect()">개발자 후원</b-button>
        </span>
      </div>
      -->
    </div>
    <img class="left-btn" @click="toggle" src="../assets/img/left_btn.png" width="50">
</template>

<script>
import $ from 'jquery'

export default {
  name: 'left',
  props: {
    series: String
  },
  data () {
    return {
      isShow: false,
      toggle: this.enter,
      seriesList: [
        {content: '레전드 3탄', series: '07'},
        {content: '레전드 2탄', series: '06'},
        {content: '레전드 1탄', series: '05'},
        {content: '가오레 4탄', series: '04'},
        {content: '가오레 3탄', series: '03'},
        {content: '가오레 2탄', series: '02'},
        {content: '가오레 1탄', series: '01'}
      ]
    }
  },
  methods: {
    onRedirect() {
      window.open("https://toss.me/포켓몬가오레/1500", "_self")
    },
    enter() {
      this.isShow = true;
      this.toggle = this.leave
      this.scrollDisable()
      var left = (200 - (parseInt($('.left-btn').css('width')) / 2)) + 'px'
      $('.left').stop().animate({left: '0px'}, 250)
      $('.left-btn').stop().animate({left: left}, 250)
      $('.left-btn').css({transform: 'rotate(180deg)'})
    },
    leave() {
      this.isShow = false;
      this.toggle = this.enter
      this.scrollAble()
      var left = (0 - (parseInt($('.left-btn').css('width')) / 2)) + 'px'
      $('.left').stop().animate({left: '-200px'}, 250)
      $('.left-btn').stop().animate({left: left}, 250)
      $('.left-btn').css({transform: 'rotate(0deg)'})
    },
    doSeries(series) {
      this.leave()
      this.$parent.setSeries(series)
    },
    scrollDisable() {
      $('html, body').css({'overflow': 'hidden', 'height': '100%'});
      $('#app').on('scroll touchmove mousewheel', function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      });
    },
    scrollAble() {
      $('html, body').css({'overflow': 'auto', 'height': '100%'});
      $('#app').off('scroll touchmove mousewheel');
    }
  }
}
</script>
<style>
.left-background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.left {
  position:fixed; 
  top:0px; 
  left:-200px; 
  width:200px; 
  height:100%; 
  background:#5a5a5a;
  overflow: hidden;
  color: white;
}
.left ul {
  width: 100%;
  list-style-type: none;
  padding: 0;
  text-align: left;
  margin: 10px 0 20px 0;
}
.left li {
  width: 100%;
  margin: 0 0 10px 0;
  text-indent: 25px;
}
.left .title {
  text-indent: 10px;
  color: #c0c0c0;
}
.left-btn {
  position:fixed;
  top:495px;
  left:-25px;
  cursor:pointer;
}
.left .close-box {
  background:black;
  padding: 10px 7px 0px 0;
  text-align: right;
}
.left .close-box span {
  float: left;
  margin: 3px 0 0 6px;
  border-radius: 13px;
  border: 1px solid #fff;
  padding: 2px 13px 2px 11px;
}
.left .close-box button {
  display: inline-block;
  border: 0;
  background: black;
  color: white;
  position: relative;
  top: -3px;
  font-size: 16px;    
}
.left .close {
  display:inline-block
}
.left .close-btn:after {
  content: "\00d7";
  font-size:35pt;
  line-height:35px;
}
.left .support span {
  display: inline-block;
  margin: 10px 0 0 0;  
}
.left .support button {
  width: 173px;
}
.banner {
  position: absolute;
    bottom: 0;
    width: 100%;
}
</style>