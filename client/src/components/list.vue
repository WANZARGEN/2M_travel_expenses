<template>
<div id="app">

  <form>
    <h3>List of Expenditures</h3><br>
    <br>

    <div>
      <label class='w-30'>&nbsp;Whoose: </label>
      <select  v-model="whose" v-on:change="onChangeWhose">
        <option selected value="all">All</option>
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
        <option selected value="HKD">HKD</option>
        <option value="KRW">KRW</option>
        <option value="USD">USD</option>
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
        </tr>
      </thead>

      <tbody>
        <tr class='summary'>
          <td>-</td>
          <td>{{accum | currency(symbol, 1, { symbolOnLeft: true }) }}</td>
          <td>-</td>
          <!-- <td>-</td> -->
          <td>{{cash | currency(symbol, 1, { symbolOnLeft: true }) }}</td>
          <td>{{card | currency(symbol, 1, { symbolOnLeft: true }) }}</td>
          <td v-if="debt == '-'">{{debt}}</td>
          <td v-else>{{debt | currency(symbol, 1, { symbolOnLeft: true }) }}</td>
        </tr>

        <tr v-for='(item, index) in calculatedList' v-bind:key="index" 
        v-on:click='selectItem(item._id, index, $event)'>
          <td>{{item.date}}</td>
          <td>{{item.amount | currency('', 1, { symbolOnLeft: true }) }}</td>
          <td>{{item.comment}}</td>
          <!-- <td>{{item.accum}}</td> -->
          <td>{{item.cash | currency('', 1, { symbolOnLeft: true }) }}</td>
          <td>{{item.card | currency('', 1, { symbolOnLeft: true }) }}</td>
          <td v-if="item.debt == '-'">{{item.debt}}</td>
          <td v-else>{{item.debt | currency('', 1, { symbolOnLeft: true }) }}</td>
          <!-- <td>{{item.payer.name}}</td>
          <td>{{item.chargedTo.name}}</td> -->
        </tr>
      </tbody>
    </table>
    <br>
    <br>
  </form>

  <div class='opt-box'>
  <button class='btn delete-btn' type="button" v-on:click="del">Delete</button>
  <button class='btn edit-btn' type="button" v-on:click="goEdit">Edit</button>
  <button class='btn' type="button" v-on:click="goHome">Add</button>
  </div>

  <br><br><br><br>

  <div class='loading-box' v-if='isLoading'>
    <circle10 class='rotate-square2'></circle10>
  </div>
</div>

</template>

<!--==================================================================================-->
<!--                                     script                                       -->
<!--==================================================================================-->

<script>
import {Circle10} from 'vue-loading-spinner'

var moment = require('moment');
moment().format();

var selectCount = 0;

/*------------------------------------------------------*
 * Data
 *------------------------------------------------------*/
var data = {
      userList: [],
      list: [],
      selectList: [],
      whose: 'all',
      unit: 'HKD',
      cash: 0,
      card: 0,
      accum: 0,
      debt: 0,
      rate: {},// { HKD: ..., USD: ..., KRW: ... }
      sort: 'datetime',
      order: 'desc', // 'desc' or 'asc'
      symbol: '$',
      startDate: moment(new Date()).format('YYYY-MM-DD'),
      endDate: moment(new Date()).format('YYYY-MM-DD'),
      isLoading: true,
      balance: {}
    }

/*------------------------------------------------------*
 * Functions
 *------------------------------------------------------*/
var getExchangeRates = function(_this) {
  if(_this == undefined) _this = this
  _this.$http.get(`${_this.$exchangeURI}latest.json?app_id=${_this.$appId}`)
  .then((result) => {
    _this.rate.HKD = result.data.rates.HKD
    _this.rate.KRW = result.data.rates.KRW
    _this.rate.USD = result.data.rates.USD
    getList(_this)
  }).catch((err) => {
    console.error(err)
  })     
},

getList = function(_this, sort) {
  if(_this == undefined) _this = this

  _this.accum = 0
  _this.debt = 0
  
  let uri = `${_this.$baseURI}/api/expense`
  if(sort != undefined) uri += '/sort/' + sort
  _this.$http.get(uri)
  .then((result) => {
    getBalance(_this, result.data)
  }).catch((err) => {
    console.error(err)
  })     
},

getBalance = function(_this, list) {
  _this.$http.get(`${_this.$baseURI}/api/budget`)
  .then((result) => {
    let res = result.data

    _this.balance = { 'all': { cash: 0, card: 0 }}
    for(let i = 0; i < res.length; i++) {
      if(_this.balance['all']) {
        _this.balance['all'].cash += res[i].cash
        _this.balance['all'].card += res[i].card
      } 
      else _this.balance['all'] = { cash: res[i].cash, card: res[i].card }

      _this.balance[res[i].user] = { cash: res[i].cash, card: res[i].card }
    }
    
    if(_this.whose == 'all') {
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

    _this.card = 0
    _this.cash = _this.balance[_this.whose].cash

    if(list != undefined) {
      if(list.length == 0) {
        if(_this.unit == 'KRW') _this.cash = _this.cash / _this.rate.HKD * _this.rate.KRW
        else if(_this.unit == 'USD') _this.cash = _this.cash / _this.rate.HKD
      }
      _this.list = list
    }
    _this.isLoading = false
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
  getList(this)
},

onChangeUnit = function() {
  if(this.unit == 'KRW') this.symbol = '₩'
  else this.symbol = '$'
  getList(this)
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
        this.$http.delete(`${this.$baseURI}/api/expense/` + this.selectList[i])
        .then((result) => {
          if(--deletedCount == 0) {
            let selectedElems = document.getElementsByClassName('selected')
            let length = selectedElems.length
            for(let j = 0; j < length; j++) {
              selectedElems[0].className = selectedElems[0].className.replace('selected', " ").trim();
            }
            selectCount = 0
            this.selectList = []
            getList(this)
          }
        }).catch((err) => {
          console.error(err)
        })  
      } 
    }
  }
},

goAccount = function() {
  if(this.whose == 'all') {
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
  _this.$http.get(`${_this.$baseURI}/api/user`)
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
  components: {
    Circle10
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
    listUser(this)
    getExchangeRates(this)
  },
  computed: {
    calculatedList: function() {
      return this.list.filter((item, index) => {
        //init
        let payer, debtor
        if(index == 0) {
          item.accum = 0
          item.cash = 0
          item.card = 0
        }

        //payer
        if(item.payer.length == 2) {
          item.payer = {}
          item.payer.id = 'all'
          item.payer.name = 'All'
        } 
        else {
          for(let i = 0; i < this.userList.length; i++) {
            for(let j = 0; j < item.payer.length; j++) {
              if(this.userList[i]._id == item.payer[j]) {
                item.payer = {}
                item.payer.name = this.userList[i].name
                item.payer.id = this.userList[i]._id
                break;
              }
            }
          }
        }

        //debtor
        if(item.chargedTo.length == 2) {
          item.chargedTo = {}
          item.chargedTo.id = 'all'
          item.chargedTo.name = 'All'
        }
        else {
          for(let i = 0; i < this.userList.length; i++) {
            for(let j = 0; j < item.chargedTo.length; j++) {
              if(this.userList[i]._id == item.chargedTo[j]) {
                item.chargedTo = {}
                item.chargedTo.name = this.userList[i].name
                item.chargedTo.id = this.userList[i]._id
                break;
              }
            }
          }
        }

         //amount by unit
        if(item.unit == 'HKD') {
          if(this.unit == 'KRW') item.amount = item.amount / this.rate.HKD * this.rate.KRW
          else if(this.unit == 'USD') item.amount /= this.rate.HKD
        } else if(item.unit == 'KRW') {
          if(this.unit == 'HKD') item.amount = item.amount / this.rate.KRW * this.rate.HKD
          else if(this.unit == 'USD') item.amount /= this.rate.KRW
        } else {
          if(this.unit == 'HKD') item.amount *= this.rate.HKD
          else if(this.unit == 'KRW') item.amount *= this.rate.KRW
        }

        //debt
        if(this.whose == 'all') {
          item.debt = '-'
          this.debt = '-'
        } else {
          if(item.payer.id == 'all') {
            if(item.chargedTo.id == 'all') item.debt = 0
            else if(item.chargedTo.id == this.whose) item.debt = item.amount / 2
            else item.debt = item.amount / -2
          } else if(item.payer.id == this.whose) {
            if(item.chargedTo.id == 'all') item.debt = item.amount / -2
            else if(item.chargedTo.id == this.whose) item.debt = 0
            else item.debt = -item.amount
          } else {
            if(item.chargedTo.id == 'all') item.debt = item.amount / 2
            else if(item.chargedTo.id == this.whose) item.debt = item.amount
            else item.debt = 0
          }
          this.debt += item.debt
        }


        //amount by payer
        if(this.whose != 'all' && item.payer.id == 'all') {
          item.amount = item.amount / 2
        }
        
        //date
        item.date = moment(new Date(item.date)).format('MM/DD')

        //accum
        this.accum += item.amount
        item.accum = this.accum

        

        //cash or card
        if(this.whose == 'all' || item.payer.id == 'all' || this.whose == item.payer.id) {
          if(item.method == 'cash') {
            this.cash -= item.amount
            item.cash = item.amount
            item.card = 0
          } else if (item.method == 'card') {
            this.card -= item.amount
            item.card = item.amount
            item.cash = 0
          }
        } else if(this.whose != item.payer.id) {
          item.card = 0
          item.cash = 0
        } 

        
        console.log('======= ' + index + ' =======')
        console.log('this.whose: ', this.whose)
        console.log('item.payer: ', item.payer)
        console.log('item.chargedTo: ', item.chargedTo)
        console.log('item.chargedTo == this.whose: ', item.chargedTo == this.whose)
        console.log('item.debt: ', item.debt)
        console.log('=================')

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
  position: relative;
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
  border: none;
  box-shadow: none;
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
.loading-box {
  position: absolute;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: -60px;
}
.loading-box .rotate-square2 {
  position: absolute;
  left: 46%;
  top: 60%;
  transform: translate(-50%, -50%);
}

</style>
