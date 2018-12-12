<template>
<div>
  <div v-if="introStage">
    <slot name="intro" :title="title">
    <h1>Welcome to the Quiz: {{title}}</h1>
    <p>
      Some kind of text here. Blah blah.
    </p>    
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
      <chartjs-doughnut 
                    v-bind:labels="labels"
                    v-bind:datasets="datasets"
                    v-bind:option="option" >
    </chartjs-doughnut>
    <slot name="results" :length="questions.length" :perc="perc" :correct="correct">
    You got {{correct}} right out of {{questions.length}} questions. Your percentage is {{perc}}%.
    
    </slot>
  </div>
</div>
</template>

<script>
import Questions from './Questions.vue'
const quizData = 'https://api.myjson.com/bins/c1d1a';
export default {
components: {
    Questions,
},
data() {
    return {
      introStage:false,
      questionStage:false,
      resultsStage:false,
      title:'',
      questions:[],
      currentQuestion:0,
      answers:[],
      correct:0,
      perc:null,
      labels: ["dobrze", "źle"],
      datasets: [{
           data: [40,60],
           backgroundColor: ["Blue", "Red"],
      }],
      option: {
          title: {
              display: true,
              position: "bottom",
              text: this.perc,
          }
      }
    }
  },
  created() {    
    fetch(quizData)
    .then(res => res.json())
    .then(res => {
      this.title = res.title;
      this.questions = res.questions;
      this.introStage = true;
    })
  
  },
  methods:{
    startQuiz() {
      this.introStage = false;
      this.questionStage = true;
    },
    handleAnswer(e) {
      console.log('answer event ftw',e);
      this.answers[this.currentQuestion]=e.answer;
      if((this.currentQuestion+1) === this.questions.length) {
        this.handleResults();
        this.questionStage = false;
        this.resultsStage = true;
      } else {
        this.currentQuestion++;
      }
    },
    handleResults() {
      console.log('handle results');
      this.questions.forEach((a, index) => {
        if(this.answers[index] === a.answer) this.correct++;        
      });
      this.perc = ((this.correct / this.questions.length)*100).toFixed(2);
      console.log(this.correct+' '+this.perc);
    }
  }
  
}
</script>

<style>

</style>
