<template>
<div>
  <div v-if="introStage">
    <slot name="intro" :title="title">
    <h1>Witaj w quzie:</h1>
    <h3>
       {{title}}
    </h3>    
    </slot>
    <button class="btn btn-success mb-5" @click="startQuiz">START!</button>
  </div>
  
  <div v-if="questionStage">
    <Questions 
              v-bind:question="questions[currentQuestion]"
              v-on:answer="handleAnswer"
              v-bind:question-number="currentQuestion+1"
    ></Questions>
  </div>
  
  <div v-if="resultsStage">
    <h1 class="text-center">GRATULACJE!</h1> 
      <chartjs-doughnut 
                    v-bind:labels="labels"
                    v-bind:datasets="datasets"
                    v-bind:option="option" >
    </chartjs-doughnut>
    <slot name="results" :length="questions.length" :perc="perc" :correct="correct">
    You got {{correct}} right out of {{questions.length}} questions. Your percentage is {{perc}}%.
    
    </slot>
     <b-button  class="btn btn-primary btn-xs mt-3" href="/studentDashboard" >Zakończ</b-button>
  </div>
</div>

</template>

<script>
import Questions from './Questions.vue';
import axios from "axios";
import { mapState } from "vuex";

export default {
components: {
    Questions,
},
props: ['id'],
data() {
    return {
      introStage:false,
      questionStage:false,
      resultsStage:false,
      title:'',
      questions:[],
      currentQuestion:0,
      userChoices:[],
      correct:0,
      perc:null,
      labels: ["poprawne", "niepoprawne"],
      datasets: [{
           data: [],
           backgroundColor: ["Blue", "Red"],
      }],
      option: {
          title: {
              display: true,
              position: "bottom",
              text: 'Podsumowanie odpowiedzi',
          }
      },
      quiz: {}
    }
  },
  async created() {    
    await this.getQuizData();
  
  },
  methods:{
    async getQuizData() {
        let response = await axios.get(
          `${process.env.VUE_APP_HOST}/quiz/${this.id}`
        );
      this.title = response.data.name;
      this.questions = response.data.question;
      this.introStage = true;
      this.quiz = response.data;
    },
    startQuiz() {
      this.introStage = false;
      this.questionStage = true;
    },
    async handleAnswer(e) {
      console.log(e);
      this.userChoices[this.currentQuestion]=e || {};
      if((this.currentQuestion+1) === this.questions.length) {
        await this.handleResults();
        this.questionStage = false;
        this.resultsStage = true;
      } else {
        this.currentQuestion++;
      }
    },
    async handleResults() {
      console.log('handle results');
      this.questions.forEach((a, index) => {
        if (a.type === 'multiple') {
          let validAnswers = [];
          let userAnswers = [];
          for (let answer of a.answers) {
              if (answer.validAnswer.length > 0) {
                validAnswers.push(a.answers.indexOf(answer));
              }
          }
          for (let answerIndex of Object.keys(this.userChoices[index].answers)) {
            if (this.userChoices[index].answers[answerIndex] === true) {
              userAnswers.push(answerIndex);
            }
          }

          if (validAnswers.join(';') === userAnswers.join(';')) {
            this.correct++;
          }
        } else if (a.type === 'open') {
          if (a.answers[0] && a.answers[0].validAnswer[0] === this.userChoices[index].answer) {
            this.correct++;
          }
        } else {
          console.log(this.userChoices[index])
          if (this.userChoices[index].answer.validAnswer.length > 0) {
            this.correct++;
          }
        }      
      });
      this.perc = ((this.correct / this.questions.length)*100).toFixed(2);
      this.datasets[0].data = [this.perc, 100 - this.perc];
      console.log(this.correct+' '+this.perc);
         await axios.post(`${process.env.VUE_APP_HOST}/quiz-result/` ,  {
              quiz: this.quiz.id,
              correctAnswersCount: this.correct,
              questionsCount: this.questions.length,
            });
            // console.log(quiz.type)
    }
  }
  
}
</script>

<style>

</style>
