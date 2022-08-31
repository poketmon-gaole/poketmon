<template>
  <div>
    <div class="left" :style="[isScrollTop? 'top:23px': 'top:0']">
      <div class="close-box">
        <img class="close" src="../assets/img/close.png" width="16">
        <button @click="leave()">CLOSE</button>
      </div>
      <ul>
        <li id="logo">
          <div>▶ 포켓몬 가오레 공략</div>
        </li>
        <li v-for="item in seriesList" :key="item.seires">
          <div :style="[series == item.series? 'font-weight: bold' : '']" @click="doSeries(item.series)">- {{ item.content }}</div>
        </li>
      </ul>
    </div>
    <img class="left-btn" id="left_btn" @click="toggle" src="../assets/img/left_btn.png" width="50">
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'left',
  props: {
    series: String
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
        {content: '가오레 1탄', series: '01'},
        {content: '가오레 2탄', series: '02'},
        {content: '가오레 3탄', series: '03'},
        {content: '가오레 4탄', series: '04'},
        {content: '레전드 1탄', series: '05'}
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
      this.toggle = this.leave
      var left = (200 - (parseInt($('#left_btn').css('width')) / 2)) + 'px'
      $('.left').stop().animate({left: '0px'}, 250)
      $('#left_btn').stop().animate({left: left}, 250)
      $('#left_btn').css({transform: 'rotate(180deg)'})
    },
    leave() {
      this.toggle = this.enter
      var left = (0 - (parseInt($('#left_btn').css('width')) / 2)) + 'px'
      $('.left').stop().animate({left: '-200px'}, 250)
      $('#left_btn').stop().animate({left: left}, 250)
      $('#left_btn').css({transform: 'rotate(0deg)'})
    },
    resize() {
      $(window).resize(function () {
        var height = (window.innerHeight / 2) + 'px'
        $('#left_btn').css({'top': height})
      })
    },
    doSeries(series) {
      this.leave()
      this.$parent.setSeries(series)
    }
  },
  created () {
    this.resize()
  },
}
</script>
<style>
.left{
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
  margin: 10px 0 0 25px;
}
.left li {
  width: 100%;
  margin: 0 0 10px 0;
  text-indent: 10px;
}
#logo {
  text-indent: inherit;
}
#left_btn {position:fixed; top:495px; left:-25px; cursor:pointer}
.close-box {
  background-color: black;
  padding: 15px 7px 15px 0;
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
</style>