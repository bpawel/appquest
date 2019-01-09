<template>
  <div class="home" id="home">
   <div class="container pt-5">
      <div class="row">
        <div class="col-md-7">
          <div class="jumbotron">
            <h1 class="display-1 font-weight-bold">Witaj na stronie</h1>
            <p class="lead display-4">Ucz się i rozwiązuj testy online!!!</p>
            <hr class="my-4">
           <b-btn v-b-modal.register>Dołącz do nas</b-btn>
          </div>
          <Register></Register> 
          <Login></Login>
        </div>
      </div>
    </div>
    
    <Footer></Footer>
  </div>
  
</template>

<script>
import Register from './users/Register.vue';
import Login from './users/Login.vue';
import Footer from '../components/Footer.vue';
import Joi from 'joi';

export default {
 name: 'home',
 components: {
     Login,
     Register,
     Footer,
 }
 
    }
</script>

<style scoped>
.jumbotron {
  height: 100vh;
  padding: 14rem 2rem;
}
#home {
  background-image: url('../assets/start.jpg');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.btn{
  border-radius: 0px;
  font-size: 1.2rem;
  background-color: #003c82;
  border: none;
  -webkit-box-shadow: 0px 1px 25px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 1px 25px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 1px 25px 0px rgba(0,0,0,0.75);
}

.btn:hover{
  border-radius: 0px;
  font-size: 1.2rem;
  background-color: #035abd;
}

.jumbotron {
  background-color: rgba(255, 255, 255, 0.062);
}

.jumbotron .lead {
  color: #003c82;
  font-size: 3rem;
  font-style: italic;
}



@media (min-width: 770px){
div.col-md-7 {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 58.3333333333%;
    flex: 0 0 58.3333333333%;
    max-width: 58.3333333333%;
}
}
</style>
