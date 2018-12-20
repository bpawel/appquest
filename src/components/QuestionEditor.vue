<template>

<div id="addQuestion">
    <b-card v-for="(question, index) in questions" :key="question.id" class="mt-5 mb-5">
        <h2 class="card-title">Pytanie {{index+1}} </h2>
        <i></i>
         <div  class="mt-3 mb-3">
            <h4>Typ Testu: </h4>
            <b-form-select v-model="question.type" :options="options" />
          </div>
        <input placeholder="Wprowadź pytanie"  class="form-control"  v-model="question.questionName" />
        <AnswerEditor v-bind:answers="question.answers"></AnswerEditor>
        <button  class="btn btn-primary btn-xs mt-3" @click="add(index)">Dodaj Pytanie</button>
        <button class="btn btn-danger btn-xs ml-3 mt-3" @click="remove(index)">Usuń Pytanie</button>
         <span>Checked names: {{ question.answers.validAnswers }}</span>
    </b-card>
    
</div>
    
</template>

<script>
import axios from 'axios'
import router from '../router'
import Vue from 'vue'
import AnswerEditor from './AnswerEditor.vue'


export default {
    props: ['questions'],
     components: {
      AnswerEditor,
    },
    name: 'addQuestion',
    data() {
        return {
        selected: null,
        options: [
          { value: null, text: 'Please select type' },
          { value: 'open', text: 'open' },
          { value: 'closed', text: 'closed' },
          { value: 'true/false', text: 'true/false' },
          { value: 'multiple', text: 'multiple' }
        ]
        }
    },
    methods: {
        
        add: function (index) {
            try {
                this.questions.push({
                    nameQuestion: "abc",
                    answers: [],
                });
            } catch(e)
            {
                console.log(e);
            }
        },
        remove: function (index) {
            this.questions.splice(index, 1);
        },
    }
}

</script>

<style>

</style>
