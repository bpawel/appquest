<template>
<b-card id="myModal"  hide-footer centered title="Zresetuj hasło">
        <ul class ="alert alert-danger" v-if="!successMessage && errors && errors.length ">
                    <li v-for="error of errors" :key="error.id">
                    {{error.message}}
            </li>
        </ul>
        <p v-if="successMessage">{{successMessage}}</p>
    <form  v-if="!successMessage" @submit.prevent="">
       
    <div class="form-group">
        <label >Email: </label>
        <input 
                v-model="user.email"
                type="email" 
                class="form-control" 
                aria-describedby="emailHelp" 
                placeholder="Wprowadź email" required>
    </div>
    <button v-on:click="confirmEmail(user)" class="btn btn-primary">Wyślij Email</button>
    </form>
</b-card>
</template>

<script>
import axios from 'axios'
import router from '../router'
    export default {
        data() {
            return {
                errors:[],
                user: {
                    email:'',
                },
                successMessage: null,
            }
        },
        methods: {
            async confirmEmail(user){
                try{
                    const res = await axios.post("http://localhost:3000/v1/auth/forgot-password",  {
                        email: this.user.email,
                });
                if (res.data.message) {
                    this.successMessage = res.data.message;
                }
                    user.email = '';
                }catch(e) {
                    this.errors.push(e);
                }
            },
        },
        created: function () {
        }
    }
</script>
<style scoped>
</style>
