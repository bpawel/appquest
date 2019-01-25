<template>
  <div class="home" id="home">
   <div class="container pt-5">
      <div class="row">
        <div class="col-sm-6 offset-sm-3">
          <div class="jumbotron">
           <ForgotPasswordPart1></ForgotPasswordPart1> 
          </div>
          <Login></Login>
          <Register></Register> 
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import Register from '../../users/Register.vue';
import Login from '../../users/Login.vue';
import ForgotPasswordPart1 from '../../../components/ForgotPasswordPart1.vue';
import Footer from '../../../components/Footer.vue';
import Joi from 'joi';

export default {
 name: 'home',
 components: {
     ForgotPasswordPart1,
     Footer,
     Login,
     Register
 }
 
    }
</script>

<style scoped>

</style>
