<template>
<div id="app">
  <h1>{{ msg }}</h1> <br>

  <form>
    <h3>Fill in Your Spending Details</h3><br>

    <div class='form-box'>
      <label class='w-90'>Date</label>
      <input class='w-180' type="date" v-bind:value="date"><br>
      <label class='w-90'>Time</label>
      <input class='w-180' type="time" v-model="time" placeholder="time"><br>

      <label class='w-90'>Amount</label>
       <select class='w-90' v-bind:value="unit">
         <option selected='true' >all</option>
        <option value="1">HKD</option>
        <option value="2">KRW</option>
      </select>
      <input class='w-90' type='number' v-model="amount" placeholder="amount">&nbsp;
     <br>

      <label class='w-90'>Payer</label>
      <input class='w-90' v-model="payer" placeholder="payer">&nbsp;
      <label class='w-90'>Charged to</label>
      <input class='w-90' v-model="chargedTo" placeholder="charged to"><br>

      <label class='w-90'>Comment</label>
      <textarea class='w-260' v-model="comment" placeholder="any comment"></textarea>


      
    </div>
    
    <button type='button' v-on:click="save">save</button>
  </form>
  

  <br><br>
  

  <span>{{ owner }}</span>

</div>
</template>


<script>
var moment = require('moment');
moment().format();

const baseURI = 'http://localhost:3000';

listTraveller();

console.log(moment(new Date()).format('YYYY-MM-DD'))

function listTraveller() {
  console.log('listTraveller()')
}

function save() {
  this.$http.post(`${baseURI}/api/travel`, {
  })
  .then((result) => {
    console.log(result.data)
  }).catch((err) => {
    console.error(err)
  })     
}

export default {
  name: 'app',
  data: function() {
    return {
      msg: "Let's go HK! WJ & JA",
      owner: "made by WANZARGEN ",
      date: '',
      time: '',
      amount: '',
      comment: '',
      payer: '',
      chargedTo: '',
      unit: 'HKD',
      method: ''
    }
  },
  methods: {
    listTraveller: listTraveller,
    save: save
  }
}
</script>

<style scoped>
form {
  display: inline-block;
}
.form-box {
  text-align: left;
}
.form-box label {
  display: inline-block;
  text-align: right;
  vertical-align: top;
}
.form-box input {
  display: inline-block;
  margin-bottom: 15px;
}
.w-30 {
  width: 30px;
}
.w-60 {
  width: 60px;
}
.w-90 {
  width: 90px;
}
.w-180 {
  width: 180px;
}
.w-260 {
  width: 260px;
}

</style>
