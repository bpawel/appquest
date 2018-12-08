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
        <h2>Klasy</h2>
        <i></i>
          <div v-for="groups in list" :key="groups.id" class="mb-3">
          <b-card>
            <h5 class="card-title">{{groups.name}}</h5>
            <p>{{groups.description}}</p>
            <h6 class="card-subtitle mb-2 text-muted">Wykładowca: {{groups.instructor}}</h6>
             <button  v-on:click="createGroup()" class="btn btn-success mt-3">Test</button>
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
        ],
        list:[],
        group: {
            id: '',
            name: '',
            description: '',
            instructor: '',
            users:'',
        },
        errors: []   
        }
    },
    created () {
        this.getGroup();
    },
        
    methods: {
       async getGroup() {
           try {
               let ID = this.$store.state.user.id;
               let group = await axios.get(`http://localhost:3000/v1/class?users=${ID}`);
               this.list = group.data;
           } catch (e) {
               this.errors.push(e)
           }
       },

    }
}
</script>
<style>

</style>