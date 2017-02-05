<template>
  <div>
    <div v-if="hasMask" class="weui-mask"></div>
    <div v-if="curr" class="weui-dialog">
      <div class="weui-dialog__bd">
        {{curr.content}}
      </div>
      <div class="weui-dialog__ft">
        <span v-for="(text, i) in currButtons"
          href="javascript:;"
          class="weui-dialog__btn"
          :class="[
            i === currButtons.length - 1
            ? 'weui-dialog__btn_primary'
            : 'weui-dialog__btn_default'
          ]"
          @click="handleConfirm(i)"
        >
          {{text}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'weui-mask',

  data () {
    return {
      resolve: null,
      queue: []
    }
  },

  computed: {
    currButtons () {
      return this.curr.buttons
        || [this.curr.button]
    },
    curr () {
      return this.queue[0]
    },
    hasMask () {
      return this.queue.length > 0
    }
  },

  methods: {
    async confirm (content, buttons) {
      this.queue.push({ content, buttons })
      return await this.createPromise()
    },
    async alert (content, button) {
      this.queue.push({ content, button })
      return await this.createPromise()
    },
    createPromise () {
      return new Promise(res => {
        this.resolve = res
      })
    },
    handleConfirm (index) {
      this.queue.shift()
      this.resolve(index)
      this.resolve = null
    }
  }
}
</script>

<style scoped>
.weui-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.weui-dialog {
  position: fixed;
  z-index: 5000;
  width: 80%;
  max-width: 300px;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  text-align: center;
  border-radius: 3px;
  overflow: hidden;
}
.weui-dialog__bd {
  padding: 0 1.6em 0.8em;
  min-height: 40px;
  font-size: 15px;
  line-height: 1.3;
  word-wrap: break-word;
  word-break: break-all;
  color: #999999;
}
.weui-dialog__bd:first-child {
  padding: 2.7em 20px 1.7em;
  color: #353535;
}
.weui-dialog__ft {
  position: relative;
  line-height: 48px;
  font-size: 18px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.weui-dialog__ft:after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #D5D5D6;
  color: #D5D5D6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.weui-dialog__btn {
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  color: #3CC51F;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
}
.weui-dialog__btn_primary {
  color: #0BB20C;
}
.weui-dialog__btn_default {
  color: #353535;
}
</style>
