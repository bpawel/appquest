<template>
    
    <div class="form">
         <div
            v-for="error of errors"
            class="alert alert-danger"
            role="alert"
            :key="error.id"
          >{{ error.message }}</div>
        <div class="form-group">
            <label for="email">email</label>
            <input v-model="user.email" class="form-control" type="text" id="email" >
        </div>
        <div class="form-group">
            <label for="role">role</label>
            <input v-model="user.role" class="form-control" type="text" id="role">
        </div>
        <div class="form-group">
            <button v-on:click="saveUser" class="btn btn-primary">Zapisz</button>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
    export default {
        data() {
            return {
                errors: [],
                user: {
                    email:'',
                    role: ''
                }
            }
        },
        methods: {
           async saveUser() {
               try {
                   await axios.put(`${process.env.VUE_APP_HOST}/users/` + this.user.id);
                   this.$router.push({path: '/users'}); 
               } catch(e) {
                   this.errors.push(e);
               }
                
                
                  
            },
           async getUser(id) { 
               try {
                    await axios.get(`${process.env.VUE_APP_HOST}/users/` + id)
                    this.user;
               }catch(e) {
                   this.errors.push(e);
               }
            }
        },
        created:function () {
            this.getUser(this.$route.params.userId);
        }
    }
</script>

<style>

</style>
