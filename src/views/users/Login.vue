<template>
<b-modal id="myModal"  hide-footer centered title="Logowanie">
      
    <form  @submit.prevent="login()">
       
    <div class="form-group">
        <label for="email">Email: </label>
        <input 
                v-model="user.email"
                type="email" 
                class="form-control" 
                id="email" 
                aria-describedby="emailHelp" 
                placeholder="Wprowadź email" required autofocus>
    </div>
    <div class="form-group">
        <label for="password">Hasło: </label>
        <input 
                v-model="user.password" 
                type="password" 
                class="form-control" 
                id="password"
                aria-describedby="passwordHelp" 
                placeholder="Wprowadź hasło" required>
    </div>
    <button type="submit" class="btn btn-primary">Zaloguj się</button>
    <router-link to="/forgot-password">Zapomniałeś hasło?</router-link>
    </form>
</b-modal>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    email:'',
                    password:''
                }
            }
        },
        methods: {
           async login() {
               try{
                  await this.$store.dispatch('login', this.user);
                } catch(error) {
                  this.errors.push(error);
                }
            }
        },
    }
</script>
<style scoped>
.btn {
  border-radius: 0px;
  font-size: 1.2rem;
  background-color: #003c82;
  border: none;
}

.btn:hover{
  border-radius: 0px;
  font-size: 1.2rem;
  background-color: #035abd;
}
input.form-control {
    border-radius: 0;
    border-color: #fff;
    border-bottom: 1px solid rgb(182, 182, 182);
}
input.form-control:focus {
    box-shadow: none;
}
input.form-control:hover {
    border-radius: 0;
    border-color: #fff;
    border-bottom: 2px solid #003c82;
    box-shadow: none;
}
a[data-v-2607fb58] {
    margin-left: 5%;
    color: #003c82;
}
</style>
