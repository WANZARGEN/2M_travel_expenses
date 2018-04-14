<template>
<div id="app">
  <h1>{{ msg }}</h1> <br>


  <form>
    <input v-model="name" placeholder="name"><br>
    <input v-model="password" type='password' placeholder="password"><br>
    <button type='button' v-on:click="join">Join</button>
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
    join: function() {
      const baseURI = 'http://localhost:3000';
      this.$http.post(`${baseURI}/api/user`, {
        name: this.name,
        password: this.password
      })
      .then((result) => {
        console.log(result.data)
        let userId = result.data._id
        this.$http.post(`${baseURI}/api/budget`, {
          user: userId,
          cash: 0,
          card: 0
        })
        .then((result) => {
          alert('Welcome!')
          this.$router.push('/login')
        }).catch((err) => {
          console.error(err)
        })     
      }).catch((err) => {
        console.error(err)
      })     
    }
  }
}
</script>

<style scoped>

</style>
