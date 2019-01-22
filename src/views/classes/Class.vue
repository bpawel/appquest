<template>
   <div class="class" id="class">
   <div class="container">
      <div class="row">
        <div  class="col-md-8 col-table">
        <ul class ="alert alert-danger" v-if="errors && errors.length ">
              <li v-for="error of errors" :key="error.id">
              {{error.message}}
        </li>
        </ul>
        <h2>Dołącz do Klasy</h2>
        <i></i>
          <div v-for="groups in list" :key="groups.id" class="mb-3">
          <b-card>
            <h5 class="card-title">{{groups.name}}</h5>
            <p>{{groups.description}}</p>
            <h6 class="card-subtitle mb-2 text-muted">Instructor: {{groups.instructor}}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Users: {{groups.users}}</h6>
            <button  v-on:click="addUser(groups)" class="btn btn-success mt-3">Dołącz</button>
            </b-card>
          </div>
        </div>
        <div class="col-md-3 wrap">
            <ActionLinks v-bind:actions="actions"></ActionLinks>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import router from '../../router'
import WelcomeMessage from '../welcome/WelcomeMessage.vue'
import ActionLinks from '../links/ActionLinks.vue'
import Logout from '../../components/Logout.vue'

export default {
    components: {
      WelcomeMessage,
      ActionLinks,
      Logout,
    },
  data () {

    return {
        actions: [
           {label: 'Moje Klasy', link: 'studentDashboard'},
           {label: 'Dołącz do klasy', link: 'class'},
           {label: 'Statystyki', link: 'resultDashboard'},
        ],
        list:[],
        // fields: [ 
        //   '_id', 'name', 'show_details', 'test', ],
        group: {
          id: '',
          name: '',
          description: '',
          instructor: '',
          users: [],
        },
        // errors: []   
        }
    },
    created () {
        this.getGroup();
    },
        
    methods: {
       async getGroup() {
           try {
               let group = await axios.get('http://localhost:3000/v1/class',);
               this.list = group.data;
           } catch (e) {
               this.errors.push(e)
           }
       },
      async addUser(group){
          try{
                await axios.put("http://localhost:3000/v1/class/" + group.id,  {
                users: this.$store.state.user.id,
                });
              router.push({path: '/studentDashboard'});
          }catch(e) {
            
              this.errors.push(e);
      }
    },
    }
}
</script>
<style scoped>
.col-table {
  padding-top: 50px;
}
</style>