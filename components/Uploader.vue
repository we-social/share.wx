<template>
  <div class="weui-uploader">
    <div class="weui-uploader__hd">
      <p class="weui-uploader__title">{{title}}</p>
      <div class="weui-uploader__info">{{value ? 1 : 0}}/1</div>
    </div>
    <div class="weui-uploader__bd">
      <ul v-if="value"
        class="weui-uploader__files"
      >
        <li
          class="weui-uploader__file"
          :style="imageStyle"
        >
          <label class="upload-label">
            <input class="weui-uploader__input"
              type="file" accept="image/*"
              @change="handleUpload"
            >
          </label>
        </li>
        <!-- <li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(./images/pic_160.png)">
          <div class="weui-uploader__file-content">
            <i class="weui-icon-warn"></i>
          </div>
        </li> -->
        <!-- <li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(./images/pic_160.png)">
          <div class="weui-uploader__file-content">50%</div>
        </li> -->
      </ul>
      <div v-else
        class="weui-uploader__input-box"
      >
        <input class="weui-uploader__input"
          type="file" accept="image/*"
          @change="handleUpload"
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const baseUrl = 'http://fritx.me:8099'

export default {
  name: 'weui-uploader',

  props: {
    title: String,
    value: String,
    maxSize: {
      type: Number,
      default: 200 * 1024, // 200K
    }
  },

  data () {
    return {
      dataSrc: ''
    }
  },

  computed: {
    imageStyle () {
      const url = this.value || this.dataSrc
      return {
        'background-image': `url(${url})`
      }
    }
  },

  methods: {
    handleUpload (e) {
      const file = e.target.files[0]
      if (file) {
        if (file.size > this.maxSize) {
          // NOTE: iPad微信6.5.4 弹窗后卡死 只能退出重进
          // alert('上传图片过大，你胆大包天')
          confirm('你上传的图片好大，知道错没？')
          // TODO: 使用weui-toast或dialog
          return
        }
        const reader = new FileReader()
        reader.addEventListener('load', async () => {
          this.dataSrc = reader.result
          const form = new FormData()
          form.append('image', file)
          const { data } = await axios
            .post(`${baseUrl}/upload`, form)
          this.$emit('input', `${baseUrl}${data.url}`)
        })
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>

<style scoped>
.weui-uploader__hd {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding-bottom: 10px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.weui-uploader__title {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.weui-uploader__info {
  color: #B2B2B2;
}
.weui-uploader__bd {
  margin-bottom: -4px;
  margin-right: -9px;
  overflow: hidden;
}
.weui-uploader__files {
  list-style: none;
}
.weui-uploader__file {
  float: left;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 79px;
  height: 79px;
  background: no-repeat center center;
  background-size: cover;
}
.weui-uploader__file-content {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #FFFFFF;
}
.weui-uploader__file_status .weui-uploader__file-content {
  display: block;
}
.weui-uploader__file_status {
  position: relative;
}
.weui-uploader__file_status:before {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.weui-uploader__input-box {
  float: left;
  position: relative;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 77px;
  height: 77px;
  border: 1px solid #D9D9D9;
}
.weui-uploader__input-box:before, .weui-uploader__input-box:after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #D9D9D9;
}
.weui-uploader__input-box:before {
  width: 2px;
  height: 39.5px;
}
.weui-uploader__input-box:after {
  width: 39.5px;
  height: 2px;
}
.weui-uploader__input {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.upload-label {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
}
.weui-uploader__file {
  border: 1px solid #D9D9D9;
  box-sizing: border-box;
}
</style>
