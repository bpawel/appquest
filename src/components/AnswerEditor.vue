<template>
<div class="ml-5" >
    <div class="d-flex flex-row">
        <div >
            <h4 class="mt-4 mr-4">Dodaj odpowiedź:</h4>
        </div>
        <div >
            <button class="btn btn-primary btn-xs mt-3" v-on:click="addRow()">+</button>
            <button class="btn btn-danger btn-xs ml-3 mt-3" v-on:click="removeRow(index)">-</button>
        </div>
    </div>
    <form v-for="(answer, index) in answers" :key="answer.id" >
        <tr >
            <td>
                {{ index + 1 }}.
            </td>
            <td> 
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" id="isValid" v-bind:value="answer.nameAnswer" v-model="answer.validAnswer" aria-label="Checkbox for following text input">
                    </div>
                    </div>
                    <input type="text" for="isValid" v-model="answer.nameAnswer" class="form-control" aria-label="Text input with checkbox">
                </div>
            </td>
        </tr>    
        <span>Poprawna odpowiedź: {{ answer.validAnswer }}</span>   
    </form>
    
</div>
    
</template>

<script>

import axios from 'axios'
import router from '../router'
import Vue from 'vue'


export default {
    props: ['answers'],
    data() {
        return {
          
        }
    },
    methods: {
        addRow: function () {
            try {
                    this.answers.push({
                    validAnswer: [],
                });       
            } catch(e)
            {
                console.log(e);
            }
        },
        removeRow: function (index) {
            this.answers.splice(index, 1);
        },
    }
}

</script>

<style>
.input-group-text{
    background-color: #fff;
    border: none
}
</style>
