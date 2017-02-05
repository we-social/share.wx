<template>
  <section class="page" hidden>
    <div class="page__hd">
      <h1 class="page__title">「 分享生成器 」</h1>
      <p class="page__desc desc-1">“简直就是简易段子手工具”</p>
      <p class="page__desc desc-2">——昌爷</p>
    </div>

    <div class="page__bd">
      <div class="weui-cells__title">
        展示类型
      </div>
      <div class="weui-cells weui-cells_radio">
        <label v-for="item in showTypeList"
          class="weui-cell weui-check__label"
          :for="'showType-' + item.value"
        >
          <div class="weui-cell__bd">
            <p>{{item.text}}</p>
          </div>
          <div class="weui-cell__ft">
            <input type="radio"
              class="weui-check" name="showType"
              :value="item.value"
              :id="'showType-' + item.value"
              :checked="form.showType === item.value"
              @click="form.showType = item.value"
            >
            <span class="weui-icon-checked"></span>
          </div>
        </label>
      </div>

      <fieldset v-show="form.showType === 'link'">
        <div class="weui-cells__title">
          打开跳转到
        </div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <textarea rows="2"
                class="weui-textarea"
                placeholder="“example.tv/天线宝宝/全集”"
                v-model="form.showLink"
              ></textarea>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset v-show="form.showType === 'image'">
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <uploader title="打开展示图片"
                v-model="form.showImage"
              ></uploader>
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset v-show="form.showType === 'text'">
        <div class="weui-cells__title">
          打开展示文字
        </div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <textarea rows="2"
                class="weui-textarea"
                placeholder="“根本没有”"
                v-model="form.showText"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="weui-cells__title">
          展示文字大小
        </div>
        <div class="weui-cell no-border">
          <div class="weui-cell__bd">
            <slider :range="[0.1, 3]"
              v-model="form.showTextSize"
            ></slider>
          </div>
        </div>
      </fieldset>

      <div class="weui-cells__title">
        分享标题
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea rows="2"
              class="weui-textarea"
              placeholder="“狂吃还能减肥的办法！全网疯转！”"
              v-model="form.shareTitle"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="weui-cells__title">
        分享描述
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea rows="2"
              class="weui-textarea"
              placeholder="“大家都在围观的直播”"
              v-model="form.shareDesc"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <uploader title="分享占位图片"
              v-model="form.shareImage"
            ></uploader>
          </div>
        </div>
      </div>

      <div class="weui-btn-area">
        <span class="weui-btn weui-btn_disabled weui-btn_default">
          点击右上角即可分享
        </span>
      </div>

      <div class="page__ft">
        <p>share.wx.fritx.me</p>
      </div>
    </div>

    <script src="/jweixin-1.0.0.js"></script>
  </section>
</template>

<script>
import Uploader from '~components/Uploader'
import Slider from '~components/Slider'
import axios from 'axios'

export default {
  name: 'share-generator',
  components: { Slider, Uploader },

  head: {
    title: '分享生成器'
  },

  data () {
    return {
      form: {
        shareTitle: '',
        shareDesc: '',
        shareImage: '',
        showLink: '',
        showImage: '',
        showText: '',
        showTextSize: 1,
        showType: 'text',
      },
      showTypeList: [
        { text: '文字', value: 'text' },
        { text: '图片', value: 'image' },
        { text: '链接', value: 'link' },
      ]
    }
  },

  watch: {
    form: {
      deep: true,
      handler () {
        this.wxUpdateShare()
      }
    }
  },

  async mounted () {
    // hack: 解决nuxt 内容比style先加载的bug
    // https://github.com/nuxt/nuxt.js/issues/22
    this.$el.removeAttribute('hidden')

    await this.wxInitConfig()
    this.wxUpdateShare()
  },

  methods: {
    wxUpdateShare () {
      let link

      if (this.form.showType === 'text') {
        link = [
          'http://share.wx.fritx.me/show?size=',
          encodeURIComponent(this.form.showTextSize),
          '&text=',
          encodeURIComponent(this.form.showText)
        ].join('')
      } else if (this.form.showType === 'image') {
        link = [
          'http://share.wx.fritx.me/show?image=',
          encodeURIComponent(this.form.showImage)
        ].join('')
      } else if (this.form.showType === 'link') {
        link = this.form.showLink
        if (!/^https?:/.test(link)) {
          link = `http://${link}`
        }
      }
      link = link || location.href

      const data = {
        title: this.form.shareTitle || '「 分享生成器 」',
        desc: this.form.shareDesc || '“简直就是简易段子手工具”',
        link,
        imgUrl: this.form.shareImage
          || 'http://share.wx.fritx.me/laoge.jpg'
        // imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg'
      }
      console.log('wxdata update', data)

      wx.ready(function () {
        wx.onMenuShareTimeline(Object.assign({
            // title: '', // 分享标题
            // link: '', // 分享链接
            // imgUrl: '', // 分享图标
            success: function () { 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        }, data));

        wx.onMenuShareAppMessage(Object.assign({
            // title: '', // 分享标题
            // desc: '', // 分享描述
            // link: '', // 分享链接
            // imgUrl: '', // 分享图标
            // type: '', // 分享类型,music、video或link，不填默认为link
            // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () { 
                // 用户确认分享后执行的回调函数
            },
            cancel: function () { 
                // 用户取消分享后执行的回调函数
            }
        }, data));
      })
    },

    async wxInitConfig () {
      const base = 'http://fritx.me:8099'
      const { data } = await axios.get(`${base}/wxsign`)
      console.log('wxdata init', data)

      wx.config(Object.assign({
        // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，公众号的唯一标识
        timestamp: 0, // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名，见附录1
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      }, data));

      wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });

      wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        // alert(JSON.stringify(res))
        console.error('wx.error', res)
      });
    }
  }
}
</script>

<style scoped src="~assets/weui.css"></style>
<style scoped>
.page {
  background-color: #f8f8f8;
}
.page__hd {
  padding: 40px;
}
.page__title {
  text-align: left;
  font-size: 20px;
  font-weight: 400;
}
.page__desc {
  margin-top: 5px;
  color: #888;
  text-align: left;
  font-size: 14px;
}

fieldset {
  border: none;
}
.page__hd {
  padding: 30px 30px 20px;
}
.page__title {
  margin-bottom: 16px;
  font-size: 22px;
}
.desc-1 {
  padding-left: 2.5em;
}
.desc-2 {
  padding-left: 12em;
}
.no-border:before {
  display: none;
}
</style>
