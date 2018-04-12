<template>
<div id="app">

  <form>
    <h3>Edit Your Spending Details</h3><br>

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
    <button type='button' v-on:click="goList">Cancel</button>
  </form>
  

  <br><br><br><br>
  


</div>
</template>


<script>
var moment = require('moment');
moment().format();

const baseURI = 'http://localhost:3000';


function save() {
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
}

function goList() {
  this.$router.push('/list') 
}

function getDetail(_this) {
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
}

export default {
  name: 'app',
  data: function() {
    return {
      date: moment(new Date()).format('YYYY-MM-DD'),
      time: moment(new Date()).format('HH:mm'),
      amount: '0',
      comment: '',
      payer: '1',
      chargedTo: '1',
      unit: '1',
      method: '1',
      id: null
    }
  },
  methods: {
    save: save,
    goList: goList
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
