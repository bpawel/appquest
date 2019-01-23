<template>
 <div class="class" id="class">
   <div class="container">
      <div class="row">
        <div  class="col-md-8 col-table">
      
        <chartjs-bar v-if="done" :datalabel="'Statystyki wyników testów [%]'" :labels="chartLabels" :data="chartValues" ></chartjs-bar> 
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
        chartLabels: [],
        chartValues: [],
        errors: [],
        done: false,
        }
    },
    async created () {
        await this.getResults();
        this.done = true;
    },
        
    methods: {
       async getResults() {
           try {
               let res = await axios.get(`http://localhost:3000/v1/quiz-result?user=${this.$store.state.user.id}`);
               this.list = res.data;
            //    console.log('asd')
               for (let result of this.list) {
                   this.chartLabels.push([result.quiz.name, result.createdAt]);
                   this.chartValues.push(result.correctAnswersCount / result.questionsCount * 100);
                   console.log(`${result.quiz.name} ${result.createdAt}`)
                   console.log(result.correctAnswersCount / result.questionsCount);
               }
           } catch (e) {
               this.errors.push(e)
           }
       },

    }
}
</script>
<style>

</style>