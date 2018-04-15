<template>
<div id="app">

  <form>
    <h3>List of Expenditures</h3><br>
    <br>

    <div>
      <label class='w-30'>&nbsp;Whoose: </label>
      <select  v-model="whose" v-on:change="onChangeWhose">
        <option selected value="1">All</option>
        <option v-for='(item, index) in userList' v-bind:value="item._id">
          {{ item.name }}
        </option>
      </select>

      <button type='button' v-on:click="goAccount">Account Info</button>
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
          <th>Date</th>
          <th>Amount</th>
          <th>Comment</th>
          <!-- <th>Accum.</th> -->
          <th>Bal.</th>
          <th>Debt</th>
          <th>Payer</th>
          <th>Debtor</th>
        </tr>
      </thead>

      <tbody>
        <tr class='summary'>
          <td>-</td>
          <td>{{accum}}</td>
          <td>-</td>
          <!-- <td>-</td> -->
          <td>{{balance}}</td>
          <td>{{debt}}</td>
          <td>-</td>
          <td>-</td>
        </tr>

        <tr v-for='(item, index) in calculatedList' 
        v-on:click='selectItem(item._id, index, $event)'>
          <td>{{item.date}}</td>
          <td>{{item.amount}}</td>
          <td>{{item.comment}}</td>
          <!-- <td>{{item.accum}}</td> -->
          <td>{{item.balance}}</td>
          <td>{{item.debt}}</td>
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


<script>
var moment = require('moment');
moment().format();

const baseURI = 'http://localhost:3000';

var selectCount = 0;

var data = {
      userList: [],
      whose: '1',
      unit: '1',
      list: [],
      selectList: [],
      balance: 0,
      accum: null,
      debt: 0
    }

/*------------------------------------------------------*
 * Functions
 *------------------------------------------------------*/
var getList = function(_this) {
  if(_this == undefined) _this = this
  _this.$http.get(`${baseURI}/api/expense`)
  .then((result) => {
    getBalance(_this, result.data)
  }).catch((err) => {
    console.error(err)
  })     
},

getBalance = function(_this, list) {
  _this.$http.get(`${baseURI}/api/budget`)
  .then((result) => {
    let bal = result.data
    _this.balance = 0
    _this.accum = 0
    _this.debt = 0
    if(_this.whose == 1) {
      for(let i = 0; i < bal.length; i++) {
        _this.balance += bal[i].cash
        _this.balance += bal[i].card
      }
    } else {
      for(let i = 0; i < bal.length; i++) {
        if(_this.whose == bal[i].user) {
          _this.balance += bal[i].cash
          _this.balance += bal[i].card
          break;
        }
      }
    }
    if(list != undefined) _this.list = list
  }).catch((err) => {
    console.error(err)
  })     
},

onChangeWhose = function() {
  this.selectList = []
  getBalance(this, undefined)
},

onChangeUnit = function() {

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
    goAccount: goAccount
  }, 
  mounted() {
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
          item.balance = 0
        }

        //date
        item.date = moment(new Date(item.date)).format('MM/DD')

        //accum
        this.accum += item.amount
        item.accum = this.accum

        //balance
        this.balance -= item.amount
        item.balance = this.balance

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
</style>
