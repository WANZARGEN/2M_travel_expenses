<template>
<div id="app">
  <h1>{{ msg }}</h1> <br>

  <form>
    <h3>Your List of Expenditures</h3><br>
    <br>

    <div>
    <label class='w-90'>&nbsp;Whoose: </label>
      <select class='w-90' v-model="whose" v-on:change="onChangeWhose">
        <option selected value="1">All</option>
        <option value="2">JOOAH</option>
        <option value="3">WANJIN</option>
      </select>

      <label class='w-90'>&nbsp;Unit: </label>
      <select class='w-90' v-model="unit" v-on:change="onChangeUnit">
        <option selected value="1">HKD</option>
        <option value="2">KRW</option>
        <option value="3">USD</option>
      </select>
    </div>
    <br>
    
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Comment</th>
          <th>Accum.</th>
          <th>Bal.</th>
          <th>Debt</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for='(item, index) in list' v-on:click='openOption(index)'>
          <td>{{item.date}}<br>{{item.time}}</td>
          <td>{{item.amount}}</td>
          <td>{{item.comment}}</td>
          <td>{{accum}}</td>
          <td>{{balance}}</td>
          <td>{{debt}}</td>
        </tr>
      </tbody>
    </table>
    <br>
    <br>
  </form>

  <div ref='modal' class='option-modal'>
    <div calss='modal-bg'></div>
    <div class='modal-contents'>
      <button type='button' v-on:click='cancel'>Cancel</button>
      <button type='button' v-on:click='del'>Delete</button>
      <button type='button' v-on:click='edit(optionId)'>Edit</button>
    </div>
  </div>

  

  <br><br><br><br>
  

  <span>{{ owner }}</span>

</div>
</template>


<script>
var moment = require('moment');
moment().format();

const baseURI = 'http://localhost:3000';


function getList(_this) {
  if(_this == undefined) _this = this
  _this.$http.get(`${baseURI}/api/expense`)
  .then((result) => {
    _this.list = result.data
  }).catch((err) => {
    console.error(err)
  })     
}

function onChangeWhose() {

}

function onChangeUnit() {

}

function openOption(id) {
  console.log('popup id: ', id)
  this.optionId = id
  // this.$refs.getAttribute('class').style.display = 'block'
}

function edit(id) {

}

export default {
  name: 'app',
  data: function() {
    return {
      msg: "Let's go HK! WJ & JA",
      owner: "made by WANZARGEN ",
      whose: '1',
      unit: '1',
      list: [],
      accum: 0,
      balance: 0,
      debt: 0,
      optionId: null,
      
    }
  },
  methods: {
    getList: getList,
    onChangeWhose: onChangeWhose,
    onChangeUnit: onChangeUnit,
    openOption: openOption,
    cancel: () => {},
    del: () => {},
    edit: edit
  }, 
  mounted() {
    getList(this)
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
.text-left {
  text-align: left;
}


table {
  width: 100vw;
}
table {
  font-size: 0.7rem;
}
.option-modal {
  display: none;
}

</style>
