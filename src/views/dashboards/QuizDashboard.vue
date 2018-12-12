<template>

<div class="container mt-5">
  <div class="row justify-content-center">
    <b-card class=" cad-body col-md-6 mt-5">
    <Quiz url="https://api.myjson.com/bins/ahn1p">

    <div slot="intro" slot-scope="props">
      This is my custom quiz header for {{props.title}}.
    </div>
  
    <div slot="results" slot-scope="props">
      <h1>GRATULACJE!</h1> 
        You got {{props.correct}} right out of 
        {{props.length}} questions. 
      Your percentage is {{props.perc}}%.
    </div>
  </Quiz>
</b-card>
  </div>
  
</div>

</template>

<script>

import Quiz from '../../components/Quiz.vue'

export default {
  components: {
    Quiz,
  },
data() {
    return {
    }
  }
}
</script>

<style>

</style>
    