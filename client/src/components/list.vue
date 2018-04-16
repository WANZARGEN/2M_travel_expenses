<template>
<div id="app">

  <form>
    <h3>List of Expenditures</h3><br>
    <br>

    <div>
      <label class='w-30'>&nbsp;Whoose: </label>
      <select  v-model="whose" v-on:change="onChangeWhose">
        <option selected value="1">All</option>
        <option v-for='(item, index) in userList' v-bind:key='index' v-bind:value="item._id">
          {{ item.name }}
        </option>
      </select>

      <button type='button' v-on:click="goAccount">Account Info</button>
      <!-- <br>
      <label class='w-30'>&nbsp;Range: </label>
      <input class='date' type='date' v-model="startDate"> ~ 
      <input class='date' type='date' v-model="endDate"> -->
      <br>
      <br>
    </div>

    <div class='text-right'>
      <label class='w-30'>&nbsp;Unit: </label>
      <select v-model="unit" v-on:change="onChangeUnit">
        <option selected value="1">HKD</option>
        <option value="2">KRW</option>
        <option value="3">USD</option>
      </select>
    </div>
    
    <table>
      <thead>
        <tr>
          <th v-on:click="sortBy('datetime')">Date</th>
          <th v-on:click="sortBy('amount')">Amount</th>
          <th v-on:click="sortBy('comment')">Comment</th>
          <!-- <th>Accum.</th> -->
          <th>Cash</th>
          <th>Card</th>
          <th>Debt</th>
          <th v-on:click="sortBy('payer')">Payer</th>
          <th v-on:click="sortBy('debtor')">Debtor</th>
        </tr>
      </thead>

      <tbody>
        <tr class='summary'>
          <td>-</td>
          <td>{{accum | currency(symbol, 0, { symbolOnLeft: true }) }}</td>
          <td>-</td>
          <!-- <td>-</td> -->
          <td>{{cash | currency(symbol, 0, { symbolOnLeft: true }) }}</td>
          <td>{{card | currency(symbol, 0, { symbolOnLeft: true }) }}</td>
          <td>{{debt | currency(symbol, 0, { symbolOnLeft: true }) }}</td>
          <td>-</td>
          <td>-</td>
        </tr>

        <tr v-for='(item, index) in calculatedList' v-bind:key="index" 
        v-on:click='selectItem(item._id, index, $event)'>
          <td>{{item.date}}</td>
          <td>{{item.amount | currency('', 0, { symbolOnLeft: true }) }}</td>
          <td>{{item.comment}}</td>
          <!-- <td>{{item.accum}}</td> -->
          <td>{{item.cash | currency('', 0, { symbolOnLeft: true }) }}</td>
          <td>{{item.card | currency('', 0, { symbolOnLeft: true }) }}</td>
          <td>{{item.debt | currency('', 0, { symbolOnLeft: true }) }}</td>
          <td>{{item.payer.name}}</td>
          <td>{{item.chargedTo.name}}</td>
        </tr>
      </tbody>
    </table>
    <br>
    <br>
  </form>

  <div class='opt-box'>
  <button class='btn delete-btn' type="button" v-on:click="del">Delete</button>
  <button class='btn edit-btn' type="button" v-on:click="goEdit">Edit</button>
  <button class='btn' type="button" v-on:click="goHome">Go Home</button>
  </div>

  <br><br><br><br>

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

var selectCount = 0;

/*------------------------------------------------------*
 * Data
 *------------------------------------------------------*/
var data = {
      userList: [],
      whose: '1',
      unit: '1',
      list: [],
      selectList: [],
      cash: 0,
      card: 0,
      accum: null,
      debt: 0,
      rate: {},// { 'yyyy-mm-dd': { HKD: ..., USD: ..., KRW: ... }, ... }
      sort: 'datetime',
      order: 'desc', // 'desc' or 'asc'
      symbol: '$',
      startDate: moment(new Date()).format('YYYY-MM-DD'),
      endDate: moment(new Date()).format('YYYY-MM-DD')
    }

/*------------------------------------------------------*
 * Functions
 *------------------------------------------------------*/
var getExchangeRates = function(_this) {

  if(_this == undefined) _this = this
  _this.$http.get(`${exchangeURI}latest.json?app_id=${appId}`)
  .then((result) => {
    console.log('exchange rate: ', result)
  }).catch((err) => {
    console.error(err)
  })     
},

getList = function(_this, sort) {
  if(_this == undefined) _this = this
  let uri = `${baseURI}/api/expense`
  if(sort != undefined) uri += '/sort/' + sort
  _this.$http.get(uri)
  .then((result) => {
    getBalance(_this, result.data)
  }).catch((err) => {
    console.error(err)
  })     
},

getBalance = function(_this, list) {
  _this.$http.get(`${baseURI}/api/budget`)
  .then((result) => {
    let res = result.data
    _this.cash = 0
    _this.card = 0
    _this.accum = 0
    _this.debt = 0
    if(_this.whose == 1) {
      for(let i = 0; i < res.length; i++) {
        _this.cash += res[i].cash
        _this.card += res[i].card
      }
    } else {
      for(let i = 0; i < res.length; i++) {
        if(_this.whose == res[i].user) {
          _this.cash += res[i].cash
          _this.card += res[i].card
          break;
        }
      }
    }
    if(list != undefined) _this.list = list
  }).catch((err) => {
    console.error(err)
  })     
},

sortBy = function(sort) {
  if(sort == 'datetime') {
    if(this.order == 'desc') {
      this.order = 'asc'
      sort = 'date time'
    }
    else {
      this.order = 'desc'
      sort = '-date -time'
    }
  } else if(this.sort == sort) {
    if(this.order == 'desc') this.order = 'asc'
    else {
      this.order = 'desc'
      sort = '-' + sort
    }
  } else {
    this.sort = sort
    this.order = 'desc'
    sort = '-' + sort
  }

  getList(this, sort)
},

onChangeWhose = function() {
  this.selectList = []
  getBalance(this, undefined)
},

onChangeUnit = function() {
  if(this.unit == 2) this.symbol = '₩'
  else this.symbol = '$'
},

selectItem = function(id, idx, e) {
  if(this.selectList[idx] != id) {
    this.selectList[idx] = id
    if(e.target.localName == 'td') e.target.parentElement.className = 'selected'
    else e.target.className = 'selected'
    selectCount++
  }
  else {
    this.selectList[idx] = undefined
    if(e.target.localName == 'td') e.target.parentElement.className = ''
    else e.target.className = ''
    selectCount--
  }
  let deleteElem = document.getElementsByClassName('delete-btn')[0]
  let editElem = document.getElementsByClassName('edit-btn')[0]
  let check = new RegExp("(\\s|^)active(\\s|$)"); 

  if(selectCount > 0) {
    if(selectCount == 1) editElem.className += ' active'
    else editElem.className = editElem.className.replace(check, " ").trim();

    deleteElem.className += ' active'
  } else {
    deleteElem.className = deleteElem.className.replace(check, " ").trim();
    editElem.className = editElem.className.replace(check, " ").trim();
  }
},

goEdit = function() {
  if(selectCount != 1) return;
  let item;
  for(let i = 0; i < this.selectList.length; i++) {
    if(this.selectList[i]) {
      this.$router.push({ path: '/edit', query: { id: this.selectList[i] }}) 
      break;
    }
  }
},

del = function() {
  if(selectCount <= 0) return;

  if(window.confirm('Do you really want to delete?')) {
    let deletedCount = selectCount
    for(let i = 0; i < this.selectList.length; i++) {
      if(this.selectList[i]) {
        this.list.splice(i, 1)
        this.$http.delete(`${baseURI}/api/expense/` + this.selectList[i])
        .then((result) => {
          deletedCount--
          if(deletedCount == selectCount) {
            this.selectList = []
            this.$set(this.list)
          }
        }).catch((err) => {
          console.error(err)
        })  
      } 
    }
  }
},

goAccount = function() {
  if(this.whose == 1) {
    alert('Select user')
    return
  } else {
    this.$router.push({ path: '/account', query: { userId: this.whose }}) 
  }
},

goHome = function() {
  this.$router.push('/home') 
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
    getList: getList,
    onChangeWhose: onChangeWhose,
    onChangeUnit: onChangeUnit,
    selectItem: selectItem,
    del: del,
    goEdit: goEdit,
    goHome: goHome,
    goAccount: goAccount,
    sortBy: sortBy
  }, 
  mounted() {
    getExchangeRates(this)
    listUser(this)
    getList(this)
  },
  computed: {
    calculatedList: function() {
      return this.list.filter((item) => {
        //init
        let payer, debtor
        if(this.accum == null) {
          this.accum = 0
          item.accum = 0
          item.cash = 0
          item.card = 0
        }

        //date
        item.date = moment(new Date(item.date)).format('MM/DD')

        //accum
        this.accum += item.amount
        item.accum = this.accum

        //cash
        if(item.method == 'cash') {
          this.cash -= item.amount
          item.cash = this.cash
        } else if (item.method == 'card') {
          this.card -= item.amount
          item.card = this.card
          item.cash = '-'
        }
        
        //payer
        if(item.payer.length == 2) item.payer.name = 'All'
        else {
          for(let i = 0; i < this.userList.length; i++) {
            if(this.userList[i]._id == item.payer) {
              item.payer.name = this.userList[i].name
              item.payer.id = item.payer
              break;
            }
          }
        }

        //debtor
        if(item.chargedTo.length == 2) item.chargedTo.name = 'All'
        else {
          for(let i = 0; i < this.userList.length; i++) {
            if(this.userList[i]._id == item.chargedTo) {
              item.chargedTo.name = this.userList[i].name
              item.chargedTo.id = item.chargedTo
              break;
            }
          }
        }

        //debt
        if(this.whose == 1) {
          item.debt = '-'
          this.debt = '-'
        } else {
          if(item.payer == 'All') {
            if(item.chargedTo == 'All') item.debt = 0
            else if(item.chargedTo.id == this.whose) item.debt = item.amount / 2
            else item.debt = -item.amount / 2
          } else if(item.payer == this.whose) {
            if(item.chargedTo == 'All') item.debt = -item.amunt / 2
            else if(item.chargedTo.id == this.whose) item.debt = 0
            else item.debt = -item.amount
          } else {
            if(item.chargedTo == 'All') item.debt = item.amunt / 2
            else if(item.chargedTo.id == this.whose) item.debt = item.amount
            else item.debt = 0
          }
          this.debt += item.debt
        }

        return item
      })
    }
  }
}
</script>



<!--==================================================================================-->
<!--                                      style                                       -->
<!--==================================================================================-->

<style scoped>
form {
  display: inline-block;
  width: 100%;
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
.text-right {
  text-align: right;
}


#app {
  height: calc(100vh - 60px);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.7rem;
  margin-top: 5px;
}
table tr {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.selected {
  background-color: rgba(0,0,0,0.1);
}
.opt-box {
  position: absolute;
  display: flex;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 30px;
  width: 100%;
  justify-content: center;
  background-color: #d2d2d2;
}
.opt-box .btn {
  width: 33%;
}
.delete-btn, .edit-btn {
  color: #a7a7a7;
}
.btn.active {
  color: black;
}
input.date {
  font-size: 0.8rem;
}
</style>
