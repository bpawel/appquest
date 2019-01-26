<template>
    <div class="" id="">
      <div class="container">
        <div class="row">
        <div class="col-sm-9 col-table">
          <ul class="alert alert-danger" v-if="errorsMessage && errorsMessage.length">
            <li v-for="error of errorsMessage" :key="error.id">
            {{error.message}}
          </li>
          </ul>
            <h5>TESTY</h5>
            <i></i>
          <b-card>
          <div class="table-responsive">
            <b-col  class="my-1">
            <b-form-group horizontal label="Filter: " class="mb-0">
              <b-input-group>
                <b-form-input v-model="filter" placeholder="Szukaj" />
                <b-input-group-append>
                  <b-btn :disabled="!filter" @click="filter = ''">Reset</b-btn>
                </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col  class="my-1">
              <b-form-group horizontal label="Na strone: " class="mb-0">
                <b-form-select :options="pageOptions" v-model="perPage" />
              </b-form-group>
            </b-col>
            <b-table v-if="editId == quiz.id" striped hover 
                    :items="quiz" 
                    :fields="fields"
                    :filter="filter"
                    @filtered="onFiltered"
                    :current-page="currentPage"
                    :per-page="perPage">
              
              <template slot="name" slot-scope="data">
                <b-form-group >
                  <input v-model="data.item.name" type="text">
                </b-form-group>
              </template>

              <template slot="actions" slot-scope="data">
                <a href="#" class="icon">
                    <font-awesome-icon v-on:click="editQuiz(data.item)"  icon="check" />
                  </a>
                    <a href="#" class="icon">
                    <font-awesome-icon v-on:click="onCancel()"  icon="ban" />
                  </a>
              </template>
            
            </b-table>
            <b-table v-else striped hover 
                    :items="quiz" 
                    :fields="fields"
                    :filter="filter"
                    @filtered="onFiltered"
                    :current-page="currentPage"
                    :per-page="perPage">

              <template slot="actions" slot-scope="data">
                <a href="#" class="icon">
                  <font-awesome-icon v-on:click="onEdit(quiz)" icon="edit" />
                </a>
                <a href="#" class="icon">
                  <font-awesome-icon @click="deleteQuiz(data.item.id)" icon="trash" />
                </a>
              </template>
            </b-table>
            </div>
            <b-row>
              <b-col  class="my-4">
                <b-pagination align="center" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
              </b-col>
            </b-row>
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
        errorsMessage:[],
        quiz: {
          id: '',
          name: '',
          instructor: '',
        },
        fields: [ 
          {key: 'id', label: 'Id Testu'}, 
          {key: 'name', label: 'Email'}, 
          {key: 'instructor', label: 'Id Wykładowcy'},
          {key: 'actions' } 
        ],
        items: this.quiz,
        filter: null,
        currentPage: 1,
        totalRows: this.quiz,
        perPage: 5,
        pageOptions: [ 5, 10, 15 ],
        loggedInUser: this.$store.state.user,
        };
    },
    
    created () {
        this.getQuizzes();
    },
    computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
    },          
    methods: {
       async getQuizzes(){
        try{
            let quiz = await axios.get(`${process.env.VUE_APP_HOST}/quiz`);
            this.quiz = quiz.data;

        }catch(e) {
            this.errorsMessage.push(e);
        }
    },
      async deleteQuiz(id) {
        try{
         
           await axios.delete(`${process.env.VUE_APP_HOST}/quiz/` + id);
           this.getQuizzes();
        }catch(e) {
            this.errorsMessage.push(e);
        }
      },

    onEdit(quiz){
      this.editId = quiz.id
      this.quiz.name = quiz.name
    },

    onCancel(){
      this.editId = ''
      this.name = ''
    },

    editQuiz(quiz){
      try{
            axios.put(`${process.env.VUE_APP_HOST}/quiz/` + quiz.id,  {
              name: quiz.name,
            });
           
            this.editId = ''
            this.quiz.name = ''
      }catch(e) {
          this.errorsMessage.push(e);
      }
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
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