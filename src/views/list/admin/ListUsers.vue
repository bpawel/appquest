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
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                 ID Użytkownika
                </th>
                <th>
                 Email
                </th>
                <th>
                 Role
                </th>
                <th>
                 Akcja
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in list"  :key="user.id">
                <template v-if="editId == user.id" >
                  <td><input v-model="user.id"  type="text"> </td>
                  <td><input v-model="user.email" type="text"></td>
                  <td><input v-model="user.role" type="text"></td>
                  <td>
                  <a href="#" class="icon">
                    <font-awesome-icon v-on:click="editUser(user)"  icon="check" />
                  </a>
                   <a href="#" class="icon">
                    <font-awesome-icon v-on:click="onCancel()"  icon="ban" />
                  </a>
                  </td>
                  <!-- <td><button v-on:click="onEdit(user)" size="sm" class="mr-2 btn btn-success btn-block">Edit</button></td>
                  <td><button v-on:click="deleteUser(user.id)" size="sm" class="mr-2 btn btn-danger btn-block">Delete</button></td> -->
                </template>
                <template v-else >
                  <td >
                    {{user.id}}
                  </td>
                  <td>
                    {{user.email}}
                  </td>
                  <td>
                    {{user.role}}
                  </td>
                  <td>
                   
                    <a href="#" class="icon">
                      <font-awesome-icon v-on:click="onEdit(user)" icon="edit" />
                    </a>
                     <a href="#" class="icon">
                      <font-awesome-icon v-on:click="deleteUser(user.id)" icon="trash" />
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
        list: [],
        errors:[],
        user: {
          id: '',
          email: '',
          role: '',
        
        },
        loggedInUser: this.$store.state.user,
        };
    },
    
    created () {
        this.getUsers();
    },
            
    methods: {
       async getUsers(){
        try{
            let user = await axios.get("http://localhost:3000/v1/users");
            this.list = user.data;

        }catch(e) {
            this.errors.push(e);
        }
    },
      async deleteUser(id) {
        try{
          console.log(id);
           await axios.delete("http://localhost:3000/v1/users/" + id);
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
            axios.patch("http://localhost:3000/v1/users/" + user.id,  {
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
</style>
