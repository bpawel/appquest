<template>
   
<div>
  <b-card id="resetPassword"  hide-footer centered title="Zmiana Hasła">
     <div>
        <div class="container">
          </div>
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
            <form  @submit.prevent="">
                <div class="form-group">
                    <label>Nowe Hasło: </label>
                    <input
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    
                    aria-describedby="passwordHelp"
                    placeholder="Wprowadź nowe hasło" required>
                    <small id="passwordHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label >Potwierdź nowe hasło: </label>
                    <input
                    v-model="user.password2"
                    type="password"
                    class="form-control"
                    
                    aria-describedby="password2Help"
                    placeholder="Wprowadź nowe hasło" required>
                    <small id="password2Help" class="form-text text-muted"></small>
                </div>
                <button v-on:click="resetPassword()" class="btn btn-primary">OK</button>
            </form>
        </div>
  </b-card>
</div>
</template>

<script>
import Joi from 'joi';
import router from '../router'
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
      user: {
        password: '',
        password2: '',
        resetPassword:''
      }
    }
  },  
  methods: {
   
  async resetPassword() {
    if(this.validUser()) {
    try{
      await axios.post("http://localhost:3000/v1/auth/reset-password?token=" + this.$store.state.user.resetPassword,  {
          password: this.user.password,
          password2: this.user.password2,
      });
      console.log(this.$store.state.user.resetPassword);
      user.password = '';
      user.password2 = '';
      // router.push({path: '/'});
      }catch(e) {
      //console.log(user);
      this.errors.push(e);
      }
    }
        
    },
    validUser() {
      if (this.user.password !== this.user.password2) {
        this.errorMessage = 'Password must match.';
        console.log(this.$store.state.user.resetPassword);
        return false;
      }
     
    },
  },
   created: function () {
        }
};

</script>

<style >


</style>
