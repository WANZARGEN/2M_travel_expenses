<template>
<div id="app">
  <h1>{{ msg }}</h1> <br>


  <form>
    <input v-model="name" placeholder="name"><br>
    <input v-model="password" placeholder="password"><br>
    <button type='button' v-on:click="login">Login</button>
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
      password: '',
      name: ''
    }
  },
  methods: {
    login: function() {
      const baseURI = process.env.baseURI;
      
      this.$http.post(`${baseURI}/api/user/login`, {
        name: this.name,
        password: this.password
      })
      .then((result) => {
        console.log(result.data)
        alert('Welcome!')
        this.$router.push('/home')
      }).catch((err) => {
        console.error(err)
        alert(err.response.data.message)
      })     
    }
  }
}
</script>

<style scoped>

</style>
