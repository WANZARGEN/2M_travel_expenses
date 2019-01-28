<template>
<div id="app">
  <h1>Let's go HK! WJ &amp; JA</h1> <br>


  <form>
    <input v-model="name" placeholder="name"><br>
    <input v-model="password" type='password' placeholder="password"><br>
    <button type='button' v-on:click="join">Join</button>
  </form>

  <br><br>
  

  <span>made by WANZARGEN </span>

</div>
</template>


<script>
export default {
  name: 'app',
  data: function() {
    return {
      password: '',
      name: ''
    }
  },
  methods: {
    join: function() {
      this.$http.post(`${this.$baseURI}/api/user`, {
        name: this.name,
        password: this.password
      })
      .then((result) => {
        console.log(result.data)
        let userId = result.data._id
        this.$http.post(`${this.$baseURI}/api/budget`, {
          user: userId,
          cash: 0,
          card: 0
        })
        .then((result) => {
          alert('Welcome!')
          this.$router.push({ path: '/account', query: { userId: result.data.user }})
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
