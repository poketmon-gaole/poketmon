<template>
  <div>
    <div class="left">
      <div class="close-box">
        <div class="close close-btn" @click="leave()"></div>
      </div>
      <ul>
        <li class="title">
          <div>▶ 포켓몬 레전드 시리즈</div>
        </li>
        <li v-for="item in seriesList" :key="item.series">
          <template v-if="Number(item.series) > 4">
            <div :style="[series == item.series? 'font-weight: bold' : '']" @click="doSeries(Number(item.series))">- {{ item.content }}</div>
          </template>
        </li>
      </ul>
      <ul>
        <li class="title">
          <div>▶ 포켓몬 가오레 시리즈</div>
        </li>
        <li v-for="item in seriesList" :key="item.series">
          <template v-if="Number(item.series) < 5">
            <div :style="[series == item.series? 'font-weight: bold' : '']" @click="doSeries(Number(item.series))">- {{ item.content }}</div>
          </template>
        </li>
      </ul>
    </div>
    <img class="left-btn" @click="toggle" src="../assets/img/left_btn.png" width="50">
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'left',
  props: {
    series: String
  },
  components: {
  },
  watch: {
    scrollTop: function(newValue, oldValue) {
      if (newValue > oldValue) {
        this.isScrollTop = true
      } else {
        this.isScrollTop = false
      }
    }
  },    
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },  
  data () {
    return {
      toggle: this.enter,
      seriesList: [
        {content: '레전드 3탄', series: '07'},
        {content: '레전드 2탄', series: '06'},
        {content: '레전드 1탄', series: '05'},
        {content: '가오레 4탄', series: '04'},
        {content: '가오레 3탄', series: '03'},
        {content: '가오레 2탄', series: '02'},
        {content: '가오레 1탄', series: '01'}
      ],
      scrollTop: 0,
      isScrollTop: false
    }
  },
  methods: {
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop

      if (scrollTop > 0) {
        this.leave()
      }
    },    
    enter() {
      this.show = true;
      this.toggle = this.leave
      var left = (200 - (parseInt($('.left-btn').css('width')) / 2)) + 'px'
      $('.left').stop().animate({left: '0px'}, 250)
      $('.left-btn').stop().animate({left: left}, 250)
      $('.left-btn').css({transform: 'rotate(180deg)'})
    },
    leave() {
      this.show = false;
      this.toggle = this.enter
      var left = (0 - (parseInt($('.left-btn').css('width')) / 2)) + 'px'
      $('.left').stop().animate({left: '-200px'}, 250)
      $('.left-btn').stop().animate({left: left}, 250)
      $('.left-btn').css({transform: 'rotate(0deg)'})
    },
    doSeries(series) {
      if (series < 7) {
        this.leave()
        this.$parent.setSeries(series)
      } else {
        this.$alert("준비중입니다.")
      }
    }
  }
}
</script>
<style>
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
}
.left-btn {position:fixed; top:495px; left:-25px; cursor:pointer}
.close-box {
  background-color: black;
  padding: 10px 7px 0px 0;
  text-align: right;
}
.close-box button {
  display: inline-block;
  border: 0;
  background: black;
  color: white;
  position: relative;
  top: -3px;
  font-size: 16px;    
}
.close {display:inline-block}
.close-btn:after {content: "\00d7"; font-size:35pt;line-height:35px;}
</style>