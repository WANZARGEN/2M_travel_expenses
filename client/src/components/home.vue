<template>
<div id="app">
  <h1>{{ msg }}</h1> <br>

  <article>
    <h3>Your Travel List</h3>
    <table>
      <thead>
        <tr>
          <th>Destination</th>
          <th>Travellers</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>HK</td>
          <td>WANZARGEN, JOOAH</td>
          <td>2018.04.18</td>
          <td>2018.04.22</td>
        </tr>
        <tr>
          <td colspan="4" class='add-travel'> + </td>
        </tr>
      </tbody>
    </table>
  </article>

  <br><br>

  <form>
    <h3>Fill in Your Spending Details</h3><br>

    <div class='form-box'>
      <label class='w-90'>Date/Time</label>
      <input class='w-180' v-model="datetime" placeholder="date/time"><br>

      <label class='w-90'>Amount</label>
      <input class='w-90' v-model="amount" placeholder="amount">&nbsp;
      <label class='w-30'>Unit</label>
      <input class='w-90' v-model="unit" placeholder="unit"><br>

      <label class='w-90'>Payer</label>
      <input class='w-90' v-model="payer" placeholder="payer">&nbsp;
      <label class='w-90'>Charged to</label>
      <input class='w-90' v-model="chargedTo" placeholder="charged to"><br>

      <label class='w-90'>Comment</label>
      <textarea class='w-260' v-model="comment" placeholder="any comment"></textarea>


      
    </div>
    
    <button type='button' v-on:click="save">save</button>
  </form>
  

  <br><br>
  

  <span>{{ owner }}</span>

</div>
</template>


<script>
const baseURI = 'http://localhost:3000';

export default {
  name: 'app',
  data: function() {
    return {
      msg: "Let's go HK! WJ & JA",
      owner: "made by WANZARGEN ",
      destination: '',
      travellers: '',
      startDate: '',
      endDate: '',
      datetime: '',
      amount: '',
      comment: '',
      payer: '',
      chargedTo: '',
      unit: '',
      method: ''
    }
  },
  methods: {
    createTravel: function() {
      // this.$http.post()
    },

    save: function() {
      this.$http.post(`${baseURI}/api/travel`, {
      })
      .then((result) => {
        console.log(result.data)
      }).catch((err) => {
        console.error(err)
      })     
    }
  }
}
</script>

<style scoped>
table {
  display: inline-block;
  border: 1px solid gray;
}
th, td {
  padding: 10px 30px;
  border: 1px solid gray;
}
.add-travel {
  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 30px;
  font-weight: 900;
  color: rgb(46, 186, 172);
}
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
.form-box input {
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
