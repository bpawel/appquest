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
            <hr class=" mb-5">
            Wybierz Test i zapisz do Klasy:
            <select v-model="quiz.name"  class="form-control form-control-sm">
            <option v-for="quizzes in listQuiz" :key="quizzes.id">{{quizzes.name}}</option>
        </select>
        <button  v-on:click="addQuiz(quiz)" class="btn btn-success mt-5 mb-5">Dodaj Test do Klasy</button>
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
import { mapState } from 'vuex' 
 
 

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
        listQuiz:[],
        group: {
          id: '',
          name: '',
          description: '',
          instructor: '',
        },
        quiz: {
            id: '',
            name: '',
            quiz: [],
        },
        errors: []   
        }
    },
    created () {
        this.getGroup();
        this.getQuiz();
    },
    methods: {
        async  getGroup() {
           try {
               let ID = this.$store.state.user.id;
               let group = await axios.get(`http://localhost:3000/v1/class?instructor=${ID}`, );
               this.list = group.data;
           } catch (errors) {
               this.errors.push(errors)
           }
       },
       async  getQuiz() {
           try {
               let ID = this.$store.state.user.id;
               let quiz = await axios.get(`http://localhost:3000/v1/quiz?instructor=${ID}`, );
               this.listQuiz = quiz.data;
           } catch (errors) {
               this.errors.push(errors)
           }
       },
        async addQuiz(group){
        try{
            await axios.put(`http://localhost:3000/v1/class/` + group.id ,  {
                quiz: this.$store.state.quiz.name,
            });
        }catch(e) {
          //console.log(user);
          this.errors.push(e);
      }
    },
    },
}
</script>
<style scoped>
.col-table {
  padding-top: 50px;
}
</style>