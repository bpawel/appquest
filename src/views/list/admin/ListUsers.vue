<template>
  <div class="" id="">
    <div class="container">
      <div class="row"> 
        <div class="col-md-9 col-table">
            
          <ul v-if="errors && errors.length">
                    <li v-for="error of errors" :key="error.id">
                    {{error.message}}
                </li>
          </ul>
              
          <h5>UŻYTKOWNICY</h5>  
          <i></i>
          <b-card>
              
          <div class="table-responsive ">
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
            
            <b-table v-if="editId == user.id" striped hover 
                    :items="user" 
                    :fields="fields"
                    :filter="filter"
                    @filtered="onFiltered"
                    :current-page="currentPage"
                    :per-page="perPage">
              
            <template slot="email" scope="data">
              <b-form-group >
                <input v-model="data.item.email" type="text">
              </b-form-group>
            </template>
            
            <template slot="role" scope="data">
              <b-form-select v-model="data.item.role" :options="options"/>
            </template>

            <template slot="actions" slot-scope="data">
              <a href="#" class="icon">
                  <font-awesome-icon v-on:click="editUser(data.item)"  icon="check" />
                </a>
                  <a href="#" class="icon">
                  <font-awesome-icon v-on:click="onCancel()"  icon="ban" />
                </a>
            </template>
            
            </b-table>
            <b-table v-else striped hover 
                    :items="user" 
                    :fields="fields"
                    :filter="filter"
                    @filtered="onFiltered"
                    :current-page="currentPage"
                    :per-page="perPage">

              <template slot="actions" slot-scope="data">
                <a href="#" class="icon">
                  <font-awesome-icon v-on:click="onEdit(user)" icon="edit" />
                </a>
                <a href="#" class="icon">
                  <font-awesome-icon @click="deleteUser(data.item.id)" icon="trash" />
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
import VeeValidate from 'vee-validate';
import ActionLinks from '../../links/ActionLinks.vue'
import WelcomeMessage from '../../welcome/WelcomeMessage.vue'
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
        errors:[],
        user: {
          id: '',
          email: '',
          role: '',
        },
        selected: null,
        options: [
          { value: 'student', text: 'student' },
          { value: 'instructor', text: 'instructor' },
          { value: 'admin', text: 'admin' }
        ],
        fields: [ 
          {key: 'id', label: 'Id Użytkownika'}, 
          {key: 'email', label: 'Email'}, 
          {key: 'role', label: 'Role'},
          {key: 'actions' } 
        ],
        items: this.user,
        filter: null,
        currentPage: 1,
        perPage: 5,
        totalRows: this.user,
        pageOptions: [ 5, 10, 15 ],
        loggedInUser: this.$store.state.user,
        };
    },
    created () {
      this.getUsers();
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
       async getUsers(){
        try{
            let user = await axios.get(`${process.env.VUE_APP_HOST}/users`);
            this.user = user.data;

        }catch(e) {
            this.errors.push(e);
        }
    },
      async deleteUser(id) {
        try{
          console.log(id);
           await axios.delete(`${process.env.VUE_APP_HOST}/users/` + id);
           this.getUsers();
        }catch(e) {
            this.errors.push(e);
        }
      },

    onEdit(user){
      this.editId = user.id;
      this.user.email = user.email
      this.user.role = user.role
    },

    onCancel(){
      this.editId = ''
      this.user.email = ''
      this.role = ''
    },

    editUser(user){
      try{
        //console.log(id);
            axios.patch(`${process.env.VUE_APP_HOST}/users/` + user.id,  {
              role: user.role,
              email:  user.email,
            });
            //this.getUsers();
            this.editId = ''
            this.user.email = ''
            this.user.role = ''
      }catch(e) {
          //console.log(user);
          this.errors.push(e);
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

<style>
html, body {
   background-image: url('../../../assets/bg.png');
}
.wrap { 
  background-color: #fff;
  padding: 50px 0px 0px 0px;
  -webkit-box-shadow: 3px -5px 51px -15px rgba(0,0,0,0.75);
  -moz-box-shadow: 3px -5px 51px -15px rgba(0,0,0,0.75);
  box-shadow: 3px -5px 51px -15px rgba(0,0,0,0.75);
}
.col-table {
  padding-top: 50px;
}

.icon {
  color: #003c82;
}

.icon:hover {
  color: #035abd;
}

.card {
  display: block;
  border-bottom: 3px solid #035abd;
  border-radius: 0;
  -webkit-box-shadow: 0px 9px 51px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 9px 51px -5px rgba(0,0,0,0.75);
  box-shadow: 0px 9px 51px -5px rgba(0,0,0,0.75);
}

.card-body:hover {
  border-bottom: 1px solid #003c82;
}

input {
    border-radius: 0;
    border-color: #fff;
    border-bottom: 1px solid rgb(182, 182, 182);
}
input:focus {
    box-shadow: none;
    border-color: #fff;
}
input:hover {
    border-radius: 0;
    border-color: #fff;
    border-bottom: 2px solid #003c82;
    box-shadow: none;
}

i {
    content: " ";
    border: 1px solid black;
    margin-top: 15px;
    margin-bottom: 15px;
    display: block;
    max-width: 100px
}
 li {
    list-style-type: none;
    }
ul {
  margin: 0;
  padding: 0;
}
.page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #003c82;
    border-color:  #003c82;
}
.page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #003c82;
    border-color:  #003c82;
}

</style>
