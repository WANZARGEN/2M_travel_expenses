<template>
<div id="app">

  <form>
    <h3>Your Account info.</h3><br>

    <div>
      <label class='w-30'>&nbsp;Whoose: </label>
      <select  v-model="whose" v-on:change="onChangeWhose">
        <option value="2">JOOAH</option>
        <option value="3">WANJIN</option>
      </select>

      <label class='w-30'>&nbsp;Unit: </label>
      <select v-model="unit" v-on:change="onChangeUnit">
        <option selected value="1">HKD</option>
        <option value="2">KRW</option>
        <option value="3">USD</option>
      </select>
    </div>
    <br>
    <br>

    <div class='form-box'>
      <label class='w-90'>Budget</label>
      <input class='w-90' type='number' readonly v-model="budget">
      <br>
      <label class='w-90'></label>
      <label >Card</label>
      <input class='w-60' type='number' v-model="card">&nbsp;
      <label>Cash</label>
      <input class='w-60' type='number' v-model="cash">
      <br>
      <br>
      <label class='w-90'>Balance</label>
      <input class='w-90' type='number' readonly v-model="balance">
      <br>
    </div>
    
    <br>
    <br>
    <button type='button' v-on:click="save">Save</button>
    <br>
    <br>
    <button type='button' v-on:click="goList">Go List</button>
  </form>
  

  <br><br><br><br>
  


</div>
</template>


<script>
var moment = require('moment');
moment().format();

const baseURI = 'http://localhost:3000';

var data = {
      balance: 0,
      budget: 0,
      card: 0,
      cash: 0,
      comment: '',
      payer: '1',
      chargedTo: '1',
      unit: '1',
      method: '1',
      id: null,
      whose: 2
    }


var save = function() {
  console.log('date: ', this.date)
  this.$http.put(`${baseURI}/api/expense/` + this.id, {
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
    alert('Updated!')
    this.$router.push('/list')
  }).catch((err) => {
    console.error(err)
  })     
},

goList = function() {
  this.$router.push('/list') 
},

getDetail = function(_this) {
  if(_this == undefined) _this = this
  _this.$http.get(`${baseURI}/api/expense/` + _this.id)
  .then((result) => {
    _this.comment = result.data.comment
    _this.amount = result.data.amount
    _this.payer = result.data.payer
    _this.chargedTo = result.data.chargedTo
    _this.method = result.data.method
    _this.unit = result.data.unit
    _this.date = result.data.date
    _this.time = result.data.time

    console.log(result)
  }).catch((err) => {
    console.error(err)
  })     
},

onChangeWhose = function() {
  
},

onChangeUnit = function() {

}




export default {
  name: 'app',
  data: function() {
    return data
  },
  methods: {
    save: save,
    goList: goList,
    onChangeUnit: onChangeUnit,
    onChangeWhose: onChangeWhose
  },
  created() {
    this.id = this.$route.query.id
  },
  mounted() {
    getDetail(this)
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
