<template>
   
<div>
  <b-card id="resetPassword"  hide-footer centered title="Zmiana Hasła">
     <div>
        <div class="container">
          </div>
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
            <form  @submit.prevent="" v-if="!successMessage">
                <div class="form-group">
                    <label>Nowe Hasło: </label>
                    <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    
                    aria-describedby="passwordHelp"
                    placeholder="Wprowadź nowe hasło" required>
                    <small id="passwordHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label >Potwierdź nowe hasło: </label>
                    <input
                    v-model="password2"
                    type="password"
                    class="form-control"
                    
                    aria-describedby="password2Help"
                    placeholder="Wprowadź nowe hasło" required>
                    <small id="password2Help" class="form-text text-muted"></small>
                </div>
                <button v-on:click="resetPassword()" class="btn btn-primary">OK</button>
            </form>
            <div v-if="successMessage">{{successMessage}}</div>
        </div>
  </b-card>
</div>
</template>

<script>
import Joi from 'joi';
import router from '../router'
import axios from 'axios';
const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  password2: Joi.string().min(6).max(128).required(),
};
export default {
  name: 'resetPassword',
 data() {
    return {
      errorMessage: '',
      password: null,
      password2: null,
      errors: [],
      successMessage: '',
    }
  },  
  methods: {
   
  async resetPassword() {
    if(this.validUser()) {
        this.errorMessage = null;
    try{
      const res = await axios.post("http://localhost:3000/v1/auth/reset-password?token=" + this.$route.query.token,  {
          password: this.password
      });
      console.log(this.$route.query.token);
      this.password = '';
      this.password2 = '';
      this.successMessage = res.data.message || '';
      }catch(e) {
      this.errorMessage = e.response.data.message || e;
      }
    }
        
    },
    validUser() {
      if (this.password !== this.password2) {
        this.errorMessage = 'Password must match.';
        console.log(this.$route.query.token);
        return false;
      }
     return true;
    },
  },
   created: function () {
        }
};

</script>

<style >


</style>
