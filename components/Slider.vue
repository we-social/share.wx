<template>
  <div class="weui-slider-box">
    <div class="weui-slider">
      <div ref="sliderInner" class="weui-slider__inner">
        <div ref="sliderTrack"
          class="weui-slider__track"
          :style="{ width: percent }"
        ></div>
        <div ref="sliderHandler"
          class="weui-slider__handler"
          :style="{ left: percent }"
        ></div>
      </div>
    </div>
    <div ref="sliderValue" class="weui-slider-box__value">
      {{fmtValue}}
    </div>
  </div>
</template>

<script>
// WeUI-Slider
// https://github.com/weui/weui/blob/master/src/example/fragment/slider.html
export default {
  props: {
    range: Array,
    value: Number,
    point: {
      type: Number,
      default: 1,
    },
  },

  data () {
    var { value } = this
    return {
      totalLen: 0,
      startLeft: 0,
      startX: 0,
      ratio: this.v2r(value || 0),
      shouldWatchRatio: true
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.afterMounted()
    })
  },

  watch: {
    value (v) {
      this.shouldWatchRatio = false
      this.ratio = this.v2r(v)
      this.$nextTick(() => {
        this.shouldWatchRatio = true
      })
    },
    ratio (r) {
      if (!this.shouldWatchRatio) return
      var v = this.myValue
      this.$emit('input', v)
    }
  },

  computed: {
    percent () {
      return Math.round(this.ratio * 100) + '%'
    },
    fmtValue () {
      return this.r2fv(this.ratio)
    },
    myValue () {
      return Number(this.fmtValue)
    }
  },

  methods: {
    v2r (value) {
      var [min, max] = this.range
      var ratio = (value - min) / (max - min)
      return ratio
    },
    r2fv (ratio) {
      var [min, max] = this.range
      var v = ((max - min) * ratio + min)
      return v.toFixed(this.point) // 精确到1位小数
    },
    afterMounted () {
      var { sliderInner, sliderHandler } = this.$refs
      this.totalLen = sliderInner.clientWidth
      sliderHandler
        .addEventListener('touchstart', e => {
          this.startLeft = parseInt(sliderHandler.style.left) * this.totalLen / 100;
          this.startX = e.changedTouches[0].clientX;
        })
      sliderHandler
        .addEventListener('touchmove', e => {
          var { totalLen, startLeft, startX } = this
          var dist = startLeft + e.changedTouches[0].clientX - startX,
              ratio;
          dist = dist < 0 ? 0 : dist > totalLen ? totalLen : dist;
          ratio = dist / totalLen;
          this.ratio = ratio
          e.preventDefault();
        })
    }
  }
}
</script>

<style scoped>
.weui-slider-box {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.weui-slider-box__value {
  margin-left: 1.7em;
  min-width: 24px;
  color: #888888;
  text-align: center;
  font-size: 14px;
  float: right;
}
.weui-slider-box .weui-slider {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  margin-left: 0.8em;
}
.weui-slider__inner {
  position: relative;
  height: 2px;
  background-color: #E9E9E9;
}
.weui-slider__track {
  height: 2px;
  background-color: #1AAD19;
  width: 0;
}
.weui-slider__handler {
  position: absolute;
  left: 0;
  top: 50%;
  width: 28px;
  height: 28px;
  margin-left: -14px;
  margin-top: -14px;
  border-radius: 50%;
  background-color: #FFFFFF;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}
</style>
