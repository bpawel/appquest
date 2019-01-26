<template>
  <div class="class" id="class">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-table">
          <ul class="alert alert-danger" v-if="errors && errors.length ">
            <li v-for="error of errors" :key="error.id">{{error.message}}</li>
          </ul>
          <h2>Klasy</h2>
          <i></i>
          <div v-for="clazz in classes" :key="clazz.id" class="mb-3">
            <b-card>
              <h5 class="card-title">{{clazz.name}}</h5>
              <p>{{clazz.description}}</p>
              <p>Quiz:</p>
                <b-form-select v-model="clazz.quiz" class="mb-3">
                  <option :value="quiz.id" v-for="quiz in quizes" :key="quiz.id">{{quiz.name}}</option>
                </b-form-select>
              <button v-on:click="save(clazz)" class="btn btn-success mt-5 mb-5">Zapisz</button>
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
import axios from "axios";

import WelcomeMessage from "../../welcome/WelcomeMessage.vue";
import ActionLinks from "../../links/ActionLinks.vue";
import Logout from "../../../components/Logout.vue";
import { mapState } from "vuex";

export default {
  components: {
    WelcomeMessage,
    ActionLinks,
    Logout
  },
  data() {
    return {
      actions: [
        { label: "Moje Klasy", link: "listClassesInstructor" },
        { label: "Moje Testy", link: "listQuizzesInstructor" },
        { label: "Stwórz Klase", link: "createClass" },
        { label: "Stwórz Test", link: "createQuiz" }
      ],
      classes: [],
      quizes: [],
      // selected: [],
      // group: {
      //   id: "",
      //   name: "",
      //   description: "",
      //   instructor: "",
      //   quiz: null
      // },
      // quiz: null,
      // errors: []
    };
  },
  created() {
    this.getClasses();
    this.getQuizes();
  },
  methods: {
    onchange: function() {
      try {
        let clazz = this.group.quiz;
        this.clazz.push(this.quiz.name);
      } catch (e) {
        console.log(e);
      }
      console.log([this.group.quiz]);
    },

    async getClasses() {
      try {
        let ID = this.$store.state.user.id;
        let group = await axios.get(
          `${process.env.VUE_APP_HOST}/class?instructor=${ID}`
        );
        this.classes = group.data;
      } catch (errors) {
        this.errors.push(errors);
      }
    },
    async getQuizes() {
      try {
        let ID = this.$store.state.user.id;
        let quiz = await axios.get(
          `${process.env.VUE_APP_HOST}/quiz?instructor=${ID}`
        );
        this.quizes = quiz.data;
      } catch (errors) {
        this.errors.push(errors);
      }
    },
    async save(clazz) {
      try {
        console.log(clazz);
        await axios.put(`${process.env.VUE_APP_HOST}/class/${clazz.id}`, {
          quiz: clazz.quiz
        });
      } catch (e) {
        this.errors.push(e);
      }
    }
  }
};
</script>
<style scoped>
.col-table {
  padding-top: 50px;
}
</style>