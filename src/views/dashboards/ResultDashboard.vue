<template>
 <div class="class" id="class">
   <div class="container">
      <div class="row">
        <div  class="col-md-8 col-table">
      
        <chartjs-bar :datalabel="'Statystyki[%]'" :labels="['Test123, 12.10.2018','Test, 20.10.2018','Quiz, 22.10.2018']" :data="[100,40,60]"></chartjs-bar> 
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
       Test() {
           router.push({path: '/quizDashboard'});
       },
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