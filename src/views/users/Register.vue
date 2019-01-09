<template>
   
<div>
  <b-modal  ref="myModalRef" id="register"  hide-footer centered title="Rejestracja">
     <div>
        
            <form @submit.prevent="register()">
                <div class="form-group">
                    <label >Email: </label>
                    <input
                    v-model="user.email"
                    v-validate="'required|email'"
                    name="email"
                    type="email"
                    class="form-control"
                    :class="{'is-invalid':submitted && errors.has('email')}"
                    aria-describedby="emailHelp"
                    placeholder="Wprowadź email" required>
                    <small v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</small>
                </div>
                <div class="form-group">
                    <label >Hasło: </label>
                    <input
                    v-model="user.password"
                    v-validate="'required|min:6|max:128'"
                    name="password"
                    type="password"
                    ref="password"
                    class="form-control"
                    :class="{'is-invalid': submitted && errors.has('password')}"
                    aria-describedby="passwordHelp"
                    placeholder="Wprowadź hasło" required>
                    <small v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</small>
                </div>
                <div class="form-group">
                    <label >Potwierdź hasło: </label>
                    <input
                    v-model="user.confirmPassword"
                    v-validate="'required|min:6|max:128|confirmed:password'"
                    name="confirmPassword"
                    type="password"
                    class="form-control"
                    :class="{'is-invalid': submitted && errors.has('confirmPassword')}"
                    data-vv-as="password"
                    aria-describedby="password2Help"
                    placeholder="Wprowadź potwierdzone hasło" required>
                    <small v-if="submitted && errors.has('confirmPassword')" class="invalid-feedback">{{ errors.first('confirmPassword') }}</small>
                </div>
                <button data-dismiss="b-modal" type="submit" class="btn btn-primary">Zarejestruj</button>
            </form>
        </div>
  </b-modal>
</div>
</template>

<script>

export default {
  name: 'register',
 data() {
    return {
      errorsMessage: [],
      user: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      submitted: false,
    }
  },  
  methods: {
    async register() {
      
      try {
        this.submitted = true; 
       await this.$validator.validate().then(valid => {
          if(valid) {
          this.$store.dispatch('register', this.user);
          this.$refs.myModalRef.hide()
          };
        });  
      } catch (e) {
        this.errors.push(e);
      } 
    },
  },
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

/* input[aria-invalid="false"]:hover {
  border-radius: 0;
    border-color: #fff;
    border-bottom: 2px solid #003c82;
    box-shadow: none;
} */

input.form-control[aria-invalid="true"] {
  border-radius: 0;
  border-color: #fff;
  border-bottom: 2px solid #ff0000;
  box-shadow: none;
}

 input.form-control[aria-invalid="true"]:focus {
    box-shadow: none;
    border-color: #fff;
}

</style>
