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
      <input class='w-90' type='number' v-model="amount">&nbsp;
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
    <button type='button' v-on:click="goList">See List</button>
  </form>
  

  <br><br><br><br>
  

  <span>{{ owner }}</span>

</div>
</template>


<!--==================================================================================-->
<!--                                     script                                       -->
<!--==================================================================================-->
<script>
var moment = require('moment');
moment().format();

const baseURI = 'http://localhost:3000';
const exchangeURI = 'https://openexchangerates.org/api/';
const appId = 'de0ac08850bb4c2a8eb573c120c5b74f'


/*------------------------------------------------------*
 * Data
 *------------------------------------------------------*/
var data = {
      msg: "Let's go HK! WJ & JA",
      owner: "made by WANZARGEN ",
      date: moment(new Date()).format('YYYY-MM-DD'),
      time: moment(new Date()).format('HH:mm'),
      amount: 0,
      comment: '',
      payer: '1',
      chargedTo: '1',
      unit: '1',
      method: '1',
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

  this.$http.post(`${baseURI}/api/expense`, {
    comment: this.comment,
    amount: this.amount,
    payer: payer,
    chargedTo: chargedTo,
    method: method,
    unit: this.unit,
    date: this.date,
    time: this.time
  })
  .then((result) => {
    alert('Succeed!')
    this.date = moment(new Date()).format('YYYY-MM-DD')
    this.time = moment(new Date()).format('HH:mm')
    this.amount = 0
    this.comment = ''
    this.payer = '1'
    this.chargedTo = '1'
    this.unit = '1'
    this.method = '1'
  }).catch((err) => {
    console.error(err)
  })     
},

goList = function() {
  this.$router.push('/list') 
},

listUser = function(_this) {
  if(!_this) _this = this
  _this.$http.get(`${baseURI}/api/user`)
  .then((result) => {
    _this.userList = result.data
    console.log('userList: ', _this.userList)
  }).catch((err) => {
    console.error(err)
  })
},

getExchangeRates = function(_this) {

  if(_this == undefined) _this = this
  _this.$http.get(`${exchangeURI}latest.json?app_id=${appId}`)
  .then((result) => {
    console.log('exchange rate: ', result)
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
