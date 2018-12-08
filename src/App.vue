<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-blue ">
  
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <a class="navbar-brand" href="#">AppQuest</a>
    <div class="navbar-nav ml-auto">
      <b-link v-if="!isLogged"  v-b-modal.myModal class="nav-item nav-link active mr-3" >Zaloguj się<span class="sr-only">(current)</span></b-link>
      <b-btn v-if="!isLogged" v-b-modal.register>Zarejestruj się</b-btn>
      <Logout  v-if="isLogged"></Logout>
       <b-link v-if="isLogged" class="nav-item nav-link active" ><WelcomeMessage></WelcomeMessage><span class="sr-only">(current)</span></b-link>
    </div>
  </div>
</nav>
     <router-view />
  </div>
</template>
<script>
import WelcomeMessage from './views/welcome/WelcomeMessage.vue'
import Logout from './components/Logout.vue'
import { mapGetters } from 'vuex'
    export default {
        name: 'app',
         components: {
           WelcomeMessage,
           Logout,
        },
        computed: mapGetters([
            'isLogged',
        ]),
        methods: {
        }
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Kaushan+Script');
  @import url('https://fonts.googleapis.com/css?family=Permanent+Marker');
  @import url('https://fonts.googleapis.com/css?family=Gloria+Hallelujah');
  @import url('https://fonts.googleapis.com/css?family=Lato');
  
  .navbar-brand {
    /* font-family: 'Gloria Hallelujah', cursive; */
    /* font-family: 'Permanent Marker', cursive; */
    font-family: 'Kaushan Script', cursive;
  }
  #app {
     font-family: 'Lato', sans-serif;
  }

  .bg-blue{
    background-color: #003c82;
    height: 100px;
    -webkit-box-shadow: -2px 9px 20px -9px rgba(0,0,0,0.75);
    -moz-box-shadow: -2px 9px 20px -9px rgba(0,0,0,0.75);
    box-shadow: -2px 9px 20px -9px rgba(0,0,0,0.75);
  }
  .navbar-light .navbar-brand {
    color: #fff;
    
  }
  .navbar-light .navbar-nav .nav-link.active {
    color: #fff;
    font-size: 1.2rem;
  }

  .navbar-light .navbar-nav .nav-link.active:hover {
    color: rgba(228, 228, 228, 0.527);
  }

  a:-webkit-any-link {
    text-decoration: none;
    color:#fff;
    font-size: 1.2rem; 
  }
  a:-webkit-any-link:hover {
    text-decoration: none;
    color:rgba(228, 228, 228, 0.527);
    
  }
  .btn{
  border-radius: 0px;
  font-size: 1.2rem;
  background-color: #1863e6;
  border: none;
  }

  .btn:hover{
  border-radius: 0px;
  font-size: 1.2rem;
  background-color: #035abd;
  }
  a[data-v-7ba5bd90]:-webkit-any-link.navbar-brand {
    text-decoration: none;
    color: #fff;
    font-size: 2.2rem;
}
  @media (min-width: 992px) {
    .navbar-expand-lg .navbar-collapse {
      margin: 0 10%;
    }
  }

</style>