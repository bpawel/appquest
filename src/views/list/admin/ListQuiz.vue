<template>
    <div class="" id="">
        <div class="container">
            <div class="row">
            <div class="col-sm-9 col-table">
              <ul class="alert alert-danger" v-if="errors && errors.length">
                        <li v-for="error of errors" :key="error.id">
                        {{error.message}}
                    </li>
              </ul>
                <h5>TESTY</h5>
                <i></i>
        <b-card>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  ID Testu
                </th>
                <th>
                 Nazwa Testu
                </th>
                <th>
                 Typ Testu
                </th>
                <th>
                 Akcja
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="quiz in listQuizzes"  :key="quiz.id">
                <template v-if="editId == quiz.id" >
                  <td><input v-model="quiz.id"  type="text"> </td>
                  <td><input v-model="quiz.name" type="text"></td>
                  <td><input v-model="quiz.type" type="text"></td>
                  <td>
                  <a href="#" class="icon">
                    <font-awesome-icon v-on:click="editQuiz(quiz)"  icon="check" />
                  </a>
                   <a href="#" class="icon">
                    <font-awesome-icon v-on:click="onCancel()"  icon="ban" />
                  </a>
                  </td>
                 
                </template>
                <template v-else >
                  <td >
                    {{quiz.id}}
                  </td>
                  <td>
                    {{quiz.name}}
                  </td>
                  <td>
                    {{quiz.type}}
                  </td>
                  <td>
                   
                    <a href="#" class="icon">
                      <font-awesome-icon v-on:click="onEdit(quiz)" icon="edit" />
                    </a>
                     <a href="#" class="icon">
                      <font-awesome-icon v-on:click="deleteQuiz(quiz.id)" icon="trash" />
                    </a>
                  
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
        </b-card>
                
         
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
import Vue from 'vue'

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
          {label: 'Użytkownicy', link: 'listUsers'},
          {label: 'Klasy', link: 'listClasses'},
          {label: 'Testy', link: 'listQuiz'},
        ],
        editId: '',
        listQuizzes: [],
        errors:[],
        quiz: {
          id: '',
          name: '',
          type: '',
        
        },
        };
    },
    
    created () {
        this.getQuizzes();
    },
            
    methods: {
       async getQuizzes(){
        try{
            let quiz = await axios.get("http://localhost:3000/v1/quiz");
            this.listQuizzes = quiz.data;

        }catch(e) {
            this.errors.push(e);
        }
    },
      async deleteQuiz(id) {
        try{
         
           await axios.delete("http://localhost:3000/v1/quiz/" + id);
           this.getQuizzes();
        }catch(e) {
            this.errors.push(e);
        }
      },

    onEdit(quiz){
      this.editId = quiz.id
      this.quiz.name = quiz.name
      this.quiz.type = quiz.type
    },

    onCancel(){
      this.editId = ''
      this.name = ''
      this.type = ''
    },

    editQuiz(quiz){
      try{
            axios.put("http://localhost:3000/v1/quiz/" + quiz.id,  {
              name: quiz.name,
              type:  quiz.type,
            });
           
            this.editId = ''
            this.quiz.name = ''
            this.quiz.type = ''
      }catch(e) {
         
          this.errors.push(e);
      }
    },
    }
}
</script>

<style scope>
.col-table {
  padding-top: 50px;
}
 li {
    list-style-type: none;
    }
ul {
  margin: 0;
  padding: 0;
}
</style>