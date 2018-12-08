<template>
<div >
<b-card v-for="(quiz, index) in quiz" :key="index.id" class="mt-5 mb-5">
    <div>
        
    </div>
        <h2 class="card-title">Pytanie {{index+1}} </h2>
        <i></i>
        <input placeholder="Wprowadź pytanie" class="form-control"  v-model="quiz.question" />
        <AddAnswers></AddAnswers>
        <button class="btn btn-primary btn-xs mt-3" @click="addRow(index)">Dodaj Pytanie</button>
        <button class="btn btn-danger btn-xs ml-3 mt-3" @click="removeRow(index)">Usuń Pytanie</button>
    </b-card>
</div>
    
</template>

<script>
import axios from 'axios'
import router from '../router'
import Vue from 'vue'
import AddAnswers from './AddAnswers.vue'


export default {
     components: {
      AddAnswers,
    },
    data() {
        return {
             quiz: [{}],
        }
    },
    methods: {
        addRow: function (index) {
            try {
                this.quiz.splice(index + 1, 0, {});
            } catch(e)
            {
                console.log(e);
            }
        },
        removeRow: function (index) {
            this.quiz.splice(index, 1);
        },
    }
}

</script>

<style>

</style>
