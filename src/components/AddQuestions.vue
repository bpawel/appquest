<template>

<div id="addQuestion">
    <b-card v-for="(addQuestion, index) in addQuestions" :key="addQuestion.id" class="mt-5 mb-5">
        <h2 class="card-title">Pytanie {{index+1}} </h2>
        <i></i>
        <input placeholder="Wprowadź pytanie"  class="form-control"  v-model="addQuestion.name" />
        <AddAnswers v-bind:addAnswers="addAnswer"></AddAnswers>
        <button  class="btn btn-primary btn-xs mt-3" @click="add(index)">Dodaj Pytanie</button>
        <button class="btn btn-danger btn-xs ml-3 mt-3" @click="remove(index)">Usuń Pytanie</button>
    </b-card>
</div>
    
</template>

<script>
import axios from 'axios'
import router from '../router'
import Vue from 'vue'
import AddAnswers from './AddAnswers.vue'


export default {
    props: ['addQuestions', 'addAnswer'],
     components: {
      AddAnswers,
    },
    name: 'addQuestion',
    data() {
        return {
        }
    },
    methods: {
        
        add: function (index) {
            try {
                this.addQuestions.splice(index + 1, 0, {});
            } catch(e)
            {
                console.log(e);
            }
        },
        remove: function (index) {
            this.addQuestions.splice(index, 1);
        },
    }
}

</script>

<style>

</style>
