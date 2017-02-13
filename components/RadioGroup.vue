<template>
  <div class="weui-cells weui-cells_radio">
    <label v-for="item in list"
      :key="item.value"
      class="weui-cell weui-check__label"
      :for="getId(item.value)"
    >
      <div class="weui-cell__bd">
        <p>{{item.text}}</p>
      </div>
      <div class="weui-cell__ft">
        <input type="radio"
          class="weui-check" :name="name"
          :value="item.value"
          :id="getId(item.value)"
          :checked="value === item.value"
          @click="handleSelect(item.value)"
        >
        <span class="weui-icon-checked"></span>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    list: Array, // 选项 [{ text, value }]
    name: String, // 用于form中radio的分组
    value: [String, Number, Boolean]
  },

  methods: {
    getId (val) {
      return `${this.name}-${val}`
    },
    handleSelect (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped>
.weui-check__label {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.weui-cells_radio .weui-cell__ft {
  padding-left: 0.35em;
}
.weui-check {
  position: absolute;
  left: -9999em;
}
.weui-cells_radio .weui-check:checked + .weui-icon-checked:before {
  display: block;
  content: '\EA08';
  color: #09BB07;
  font-size: 16px;
}
</style>
