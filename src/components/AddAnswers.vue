<template>
<div class="ml-5" >

    <div class="d-flex flex-row">
        <div >
            <h4 class="mt-4 mr-4">Dodaj odpowiedź:</h4>
        </div>
        <div >
            <button class="btn btn-primary btn-xs mt-3" @click="addRow(index)">+</button>
            <button class="btn btn-danger btn-xs ml-3 mt-3" @click="removeRow(index)">-</button>
        </div>
    </div>
    <form v-for="(addAnswer, index) in addAnswers" :key="addAnswer.id" >
        <tr >
            <td>
                {{ index + 1 }}.
            </td>
            <td> 
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="checkbox" aria-label="Checkbox for following text input">
                    </div>
                    </div>
                    <input type="text" v-model="addAnswer.name" class="form-control" aria-label="Text input with checkbox">
                </div>
            </td>
        </tr>       
    </form>
    
</div>
    
</template>

<script>

import axios from 'axios'
import router from '../router'
import Vue from 'vue'


export default {
    props: ['addAnswers'],
    data() {
        return {
             
        }
           
    },
    methods: {
        addRow: function (index) {
            try {
                this.addAnswers.splice(index + 1, 0, {});
            } catch(e)
            {
                console.log(e);
            }
        },
        removeRow: function (index) {
            this.addAnswers.splice(index, 1);
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
