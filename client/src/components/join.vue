<template>
<div id="app">
  <h1>{{ msg }}</h1> <br>


  <form>
    <input v-model="email" placeholder="email"><br>
    <input v-model="password" placeholder="password"><br>
    <button v-on:click="join">Join</button>
  </form>

  <br><br>
  

  <span>{{ owner }}</span>

</div>
</template>


<script>
export default {
  name: 'app',
  data: function() {
    return {
      msg: "Let's go HK! WJ & JA",
      owner: "made by WANZARGEN ",
      email: '',
      password: ''
    }
  },
  methods: {
    join: function() {
      const baseURI = 'https://localhost:3000';
      this.$http.get(`${baseURI}/api/user`)
      .then((result) => {
        console.log(result)
      })

      alert('Welcome!')
    }
  }
}
// var vm = new Vue({
//   el: '#app',
//   data: {
//     msg: 'Hello world'
//   }
// });
</script>

<style scoped>

</style>
