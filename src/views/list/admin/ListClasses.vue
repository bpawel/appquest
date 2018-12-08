<template>
    <div class="" id="">
        <div class="container">
            <div class="row">
            <div class="col-md-9 col-table">
              <ul class="alert alert-danger" v-if="errors && errors.length">
                        <li v-for="error of errors" :key="error.id">
                        {{error.message}}
                    </li>
              </ul>
                <h5>KLASY</h5>
                <i></i>
        <b-card>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  ID Klasy
                </th>
                <th>
                 Nazwa Klasy
                </th>
                <th>
                 ID Wykładowcy
                </th>
                <th>
                  Akcja
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="group in listGroups"  :key="group.id">
                <template v-if="editId == group.id" >
                  <td><input v-model="group.id"  type="text"> </td>
                  <td><input v-model="group.name" type="text"></td>
                  <td><input v-model="group.instructor" type="text" disabled></td>
                  <td>
                  <a href="#" class="icon">
                    <font-awesome-icon v-on:click="editGroup(group)"  icon="check" />
                  </a>
                   <a href="#" class="icon">
                    <font-awesome-icon v-on:click="onCancel()"  icon="ban" />
                  </a>
                  </td>
                 
                </template>
                <template v-else >
                  <td >
                    {{group.id}}
                  </td>
                  <td>
                    {{group.name}}
                  </td>
                  <td>
                    {{group.instructor}}
                  </td>
                  <td>
                   
                    <a href="#" class="icon">
                      <font-awesome-icon v-on:click="onEdit(group)" icon="edit" />
                    </a>
                     <a href="#" class="icon">
                      <font-awesome-icon v-on:click="deleteGroup(group.id)" icon="trash" />
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
        listGroups: [],
        errors:[],
        group: {
          id: '',
          name: '',
          instructor: '',
        
        },
        };
    },
    
    created () {
        this.getGroups();
    },
            
    methods: { // test, no chyba moge xD //
       async getGroups(){
        try{
            let group = await axios.get("http://localhost:3000/v1/class");
            this.listGroups = group.data;

        }catch(e) {
            this.errors.push(e);
        }
    },
      async deleteGroup(id) {
        try{
          console.log(id);
           await axios.delete("http://localhost:3000/v1/class/" + id);
           this.getGroups();
        }catch(e) {
            this.errors.push(e);
        }
      },

    onEdit(group){
      this.editId = group.id
      this.group.name = group.name
     
    },

    onCancel(){
      this.editId = ''
      this.name = ''
      this.instructor = ''
    },

    editGroup(group){
      try{
        
            axios.put("http://localhost:3000/v1/class/" + group.id,  {
              name: group.name,
            });
           
            this.editId = ''
            this.group.name = ''
            this.group.instructor = ''
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
 li {
    list-style-type: none;
    }
ul {
  margin: 0;
  padding: 0;
}
</style>
