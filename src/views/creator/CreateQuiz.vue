<template>
 <div class="class">
   <div class="container">
      
      <div class="row">
        <div class="col-sm-8 col-table">
            <ul class="alert alert-danger" v-if="errors && errors.length">
                    <li v-for="error of errors" :key="error.id">
                    {{error.message}}
                </li>
            </ul>
          <div>
          <template>
          <div>
            <h2>Nazwa Testu: </h2>
            <b-form-textarea minlength="2" id="textarea1"
                            v-model="quiz.name"
                            placeholder="Enter something"
                            :rows="1"
                            :max-rows="1">
            </b-form-textarea>
          </div>
          </template>
          <template>
          <div  class="mt-3">
            <h2>Typ Testu: </h2>
            <b-form-select v-model="quiz.type" :options="options" />
          </div>
          </template>
           
            <AddQuestions></AddQuestions>
             <button  v-on:click="createQuiz(quiz)" class="btn btn-success mb-5">Dodaj Test</button>
          </div>
        </div>
        <div class="col-md-3 wrap">
            <ActionLinks v-bind:actions="actions" ></ActionLinks>
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
import AddQuestions from '../../components/AddQuestions.vue'


export default {
    
    components: {
      WelcomeMessage,
      ActionLinks,
      Logout,
      AddQuestions,
    },
     data () {
    return {
      
      actions: [
            {label: 'Moje Klasy', link: 'listClassesInstructor'},
            {label: 'Moje Testy', link: 'listQuizzesInstructor'},
            {label: 'Stwórz Klase', link: 'createClass'},
            {label: 'Stwórz Test', link: 'createQuiz'},
          ],
      errors:[],
      quiz: {
        name:'',
        type:'',
        question:'',
      },
      selected: null,
      options: [
          { value: null, text: 'Please select type' },
          { value: 'open', text: 'open' },
          { value: 'closed', text: 'closed' },
          { value: 'true/false', text: 'true/false' },
          { value: 'multiple', text: 'multiple' }
        ]
    
    }
    },
    methods: {

    async createQuiz(quiz){
      try{
         await axios.post("http://localhost:3000/v1/quiz/" ,  {
              name: quiz.name,
              type: quiz.type,
              question: quiz.question,
            });
        router.push({path: '/listQuizzesInstructor'});
      }catch(e) {
          //console.log(user);
          this.errors.push(e);
      }
    },
    }
}

</script>

<style>
.col-table {
  padding-top: 50px;
}

select.form-control {
    border-radius: 0;
    border-color: #fff;
    border-bottom: 1px solid rgb(182, 182, 182);
}
select.form-control:focus {
    box-shadow: none;
    border-color: #fff;
}
select.form-control:hover {
    border-radius: 0;
    border-color: #fff;
    border-bottom: 2px solid #003c82;
    box-shadow: none;
}
</style>
