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
                            placeholder="Wprowadź nazwę testu"
                            :rows="1"
                            :max-rows="1">
            </b-form-textarea>
          </div>
          </template>
          <template>
         
          </template>
          <template>
              
                 
                <QuestionEditor v-bind:questions="question"> </QuestionEditor>
                
          </template>
             <button  v-on:click="createQuiz(quiz, question)" class="btn btn-success mb-5">Dodaj Test</button>

              
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
import QuestionEditor from '../../components/QuestionEditor.vue'

export default {
    
    components: {
      WelcomeMessage,
      ActionLinks,
      Logout,
      QuestionEditor,
    },
     data () {
    return {
      checkedNames: [],
      actions: [
            {label: 'Moje Klasy', link: 'listClassesInstructor'},
            {label: 'Moje Testy', link: 'listQuizzesInstructor'},
            {label: 'Stwórz Klase', link: 'createClass'},
            {label: 'Stwórz Test', link: 'createQuiz'},
          ],
      errors:[],
      quiz: {},
      question: [{
        questionName: '',
        type: '',
        answers: [],
        validAnswers: []
    }],
      
      }
    },
    methods: {
      
  
     
    async createQuiz(quiz, question){
      try{
        let add = await axios.post(`${process.env.VUE_APP_HOST}/quiz/` ,  {
              name: quiz.name,
              type: question.type,
              question: this.question,
            });
    
        router.push({path: '/listQuizzesInstructor'});
      }catch(e) {
          
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
