<template>
<div>
  <p><strong>{{ question.questionName }} </strong></p>

  <div v-if="question.type === 'true/false'">
    <div v-for="(trueFalseAnswer,index) in question.answers" :key="question.id">
    <input type="radio" :id="'answer'+index" name="currentQuestion" v-model="answer" :value="trueFalseAnswer"> <label :for="'answer'+index"> {{trueFalseAnswer.nameAnswer}}</label><br/>
    </div>
  </div>

  <div v-if="question.type === 'closed'">
    <div v-for="(closedQuestionAnswer,index) in question.answers" :key="question.id">
    <input type="radio" :id="'answer'+index" name="currentQuestion" v-model="answer" :value="closedQuestionAnswer"> <label :for="'answer'+index"> {{closedQuestionAnswer.nameAnswer}}</label><br/>
    </div>
  </div>

  <div v-if="question.type === 'open'">
    <label :for="'answer'"> Twoja odpowiedź: </label> <input type="text" :id="'answer'" name="currentQuestion" v-model="answer"> <br/>
  </div>

  <div v-if="question.type === 'multiple'">
    <div v-for="(multipleChoiceAnswer,index) in question.answers" :key="question.id">
    <input type="checkbox" :id="'answer'+index" name="currentQuestion" 
  v-model="answers[index]" :value="multipleChoiceAnswer"> <label :for="'answer'+index"> {{multipleChoiceAnswer.nameAnswer}}</label><br/>
    </div>
  </div>
</br>
  <button :disabled="answer === null && answers.length === 0" class="btn btn-success" @click="submitAnswer">Dalej</button>
</div>
</template>

<script>

export default {
data() {
     return {
       answer: null,
       answers: [],
     }
  },
  props:['question','question-number'],
	methods:{
		submitAnswer:function() {
			this.$emit('answer', {answer:this.answer, questionType: this.question.type, answers: this.answers});
      this.answer = null;
      this.answers = [];
		}
	}
}

</script>

<style>

</style>
