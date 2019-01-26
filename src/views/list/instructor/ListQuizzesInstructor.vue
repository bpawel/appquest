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
        <h2>Testy</h2>
        <i></i>
          <div v-for="quizzes in list" :key="quizzes.id" class="mb-3">
          <b-card>
            <h5 class="card-title">{{quizzes.name}}</h5>
            <p>{{quizzes.type}}</p>
            <h6 class="card-subtitle mb-2 text-muted">Wykładowca: {{quizzes.instructor}}</h6>
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

import WelcomeMessage from '../../welcome/WelcomeMessage.vue'
import ActionLinks from '../../links/ActionLinks.vue'
import Logout from '../../../components/Logout.vue'

export default {
    components: {
      WelcomeMessage,
      ActionLinks,
      Logout,
    },
  data () {

    return {
        actions: [
            {label: 'Moje Klasy', link: 'listClassesInstructor'},
            {label: 'Moje Testy', link: 'listQuizzesInstructor'},
            {label: 'Stwórz Klase', link: 'createClass'},
            {label: 'Stwórz Test', link: 'createQuiz'},
        ],
        list:[],
        quiz: {
          id: '',
          name: '',
          type: '',
          instructor: '',
        },
        errors: []   
        }
    },
    created () {
        this.getQuiz();
    },
        
    methods: {
       async getQuiz() {
           try {
               let ID = this.$store.state.user.id;
               let quiz = await axios.get(`${process.env.VUE_APP_HOST}/quiz?instructor=${ID}`,);
               this.list = quiz.data;
           } catch (e) {
               this.errors.push(e)
           }
       },

        logout() {
            this.$store.dispatch('logout');
        }
    }
}
</script>
<style>
.col-table {
  padding-top: 50px;
}
</style>