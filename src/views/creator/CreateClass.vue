<template>
 <div class="class" id="class">
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
            <h2>Nazwa Klasy: </h2>
            <b-form-textarea minlength="2" id="textarea1"
                            v-model="group.name"
                            placeholder="Wprowadź nazwę klasy"
                            :rows="1"
                            :max-rows="1">
            </b-form-textarea>
          </div>
          </template>
          <template>
          <div>
            <h2>Opis: </h2>
            <b-form-textarea minlength="2" id="textarea1"
                            v-model="group.description"
                            placeholder="Wprowadź temat lekcji"
                            :rows="3"
                            :max-rows="6">
            </b-form-textarea>
          </div>
          </template>
          <template>
          </template>
          <div class="mt-5">
            <b-card>
            <h2 class="card-title">Nazwa Klasy: {{group.name}}</h2>
            <p>Opis: {{group.description}}</p>
            </b-card>
            <button  v-on:click="createGroup(group)" class="btn btn-success mt-3">Dodaj Klase</button>
          </div>
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
      errors:[],
      group: {
        name:'',
        description:'',
      }
      
      }
      },
      methods: {

    async createGroup(group){
      try{
         await axios.post(`${process.env.VUE_APP_HOST}/class/` ,  {
              name: group.name,
              description: group.description,
            });
        router.push({path: '/listClassesInstructor'});
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
textarea.form-control {
    border-radius: 0;
    border-color: #fff;
    border-bottom: 1px solid rgb(182, 182, 182);
}
textarea.form-control:focus {
    box-shadow: none;
    border-color: #fff;
}
textarea.form-control:hover {
    border-radius: 0;
    border-color: #fff;
    border-bottom: 2px solid #003c82;
    box-shadow: none;
}
</style>
