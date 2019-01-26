<template>
  <div class="" id="">
    <div class="container">
      <div class="row">
      <div class="col-md-9 col-table">
        <ul class="alert alert-danger" v-if="errorsMessage && errorsMessage.length">
            <li v-for="error of errorsMessage" :key="error.id">
            {{error.message}}
        </li>
        </ul>
          <h5>KLASY</h5>
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
            <b-table v-if="editId == group.id" striped hover 
                    :items="group" 
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
                  <font-awesome-icon v-on:click="editGroup(data.item)"  icon="check" />
                </a>
                  <a href="#" class="icon">
                  <font-awesome-icon v-on:click="onCancel()"  icon="ban" />
                </a>
              </template>
            
            </b-table>
            <b-table v-else striped hover 
                :items="group" 
                :fields="fields"
                :filter="filter"
                @filtered="onFiltered"
                :current-page="currentPage"
                :per-page="perPage">

              <template slot="actions" slot-scope="data">
                <a href="#" class="icon">
                  <font-awesome-icon v-on:click="onEdit(group)" icon="edit" />
                </a>
                <a href="#" class="icon">
                  <font-awesome-icon @click="deleteGroup(data.item.id)" icon="trash" />
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
        group: {
          id: '',
          name: '',
          instructor: '',
        },
        fields: [ 
          {key: 'id', label: 'Id Klasy'}, 
          {key: 'name', label: 'Nazwa Klasy'}, 
          {key: 'instructor', label: 'Id Wykładowcy'},
          {key: 'actions', label: '' } 
        ],
        items: this.group,
        filter: null,
        currentPage: 1,
        perPage: 5,
        pageOptions: [ 5, 10, 15 ],
        loggedInUser: this.$store.state.user,
        };
    },
    
    created () {
        this.getGroups();
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
       async getGroups(){
        try{
            let group = await axios.get(`${process.env.VUE_APP_HOST}/class`);
            this.group = group.data;

        }catch(e) {
            this.errorsMessage.push(e);
        }
    },
      async deleteGroup(id) {
        try{
          console.log(id);
           await axios.delete(`${process.env.VUE_APP_HOST}/class/` + id);
           this.getGroups();
        }catch(e) {
            this.errorsMessage.push(e);
        }
      },

    onEdit(group){
      this.editId = group.id
      this.group.name = group.name
    },

    onCancel(){
      this.editId = ''
      this.name = ''
    },

    editGroup(group){
      try{
            axios.put(`${process.env.VUE_APP_HOST}/class/` + group.id,  {
              name: group.name,
            });
           
            this.editId = ''
            this.group.name = ''
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

<style>
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
