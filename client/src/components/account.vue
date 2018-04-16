<template>
<div id="app">

  <form>
    <h3>Your Account info.</h3><br>

    <div>
      <label class='w-30'>&nbsp;Whoose: </label>
      <select  v-model="whose" v-on:change="onChangeWhose">
        <option v-for='(item, index) in userList' v-bind:key='index' v-bind:value="item._id">
          {{ item.name }}
        </option>
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
      <br>
      <!-- <label class='w-90'></label>
      <label >Card</label>
      <input class='w-60' type='number' v-model="card">&nbsp; -->
      <label class='w-90'>Cash</label>
      <input class='w-60' type='number' v-model="addedMoney"> <button type='button' v-on:click="save">Add</button>
      <!--
      <label class='w-90'>Balance</label>
      <input class='w-90' type='number' readonly v-model="balance">
      <br>
      -->
    </div>
    
    <br>
    <br>
    <button type='button' v-on:click="goHome">Go Home</button>
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
      addedMoney: 0,
      unit: '1',
      userId: null,
      whose: this.userId,
      userList: [],
      budgetId: null
    }


var save = function() {
  this.cash = this.cash + parseInt(this.addedMoney)
  this.addedMoney = 0
  this.$http.put(`${baseURI}/api/budget/` + this.budgetId, {
    cash: this.cash,
    card: this.card
  })
  .then((result) => {
    alert('Updated!')
    this.budget = this.card + this.cash
  }).catch((err) => {
    console.error(err)
  })     
},

goList = function() {
  this.$router.push('/list') 
},

goHome = function() {
  this.$router.push('/home') 
},

getBudget = function(_this) {
  if(_this == undefined) _this = this
  _this.$http.get(`${baseURI}/api/budget/balance/` + _this.userId)
  .then((result) => {
      _this.card = result.data[0].card
      _this.cash = result.data[0].cash
      _this.budget = _this.card + _this.cash
      _this.budgetId = result.data[0]._id
  }).catch((err) => {
    console.error(err)
  })     
},

onChangeWhose = function() {
  
},

onChangeUnit = function() {

},

listUser = function(_this) {
  if(!_this) _this = this
  _this.$http.get(`${baseURI}/api/user`)
  .then((result) => {
    _this.userList = result.data
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
    goList: goList,
    goHome: goHome,
    onChangeUnit: onChangeUnit,
    onChangeWhose: onChangeWhose
  },
  created() {
    this.userId = this.$route.query.userId
    this.whose = this.userId
  },
  mounted() {
    getBudget(this)
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
