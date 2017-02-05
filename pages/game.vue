<template>
  <div class="container">
    <h1>亮爷游戏大厅</h1>
    <input type="text" placeholder="取名字"
      v-model="name"
      @keyup.enter="makeName"
    >
    <hr>
    <input type="text" placeholder="加入房间"
      v-model="room"
      @keyup.enter="joinRoom"
    >
    <span> or </span>
    <button @click="createRoom">新建房间</button>
  </div>
</template>

<script>
export default {
  data ({ req }) {
    console.log('req', req.session.name)
    let name
    let room
    if (req) {
      console.log('')
      name = req.session.name
      room = req.session.room
    }
    return {
      name,
      room
    }
  },
  methods: {
    makeName () {
      this.$store.dispatch('makeName', this.name)
    },
    joinRoom () {
      this.$store.dispatch('joinRoom', this.room)
    },
    createRoom () {
      this.$store.dispatch('createRoom')
    }
  }
}
</script>

<style>
.container {
  padding: 100px;
}
</style>
