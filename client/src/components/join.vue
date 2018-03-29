<template>
<div id="app">
  <h1>{{ msg }}</h1> <br>


  <form>
    <input v-model="name" placeholder="name"><br>
    <input v-model="email" placeholder="email"><br>
    <input v-model="password" placeholder="password"><br>
    <button type='button' v-on:click="join">Join</button>
  </form>

  <br><br>
  

  <span>{{ owner }}</span>

</div>
</template>


<script>
var email = '',
    password = '';

export default {
  name: 'app',
  data: function() {
    return {
      msg: "Let's go HK! WJ & JA",
      owner: "made by WANZARGEN ",
      email: '',
      password: '',
      name: ''
    }
  },
  methods: {
    join: function() {
      const baseURI = 'http://localhost:3000';
      this.$http.post(`${baseURI}/api/user`, {
        name: this.name,
        email: this.email,
        password: this.password
      })
      .then((result) => {
        console.log(result.data)
        alert('Welcome!')
        this.$router.push('/home')
      }).catch((err) => {
        console.error(err)
      })     
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
