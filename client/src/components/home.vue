<template>
<div id="app">
  <h1>{{ msg }}</h1> <br>

  <form>
    <h3>Fill in Your Spending Details</h3><br>

    <div class='form-box'>
      <label class='w-90'>Date</label>
      <input class='w-180' type="date" v-model="date"><br>
      <label class='w-90'>Time</label>
      <input class='w-180' type="time" v-model="time"><br>

      <label class='w-90'>Amount</label>
      <input class='w-90' type='number' v-model="amount" placeholder="amount">&nbsp;
      <select class='w-90' v-model="unit">
        <option selected value="1">HKD</option>
        <option value="2">KRW</option>
        <option value="3">USD</option>
      </select>
     <br>

      <label class='w-90'>Payer</label>
      <select class='w-90' v-model="payer">
        <option selected value="1">All</option>
        <option value="2">JOOAH</option>
        <option value="3">WANJIN</option>
      </select>
      <br>

      <label class='w-90'>Method</label>
      <select class='w-90' v-model="method">
        <option selected value="1">Cash</option>
        <option value="2">Card</option>
        <option value="3">Transfer</option>
      </select>
      <br>

      <label class='w-90'>Charged to</label>
      <select class='w-90' v-model="chargedTo">
        <option selected value="1">All</option>
        <option value="2">JOOAH</option>
        <option value="3">WANJIN</option>
      </select><br>

      <label class='w-90'>Comment</label>
      <textarea class='w-180' v-model="comment" placeholder="any comment"></textarea>
    </div>
    
    <button type='button' v-on:click="save">Save</button>
    <br>
    <br>
    <button type='button' v-on:click="goList">See List</button>
  </form>
  

  <br><br><br><br>
  

  <span>{{ owner }}</span>

</div>
</template>


<script>
var moment = require('moment');
moment().format();

const baseURI = 'http://localhost:3000';


function save() {
  console.log('date: ', this.date)
  this.$http.post(`${baseURI}/api/expense`, {
    comment: this.comment,
    amount: this.amount,
    payer: this.payer,
    chargedTo: this.chargedTo,
    method: this.method,
    unit: this.unit,
    date: this.date,
    time: this.time
  })
  .then((result) => {
    console.log(result.data)
  }).catch((err) => {
    console.error(err)
  })     
}

function goList() {
  this.$router.push('/list') 
}

export default {
  name: 'app',
  data: function() {
    return {
      msg: "Let's go HK! WJ & JA",
      owner: "made by WANZARGEN ",
      date: moment(new Date()).format('YYYY-MM-DD'),
      time: moment(new Date()).format('HH:mm'),
      amount: '0',
      comment: '',
      payer: '1',
      chargedTo: '1',
      unit: '1',
      method: '1'
    }
  },
  methods: {
    save: save,
    goList: goList
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
.form-box input, 
.form-box select {
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
