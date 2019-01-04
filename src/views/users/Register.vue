<template>
   
<div>
  <b-modal  ref="myModalRef" id="register"  hide-footer centered title="Rejestracja">
     <div>
        <div class="container">
          </div>
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
            <form @submit.prevent="register()">
                <div class="form-group">
                    <label >Email: </label>
                    <input
                    v-model="user.email"
                    type="email"
                    class="form-control"
                    
                    aria-describedby="emailHelp"
                    placeholder="Wprowadź email" required>
                    <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label >Hasło: </label>
                    <input
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    
                    aria-describedby="passwordHelp"
                    placeholder="Wprowadź hasło" required>
                    <small id="passwordHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label >Potwierdź hasło: </label>
                    <input
                    v-model="user.password2"
                    type="password"
                    class="form-control"
                    
                    aria-describedby="password2Help"
                    placeholder="Wprowadź potwierdzone hasło" required>
                    <small id="password2Help" class="form-text text-muted"></small>
                </div>
                <button data-dismiss="b-modal" type="submit" class="btn btn-primary">Zarejestruj</button>
            </form>
        </div>
  </b-modal>
</div>
</template>

<script>
import Joi from 'joi';

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  password2: Joi.string().min(6).max(128).required(),
};
export default {
  name: 'register',
 data() {
    return {
      errorMessage: '',
      user: {
        email: '',
        password: '',
        password2: ''
      }
    }
  },  
  methods: {
    register() {
      if(this.validUser()) {
      this.$store.dispatch('register', this.user);
      this.$refs.myModalRef.hide()
      }
        
    },
    validUser() {
      if (this.user.password !== this.user.password2) {
        this.errorMessage = 'Password must match.';
        return false;
      }
      const result = Joi.validate(this.user, schema);
      if (result.error === null) {
        return true;
      }
      if (result.error.message.includes('email')) {
        this.errorMessage = 'Email is invalid. ';
      } else {
        this.errorMessage = 'Password is invalid. ';
      }

      return false;
    },
  },
   created: function () {
        }
};

</script>

<style >

.btn {
  border-radius: 0px;
  font-size: 1.2rem;
  background-color: #003c82;
  border: none;
}

.btn:hover{
  border-radius: 0px;
  font-size: 1.2rem;
  background-color: #035abd ;
}

.close {
  color: #fff;
}

 .modal-content {
    border-radius: 0;
}
.modal-header {
  background-color: #003c82;
  color: #fff;
  padding: 30px;
  border-top-left-radius: 0rem;
    border-top-right-radius: 0; 
}
input.form-control {
    border-radius: 0;
    border-color: #fff;
    border-bottom: 1px solid rgb(182, 182, 182);
}
input.form-control:focus {
    box-shadow: none;
    border-color: #fff;
}
input.form-control:hover {
    border-radius: 0;
    border-color: #fff;
    border-bottom: 2px solid #003c82;
    box-shadow: none;
}

</style>
