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
        <option v-for='(item, index) in userList' v-bind:key='index' v-bind:value="item._id">
          {{ item.name }}
        </option>
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
        <option v-for='(item, index) in userList' v-bind:key='index' v-bind:value="item._id">
          {{ item.name }}
        </option>
      </select>
      <br>

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

<!--==================================================================================-->
<!--                                     script                                       -->
<!--==================================================================================-->

<script>
var moment = require('moment');
moment().format();

const baseURI = 'http://13.125.169.219:3000';

/*------------------------------------------------------*
 * Data
 *------------------------------------------------------*/
var data = {
      date: moment(new Date()).format('YYYY-MM-DD'),
      time: moment(new Date()).format('HH:mm'),
      amount: '0',
      comment: '',
      payer: null,
      chargedTo: null,
      unit: '1',
      method: '1',
      id: null,
      userList: []
    }

/*------------------------------------------------------*
 * Functions
 *------------------------------------------------------*/
var save = function() {
  let payer = []
  if(this.payer == 1) {
    for(let i = 0; i < this.userList.length; i++) {
      payer.push(this.userList[i]._id)
    }
  } else payer.push(this.payer)

  let chargedTo = []
  if(this.chargedTo == 1) {
    for(let i = 0; i < this.userList.length; i++) {
      chargedTo.push(this.userList[i]._id)
    }
  } else chargedTo.push(this.chargedTo)

  let method = ''
  if(this.method == 1) method = 'cash'
  else if(this.method == 2) method = 'card'
  else method = 'transfer'

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
    let payer = result.data.payer
    if(payer.length == 2) _this.payer = '1'
    else _this.payer = payer[0]

    let chargedTo = result.data.chargedTo
    if(chargedTo.length == 2) _this.chargedTo = '1'
    else _this.chargedTo = chargedTo[0]

    let method = result.data.method
    if(method == 'cash') _this.method = 1
    else if(method == 'card') _this.method = 2
    else _this.method = 3

    _this.comment = result.data.comment
    _this.amount = result.data.amount
    _this.unit = result.data.unit
    _this.date = result.data.date
    _this.time = result.data.time

    console.log(result)
  }).catch((err) => {
    console.error(err)
  })     
},

listUser = function(_this) {
  if(!_this) _this = this
  _this.$http.get(`${baseURI}/api/user`)
  .then((result) => {
    _this.userList = result.data
    getDetail(_this)
  }).catch((err) => {
    console.error(err)
  })
}

/*------------------------------------------------------*
 * Export
 *------------------------------------------------------*/
export default {
  name: 'app',
  data: function() {
    return data
  },
  methods: {
    save: save,
    goList: goList
  },
  created() {
    this.id = this.$route.query.id
  },
  mounted() {
    listUser(this)
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
